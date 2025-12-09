"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { useFrame } from "@react-three/fiber";
import MainCamera from "./cameras/mainCamera";
import SupportCamera from "./cameras/supportCamera";
import Scene from "./scene";

import debugConfig from "@/config/debug-config.json";
import { Perf } from "r3f-perf";
import { Stats } from "@react-three/drei";
import DirectionalLight from "./lighting/directionalLight";
import ScrollControls, {
  ANIMATION_MODES,
  useScroll,
} from "./scrollProxy/scrollControls";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

const { height } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

// Memoize the calculation function to avoid recreating it
const getSceneZOffset = (offset) => offset * (height - frustumHeightOnPlane);

// Extract constants for better readability
const AMBIENT_LIGHT_COLOR = "#d4e3fc";
const AMBIENT_LIGHT_INTENSITY = 1.25;

const { showLightHelper, showStats, showSupportCamera } = debugConfig;

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

function ScrollContent({ children }) {
  const groupRef = useRef();
  const scroll = useScroll({
    mode: ANIMATION_MODES.DAMPING,
    damping: 0.4,
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = getSceneZOffset(scroll());
    }
  });

  return <group ref={groupRef}>{children}</group>;
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
        <ScrollControls>
          <ScrollContent>
            <MainCamera isActive={!useSupportCamera} />

            {/* Lighting setup */}
            <ambientLight
              color={AMBIENT_LIGHT_COLOR}
              intensity={AMBIENT_LIGHT_INTENSITY}
            />
            <DirectionalLight showHelper={showLightHelper} />
          </ScrollContent>
          {/* Debug stats - conditionally rendered */}
          <SupportCamera isActive={useSupportCamera} />
          {showStats && <Stats />}
          <Scene />
          <Perf position="bottom-right" />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
