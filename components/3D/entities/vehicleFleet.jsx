"use client";

import React from "react";

import { Boat } from "@/models/vehicles/Boat";
import { Car } from "@/models/vehicles/Car";
import { CommercialTrain } from "@/models/vehicles/CommercialTrain";
import { Spaceship } from "@/models/vehicles/Spaceship";
import { Train } from "@/models/vehicles/Train";

export default function VehicleFleet() {
  return (
    <group>
      <CommercialTrain position={[-3, 0, 4]} />
      <Train position={[0, 0, 4]} />
      <Car position={[3, 0, 4]} />
      <Spaceship position={[3, 0, 0]} />
      <Boat position={[3, 0, -4]} />
    </group>
  );
}
