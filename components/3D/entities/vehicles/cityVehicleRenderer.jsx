"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── City vehicle model imports ───────────────────────────────────────────────
import { Sedan } from "@/models/vehicles/city/sedan";
import { Taxi } from "@/models/vehicles/city/taxi";
import { Ambulance } from "@/models/vehicles/city/ambulance";
import { Delivery } from "@/models/vehicles/city/delivery";
import { Firetruck } from "@/models/vehicles/city/firetruck";
import { GarbageTruck } from "@/models/vehicles/city/garbage-truck";
import { HatchbackSports } from "@/models/vehicles/city/hatchback-sports";
import { Police } from "@/models/vehicles/city/police";
import { SedanSports } from "@/models/vehicles/city/sedan-sports";
import { SuvLuxury } from "@/models/vehicles/city/suv-luxury";
import { Suv } from "@/models/vehicles/city/suv";
import { Truck } from "@/models/vehicles/city/truck";
import { Van } from "@/models/vehicles/city/van";

// ─── Config ──────────────────────────────────────────────────────────────────

/** Uniform scale applied to every city vehicle container */
const VEHICLE_SCALE = 0.8;

/** Maps type strings from city-vehicles.json to React components */
const CITY_VEHICLE_COMPONENTS = {
  sedan: Sedan,
  taxi: Taxi,
  ambulance: Ambulance,
  delivery: Delivery,
  firetruck: Firetruck,
  "garbage-truck": GarbageTruck,
  "hatchback-sports": HatchbackSports,
  police: Police,
  "sedan-sports": SedanSports,
  "suv-luxury": SuvLuxury,
  suv: Suv,
  truck: Truck,
  van: Van,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Convert a {time, progress} timeline (from city-vehicles.json) into an array
 * of [{t: 0-1, progress: 0-100}] entries sorted by normalised loop time.
 *
 * @param {Array<{time:number, progress:number}>} timeline
 * @param {number} loopDuration  - seconds for one full loop (default 60)
 */
function buildTimeline(timeline, loopDuration) {
  return timeline
    .map((kf) => ({ t: kf.time / loopDuration, progress: kf.progress }))
    .sort((a, b) => a.t - b.t);
}

function sampleTimeline(keyframes, loopT) {
  if (keyframes.length === 0) return -1;
  if (keyframes.length === 1) return keyframes[0].progress;

  // Clamp to [0,1]
  const t = Math.max(0, Math.min(1, loopT));

  if (t < keyframes[0].t) return -1; // Before first
  if (t > keyframes[keyframes.length - 1].t) return -1; // After last

  // Find surrounding keyframes
  for (let i = 0; i < keyframes.length - 1; i++) {
    const k0 = keyframes[i];
    const k1 = keyframes[i + 1];
    if (t >= k0.t && t <= k1.t) {
      if (k1.progress < k0.progress) {
        return -1; // Gap segment (inactive wrap)
      }
      const alpha = (t - k0.t) / (k1.t - k0.t);
      return k0.progress + alpha * (k1.progress - k0.progress);
    }
  }

  return -1;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Renders a single city vehicle that loops along a CatmullRomCurve3 on a
 * fixed time-based 60s loop.
 *
 * Props:
 *  - curve           THREE.CatmullRomCurve3
 *  - timeline        Array<{time, progress}> from config
 *  - type            string – vehicle type key
 *  - loopDuration    number – seconds per loop cycle (default 60)
 *  - fadeInDuration  number – fade-in seconds
 *  - fadeOutDuration number – fade-out seconds
 */
export default function CityVehicleRenderer({
  curve,
  timeline,
  type,
  loopDuration = 60,
  fadeInDuration = 1.5,
  fadeOutDuration = 1.5,
}) {
  const groupRef = useRef();
  const opacityRef = useRef(0);

  // Resolved keyframes (normalised t, progress)
  const keyframes = React.useMemo(
    () => buildTimeline(timeline, loopDuration),
    [timeline, loopDuration],
  );

  // Reusable THREE objects (avoid per-frame allocation)
  const _point = useRef(new THREE.Vector3());
  const _tangent = useRef(new THREE.Vector3());

  const ModelComponent = CITY_VEHICLE_COMPONENTS[type];

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || !curve) return;

    // ── 1. Compute loop time ──────────────────────────────────────────────
    const elapsed = clock.getElapsedTime();
    const loopT = (elapsed % loopDuration) / loopDuration; // 0-1

    // ── 2. Sample progress from timeline ──────────────────────────────────
    const progress = sampleTimeline(keyframes, loopT); // 0-100 (or -1 if gap)

    // progress < 0 → inactive gap or just appeared; progress > 100 → just disappeared
    if (progress < 0 || progress > 100) {
      group.visible = false;
      return;
    }

    group.visible = true;

    // ── 3. Compute fade opacity ───────────────────────────────────────────
    // Find the exact keyframes that define progress 0 (start) and 100 (end)
    const startKf = keyframes.find((kf) => kf.progress <= 0);
    const endKf = keyframes.find((kf) => kf.progress >= 100);

    let opacity = 1;
    if (startKf && endKf) {
      const activeStart = startKf.t * loopDuration;
      const activeEnd = endKf.t * loopDuration;
      const currentSec = loopT * loopDuration;

      // Distance from start (cyclical)
      let elapsedSinceStart = currentSec - activeStart;
      if (elapsedSinceStart < 0) elapsedSinceStart += loopDuration;

      // Distance to end (cyclical)
      let remaining = activeEnd - currentSec;
      if (remaining < 0) remaining += loopDuration;

      if (elapsedSinceStart < fadeInDuration) {
        opacity = elapsedSinceStart / fadeInDuration;
      } else if (remaining < fadeOutDuration) {
        opacity = remaining / fadeOutDuration;
      }
      opacity = Math.max(0, Math.min(1, opacity));
    }
    opacityRef.current = opacity;

    // ── 5. Position vehicle along curve ───────────────────────────────────
    const t = progress / 100; // curve t in [0,1]
    const clamped = Math.max(0, Math.min(1, t));

    curve.getPointAt(clamped, _point.current);
    curve.getTangentAt(clamped, _tangent.current);
    _tangent.current.normalize();

    group.position.copy(_point.current);

    // ── Apply Rotations correctly to avoid "roll" on slopes ──
    // Setting order to YXZ ensures we first turn the car to face the direction (Yaw),
    // and then pitch its nose up/down. If we don't do this, default XYZ order
    // causes the car to tilt on its side (roll).
    group.rotation.order = "YXZ";

    // Yaw (rotation around Y) from XZ tangent
    group.rotation.y = Math.atan2(_tangent.current.x, _tangent.current.z);

    // Pitch (rotation around X) for slopes
    const horizLen = Math.sqrt(
      _tangent.current.x ** 2 + _tangent.current.z ** 2,
    );
    group.rotation.x = Math.atan2(-_tangent.current.y, horizLen);

    // Explicitly nullify roll
    group.rotation.z = 0;

    // ── 6. Apply opacity to all meshes ────────────────────────────────────
    group.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.opacity = opacityRef.current;
        child.visible = opacityRef.current > 0;
      }
    });
  });

  // ── On Mount: Clone materials so instances don't share opacity ────────
  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.transparent = true;
        }
      });
    }
  }, [type]);

  if (!ModelComponent) {
    console.warn(`[CityVehicleRenderer] Unknown vehicle type: "${type}"`);
    return null;
  }

  return (
    <group ref={groupRef} visible={false}>
      <group scale={VEHICLE_SCALE}>
        <ModelComponent />
      </group>
    </group>
  );
}
