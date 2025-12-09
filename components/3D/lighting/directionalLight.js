import React, { useRef, useEffect } from "react";
import { CameraHelper } from "three";
import { Helper } from "@react-three/drei";

// Default shadow camera configuration
const DEFAULT_SHADOW_CONFIG = {
  mapSize: { width: 4096, height: 4096 },
  camera: {
    left: -40,
    right: 40,
    top: 30,
    bottom: -30,
    near: 1,
    far: 60,
  },
  bias: -0.0002,
  normalBias: 0.05,
};

export default function DirectionalLight({
  showHelper = false,
  position = [-15, 30, 35],
  targetPosition = [0, 0, 20],
  color = "#ffffff",
  intensity = 1.5,
  shadowConfig = DEFAULT_SHADOW_CONFIG,
}) {
  const lightRef = useRef();
  const targetRef = useRef();

  // Set up light target
  useEffect(() => {
    const light = lightRef.current;
    const target = targetRef.current;

    if (light && target) {
      light.target = target;
      target.updateMatrixWorld();
    }
  }, []);

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={shadowConfig.mapSize.width}
        shadow-mapSize-height={shadowConfig.mapSize.height}
        shadow-bias={shadowConfig.bias}
        shadow-normalBias={shadowConfig.normalBias}
        target={targetRef}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={shadowConfig.camera.left}
          right={shadowConfig.camera.right}
          top={shadowConfig.camera.top}
          bottom={shadowConfig.camera.bottom}
          near={shadowConfig.camera.near}
          far={shadowConfig.camera.far}
        >
          {showHelper && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </directionalLight>
      <object3D ref={targetRef} position={targetPosition} />
    </>
  );
}
