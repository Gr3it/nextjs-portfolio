import React, { useEffect, useState } from "react";
import VehicleController from "./vehicleController";
import * as THREE from "three";
import { SedanSports } from "@/models/SedanSports";
import { BoatSail } from "@/models/BoatSail";
import { Spaceship } from "@/models/Spaceship";

import cameraConfig from "@/config/camera-config.json";
import debugConfig from "@/config/debug-config.json";
import vehicleConfigs from "@/config/vehicles-config.json";
import CurveEditor from "./curveEditor";

// Utility to convert 3D value to screen Y offset
function convertToScreenHeightOffset(value) {
  return (value / cameraConfig.frustumHeightOnPlane) * window.innerHeight;
}

function getVehicleComponent(vehicle) {
  if (vehicle === "car") return <SedanSports />;
  if (vehicle === "boat") return <BoatSail />;
  if (vehicle === "spaceship") return <Spaceship />;
  return null;
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(() =>
    vehicleConfigs.map((vehicle) => ({
      points: vehicle.points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      start: vehicle.start,
      end: vehicle.end,
      vehicle: vehicle.type,
    }))
  );

  useEffect(() => {
    const snapToHalf = (value) => {
      if (value != 0.2) return Math.round(value * 2) / 2;
      return value;
    };

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e") {
        const exportData = vehicles.map((v) => ({
          points: v.points.map((vec) => [
            snapToHalf(vec.x),
            snapToHalf(vec.y),
            snapToHalf(vec.z),
          ]),
          start: v.start,
          end: v.end,
          type: v.vehicle,
        }));
        console.log(
          "🚗 Exported vehicles-config.json (snapped to 0.5):\n",
          JSON.stringify(exportData)
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vehicles]);

  return (
    <>
      {vehicles.map((vehicle, id) => {
        const curve = new THREE.CatmullRomCurve3(vehicle.points);
        return (
          <React.Fragment key={id}>
            {debugConfig.showVehiclePath && (
              <CurveEditor
                points={vehicle.points}
                curve={curve}
                id={id}
                onChange={(newPoints) => {
                  console.log("update");
                  setVehicles((prev) => {
                    const updated = [...prev];
                    updated[id] = {
                      ...updated[id],
                      points: newPoints,
                    };
                    return updated;
                  });
                }}
              />
            )}
            {debugConfig.hideVehicle || (
              <VehicleController
                curve={curve}
                start={convertToScreenHeightOffset(vehicle.start)}
                end={convertToScreenHeightOffset(vehicle.end)}
              >
                {getVehicleComponent(vehicle.vehicle)}
              </VehicleController>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
