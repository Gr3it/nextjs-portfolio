"use client";

import React, { useState } from "react";
import { PerspectiveCamera, CameraControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cameraStore } from "@/stores/cameraStorage";

export default function SupportCamera() {
  const [camera, setCamera] = useState();
  const { isSupportCameraActive } = useSnapshot(cameraStore);

  return (
    <>
      <PerspectiveCamera
        ref={setCamera}
        makeDefault={isSupportCameraActive}
        fov={50}
        position={[75, 50, 50]}
        near={1}
        far={1000}
      />

      {isSupportCameraActive && camera && (
        <CameraControls camera={camera} makeDefault />
      )}
    </>
  );
}
