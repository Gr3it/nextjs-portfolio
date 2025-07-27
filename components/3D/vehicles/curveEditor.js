import React, { useState } from "react";

import VehicleRenderer from "./vehicleRenderer";
import PointEditor from "./pointEditor";

import worldConfig from "@/config/world-config.json";
import debugConfig from "@/config/debug-config.json";

const { hideVehicle } = debugConfig;
const { height: worldHeight } = worldConfig;

export default function CurveEditor({ curve, start, end, type, id, points }) {
  const [pathCurve, setPathCurve] = useState(curve);
  const [pathPoints, setPathPoints] = useState(points || []);
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <>
      {pathPoints.map((point, index) => (
        <PointEditor
          key={index}
          position={point}
          selected={selectedPoint === index}
          onClick={() => {
            setSelectedPoint(index);
          }}
        />
      ))}
      {hideVehicle || (
        <VehicleRenderer
          key={id}
          curve={curve}
          start={(start || 0) / worldHeight}
          end={(end || worldHeight) / worldHeight}
          type={type}
        />
      )}
    </>
  );
}
