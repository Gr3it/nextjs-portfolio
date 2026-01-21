import React from "react";

import { AnimatedStar } from "@/models/Star";

export function FlagStars({ flagPosition, isReached, children }) {
  return (
    <group position={flagPosition}>
      {/* Render the flag */}
      {children}

      {/* Render 5 stars - all start from flag center and move in pentagon pattern */}
      <group position={[0, 2, 0]}>
        {Array.from({ length: 5 }, (_, index) => (
          <AnimatedStar key={index} starIndex={index} isAnimating={isReached} />
        ))}
      </group>
    </group>
  );
}
