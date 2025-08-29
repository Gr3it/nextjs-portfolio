import React from "react";

import { Flag } from "@/models/Flag";

import flags from "@/config/flags.json";

export default function Flags() {
  return (
    <>
      {flags.map((flag, index) => (
        <Flag key={index} position={flag.position || [0, 0, 0]} />
      ))}
    </>
  );
}
