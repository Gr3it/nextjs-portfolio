import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { ANIMATION_MODES, useScroll } from "../scrollProxy/scrollControls";
import { debugStore } from "@/valatio/debugStorage";

import {
  BoatTrail,
  CarTrail,
  CommercialTrainTrail,
  SpaceshipTrail,
  TrainTrail,
} from "./vehicleTrails";

const VEHICLE_COMPONENTS = {
  Car: CarTrail,
  Boat: BoatTrail,
  Spaceship: SpaceshipTrail,
  Train: TrainTrail,
  CommercialTrain: CommercialTrainTrail,
};

function getVehicleComponent(type) {
  const Component = VEHICLE_COMPONENTS[type];
  return Component ? <Component /> : null;
}

function applyVehicleTransform(vehicle, curve, offset) {
  if (!vehicle || !curve || offset == null) return;

  const point = curve.getPointAt(offset);
  const tangent = curve.getTangentAt(offset).normalize();

  vehicle.position.copy(point);

  const yAngle = Math.atan2(tangent.x, tangent.z);
  vehicle.rotation.y = yAngle;

  const horizontalDistance = Math.sqrt(
    tangent.x * tangent.x + tangent.z * tangent.z,
  );
  const xAngle = Math.atan2(-tangent.y, horizontalDistance);
  vehicle.rotation.x = xAngle;
}

export default function VehicleRenderer({
  curve,
  start,
  end,
  type,
  forceUpdate = false,
}) {
  const vehicleRef = useRef();
  const lastScrollOffset = useRef(null);
  const lastCurve = useRef(null);

  // Accediamo allo stato di Valtio
  const snap = useSnapshot(debugStore);

  // Determiniamo il modo basandoci sulla flag di debug
  const scrollMode = snap.disableVehicleSmoothing
    ? ANIMATION_MODES.DAMPING
    : ANIMATION_MODES.ACCELERATION;

  const scroll = useScroll({
    mode: scrollMode,
    damping: 0.4,
    duration: 1,
    from: start,
    to: end,
  });

  useFrame(() => {
    const currentOffset = scroll();

    if (
      lastScrollOffset.current === currentOffset &&
      lastCurve.current === curve &&
      !forceUpdate?.current
    ) {
      return;
    }

    lastScrollOffset.current = currentOffset;
    lastCurve.current = curve;

    applyVehicleTransform(vehicleRef.current, curve, currentOffset);
  });

  return <group ref={vehicleRef}>{getVehicleComponent(type)}</group>;
}
