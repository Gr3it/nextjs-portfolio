"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";
import { WorldModel } from "@/models/World";
import { DirectionalLightHelper, CameraHelper } from "three";

export default function World() {
  const lightRef = useRef();

  useEffect(() => {
    if (lightRef.current) {
      // Ensure shadow camera updates correctly
      lightRef.current.shadow.camera.updateProjectionMatrix();
    }
  }, []);

  return (
    <div id="canvas-container" className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <directionalLight
          ref={lightRef}
          position={[5, 50, 50]}
          color="#ffffff"
          intensity={1.5}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          castShadow
        />

        {/* Shadow Camera Helper */}
        {lightRef.current && (
          <primitive
            object={new CameraHelper(lightRef.current.shadow.camera)}
          />
        )}

        {/* Sky Light (Ambient Light) */}
        <ambientLight color="#7e9cb9" intensity={1.0} />
        <CameraControls />
        <WorldModel />
        <mesh position={[0, 3, 10]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
