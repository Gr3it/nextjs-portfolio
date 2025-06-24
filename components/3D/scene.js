import React from "react";
import { Model as WorldModel } from "@/models/World";
import ScrollWrapper from "./scrollWrapper";
import DirectionalLightWithHelper from "./directionalLightWithHelper";
import { Stats, Text } from "@react-three/drei";

import debugConfig from "@/config/debug-config.json";
import { GridOverlay } from "./gridHelper";
import Curve from "./vehicles/curve";

export default function Scene() {
  return (
    <>
      <ambientLight color="#d4e3fc" intensity={1.25} />
      <DirectionalLightWithHelper showHelper={debugConfig.showLightHelper} />
      {debugConfig.showStats && <Stats />}

      <ScrollWrapper>
        <GridOverlay show={debugConfig.showGrid} />
        <Curve />
        <WorldModel />
        <Text
          color="#daae7e"
          anchorX="left"
          position={[-4, -0.1, 21]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1}
          fontWeight={400}
        >
          Creative Coder
        </Text>
        <Text
          color="#daae7e"
          anchorX="left"
          s
          position={[-4, -0.1, 25]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={2.75}
          fontWeight={800}
          lineHeight={1.25}
        >
          Emanuele{"\n"}Zini
        </Text>
      </ScrollWrapper>
    </>
  );
}
