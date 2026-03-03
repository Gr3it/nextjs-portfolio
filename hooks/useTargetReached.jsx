import React, { useState, useCallback } from "react";
import { AttachCallbackToScrollEvent } from "../components/3D/core/scrollControls";
import { getPositionInPercentage } from "@/lib/worldCalculation";
import cameraConfig from "@/config/camera-config.json";

/**
 * A reusable hook that triggers a "reached" state once a specific
 * world-space scroll threshold is met.
 *
 * @param {number} target - The world-space value (Z-coordinate) to reach.
 * @param {function} onReached - Callback fired when the threshold is reached for the first time.
 * @param {number} viewportThreshold - Percentage (0 to 1) of the viewport height where it will be triggered (0=top, 1=bottom).
 * @returns {boolean} - The reached state.
 */
export function useTargetReached(target, onReached, viewportThreshold = 0) {
  const [reached, setReached] = useState(false);

  const handleScroll = useCallback(
    (offset) => {
      if (reached) return;

      const scrollPercentage = offset * 100;
      const targetWithViewportOffset =
        target - (cameraConfig.frustumHeightOnPlane * viewportThreshold) / 100;
      const targetPercentage = getPositionInPercentage(
        targetWithViewportOffset,
      );

      if (scrollPercentage >= targetPercentage) {
        setReached(true);
        if (onReached) onReached();
      }
    },
    [reached, target, onReached, viewportThreshold],
  );

  AttachCallbackToScrollEvent(handleScroll, !reached);

  return reached;
}
