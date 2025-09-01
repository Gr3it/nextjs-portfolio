import React, { useState, useEffect, useCallback } from "react";

import { Flag } from "@/models/Flag";
import { AttachCallbackToScrollEvent } from "@/components/3D/scrollProxy/scrollControls";

import flags from "@/config/flags.json";
import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

function getPositionInPercentage(value) {
  return Math.min(
    (value / (worldConfig.height - cameraConfig.frustumHeightOnPlane)) * 100,
    100
  );
}

export default function Flags() {
  // Initialize state with all flags as not reached
  const [flagStates, setFlagStates] = useState(() =>
    flags.map(() => ({ reached: false }))
  );

  // Define the scroll callback function with useCallback
  const handleScroll = useCallback((offset) => {
    const scrollPercentage = offset * 100;
    setFlagStates((prevStates) => {
      return prevStates.map((state, index) => {
        // If already reached, keep it reached
        if (state.reached) {
          return state;
        }

        // Get the flag's reach threshold in percentage
        const flag = flags[index];
        const flagReachPercentage = getPositionInPercentage(flag.reached);

        // Check if scroll percentage has reached or passed the flag's threshold
        if (scrollPercentage >= flagReachPercentage) {
          return { reached: true };
        }

        return state;
      });
    });
  }, []);

  AttachCallbackToScrollEvent(handleScroll);

  return (
    <>
      {flags.map((flag, index) => (
        <Flag
          key={index}
          position={flag.position || [0, 0, 0]}
          reached={flagStates[index].reached}
        />
      ))}
    </>
  );
}
