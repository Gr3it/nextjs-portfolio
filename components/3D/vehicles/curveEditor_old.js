import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { PivotControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function CurveEditor({ points, id, onChange }) {
  // Keep tempPoints state for PivotControls positioning
  const [isDragging, setIsDragging] = useState(false);
  const [tempPoints, setTempPoints] = useState(points);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Refs for direct geometry manipulation
  const curveRef = useRef(null);
  const geometryRef = useRef(null);
  const originalPointsRef = useRef([]);

  const ARC_SEGMENTS = 500;

  // Create curve and geometry once
  useMemo(() => {
    curveRef.current = new THREE.CatmullRomCurve3([...points]);
    geometryRef.current = new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3)
    );
  }, []);

  // Update curve points directly and sync tempPoints
  useEffect(() => {
    if (curveRef.current && !isDragging) {
      curveRef.current.points = points;
      setTempPoints(points);
    }
  }, [points, isDragging]);

  // Update geometry each frame
  useFrame(() => {
    const curve = curveRef.current;
    const geometry = geometryRef.current;
    const positionAttr = geometry.attributes.position;
    const point = new THREE.Vector3();

    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = i / (ARC_SEGMENTS - 1);
      curve.getPoint(t, point);
      positionAttr.setXYZ(i, point.x, point.y, point.z);
    }

    positionAttr.needsUpdate = true;
  });

  const currentPoints = isDragging ? tempPoints : points;

  const addPointAfter = useCallback(
    (index) => {
      const newPoints = [...currentPoints];
      let newPosition;

      if (index === currentPoints.length - 1) {
        const prevPoint = currentPoints[index - 1] || currentPoints[index];
        const currentPoint = currentPoints[index];
        const direction = currentPoint.clone().sub(prevPoint).normalize();
        newPosition = currentPoint.clone().add(direction.multiplyScalar(2));
      } else {
        const currentPoint = currentPoints[index];
        const nextPoint = currentPoints[index + 1];
        newPosition = currentPoint.clone().lerp(nextPoint, 0.5);
      }

      newPoints.splice(index + 1, 0, newPosition);

      if (isDragging) {
        setTempPoints(newPoints);
        curveRef.current.points = newPoints;
      } else {
        onChange(newPoints);
      }
    },
    [currentPoints, isDragging, onChange]
  );

  const removePoint = useCallback(
    (index) => {
      if (currentPoints.length <= 2) return;

      const newPoints = [...currentPoints];
      newPoints.splice(index, 1);

      if (isDragging) {
        setTempPoints(newPoints);
        curveRef.current.points = newPoints;
      } else {
        onChange(newPoints);
      }

      setSelectedPoint(null);
    },
    [currentPoints, isDragging, onChange]
  );

  const handleDragStart = useCallback(
    (index) => {
      setIsDragging(true);
      setSelectedPoint(index);
      originalPointsRef.current = points.map((p) => p.clone());
      setTempPoints(points.map((p) => p.clone()));
    },
    [points]
  );

  const handleDrag = useCallback((index, deltaMatrix) => {
    const basePoint = originalPointsRef.current[index];
    if (!basePoint) return;

    const newPos = basePoint.clone().applyMatrix4(deltaMatrix);
    setTempPoints((prev) => {
      const updated = [...prev];
      updated[index] = newPos;
      curveRef.current.points = updated;
      return updated;
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onChange(tempPoints);
  }, [tempPoints, onChange]);

  return (
    <>
      {currentPoints.map((point, index) => (
        <group key={`${id}_${index}`}>
          <PivotControls
            depthTest={false}
            scale={2}
            lineWidth={2}
            anchor={[0, 0, 0]}
            position={point}
            annotations
            autoTransform={false}
            onDragStart={() => handleDragStart(index)}
            onDrag={(deltaMatrix) => handleDrag(index, deltaMatrix)}
            onDragEnd={handleDragEnd}
            visible={selectedPoint === index}
          >
            <mesh
              position={point}
              onPointerEnter={() => setHoveredPoint(index)}
              onPointerLeave={() => setHoveredPoint(null)}
              onClick={() => setSelectedPoint(index)}
            >
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial
                color={selectedPoint === index ? "orange" : "blue"}
              />
            </mesh>
          </PivotControls>

          {(hoveredPoint === index || selectedPoint === index) && (
            <Html position={[point.x + 0.5, point.y + 0.5, point.z]}>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  pointerEvents: "auto",
                }}
              >
                <button
                  onClick={() => addPointAfter(index)}
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
                {currentPoints.length > 2 && (
                  <button
                    onClick={() => removePoint(index)}
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
                )}
              </div>
            </Html>
          )}
        </group>
      ))}

      <line position={[0, 0.1, 0]}>
        <primitive object={geometryRef.current} attach="geometry" />
        <lineBasicMaterial color="white" />
      </line>
    </>
  );
}
