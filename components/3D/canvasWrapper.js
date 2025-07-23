"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

import MainCamera from "./cameras/mainCamera";
import SupportCamera from "./cameras/supportCamera";
import Scene from "./scene";

import debugConfig from "@/config/debug-config.json";

const { showSupportCamera } = debugConfig;

// Debug controls component for better separation of concerns
function DebugControls({ useSupportCamera, onToggleCamera }) {
  if (!showSupportCamera) return null;

  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      <button
        className="block w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2 rounded shadow-md transition-colors duration-200 text-sm font-medium"
        onClick={onToggleCamera}
        aria-label={`Switch to ${useSupportCamera ? "main" : "support"} camera`}
      >
        {useSupportCamera ? "🎥 Support Camera" : "📷 Main Camera"}
      </button>
    </div>
  );
}

export default function CanvasWrapper() {
  const [useSupportCamera, setUseSupportCamera] = useState(false);

  const handleCameraToggle = () => setUseSupportCamera((prev) => !prev);

  return (
    <div className="w-full h-full fixed inset-0">
      <DebugControls
        useSupportCamera={useSupportCamera}
        onToggleCamera={handleCameraToggle}
      />

      <Canvas shadows>
        {useSupportCamera && <SupportCamera />}
        <MainCamera mainCamera={!useSupportCamera} />
        <Scene />
      </Canvas>
    </div>
  );
}
