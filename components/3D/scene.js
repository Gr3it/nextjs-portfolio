import React, { useRef, useMemo } from "react";
import { Stats, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import DirectionalLight from "./lighting/directionalLight";
import { GridOverlay } from "./helpers/gridHelper";
import ScrollControls, {
  ANIMATION_MODES,
  useScroll,
} from "./scrollProxy/scrollControls";
import VehicleManager from "./vehicles/vehicleManager";
import Flags from "./flag/flags";
import ProjectCard from "./card/projectCard";
import fontMap from "../fontMap";

import { Model as WorldModel } from "@/models/World";

import debugConfig from "@/config/debug-config.json";
import worldConfig from "@/config/world-config.json";
import textConfig from "@/config/text-config.json";
import cameraConfig from "@/config/camera-config.json";
import projectCards from "@/config/project-cards.json";

// Extract constants for better readability
const AMBIENT_LIGHT_COLOR = "#d4e3fc";
const AMBIENT_LIGHT_INTENSITY = 1.25;

const { showLightHelper, showStats, showGrid } = debugConfig;
const { height } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

// Memoize the calculation function to avoid recreating it
const getSceneZOffset = (offset) => offset * (height - frustumHeightOnPlane);

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
function ScrollContent({ children }) {
  const groupRef = useRef();
  const scroll = useScroll({
    mode: ANIMATION_MODES.DAMPING,
    damping: 0.4,
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = getSceneZOffset(-scroll());
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Main scene component with better organization
export default function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight
        color={AMBIENT_LIGHT_COLOR}
        intensity={AMBIENT_LIGHT_INTENSITY}
      />
      <DirectionalLight showHelper={showLightHelper} />

      {/* Debug stats - conditionally rendered */}
      {showStats && <Stats />}

      {/* Main scrollable content */}
      <ScrollControls>
        <ScrollContent>
          <ConditionalGrid />
          <WorldModel />
          <VehicleManager />
          <TextElements />
          <Flags />
          {projectCards.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </ScrollContent>
      </ScrollControls>
    </>
  );
}
