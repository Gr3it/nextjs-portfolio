import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { CurveModifier } from "@react-three/drei";
import { Train } from "@/models/vehicles/Train";

export default function MovingCubeTest() {
  const curveRef = useRef();

  // Very simple circle curve
  const curve = useMemo(() => {
    const pts = [
      [48, 0, 552],
      [21, 0, 552],
      [20, 0, 552],
      [16.5, 0, 554],
      [16, 0, 557.5],
      [15.5, 0, 561.6],
      [12, 0, 564],
      [11, 0, 564],
      [-48, 0, 564],
    ].map((point, i) => new THREE.Vector3(point[0], point[1], point[2]));
    return new THREE.CatmullRomCurve3(pts, true, "centripetal");
  }, []);

  // Continuous movement
  useFrame(() => {
    if (curveRef.current) {
      curveRef.current.moveAlongCurve(0.01);
    }
  });

  return (
    <CurveModifier ref={curveRef} curve={curve}>
      <mesh frustumCulled={false}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </CurveModifier>
  );
}
