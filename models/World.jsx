import React from "react";
import { Village } from "./world/Village";
import { Forest } from "./world/Forest";
import { Plains } from "./world/Plains";
import { Badlands } from "./world/Badlands";
import { Desert } from "./world/Desert";
import { Ocean } from "./world/Ocean";
import { Skylands } from "./world/Skylands";
import { City } from "./world/City";
import worldConfig from "@/config/world-config.json";
export default function MyScene(props) {
  const s = worldConfig.sections;
  return (
    <group {...props}>
      <Village position={[0, 0, s["Village"]?.start]} />
      <Forest position={[0, 0, s["Forest"]?.start]} />
      <Plains position={[0, 0, s["Plains"]?.start]} />
      <Badlands position={[0, 0, s["Badlands"]?.start]} />
      <Desert position={[0, 0, s["Desert"]?.start]} />
      <Ocean position={[0, 0, s["Ocean"]?.start]} />
      <Skylands position={[0, 0, s["Skylands"]?.start]} />
      <City position={[0, 0, s["City"]?.start]} />
    </group>
  );
}
