"use client";

import React from "react";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

import CanvasWrapper from "@/components/3D/canvasWrapper";
import Navbar from "@/components/ui/navigation/navbar";
import { ScrollProxy } from "@/components/3D/scrollProxy/scrollProxy";

export default function World() {
  return (
    <>
      <Navbar />
      <CanvasWrapper />
      <ScrollProxy
        id="scrollProxy"
        height={worldConfig.height / cameraConfig.frustumHeightOnPlane}
      />
    </>
  );
}
