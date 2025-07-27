"use client";

import React from "react";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

import Navbar from "@/components/ui/navigation/navbar";
import CanvasWrapper from "@/components/3D/canvasWrapper";
import { ScrollControlsProxy } from "@/components/3D/scrollProxy/scrollControls";

export default function World() {
  return (
    <>
      <Navbar />
      <CanvasWrapper />
      <ScrollControlsProxy
        pages={worldConfig.height / cameraConfig.frustumHeightOnPlane}
      />
    </>
  );
}
