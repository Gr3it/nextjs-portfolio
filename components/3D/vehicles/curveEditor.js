import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import VehicleRenderer from "./vehicleRenderer";
import PointEditor from "./pointEditor";

import { debugStore } from "@/valatio/debugStorage";
import worldConfig from "@/config/world-config.json";

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
  const snap = useSnapshot(debugStore);

  const pathCurveRef = useRef(curve);
  const lineGeometryRef = useRef(null);
  const tempPoint = useRef(new THREE.Vector3());
  const needsUpdate = useRef(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

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
    needsUpdate.current = false;
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
            pathCurveRef.current.points.map((p) => [
              parseFloat(p.x.toFixed(1)),
              parseFloat(p.y.toFixed(1)),
              parseFloat(p.z.toFixed(1)),
            ]),
          ),
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
      const lastPoint = points[points.length - 1];
      const secondLastPoint = points[points.length - 2];

      const direction = new THREE.Vector3()
        .subVectors(lastPoint, secondLastPoint)
        .normalize();

      newPoint = new THREE.Vector3()
        .copy(lastPoint)
        .add(direction.multiplyScalar(2));
    } else {
      const currentPoint = points[index];
      const nextPoint = points[index + 1];
      newPoint = new THREE.Vector3()
        .addVectors(currentPoint, nextPoint)
        .multiplyScalar(0.5);
    }

    points.splice(index + 1, 0, newPoint);

    setSelectedPoint(index + 1);
    needsUpdate.current = true;
  }, []);

  const removePoint = useCallback((index) => {
    const points = pathCurveRef.current.points;
    if (points.length <= 2) return;
    points.splice(index, 1);
    setSelectedPoint(null);
    needsUpdate.current = true;
  }, []);

  const normalizedStart = useMemo(() => start / worldHeight, [start]);
  const normalizedEnd = useMemo(() => end / worldHeight, [end]);

  const curvePoints = pathCurveRef.current?.points || [];

  return (
    <>
      <line
        ref={lineGeometryRef}
        position={[0, LINE_Y_OFFSET, 0]}
        geometry={lineGeometry}
      >
        <lineBasicMaterial color="white" />
      </line>

      {curvePoints.map((point, index) => (
        <PointEditor
          key={`point-${index}-${point.x}_${point.z}`}
          position={point}
          selected={selectedPoint === index}
          onClick={() => handlePointSelect(index)}
          onDrag={() => (needsUpdate.current = true)}
          addPointAfter={() => addPointAfter(index)}
          removePoint={() => removePoint(index)}
        />
      ))}

      {!snap.hideVehicle && (
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
