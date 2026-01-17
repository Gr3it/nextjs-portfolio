"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import { useFrame } from "@react-three/fiber";
import MainCamera from "./3D/cameras/mainCamera";
import SupportCamera from "./3D/cameras/supportCamera";
import Scene from "./3D/scene";

import { debugStore } from "@/valatio/debugStorage";
import { lightsStore } from "@/valatio/lightsStorage";

import { Perf } from "r3f-perf";
import { Stats } from "@react-three/drei";
import DirectionalLight from "./3D/lighting/directionalLight";
import ScrollControls, {
  ANIMATION_MODES,
  useScroll,
} from "./3D/scrollProxy/scrollControls";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

const { height } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

const getSceneZOffset = (offset) => offset * (height - frustumHeightOnPlane);

function DebugControls({ useSupportCamera, onToggleCamera, visible }) {
  if (!visible) return null;

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
  const debugSnap = useSnapshot(debugStore);
  const lightsSnap = useSnapshot(lightsStore);

  const handleCameraToggle = () => setUseSupportCamera((prev) => !prev);

  return (
    <div className="w-full h-full fixed inset-0">
      <DebugControls
        useSupportCamera={useSupportCamera}
        onToggleCamera={handleCameraToggle}
        visible={debugSnap.showSupportCamera}
      />

      <Canvas shadows>
        <ScrollControls>
          <ScrollContent>
            <MainCamera isActive={!useSupportCamera} />

            <ambientLight
              color={lightsSnap.ambient.color}
              intensity={lightsSnap.ambient.intensity}
            />
            <DirectionalLight />
          </ScrollContent>

          <SupportCamera isActive={useSupportCamera} />

          {debugSnap.showStats && (
            <>
              <Stats />
              <Perf position="bottom-right" />
            </>
          )}

          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
