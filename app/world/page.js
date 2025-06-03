"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

export default function World() {
  return (
    <div id="canvas-container" className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight color="red" position={[5, 5, 5]} intensity={100} />
        <pointLight color="green" position={[-5, -5, -5]} intensity={0.1} />
        <CameraControls />
        <mesh>
          <boxGeometry args={[2, 3, 2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </Canvas>
    </div>
  );
}
