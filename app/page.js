"use client";

import React from "react";
import { useSnapshot } from "valtio";

import Navbar from "@/components/ui/navigation/navbar";
import CanvasWrapper from "@/components/canvasWrapper";
import { ScrollControlsProxy } from "@/components/3D/scrollProxy/scrollControls";
import VehicleSafeZone from "@/components/ui/debug/vehicleSafeZone";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { debugStore } from "@/valatio/debugStorage";

const { height: worldHeight } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

export default function World() {
  const snap = useSnapshot(debugStore);

  return (
    <>
      <Navbar />
      <CanvasWrapper />
      <ScrollControlsProxy pages={worldHeight / frustumHeightOnPlane} />
      {snap.showVehicleSafeZone && <VehicleSafeZone />}
    </>
  );
}
