import React, { useMemo } from "react";
import { Text } from "@react-three/drei";

import { GridOverlay } from "./helpers/gridHelper";

import VehicleManager from "./vehicles/vehicleManager";
import Flags from "./flag/flags";
import ProjectCard from "./card/projectCard";
import fontMap from "../fontMap";

import debugConfig from "@/config/debug-config.json";
import worldConfig from "@/config/world-config.json";
import textConfig from "@/config/text-config.json";
import cameraConfig from "@/config/camera-config.json";
import projectCards from "@/config/project-cards.json";
import World from "@/models/World";
import MovingCubeTest from "./textCurve";

const { showGrid } = debugConfig;
const { height } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

// Memoized text components to prevent unnecessary re-renders
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
    [] // Empty dependency array since textConfig is imported
  );

  return <>{textElements}</>;
});

TextElements.displayName = "TextElements";

// Separate grid component for better organization
const ConditionalGrid = React.memo(() => {
  if (!showGrid) return null;

  return (
    <GridOverlay
      size={height}
      position={[0, 0, height / 2]}
      divisions={height / 2}
    />
  );
});

ConditionalGrid.displayName = "ConditionalGrid";

// Main scroll content component with performance optimizations

// Main scene component with better organization
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

      <ConditionalGrid />
      <MovingCubeTest />
    </>
  );
}
