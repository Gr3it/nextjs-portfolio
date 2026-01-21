import React from "react";

export default function VehicleSafeZone() {
  const zoneHeight = 40;
  const topOffset = (100 - zoneHeight) / 2;

  return (
    <div
      className="fixed left-0 w-full pointer-events-none bg-green-500/20 border-y-2 border-green-500/30"
      style={{ top: `${topOffset}%`, height: `${zoneHeight}%` }}
    />
  );
}
