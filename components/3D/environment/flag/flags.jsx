import React from "react";

import { FlagWithStars } from "./flagWithStars";

import flags from "@/config/flags.json";

export default function Flags() {
  return (
    <>
      {flags.map((flag, index) => (
        <FlagWithStars
          key={index}
          position={flag.position || [0, 0, 0]}
          threshold={flag.reached}
        />
      ))}
    </>
  );
}
