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

const { height: worldHeight } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

const HUD = () => (
  <div className="fixed inset-0 z-50 pointer-events-none">
    <div className="pointer-events-auto">
      <Navbar />
      <CameraSwitchButton />
      <ZoomControls />
    </div>
  </div>
);

export default function App3d() {
  const snap = useSnapshot(debugStore);
  const scrollPages = useMemo(() => worldHeight / frustumHeightOnPlane, []);
  return (
    <>
      <main className="w-full h-full fixed inset-0 bg-[var(--background)]">
        <HUD />
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>
        </Canvas>
      </main>
      <ScrollControlsProxy pages={scrollPages} />
      {snap.showVehicleSafeZone && <VehicleSafeZone />}
    </>
  );
}
