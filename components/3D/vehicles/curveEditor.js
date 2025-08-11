import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import VehicleRenderer from "./vehicleRenderer";
import PointEditor from "./pointEditor";

import worldConfig from "@/config/world-config.json";
import debugConfig from "@/config/debug-config.json";

const { hideVehicle } = debugConfig;
const { height: worldHeight } = worldConfig;

const ARC_SEGMENTS = 1000;
const LINE_Y_OFFSET = 0.1;

export default function CurveEditor({
  curve,
  start = 0,
  end = worldHeight,
  type,
  id,
}) {
  const pathCurveRef = useRef(curve);
  const lineGeometryRef = useRef(null);
  const tempPoint = useRef(new THREE.Vector3());
  const needsUpdate = useRef(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Update curve reference when prop changes
  useEffect(() => {
    pathCurveRef.current = curve;
  }, [curve]);

  const updateLineGeometry = useCallback(() => {
    pathCurveRef.current.updateArcLengths();

    const lineRef = lineGeometryRef.current;
    if (!lineRef?.geometry) return;

    const positionAttribute = lineRef.geometry.getAttribute("position");
    if (!positionAttribute) return;

    const point = tempPoint.current;

    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = i / (ARC_SEGMENTS - 1);
      pathCurveRef.current.getPoint(t, point);
      positionAttribute.setXYZ(i, point.x, point.y, point.z);
    }

    positionAttribute.needsUpdate = true;
    needsUpdate.current = false; // Reset flag after update
  }, []);

  useFrame(() => {
    if (needsUpdate.current) {
      updateLineGeometry();
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(ARC_SEGMENTS * 3);
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute("position", positionAttribute);

    // Initialize line geometry with curve points
    const point = new THREE.Vector3();
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      const t = i / (ARC_SEGMENTS - 1);
      curve.getPoint(t, point);
      positionAttribute.setXYZ(i, point.x, point.y, point.z);
    }

    return geometry;
  }, [curve]);

  const handlePointSelect = useCallback((index) => {
    setSelectedPoint(index);
  }, []);

  // Handle ESC key to deselect
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPoint(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e") {
        console.log(
          "🚗 Exported curve points:\n",
          JSON.stringify(
            pathCurveRef.current.points.map(([x, y, z]) => [
              parseFloat(x.toFixed(1)),
              parseFloat(y.toFixed(1)),
              parseFloat(z.toFixed(1)),
            ])
          )
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addPointAfter = useCallback((index) => {
    const points = pathCurveRef.current.points;

    let newPoint;
    if (index >= points.length - 1) {
      // If it's the last point, extend the curve forward
      const lastPoint = points[points.length - 1];
      const secondLastPoint = points[points.length - 2];

      // Calculate direction vector and extend
      const direction = new THREE.Vector3()
        .subVectors(lastPoint, secondLastPoint)
        .normalize();

      newPoint = new THREE.Vector3()
        .copy(lastPoint)
        .add(direction.multiplyScalar(2)); // Extend by 2 units
    } else {
      // Calculate midpoint between current point and next point
      const currentPoint = points[index];
      const nextPoint = points[index + 1];
      newPoint = new THREE.Vector3()
        .addVectors(currentPoint, nextPoint)
        .multiplyScalar(0.5);
    }

    // Insert new point after current index
    points.splice(index + 1, 0, newPoint);

    // Update selected point to the newly created point
    setSelectedPoint(index + 1);
    needsUpdate.current = true;
  }, []);

  const removePoint = useCallback((index) => {
    const points = pathCurveRef.current.points;

    // Ensure minimum of 2 points
    if (points.length <= 2) return;

    // Remove the point
    points.splice(index, 1);

    setSelectedPoint(null);

    needsUpdate.current = true;
  }, []);

  const normalizedStart = useMemo(() => start / worldHeight, [start]);
  const normalizedEnd = useMemo(() => end / worldHeight, [end]);

  const curvePoints = pathCurveRef.current?.points || [];

  return (
    <>
      {/* Curve visualization */}
      <line
        ref={lineGeometryRef}
        position={[0, LINE_Y_OFFSET, 0]}
        geometry={lineGeometry}
      >
        <lineBasicMaterial color="white" />
      </line>

      {/* Point editors */}
      {curvePoints.map((point, index) => (
        <PointEditor
          key={`point-${point.x}_${point.y}_${point.z}`}
          position={point}
          selected={selectedPoint === index}
          onClick={() => handlePointSelect(index)}
          onDrag={() => (needsUpdate.current = true)}
          addPointAfter={() => addPointAfter(index)}
          removePoint={() => removePoint(index)}
        />
      ))}

      {/* Vehicle renderer (conditionally rendered) */}
      {!hideVehicle && (
        <VehicleRenderer
          key={`vehicle-${id}`}
          curve={curve}
          start={normalizedStart}
          end={normalizedEnd}
          type={type}
          forceUpdate={needsUpdate}
        />
      )}
    </>
  );
}
