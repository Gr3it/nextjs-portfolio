import React from "react";

import { FlagStars } from "./flagStars";
import { Flag } from "@/models/Flag";

export function FlagWithStars({
  position = [0, 0, 0],
  reached = false,
  ...props
}) {
  return (
    <FlagStars flagPosition={position} isReached={reached}>
      <Flag reached={reached} {...props} />
    </FlagStars>
  );
}
