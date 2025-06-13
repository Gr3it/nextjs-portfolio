import React, { useRef, useEffect } from "react";
import { DirectionalLightHelper, CameraHelper, Object3D } from "three";
import { useThree } from "@react-three/fiber";

export default function DirectionalLightWithHelper({ showHelper }) {
  const lightRef = useRef();
  const targetRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
      lightRef.current.target.updateMatrixWorld();
    }
  }, []);

  useEffect(() => {
    if (!showHelper || !lightRef.current) return;

    const shadowCam = lightRef.current.shadow.camera;
    const camHelper = new CameraHelper(shadowCam);
    scene.add(camHelper);

    return () => {
      scene.remove(camHelper);
      camHelper.dispose();
    };
  }, [scene, showHelper]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[-15, 30, 35]}
        color="#ffffFF"
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0005}
        shadow-normalBias={0}
      />
      <object3D ref={targetRef} position={[0, 0, 20]} />
    </>
  );
}
