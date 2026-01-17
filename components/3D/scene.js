import React, { useMemo } from "react";
import { Text } from "@react-three/drei";
import { useSnapshot } from "valtio";

import { GridOverlay } from "./helpers/gridHelper";

import VehicleManager from "./vehicles/vehicleManager";
import Flags from "./flag/flags";
import ProjectCard from "./card/projectCard";
import fontMap from "../fontMap";

import { debugStore } from "@/valatio/debugStorage";
import worldConfig from "@/config/world-config.json";
import textConfig from "@/config/text-config.json";
import projectCards from "@/config/project-cards.json";
import footerCards from "@/config/footer-cards.json";
import aboutCards from "@/config/about-cards.json";

import World from "@/models/World";
import FooterCard from "./card/footerCard";
import AboutCard from "./card/aboutCard";

const { height } = worldConfig;

const TextElements = React.memo(() => {
  const textElements = useMemo(
    () =>
      textConfig.map((textItem, index) => (
        <Text
          anchorX={"left"}
          anchorY={"top"}
          key={textItem.id || `text-${index}`}
          color={textItem.color}
          position={textItem.position}
          rotation={textItem.rotation}
          fontSize={textItem.fontSize}
          fontWeight={textItem.fontWeight}
          lineHeight={textItem.lineHeight}
          font={fontMap[textItem.fontWeight]}
        >
          {textItem.content}
        </Text>
      )),
    [],
  );

  return <>{textElements}</>;
});

TextElements.displayName = "TextElements";

const ConditionalGrid = () => {
  const snap = useSnapshot(debugStore);

  if (!snap.showGrid) return null;

  return (
    <GridOverlay
      size={height}
      position={[0, 0, height / 2]}
      divisions={height / 2}
    />
  );
};

export default function Scene() {
  return (
    <>
      <World />
      <VehicleManager />
      <TextElements />
      <Flags />
      {projectCards.map((project) => (
        <ProjectCard project={project} key={project.title} />
      ))}

      {footerCards.map((card) => (
        <FooterCard card={card} key={card.title} />
      ))}

      {aboutCards.map((card) => (
        <AboutCard card={card} key={card.title} />
      ))}

      <ConditionalGrid />
    </>
  );
}
