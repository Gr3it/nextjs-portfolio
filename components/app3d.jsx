"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import { useSmoothProgress } from "@/hooks/useSmoothProgress";
import Scene from "./3D/scene";
import LoadingScreen from "./ui/loadingScreen";
import ZoomControls from "./ui/hud/zoomControls";
import Navbar from "./ui/hud/navbar";
import CameraSwitchButton from "./ui/debug/cameraSwitchButton";

const HUD = () => (
  <div className="fixed inset-0 z-50 pointer-events-none">
    <div className="pointer-events-auto">
      <Navbar />
      <CameraSwitchButton />
      <ZoomControls />
    </div>
  </div>
);

function SceneManager() {
  const { smoothProgress, isLoading } = useSmoothProgress();

  return (
    <>
      {isLoading ? <LoadingScreen progress={smoothProgress} /> : <HUD />}

      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

export default function App3d() {
  return (
    <main className="w-full h-full fixed inset-0 bg-white">
      <SceneManager />
    </main>
  );
}
