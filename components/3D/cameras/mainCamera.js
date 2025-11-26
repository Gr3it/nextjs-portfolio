import React, { useEffect, useRef } from "react";
import { CameraHelper } from "three";
import { Helper, PerspectiveCamera } from "@react-three/drei";

import cameraConfig from "@/config/camera-config.json";
import { useFrame } from "@react-three/fiber";

export default function MainCamera({ isActive = true }) {
  const cameraRef = useRef();

  // Ensure camera always looks at target
  useEffect(() => {
    const camera = cameraRef.current;
    if (camera) {
      camera.lookAt(...cameraConfig.lookAt);
      camera.updateMatrixWorld();
      console.log("update");
    }
  }, [cameraRef]);

  useFrame(() => {
    if (cameraRef.current) cameraRef.current.position.z += 0.01;
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={isActive}
      fov={cameraConfig.FOV}
      position={cameraConfig.position}
      near={cameraConfig.near}
      far={cameraConfig.far + 7}
      zoom={1}
    >
      {!isActive && <Helper type={CameraHelper} />}
    </PerspectiveCamera>
  );
}
