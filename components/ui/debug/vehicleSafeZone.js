import React from "react";

const ZONE_HEIGHT = 40; // Percentage of screen height

export default function VehicleSafeZone() {
  const topOffset = (100 - ZONE_HEIGHT) / 2;

  return (
    <div
      style={{
        position: "fixed", // fixed to viewport
        top: `${topOffset}%`, // centered vertically
        height: `${ZONE_HEIGHT}%`,
        width: "100%",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}
