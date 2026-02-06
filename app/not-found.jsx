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

export default function NotFound() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6">
      <p className="text-[var(--grey)] font-light text-sm md:text-base mb-2 tracking-[0.3em] uppercase">
        404 — You've gone off-road
      </p>

      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center leading-tight">
        Lost in <span className="text-[var(--accent-color)]">transit.</span>
      </h1>

      <Link
        href="/"
        className="group flex flex-col items-center cursor-pointer outline-none -mt-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div
          className={`w-[320px] h-[180px] md:w-[550px] md:h-[280px] transition-transform duration-700 ease-out 
            ${isHovered ? "scale-105 rotate-2" : "scale-100"}`}
        >
          <CarScene hover={isHovered} />
        </div>

        <div className="flex flex-col items-center -mt-6">
          <span
            className={`text-2xl md:text-3xl font-bold tracking-tight transition-all duration-500 
            ${isHovered ? "text-[var(--accent-color)] scale-110" : "text-inherit"}`}
          >
            BACK TO HOME
          </span>

          <div
            className={`h-[3px] mt-1 bg-[var(--accent-color)] transition-all duration-500 ease-in-out 
              ${isHovered ? "w-full" : "w-12"}`}
          />
        </div>
      </Link>

      <div className="absolute bottom-8 left-8 opacity-60">
        <span className="text-[var(--grey)] text-[10px] md:text-xs font-mono uppercase tracking-[0.4em]">
          Error: Page_Not_Found_Sequence
        </span>
      </div>
    </main>
  );
}
