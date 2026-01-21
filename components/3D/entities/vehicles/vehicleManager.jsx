import React, { useMemo } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

import VehicleRenderer from "./vehicleRenderer";
import CurveEditor from "./curveEditor";

import { debugStore } from "@/stores/debugStorage";
import worldConfig from "@/config/world-config.json";
import vehicleConfigs from "@/config/vehicles-config.json";

const { height: worldHeight } = worldConfig;

export default function VehicleManager() {
  const snap = useSnapshot(debugStore);

  const vehicleCurvesData = useMemo(
    () =>
      vehicleConfigs.map((vehicle, index) => ({
        ...vehicle,
        id: vehicle.id || `vehicle_${index}`,
        curve: new THREE.CatmullRomCurve3(
          vehicle.points.map((point) => new THREE.Vector3(...point)),
        ),
      })),
    [],
  );

  return (
    <>
      {snap.enablePathEditor
        ? vehicleCurvesData.map((vehicle) => (
            <CurveEditor key={vehicle.id} {...vehicle} />
          ))
        : !snap.hideVehicle &&
          vehicleCurvesData.map((vehicle) => (
            <VehicleRenderer
              key={vehicle.id}
              curve={vehicle.curve}
              start={(vehicle.start || 0) / worldHeight}
              end={(vehicle.end || worldHeight) / worldHeight}
              type={vehicle.type}
            />
          ))}
    </>
  );
}
