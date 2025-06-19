/* import React, { useRef, createRef } from "react";

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

  useScrollProxyListener("scrollProxy", (offset) => {
    groupRef.current.position.z = getSceneZOffset(-offset);
  });

  return <group ref={groupRef}>{children}</group>;
}

export const scrollContainerRef = createRef();
 */

import React, { useRef } from "react";
import { ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { useScrollProxyListener } from "./scrollProxy";

const worldScrollHeight =
  worldConfig.height - cameraConfig.frustumHeightOnPlane;

function getSceneZOffset(offset) {
  return offset * worldScrollHeight;
}

function ScrollContent({ children }) {
  const groupRef = useRef();
  const scroll = useScroll();

  useScrollProxyListener("scrollProxy", (offset) => {
    groupRef.current.position.z = getSceneZOffset(-offset);
  });

  // Applica traslazione su Z in base allo scroll
  /*   useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = getSceneZOffset(-scroll.offset); // 100 unità di profondità
    }
  }); */

  return <group ref={groupRef}>{children}</group>;
}

export default function ScrollWrapper({ children }) {
  return (
    /*     <ScrollControls
      pages={worldScrollHeight / cameraConfig.frustumHeightOnPlane}
      damping={0.05}
    > */
    <ScrollContent>{children}</ScrollContent>
    /* </ScrollControls> */
  );
}
