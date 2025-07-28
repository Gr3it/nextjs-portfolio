import React, { useCallback, useRef } from "react";
import { TransformControls } from "@react-three/drei";

export default function PointEditor({
  position,
  selected,
  onClick,
  onPositionChange,
}) {
  const meshRef = useRef();

  const handleChange = useCallback(() => {
    if (meshRef.current && onPositionChange) {
      // Get the new position from the mesh and update the position vector
      const newPosition = meshRef.current.position.clone();
      position.copy(newPosition);
      onPositionChange(newPosition);
    }
  }, [position, onPositionChange]);

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => {
          onClick();
        }}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={selected ? "orange" : "blue"} />
      </mesh>
      <TransformControls
        object={meshRef}
        mode="translate"
        showX={true}
        showY={true}
        showZ={true}
        enabled={selected}
        size={2}
        onChange={handleChange}
      ></TransformControls>
    </>
  );
}
