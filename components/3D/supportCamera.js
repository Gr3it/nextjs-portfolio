import { PerspectiveCamera, CameraControls } from "@react-three/drei";
import React from "react";

export default function SupportCamera() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 10, 10]}
        near={1}
        far={1000}
      />
      <CameraControls />
    </>
  );
}
