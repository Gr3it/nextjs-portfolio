"use client";

/**
 * cityVehicleManager.jsx
 *
 * Orchestrates the city vehicle animation system.
 *
 * Responsibilities:
 *  1. Read the "Links" section start value from world-config.json and use it
 *     as the Z offset for the whole city vehicle container.
 *  2. Read all vehicles from city-vehicles.json, resolve their paths by
 *     merging segments, run the path parser, build CatmullRomCurve3 instances.
 *  3. Render one <CityVehicleRenderer> per vehicle.
 *
 * This system is entirely time-based (60 s loop) and is independent of the
 * scroll-driven VehicleManager.
 */

import React, { useMemo } from "react";
import * as THREE from "three";

import { Line } from "@react-three/drei";

import cityVehiclesConfig from "@/config/city-vehicles.json";
import worldConfig from "@/config/world-config.json";

import pathParser from "./pathParser";
import CityVehicleRenderer from "./cityVehicleRenderer";

const SHOW_CURVES = false; // Set to false to hide path visualizations

/**
 * Number of arc-length divisions used to build the CatmullRom lookup table.
 * Three.js default is 200. Higher values give smoother getPointAt / getTangentAt
 * results, which matters here because our paths mix very short pinch-point
 * segments (0.01 units) with long straights. 2000 is a good balance between
 * accuracy and one-shot build cost.
 */
const ARC_LENGTH_DIVISIONS = 5000;

// ─── Derive city Z offset from world-config "Links" section ──────────────────

const linksSection = worldConfig.sections["City"];
const CITY_Z_OFFSET = linksSection?.start ?? 0;

// ─── Config shortcuts ─────────────────────────────────────────────────────────

const {
  settings: { loop_duration, fade_in_duration, fade_out_duration },
  segments,
  paths,
  vehicles,
} = cityVehiclesConfig;

// ─── Component ───────────────────────────────────────────────────────────────

export default function CityVehicleManager() {
  /**
   * Build curve data once at mount time.
   * Each entry: { curve, timeline, type, loopDuration, fadeInDuration, fadeOutDuration }
   */
  const vehicleData = useMemo(() => {
    return vehicles.map((vehicle, idx) => {
      // Resolve the ordered list of segment names for this vehicle's path
      const segmentNames = paths[vehicle.path];

      if (!segmentNames) {
        console.warn(
          `[CityVehicleManager] Path "${vehicle.path}" not found in paths map for vehicle #${idx}.`,
        );
        return null;
      }

      // ── Debug: raw merged points (before parser) ──────────────────────────
      const rawPoints = segmentNames.flatMap((name) => segments[name] ?? []);

      // Parse: merge segments → add pinch points for turns and slopes
      const controlPoints = pathParser(rawPoints);

      if (controlPoints.length < 2) {
        console.warn(
          `[CityVehicleManager] Vehicle #${idx} (path "${vehicle.path}") produced < 2 control points after parsing.`,
        );
        return null;
      }

      // Build the CatmullRom curve.
      // NOTE: coordinates in city-vehicles.json are in the city's LOCAL space
      // (i.e. relative to the city model's origin). The cityZ offset is applied
      // by the parent <group> below, so we do NOT add it here.
      const curve = new THREE.CatmullRomCurve3(
        controlPoints.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
        false, // not closed
        "chordal",
      );

      curve.arcLengthDivisions = ARC_LENGTH_DIVISIONS;
      curve.updateArcLengths();

      return {
        id: `city_vehicle_${idx}_${vehicle.type}`,
        curve,
        curvePoints: curve.getPoints(1000),
        timeline: vehicle.timeline,
        type: vehicle.type,
      };
    });
  }, []); // Run once — config is static

  return (
    /**
     * Translate the entire city vehicle system to the city Z offset so that
     * all path coordinates match the rendered city mesh position.
     */
    <group position={[0, 0, CITY_Z_OFFSET]}>
      {vehicleData.map((data) => {
        if (!data) return null;
        return (
          <React.Fragment key={data.id}>
            {SHOW_CURVES && (
              <Line
                points={data.curvePoints}
                color="#00ffff"
                lineWidth={1}
                transparent
                opacity={0.3}
              />
            )}
            <CityVehicleRenderer
              curve={data.curve}
              timeline={data.timeline}
              type={data.type}
              loopDuration={loop_duration}
              fadeInDuration={fade_in_duration}
              fadeOutDuration={fade_out_duration}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
}
