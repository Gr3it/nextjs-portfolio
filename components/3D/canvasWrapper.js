"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import MainCamera from "./mainCamera";
import SupportCamera from "./supportCamera";
import WorldScene from "./scene";

import debugConfig from "@/config/debug-config.json";

export default function CanvasWrapper() {
  const [useSupportCamera, setUseSupportCamera] = useState(false);

  return (
    <div className="w-full h-screen">
      {debugConfig.showSupportCamera && (
        <button
          className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow"
          onClick={() => setUseSupportCamera((prev) => !prev)}
        >
          Toggle Camera
        </button>
      )}
      <Canvas shadows>
        {useSupportCamera && <SupportCamera />}
        <MainCamera helper={useSupportCamera} />
        <WorldScene />
      </Canvas>
    </div>
  );
}
