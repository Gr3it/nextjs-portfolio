"use client";

import React from "react";
import CanvasWrapper from "@/components/3D/canvasWrapper";
import { ScrollProxy } from "@/components/3D/scrollProxy";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import Navbar from "@/components/navbar";

export default function World() {
  return (
    <>
      {/* <div id="nav-portal" className="flex flex-col items-center" /> */}
      <Navbar />
      <CanvasWrapper />
      <ScrollProxy
        id="scrollProxy"
        height={worldConfig.height / cameraConfig.frustumHeightOnPlane}
      />
    </>
  );
}
