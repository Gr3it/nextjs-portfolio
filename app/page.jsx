"use client";

import React from "react";
import { useSnapshot } from "valtio";

import { ScrollControlsProxy } from "@/components/3D/core/scrollControls";
import VehicleSafeZone from "@/components/ui/debug/vehicleSafeZone";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { debugStore } from "@/stores/debugStorage";
import App3d from "@/components/app3d";

const { height: worldHeight } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;

export default function World() {
  const snap = useSnapshot(debugStore);

  return (
    <>
      <App3d />
      <ScrollControlsProxy pages={worldHeight / frustumHeightOnPlane} />
      {snap.showVehicleSafeZone && <VehicleSafeZone />}
    </>
  );
}
