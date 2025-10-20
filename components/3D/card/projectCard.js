import fontMap from "@/components/fontMap";
import { Billboard, Text } from "@react-three/drei";
import React, { useState } from "react";

import { PirateShip } from "@/models/PirateShip";
import { SlotMachine } from "@/models/SlotMachine";
import { ClawMachine } from "@/models/ClawMachine";
import { Statue } from "@/models/Statue";
import { Hotel } from "@/models/Hotel";

const PROJECT_COMPONENTS = {
  PirateShip,
  SlotMachine,
  ClawMachine,
  Statue,
  Hotel,
};

function getProjectComponent(type, options) {
  const Component = PROJECT_COMPONENTS[type];
  return Component ? <Component {...options} /> : null;
}

export default function ProjectCard({ project, children }) {
  const [hover, setHover] = useState(false);

  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "auto";
  };
  return (
    <group
      position={project.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}
      <mesh position={[9, 0, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group position={[9, 0, 9]}>
        {getProjectComponent(
          project?.component?.type,
          project?.component?.options
        )}
      </group>

      <group position={[9, 1, 0]}>
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text fontSize={1}>{"I'm a billboard"}</Text>
        </Billboard>
        <Billboard position={[0, 0, 0]} args={[10, 10]}>
          <mesh>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </Billboard>
      </group>

      <group position={[1, 0.01, 12]}>
        <Text
          position={[0, 0, 1.75]}
          anchorX={"left"}
          anchorY={"bottom"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={1.4}
          lineHeight={1.2}
          maxWidth={16}
          font={fontMap[600]}
        >
          {project.title}
        </Text>
        <Text
          position={[0, 0, 2]}
          anchorX={"left"}
          anchorY={"top"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={0.75}
          maxWidth={16}
          font={fontMap[400]}
        >
          {project.description}
        </Text>
      </group>
    </group>
  );
}
