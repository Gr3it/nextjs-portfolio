import { PerspectiveCamera, CameraControls } from "@react-three/drei";
import React from "react";

export default function SupportCamera() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[75, 50, 50]}
        near={1}
        far={1000}
      />
      <CameraControls />
    </>
  );
}
