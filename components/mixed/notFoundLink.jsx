"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiggedCar } from "@/models/vehicles/RiggedCar";
import { MinimalCanvas } from "@/components/3D/core/minimalCanvas";

const CarScene = React.memo(({ hover }) => (
  <MinimalCanvas>
    <RiggedCar
      rotation={[0, -Math.PI / 4, 0]}
      position={[0, -0.5, 0]}
      hover={hover}
      castShadow
    />
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.51, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  </MinimalCanvas>
));

CarScene.displayName = "CarScene";

export default function NotFoundLink() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href="/"
      className="group flex flex-col items-center cursor-pointer outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div
        className={`m-6 w-[16.25rem] h-[10rem] xs:w-[20rem] xs:h-[11.25rem] md:w-[34.375rem] md:h-[17.5rem] transition-transform duration-700 ease-out 
            ${isHovered ? "scale-105 rotate-2" : "scale-100"}`}
      >
        <CarScene hover={isHovered} />
      </div>

      <div className="flex flex-col items-center">
        <span
          className={`text-xl xs:text-2xl md:text-3xl font-black tracking-tighter sm:tracking-tight transition-all duration-500 uppercase
            ${isHovered ? "text-[var(--accent-color)] scale-110" : "text-inherit"}`}
        >
          Back to Home
        </span>

        <div
          className={`h-[3px] mt-2 bg-[var(--accent-color)] transition-all duration-500 ease-in-out 
              ${isHovered ? "w-full" : "w-10 sm:w-12"}`}
        />
      </div>
    </Link>
  );
}
