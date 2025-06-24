import { SedanSports } from "@/models/Sedan-sports";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollProxyListener } from "../scrollProxy";

import cameraConfig from "@/config/camera-config.json";

export default function Car({ curve }) {
  const carGroupRef = useRef();

  useScrollProxyListener(
    (scrollProgress) => {
      if (!carGroupRef.current || !curve) return;

      const point = curve.getPointAt(scrollProgress);
      const tangent = curve.getTangentAt(scrollProgress).normalize();

      // Move the car
      carGroupRef.current.position.copy(point);

      // Calculate Y rotation (left/right turning)
      const yAngle = Math.atan2(tangent.x, tangent.z);
      carGroupRef.current.rotation.y = yAngle;

      // Calculate X rotation (up/down pitching)
      // Project tangent onto XZ plane to get horizontal distance
      const horizontalDistance = Math.sqrt(
        tangent.x * tangent.x + tangent.z * tangent.z
      );
      const xAngle = Math.atan2(-tangent.y, horizontalDistance);
      carGroupRef.current.rotation.x = xAngle;
    },
    {
      damping: 0.5,
      start: (10 / cameraConfig.frustumHeightOnPlane) * window.innerHeight,
      end: (40 / cameraConfig.frustumHeightOnPlane) * window.innerHeight,
    }
  );

  return (
    <group ref={carGroupRef}>
      <SedanSports />
    </group>
  );
}
