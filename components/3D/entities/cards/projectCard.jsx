import fontMap from "@/components/fontMap";
import { Text } from "@react-three/drei";
import React from "react";

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
import { useRouter } from "next/navigation";

import { scrollControlStore } from "@/stores/scrollControlStorage";

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

export default function ProjectCard({ project }) {
  const handlePointerOver = (e) => {
    console.log("Enter");
    document.body.style.cursor = "none";
    window.dispatchEvent(
      new CustomEvent("showCustomCursor", { detail: "VIEW" }),
    );
  };

  const handlePointerOut = (e) => {
    console.log("Out");
    document.body.style.cursor = "auto";
    window.dispatchEvent(new CustomEvent("hideCustomCursor"));
  };
  const router = useRouter();

  return (
    <group
      position={project.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={() => {
        scrollControlStore.action = "freeze";
        router.push(project.link || "");
      }}
    >
      <mesh position={[9, 0, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={0} color={"hotpink"} />
      </mesh>

      <group position={[9, 0, 5.5]}>
        {getProjectComponent(
          project?.component?.type,
          project?.component?.options,
        )}
      </group>

      <group position={[1, 0.01, 10]}>
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
          fontSize={0.7}
          maxWidth={16}
          font={fontMap[400]}
        >
          {project.description}
        </Text>
      </group>
    </group>
  );
}
