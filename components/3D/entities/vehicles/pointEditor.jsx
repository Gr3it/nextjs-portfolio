import React, { useRef, useCallback, useEffect } from "react";
import { Html, PivotControls } from "@react-three/drei";

export default function PointEditor({
  position,
  selected = false,
  onClick,
  onDrag,
  addPointAfter,
  removePoint,
}) {
  const initialPosition = useRef(position.clone());

  // Update initialPosition when position reference changes
  useEffect(() => {
    initialPosition.current = position.clone();
  }, [position]);

  const handleDrag = useCallback(
    (matrix) => {
      position.copy(initialPosition.current).applyMatrix4(matrix);
      onDrag();
    },
    [position, onDrag]
  );

  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      onClick?.();
    },
    [onClick]
  );

  return (
    <PivotControls
      scale={2}
      lineWidth={2}
      anchor={[0, 0, 0]}
      position={position}
      disableRotations
      disableScaling
      annotations
      visible={selected}
      enabled={selected}
      onDrag={handleDrag}
    >
      <mesh position={position} onClick={handleClick}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={selected ? "#ff8c00" : "#0080ff"} />
      </mesh>
      {selected && (
        <Html position={[position.x + 0.5, position.y, position.z - 2]}>
          <div
            style={{
              display: "flex",
              gap: "5px",
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={addPointAfter}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              title="Add point after (A)"
            >
              +
            </button>
            <button
              onClick={removePoint}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              title="Remove point (Delete)"
            >
              −
            </button>
          </div>
        </Html>
      )}
    </PivotControls>
  );
}
