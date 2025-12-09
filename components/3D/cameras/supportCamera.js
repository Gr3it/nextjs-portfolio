import React, { useRef, useState } from "react";
import { PerspectiveCamera, CameraControls } from "@react-three/drei";

export default function SupportCamera({ isActive }) {
  const [camera, setCamera] = useState();
  return (
    <>
      <PerspectiveCamera
        ref={setCamera}
        makeDefault={isActive}
        fov={50}
        position={[75, 50, 50]}
        near={1}
        far={1000}
      />
      {isActive && camera && <CameraControls camera={camera} />}
    </>
  );
}
