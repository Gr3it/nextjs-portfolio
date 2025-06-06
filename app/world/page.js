"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, useHelper } from "@react-three/drei";
import { WorldModel } from "@/models/World";
import { CameraHelper } from "three";

function DirectionalLightWithHelper() {
  const lightRef = useRef();
  const helperRef = useRef();

  useEffect(() => {
    if (lightRef.current && lightRef.current.shadow?.camera) {
      helperRef.current = new CameraHelper(lightRef.current.shadow.camera);
      lightRef.current.add(helperRef.current);

      return () => {
        // Cleanup helper on unmount
        helperRef.current = null;
      };
    }
  }, []);

  return (
    <directionalLight
      ref={lightRef}
      position={[2, 5, -2]}
      color="#ffffff"
      intensity={1.5}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-left={-30}
      shadow-camera-right={30}
      shadow-camera-top={30}
      shadow-camera-bottom={-30}
      shadow-camera-near={5}
      shadow-camera-far={30}
      shadow-bias={-0.0005}
      shadow-normalBias={0.03}
      castShadow
    />
  );
}

export default function World() {
  return (
    <div id="canvas-container" className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <DirectionalLightWithHelper />

        {/* Sky Light (Ambient Light) */}
        <ambientLight color="#7e9cb9" intensity={1.0} />
        <CameraControls />
        <WorldModel />
        <mesh position={[0, 3, 10]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[0, 3, 12]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
