import React, { useState, useCallback } from "react";

import { FlagWithStars } from "./flagWithStars";

import { AttachCallbackToScrollEvent } from "@/components/3D/core/scrollControls";

import flags from "@/config/flags.json";
import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

function getPositionInPercentage(value) {
  return Math.min(
    (value / (worldConfig.height - cameraConfig.frustumHeightOnPlane)) * 100,
    100,
  );
}

export default function Flags() {
  // Initialize state with all flags as not reached
  const [flagStates, setFlagStates] = useState(() =>
    flags.map(() => ({ reached: false })),
  );

  const playCheckpointSound = () => {
    const sound = new Audio("/sounds/checkpoint.wav");
    //sound.play();
  };

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
        const flagReachPercentage = getPositionInPercentage(flag.reached) - 0.1;

        // Check if scroll percentage has reached or passed the flag's threshold
        if (scrollPercentage >= flagReachPercentage) {
          playCheckpointSound();
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
        <FlagWithStars
          key={index}
          position={flag.position || [0, 0, 0]}
          reached={flagStates[index].reached}
        />
      ))}
    </>
  );
}
