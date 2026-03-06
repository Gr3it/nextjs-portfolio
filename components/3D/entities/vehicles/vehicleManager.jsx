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
      {vehicleCurvesData.map((vehicle) => {
        const sectionStart = worldConfig.sections[vehicle.section]?.start || 0;
        const globalStart = vehicle.start + sectionStart;
        const globalEnd = vehicle.end + sectionStart;

        return (
          <group key={vehicle.id} position={[0, 0, sectionStart]}>
            {snap.enablePathEditor ? (
              <CurveEditor {...vehicle} start={globalStart} end={globalEnd} />
            ) : (
              !snap.hideVehicle && (
                <VehicleRenderer
                  curve={vehicle.curve}
                  start={globalStart / worldHeight}
                  end={globalEnd / worldHeight}
                  type={vehicle.type}
                />
              )
            )}
          </group>
        );
      })}
    </>
  );
}
