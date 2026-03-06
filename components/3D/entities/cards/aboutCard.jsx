import fontMap from "@/components/fontMap";
import { Text } from "@react-three/drei";
import React from "react";

import { Minecraft } from "@/models/aboutCards/Minecraft";
import { Blockchain } from "@/models/aboutCards/Blockchain";
import { Games } from "@/models/aboutCards/Games";
import { Design } from "@/models/aboutCards/Design";
import Coding from "@/models/aboutCards/Coding";
import worldConfig from "@/config/world-config.json";

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
  const Z_OFFSET = worldConfig.sections["Ocean"]?.start || 0;

  return (
    <group
      position={[
        card.position[0],
        card.position[1],
        card.position[2] + Z_OFFSET,
      ]}
    >
      <mesh position={[9, 0.002, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={0} color={"hotpink"} />
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
          color={"#000"}
          maxWidth={16}
          font={fontMap[600]}
          frustumCulled={false}
        >
          {card.title}
        </Text>
        <Text
          frustumCulled={false}
          position={[0, 0, 2]}
          anchorX={"left"}
          anchorY={"top"}
          rotation={[-1.5707963267948966, 0, 0]}
          lineHeight={1.3}
          fontSize={0.7}
          color={"#000"}
          maxWidth={16}
          font={fontMap[400]}
        >
          {card.description}
        </Text>
      </group>
    </group>
  );
}
