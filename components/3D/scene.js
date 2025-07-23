import React from "react";
import { Stats, Text } from "@react-three/drei";

import ScrollWrapper from "./scrollProxy/scrollWrapper";
import DirectionalLight from "./lighting/directionalLight";
import { GridOverlay } from "./helpers/gridHelper";
import Vehicles from "./vehicles/vehicles";

import { Model as WorldModel } from "@/models/World";

import debugConfig from "@/config/debug-config.json";
import worldConfig from "@/config/world-config.json";
import textConfig from "@/config/text-config.json";

const { showLightHelper, showStats, showGrid } = debugConfig;
const { height } = worldConfig;

export default function Scene() {
  return (
    <>
      <ambientLight color="#d4e3fc" intensity={1.25} />
      <DirectionalLight showHelper={showLightHelper} />

      {showStats && <Stats />}
      <ScrollWrapper>
        {showGrid && (
          <GridOverlay
            size={height}
            position={[0, 0, height / 2]}
            divisions={height / 2}
          />
        )}

        <WorldModel />
        <Vehicles />

        {textConfig.map((textItem, index) => (
          <Text
            key={textItem.id || index}
            color={textItem.color}
            anchorX={textItem.anchorX}
            position={textItem.position}
            rotation={textItem.rotation}
            fontSize={textItem.fontSize}
            fontWeight={textItem.fontWeight}
            lineHeight={textItem.lineHeight}
          >
            {textItem.content}
          </Text>
        ))}
      </ScrollWrapper>
    </>
  );
}
