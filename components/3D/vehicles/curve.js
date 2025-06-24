import React, { useMemo } from "react";
import CurveLine from "./visualizeCurve";
import CurvePoints from "./curvePoints";
import Car from "./car";
import * as THREE from "three";

export default function Curve() {
  const { curve, points } = useMemo(() => {
    const points = [
      new THREE.Vector3(-10, 0, 30),
      new THREE.Vector3(-8, 0, 40),
      new THREE.Vector3(10, 0, 50),
      new THREE.Vector3(10, 0, 40),
      new THREE.Vector3(5, 0, 50),
      new THREE.Vector3(10, 0, 60),
      new THREE.Vector3(10, 0, 61),
      new THREE.Vector3(10, 0.2, 62),
      new THREE.Vector3(10, 0.2, 63),
      new THREE.Vector3(10, 0, 64),
      new THREE.Vector3(10, 0, 65),
    ];

    const curve = new THREE.CatmullRomCurve3(points);

    return { curve, points };
  }, []);

  return (
    <>
      <CurveLine curve={curve} />
      <CurvePoints points={points} />
      <Car curve={curve} />
    </>
  );
}
