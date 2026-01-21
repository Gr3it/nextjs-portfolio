import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Car } from "@/models/vehicles/Car";
import { Boat } from "@/models/vehicles/Boat";
import { Spaceship } from "@/models/vehicles/Spaceship";
import { Train } from "@/models/vehicles/Train";
import { CommercialTrain } from "@/models/vehicles/CommercialTrain";

import { Trail } from "./customTrail";
import { MeshLineMaterial } from "meshline";
import { extend } from "@react-three/fiber";

extend({ MeshLineMaterial });

export function CarTrail() {
  const leftWheelRef = useRef();
  const rightWheelRef = useRef();

  return (
    <>
      <mesh position={[0.5, 0.1, 0]} ref={leftWheelRef} />
      <mesh position={[-0.5, 0.1, 0]} ref={rightWheelRef} />
      <Car />
      <Trail
        width={15}
        length={5}
        decay={1}
        attenuation={(t) => 1 - (1 - t) * (1 - t)}
        target={leftWheelRef}
      >
        <meshLineMaterial color="#6e4824" transparent opacity={0.35} />
      </Trail>

      <Trail
        width={15}
        length={5}
        decay={1}
        attenuation={(t) => 1 - (1 - t) * (1 - t)}
        target={rightWheelRef}
      >
        <meshLineMaterial color="#6e4824" transparent opacity={0.35} />
      </Trail>
    </>
  );
}

export function BoatTrail() {
  return (
    <>
      <Trail
        width={80}
        e
        length={20}
        decay={1}
        attenuation={(t) => 1 - (1 - t) * (1 - t)}
      >
        <mesh position={[0, 0.2, 0]} />
        <meshLineMaterial color="#4fc3f7" transparent opacity={0.5} />
      </Trail>
      <Boat />
    </>
  );
}

export function SpaceshipTrail() {
  return (
    <>
      <Trail
        width={20}
        length={20}
        decay={1}
        attenuation={(t) => 1 - (1 - t) * (1 - t)}
      >
        <mesh position={[0.4, 0.4, -1]} />
        <meshLineMaterial color="#ffe6b5" transparent opacity={0.6} />
      </Trail>
      <Trail
        width={20}
        length={20}
        decay={1}
        attenuation={(t) => 1 - (1 - t) * (1 - t)}
      >
        <mesh position={[-0.4, 0.4, -1]} />
        <meshLineMaterial color="#ffe6b5" transparent opacity={0.6} />
      </Trail>
      <Spaceship />
    </>
  );
}

export function TrainTrail() {
  return <Train />;
}

export function CommercialTrainTrail() {
  return <CommercialTrain />;
}
