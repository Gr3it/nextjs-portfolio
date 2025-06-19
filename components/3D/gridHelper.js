import * as THREE from "three";
import { useMemo } from "react";
import { primitive } from "@react-three/fiber";

export function GridOverlay({ show }) {
  const gridHelper = useMemo(() => {
    const size = 200;
    const divisions = size / 2;
    return new THREE.GridHelper(size, divisions, 0x444444, 0x888888);
  }, []);

  if (!show) return null;

  return <primitive object={gridHelper} />;
}
