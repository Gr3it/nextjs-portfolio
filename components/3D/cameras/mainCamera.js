import React, { useEffect, useRef } from "react";
import { CameraHelper } from "three";
import { Helper, PerspectiveCamera } from "@react-three/drei";

import * as THREE from "three";

import cameraConfig from "@/config/camera-config.json";

const { lookAtDirection, FOV, position, near, far } = cameraConfig;

export default function MainCamera({ isActive = true }) {
  const cameraRef = useRef();

  // Ensure camera always looks at target
  useEffect(() => {
    const camera = cameraRef.current;
    if (camera) {
      camera.lookAt(
        camera.position.clone().add(new THREE.Vector3(...lookAtDirection))
      );
      camera.updateMatrixWorld();
    }
  }, []);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={isActive}
      fov={FOV}
      position={position}
      near={near}
      far={far + 7}
      zoom={1}
    >
      {!isActive && <Helper type={CameraHelper} />}
    </PerspectiveCamera>
  );
}
