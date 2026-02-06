"use client";

import React, { useState } from "react";
import { RiggedCar } from "@/models/vehicles/RiggedCar";
import Link from "next/link";
import { MinimalCanvas } from "@/components/3D/core/minimalCanvas";

const CarScene = React.memo(({ hover }) => (
  <MinimalCanvas>
    <RiggedCar
      rotation={[0, -Math.PI / 3.5, 0]}
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

export default function ProjectFooter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="w-full py-24 flex flex-col items-center justify-center border-t border-[var(--borderColor)] overflow-hidden">
      <p className="text-[var(--grey)] font-light text-xl mb-4 tracking-widest uppercase">
        Enjoyed the journey?
      </p>

      <Link
        href="/"
        className="group relative flex flex-col md:flex-row items-center gap-6 cursor-pointer outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        scroll={false}
      >
        <h2
          className={`text-6xl md:text-8xl font-bold tracking-tighter transition-colors duration-500 
            ${isHovered ? "text-[var(--accent-color)]" : "text-inherit"}`}
        >
          See other projects
          <span className="text-[var(--accent-color)]">.</span>
        </h2>

        <div
          className={`w-64 h-40 transition-transform duration-700 ease-out 
            ${isHovered ? "scale-110 rotate-2" : "scale-100"}`}
        >
          <CarScene hover={isHovered} />
        </div>
      </Link>

      <div
        className={`h-[2px] bg-[var(--accent-color)] transition-all duration-500 ease-in-out ${isHovered ? "w-1/2" : "w-0"}`}
      />
    </footer>
  );
}
