import React from "react";

import ZAxisScroller from "./core/zAxisScroller";
import { Perf } from "r3f-perf";
import { Stats } from "@react-three/drei";
import DirectionalLight from "./core/directionalLight";
import ScrollControls from "./core/scrollControls";
import SupportCamera from "./core/cameras/supportCamera";
import MainCamera from "./core/cameras/mainCamera";
import { lightsStore } from "@/stores/lightsStorage";
import { useSnapshot } from "valtio";
import { debugStore } from "@/stores/debugStorage";
import SceneObjects from "./sceneObjects";

export default function Scene() {
  const lightsSnap = useSnapshot(lightsStore);
  const debugSnap = useSnapshot(debugStore);

  return (
    <ScrollControls>
      <ZAxisScroller>
        <MainCamera />

        <ambientLight
          color={lightsSnap.ambient.color}
          intensity={lightsSnap.ambient.intensity}
        />
        <DirectionalLight />
      </ZAxisScroller>

      <SupportCamera />

      {debugSnap.showStats && (
        <>
          <Stats />
          <Perf position="bottom-left" />
        </>
      )}

      <SceneObjects />
    </ScrollControls>
  );
}
