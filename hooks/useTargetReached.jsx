import React, { useState, useCallback } from "react";
import { AttachCallbackToScrollEvent } from "../components/3D/core/scrollControls";
import { getPositionInPercentage } from "@/lib/worldCalculation";

/**
 * A reusable hook that triggers a "reached" state once a specific
 * world-space scroll threshold is met.
 *
 * @param {number} target - The world-space value (Z-coordinate) to reach.
 * @param {function} onReached - Callback fired when the threshold is reached for the first time.
 * @returns {boolean} - The reached state.
 */
export function useTargetReached(target, onReached, buffer = 0) {
  const [reached, setReached] = useState(false);

  const handleScroll = useCallback(
    (offset) => {
      if (reached) return;

      const scrollPercentage = offset * 100;
      const targetPercentage = getPositionInPercentage(target) - buffer;

      if (scrollPercentage >= targetPercentage) {
        setReached(true);
        if (onReached) onReached();
      }
    },
    [reached, target, onReached],
  );

  AttachCallbackToScrollEvent(handleScroll, !reached);

  return reached;
}
