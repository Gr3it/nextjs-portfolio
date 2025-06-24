import React, { useRef, createRef } from "react";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { useScrollProxyListener } from "./scrollProxy";

const worldScrollHeight =
  worldConfig.height - cameraConfig.frustumHeightOnPlane;

function getSceneZOffset(offset) {
  return offset * worldScrollHeight;
}

export default function ScrollWrapper({ children }) {
  const groupRef = useRef();

  useScrollProxyListener((offset) => {
    groupRef.current.position.z = getSceneZOffset(-offset);
  });

  return <group ref={groupRef}>{children}</group>;
}

export const scrollContainerRef = createRef();
