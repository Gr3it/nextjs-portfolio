import React from "react";

import { PivotControls } from "@react-three/drei";

export default function PointEditor({ position, selected, onClick }) {
  return (
    <PivotControls
      scale={2}
      lineWidth={2}
      anchor={[0, 0, 0]}
      position={position}
      disableRotations
      disableScaling
      visible={selected}
    >
      <mesh
        position={position}
        onClick={() => {
          onClick();
        }}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={selected ? "orange" : "blue"} />
      </mesh>
    </PivotControls>
  );
}
