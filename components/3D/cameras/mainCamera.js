import React, { useEffect, useRef } from "react";
import { CameraHelper } from "three";
import { Helper, PerspectiveCamera } from "@react-three/drei";

import cameraConfig from "@/config/camera-config.json";

export default function MainCamera({ mainCamera = true }) {
  const cameraRef = useRef();

  // Ensure camera always looks at target
  useEffect(() => {
    const camera = cameraRef.current;
    if (camera) {
      camera.lookAt(...cameraConfig.lookAt);
      camera.updateMatrixWorld();
    }
  }, [cameraRef, mainCamera]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={mainCamera}
      fov={cameraConfig.FOV}
      position={cameraConfig.position}
      near={cameraConfig.near}
      far={cameraConfig.far + 7}
    >
      {!mainCamera && <Helper type={CameraHelper} />}
    </PerspectiveCamera>
  );
}
