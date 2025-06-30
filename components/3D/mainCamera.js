import React, { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import cameraConfig from "@/config/camera-config.json";

export default function MainCamera({ helper }) {
  const cameraRef = useRef();
  const { scene } = useThree();
  const helperRef = useRef();

  // Ensure camera always looks at target
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(...cameraConfig.lookAt);
      cameraRef.current.updateMatrixWorld();
    }
    if (helperRef.current) {
      helperRef.current.update();
    }
  }, [cameraRef, helper]); // or add more deps if needed

  useEffect(() => {
    if (helper && cameraRef.current) {
      // Create helper and add to scene
      helperRef.current = new THREE.CameraHelper(cameraRef.current);
      scene.add(helperRef.current);
      helperRef.current.update(); // Force update to sync direction
    } else if (helperRef.current) {
      // Remove helper from scene
      scene.remove(helperRef.current);
      helperRef.current = null;
    }

    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
        helperRef.current = null;
      }
    };
  }, [helper, scene]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={cameraConfig.FOV}
      position={cameraConfig.position}
      near={cameraConfig.near}
      far={cameraConfig.far + 7}
    />
  );
}
