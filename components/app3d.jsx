"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import ZoomControls from "./ui/hud/zoomControls";
import Navbar from "./ui/hud/navbar";
import CameraSwitchButton from "./ui/debug/cameraSwitchButton";
import Scene from "./3D/scene";

import { useSnapshot } from "valtio";
import { debugStore } from "@/stores/debugStorage";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { ScrollControlsProxy } from "./3D/core/scrollControls";
import VehicleSafeZone from "./ui/debug/vehicleSafeZone";
import SceneReadyNotifier from "./3D/core/sceneReadyNotifier";

const { height: worldHeight } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

const HUD = () => (
  <div className="fixed inset-0 z-50 pointer-events-none w-screen ">
    <div className="pointer-events-auto">
      <Navbar />
      <CameraSwitchButton />
      <ZoomControls />
    </div>
  </div>
);

export default function App3d({ onReady }) {
  const snap = useSnapshot(debugStore);
  const scrollPages = useMemo(() => worldHeight / frustumHeightOnPlane, []);
  return (
    <>
      <main className={"h-screen bg-[var(--background)] mr isolate"}>
        <HUD />
        <div className="fixed inset-0 w-screen">
          <Canvas shadows>
            <Suspense fallback={null}>
              <Scene />
              <SceneReadyNotifier onReady={onReady} />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>
        {snap.showVehicleSafeZone && <VehicleSafeZone />}
      </main>
      <ScrollControlsProxy pages={scrollPages} />
    </>
  );
}
