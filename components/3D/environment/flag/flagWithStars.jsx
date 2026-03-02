import React, { useCallback } from "react";

import { FlagStars } from "./flagStars";
import { Flag } from "@/models/Flag";
import { useTargetReached } from "@/hooks/useTargetReached";

const playCheckpointSound = () => {
  // const sound = new Audio("/sounds/checkpoint.wav");
  // sound.play();
};

export function FlagWithStars({ position = [0, 0, 0], threshold, ...props }) {
  const handleReached = useCallback(() => {
    playCheckpointSound();
  }, []);

  const reached = useTargetReached(threshold, handleReached, 0.05);

  return (
    <FlagStars flagPosition={position} isReached={reached}>
      <Flag reached={reached} {...props} />
    </FlagStars>
  );
}
