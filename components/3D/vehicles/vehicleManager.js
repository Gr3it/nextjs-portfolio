import React, { useMemo } from "react";
import * as THREE from "three";

import VehicleRenderer, { VehicleRendererCurve } from "./vehicleRenderer";
import CurveEditor from "./curveEditor";

import worldConfig from "@/config/world-config.json";
import debugConfig from "@/config/debug-config.json";
import vehicleConfigs from "@/config/vehicles-config.json";

const { hideVehicle, vehiclePathEditor } = debugConfig;
const { height: worldHeight } = worldConfig;

export default function VehicleManager() {
  const vehicleCurvesData = useMemo(
    () =>
      vehicleConfigs.map((vehicle, index) => ({
        ...vehicle,
        id: vehicle.id || `vehicle_${index}`,
        curve: new THREE.CatmullRomCurve3(
          vehicle.points.map((point) => new THREE.Vector3(...point))
        ),
      })),
    []
  );

  return (
    <>
      {vehiclePathEditor
        ? vehicleCurvesData.map((vehicle) => (
            <CurveEditor key={vehicle.id} {...vehicle} />
          ))
        : hideVehicle ||
          vehicleCurvesData.map((vehicle) =>
            vehicle.type == "train" ? (
              <VehicleRendererCurve
                key={vehicle.id}
                curve={vehicle.curve}
                start={(vehicle.start || 0) / worldHeight}
                end={(vehicle.end || worldHeight) / worldHeight}
                type={vehicle.type}
              />
            ) : (
              <VehicleRenderer
                key={vehicle.id}
                curve={vehicle.curve}
                start={(vehicle.start || 0) / worldHeight}
                end={(vehicle.end || worldHeight) / worldHeight}
                type={vehicle.type}
              />
            )
          )}
    </>
  );
}
