import React from "react";
import { Cat } from "@/models/animals/cat";
import { Dog } from "@/models/animals/dog";
import { Pig } from "@/models/animals/pig";
import { Raccoon } from "@/models/animals/raccoon";
import { Sheep } from "@/models/animals/sheep";
import { Wolf } from "@/models/animals/wolf";
import { Horse } from "@/models/animals/horse";
import { Chicken } from "@/models/animals/chicken";
import { Chick } from "@/models/animals/chick";

export default function Animals() {
  return (
    <group position={[0, 0, 142]}>
      <Cat position={[-2.5, 0, 20.5]} rotation={[0, Math.PI / -4, 0]} />
      <Dog position={[-13.5, 0, 27]} rotation={[0, Math.PI / 4, 0]} />
      <Pig position={[-4.5, 0, 36.5]} rotation={[0, Math.PI / 4, 0]} />
      <Raccoon position={[-29.5, 0, 50.5]} rotation={[0, Math.PI / 4, 0]} />
      <Chick position={[3.5, 0, 51]} rotation={[0, Math.PI / 4, 0]} />
      <Chicken position={[5.5, 0, 53]} rotation={[0, Math.PI / -4, 0]} />
      <Sheep position={[-9.5, 0, 54]} rotation={[0, Math.PI / -3, 0]} />
      <Sheep position={[-21, 0, 55]} rotation={[0, Math.PI / 3, 0]} />
      <Chicken position={[-8, 0, 58]} rotation={[0, Math.PI / 4, 0]} />
      <Wolf position={[-1, 0, 66.5]} rotation={[0, Math.PI / -6, 0]} />
      <Horse position={[-3.5, 0, 71]} rotation={[0, Math.PI / -3, 0]} />
      <Wolf
        position={[-0.5, 0, 74]}
        rotation={[0, (Math.PI / 180) * -135, 0]}
      />
      <Raccoon position={[22, 0, 87.5]} rotation={[0, Math.PI / -4, 0]} />
    </group>
  );
}
