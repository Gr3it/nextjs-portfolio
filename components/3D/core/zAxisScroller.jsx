"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ANIMATION_MODES, useScroll } from "./scrollControls";
import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

const SCROLL_RANGE = worldConfig.height - cameraConfig.frustumHeightOnPlane;

export default function ZAxisScroller({ children, damping = 0.4 }) {
  const groupRef = useRef(null);

  const scroll = useScroll({
    mode: ANIMATION_MODES.DAMPING,
    damping: damping,
  });

  useFrame(() => {
    if (!groupRef.current) return;
    const targetZ = scroll() * SCROLL_RANGE;
    groupRef.current.position.z = targetZ;
  });

  return <group ref={groupRef}>{children}</group>;
}
