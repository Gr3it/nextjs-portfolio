import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "../scrollProxy/scrollControls";

import { SedanSports } from "@/models/SedanSports";
import { BoatSail } from "@/models/BoatSail";
import { Spaceship } from "@/models/Spaceship";

const VEHICLE_COMPONENTS = {
  car: SedanSports,
  boat: BoatSail,
  spaceship: Spaceship,
};

function getVehicleComponent(type) {
  const Component = VEHICLE_COMPONENTS[type];
  return Component ? <Component /> : null;
}

export default function VehicleRenderer({ curve, start, end, type }) {
  const vehicleRef = useRef();
  const lastScrollOffset = useRef(null);
  const lastCurve = useRef(null);

  const scroll = useScroll(0.5);

  useFrame(() => {
    if (!vehicleRef.current || !curve) return;

    const currentOffset = scroll.range(start, end - start);

    // Skip calculations if scroll hasn't changed and curve is the same
    if (
      lastScrollOffset.current === currentOffset &&
      lastCurve.current === curve
    ) {
      return;
    }

    // Cache current values
    lastScrollOffset.current = currentOffset;
    lastCurve.current = curve;

    // Get point and tangent from curve
    const point = curve.getPointAt(currentOffset);
    const tangent = curve.getTangentAt(currentOffset).normalize();

    // Update position
    vehicleRef.current.position.copy(point);

    // Calculate and apply rotations
    const yAngle = Math.atan2(tangent.x, tangent.z);
    vehicleRef.current.rotation.y = yAngle;

    const horizontalDistance = Math.sqrt(
      tangent.x * tangent.x + tangent.z * tangent.z
    );
    const xAngle = Math.atan2(-tangent.y, horizontalDistance);
    vehicleRef.current.rotation.x = xAngle;
  });

  return <group ref={vehicleRef}>{getVehicleComponent(type)}</group>;
}
