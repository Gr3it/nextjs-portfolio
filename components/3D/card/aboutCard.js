import fontMap from "@/components/fontMap";
import { Text } from "@react-three/drei";
import React from "react";

import { Minecraft } from "@/models/aboutCards/Minecraft";
import { Blockchain } from "@/models/aboutCards/Blockchain";
import { Games } from "@/models/aboutCards/Games";
import { Design } from "@/models/aboutCards/Design";
import Coding from "@/models/aboutCards/Coding";

const PROJECT_COMPONENTS = {
  Minecraft,
  Blockchain,
  Games,
  Design,
  Coding,
};

function getCardComponent(type) {
  const Component = PROJECT_COMPONENTS[type];
  return Component ? <Component /> : null;
}

export default function AboutCard({ card }) {
  return (
    <group position={card.position}>
      <mesh position={[9, 0.001, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={1} color={"hotpink"} />
      </mesh>

      <group position={[9, 0, card?.main ? 3 : 4.5]}>
        {getCardComponent(card?.component)}
      </group>

      <group position={[1, 0.01, card?.main ? 6 : 9]}>
        <Text
          position={[8, 0, 1.75]}
          anchorX={"center"}
          anchorY={"bottom"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={1.4}
          lineHeight={1.2}
          maxWidth={16}
          font={fontMap[600]}
        >
          {card.title}
        </Text>
        <Text
          position={[0, 0, 2]}
          anchorX={"left"}
          anchorY={"top"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={0.6}
          maxWidth={16}
          font={fontMap[400]}
        >
          {card.description}
        </Text>
      </group>
    </group>
  );
}
