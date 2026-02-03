"use client";

import React, { useEffect, useRef } from "react";
import { CameraHelper, Vector3 } from "three";
import { Helper, PerspectiveCamera } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cameraStore } from "@/stores/cameraStorage";
import cameraConfig from "@/config/camera-config.json";
import { useResponsiveZoom } from "./useResponsiveZoom";

const { lookAtDirection, FOV, position, near, far } = cameraConfig;

export default function MainCamera() {
  const cameraRef = useRef();
  const zoom = useResponsiveZoom(0.13);

  const { isSupportCameraActive } = useSnapshot(cameraStore);

  const isActive = !isSupportCameraActive;

  useEffect(() => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      const dir = new Vector3(...lookAtDirection).normalize();
      const target = new Vector3().addVectors(camera.position, dir);
      camera.lookAt(target);
      camera.updateMatrixWorld();
    }
  }, []);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoom]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={isActive}
      fov={FOV}
      position={position}
      near={near}
      far={1.25 * far}
      zoom={zoom}
    >
      {!isActive && <Helper type={CameraHelper} />}
    </PerspectiveCamera>
  );
}
