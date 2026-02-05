"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

export const MinimalCanvas = ({
  children,
  canvasConfig,
  ambientConfig,
  directionalConfig,
}) => {
  return (
    <Canvas
      orthographic
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, precision: "highp" }}
      camera={{ position: [0, 5, 10], zoom: 60 }}
      style={{ pointerEvents: "none" }}
      {...canvasConfig}
    >
      <ambientLight intensity={1.5} {...ambientConfig} />

      <directionalLight
        position={[5, 8, -3]}
        intensity={2}
        castShadow
        {...directionalConfig}
      />

      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
};
