import fontMap from "@/components/fontMap";
import { Text } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { LinkedinLogo } from "@/models/footerCards/Linkedin";
import { GithubLogo } from "@/models/footerCards/Github";
import { PaperPlaneLogo } from "@/models/footerCards/PaperPlane";
import { DocumentLogo } from "@/models/footerCards/Document";

const CARD_COMPONENTS = {
  LinkedinLogo,
  GithubLogo,
  PaperPlaneLogo,
  DocumentLogo,
};

function getCardComponent(type) {
  const Component = CARD_COMPONENTS[type];
  return Component ? <Component /> : null;
}

export default function FooterCard({ card }) {
  const [hover, setHover] = useState(false);
  const groupRef = useRef();

  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "auto";
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = hover ? Math.PI * 0.15 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      1 - Math.exp(-6 * delta)
    );
  });

  return (
    <group
      position={card.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={(e) => {
        if (card.link) window.open(card.link, "_blank");
        if (card.document) {
          e.stopPropagation();

          const link = document.createElement("a");
          link.href = card.document;
          link.download = "Emanuele Zini CV.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }}
    >
      <mesh position={[0, 0, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group ref={groupRef} position={[0, 3, 4]}>
        {getCardComponent(card?.component)}
      </group>

      <group position={[-2, 0.01, 5]}>
        <Text
          position={[0, 0, 2]}
          anchorX="left"
          anchorY="bottom"
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1}
          lineHeight={1.2}
          maxWidth={16}
          font={fontMap[600]}
        >
          {card.title}
        </Text>
      </group>
    </group>
  );
}
