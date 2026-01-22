"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";

import ZoomControls from "./ui/hud/zoomControls";
import Navbar from "./ui/hud/navbar";
import CameraSwitchButton from "./ui/debug/cameraSwitchButton";
import Scene from "./3D/scene";
import { Preload } from "@react-three/drei";

export default function App3d() {
  return (
    <div className="w-full h-full fixed inset-0">
      <Navbar />
      <CameraSwitchButton />
      <ZoomControls />

      <Canvas shadows>
        <Scene />
        <Preload all />
      </Canvas>
    </div>
  );
}
