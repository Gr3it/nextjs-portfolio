import React from "react";
import { WorldModel } from "@/models/World";
import ScrollWrapper from "./scrollWrapper";
import DirectionalLightWithHelper from "./directionalLightWithHelper";
import { Stats } from "@react-three/drei";

import debugConfig from "@/config/debug-config.json";

export default function Scene() {
  return (
    <>
      <ambientLight color="#C0D8FF" intensity={1} />
      <DirectionalLightWithHelper showHelper={debugConfig.showLightHelper} />
      {debugConfig.showStats && <Stats />}

      <ScrollWrapper>
        <WorldModel />
      </ScrollWrapper>
    </>
  );
}
