import React, { useRef, useEffect } from "react";
import { CameraHelper } from "three";
import { Helper } from "@react-three/drei";
import { useSnapshot } from "valtio";

import { lightsStore } from "@/valatio/lightsStorage";
import { debugStore } from "@/valatio/debugStorage";

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
  targetPosition = [0, 0, 20],
  shadowConfig = DEFAULT_SHADOW_CONFIG,
}) {
  const lightRef = useRef();
  const targetRef = useRef();

  // Snapshot dei due store
  const lightSnap = useSnapshot(lightsStore);
  const debugSnap = useSnapshot(debugStore);

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
        position={lightSnap.directional.position}
        color={lightSnap.directional.color}
        intensity={lightSnap.directional.intensity}
        castShadow={lightSnap.directional.castShadow}
        shadow-mapSize-width={shadowConfig.mapSize.width}
        shadow-mapSize-height={shadowConfig.mapSize.height}
        shadow-bias={shadowConfig.bias}
        shadow-normalBias={shadowConfig.normalBias}
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
          {debugSnap.showLightHelper && <Helper type={CameraHelper} />}
        </orthographicCamera>
      </directionalLight>
      <object3D ref={targetRef} position={targetPosition} />
    </>
  );
}
