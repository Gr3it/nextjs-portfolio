"use client";

import React from "react";

import Navbar from "@/components/ui/navigation/navbar";
import CanvasWrapper from "@/components/3D/canvasWrapper";
import { ScrollControlsProxy } from "@/components/3D/scrollProxy/scrollControls";
import VehicleSafeZone from "@/components/ui/debug/vehicleSafeZone";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import debugConfig from "@/config/debug-config.json";

const { height: worldHeight } = worldConfig;
const { frustumHeightOnPlane } = cameraConfig;
const { showVehicleSafeZone } = debugConfig;

export default function World() {
  return (
    <>
      <Navbar />
      <CanvasWrapper />
      <ScrollControlsProxy pages={worldHeight / frustumHeightOnPlane} />
      {showVehicleSafeZone && <VehicleSafeZone />}
    </>
  );
}
