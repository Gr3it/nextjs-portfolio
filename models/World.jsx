import React from "react";
import { useGLTF } from "@react-three/drei";
import { Village } from "./world/Village";
import { Forest } from "./world/Forest";
import { Plains } from "./world/Plains";
import { Badlands } from "./world/Badlands";
import { Desert } from "./world/Desert";
import { Ocean } from "./world/Ocean";
import { Skylands } from "./world/Skylands";
import { City } from "./world/City";

export default function MyScene(props) {
  return (
    <group {...props}>
      <Village position={[0, 0, 0]} />
      <Forest position={[0, 0, 32]} />
      <Plains position={[0, 0, 142]} />
      <Badlands position={[0, 0, 238]} />
      <Desert position={[0, 0, 286]} />
      <Ocean position={[0, 0, 334]} />
      <Skylands position={[0, 0, 484]} />
      <City position={[0, 0, 521]} />
    </group>
  );
}
