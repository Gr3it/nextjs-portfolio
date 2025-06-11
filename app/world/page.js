"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls, useHelper } from "@react-three/drei";
import { WorldModel } from "@/models/World";
import {
  DirectionalLightHelper,
  CameraHelper,
  PerspectiveCamera as ThreePerspectiveCamera,
} from "three";

// Directional light with shadow camera helper
function DirectionalLightWithHelper() {
  const lightRef = useRef();
  useHelper(lightRef, DirectionalLightHelper);
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef.current) {
      const shadowCam = lightRef.current.shadow.camera;
      const helper = new CameraHelper(shadowCam);
      scene.add(helper);

      return () => {
        scene.remove(helper);
        helper.dispose();
      };
    }
  }, [scene]);

  return (
    <directionalLight
      ref={lightRef}
      position={[-10, 20, 12]}
      color="#ffffff"
      intensity={1.5}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-left={-40}
      shadow-camera-right={40}
      shadow-camera-top={40}
      shadow-camera-bottom={-40}
      shadow-camera-near={1}
      shadow-camera-far={60}
      shadow-bias={-0.0005}
      shadow-normalBias={0.03}
      castShadow
    />
  );
}

// Adds a second support camera and a helper for it
function SupportCameraWithHelper() {
  const cameraRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 10);
      const helper = new CameraHelper(cameraRef.current);
      scene.add(helper);

      return () => {
        scene.remove(helper);
        helper.dispose();
      };
    }
  }, [scene]);

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={50}
      position={[0, 10, 10]}
      near={5}
      far={20}
    />
  );
}

export default function World() {
  const cameraControlsRef = useRef();

  return (
    <div id="canvas-container" className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <DirectionalLightWithHelper />
        <SupportCameraWithHelper />
        <ambientLight color="#7e9cb9" intensity={1.0} />
        <CameraControls ref={cameraControlsRef} />
        <WorldModel />
        <mesh position={[0, 3, 12]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
