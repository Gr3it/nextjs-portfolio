"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import { debugStore } from "@/stores/debugStorage";

import ZoomControls from "./ui/hud/zoomControls";
import Navbar from "./ui/hud/navbar";
import CameraSwitchButton from "./ui/debug/cameraSwitchButton";
import Scene from "./3D/scene";

export default function App3d() {
  return (
    <div className="w-full h-full fixed inset-0">
      <Navbar />
      <CameraSwitchButton />
      <ZoomControls />

      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
}
