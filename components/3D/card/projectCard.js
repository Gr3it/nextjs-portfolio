import fontMap from "@/components/fontMap";
import { Billboard, Text } from "@react-three/drei";
import React, { useState } from "react";

import { SpacePiratesPreview } from "@/models/projectPreviews/SpacePiratesPreview";
import { SnipingBotPreview } from "@/models/projectPreviews/SnipingBotPreview";
import { EventToolPreview } from "@/models/projectPreviews/EventToolPreview";
import { FlynetPreview } from "@/models/projectPreviews/FlynetPreview";
import { HotelMeanoPreview } from "@/models/projectPreviews/HotelMeanoPreview";
import { MetaEmpirePreview } from "@/models/projectPreviews/MetaEmpirePreview";
import { SmartParkingAppPreview } from "@/models/projectPreviews/SmartParkingAppPreview";
import { CryptoPriceTrackerPreview } from "@/models/projectPreviews/CryptoPriceTrackerPreview";
import { ColorScreenTestPreview } from "@/models/projectPreviews/ColorScreenTestPreview";
import { PlanItPreview } from "@/models/projectPreviews/PlanItPreview";
import { WalletTrackerPreview } from "@/models/projectPreviews/WalletTrackerPreview";
import { PortfolioPreview } from "@/models/projectPreviews/PortfolioPreview";

const PROJECT_COMPONENTS = {
  SpacePiratesPreview,
  SnipingBotPreview,
  EventToolPreview,
  FlynetPreview,
  HotelMeanoPreview,
  MetaEmpirePreview,
  SmartParkingAppPreview,
  CryptoPriceTrackerPreview,
  ColorScreenTestPreview,
  PlanItPreview,
  WalletTrackerPreview,
  PortfolioPreview,
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

      <group position={[9, 0, 7.5]}>
        {getProjectComponent(
          project?.component?.type,
          project?.component?.options
        )}
      </group>

      {hover && (
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
      )}

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
