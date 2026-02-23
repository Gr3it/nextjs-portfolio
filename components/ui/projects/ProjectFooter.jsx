"use client";

import React, { useState } from "react";
import { RiggedCar } from "@/models/vehicles/RiggedCar";
import Link from "next/link";
import { MinimalCanvas } from "@/components/3D/core/minimalCanvas";
import { ProjectContainer } from ".";

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
    <ProjectContainer
      as="footer"
      className="border-t border-[var(--borderColor)] overflow-hidden"
      containerClassName="flex flex-col items-center justify-center"
    >
      <p className="text-[var(--grey)] font-light text-sm md:text-xl mb-4 md:mb-6 tracking-[0.2em] md:tracking-widest uppercase opacity-70">
        Enjoyed the journey?
      </p>

      <Link
        href="/"
        className="group relative flex flex-col md:flex-row items-center gap-6 md:gap-8 cursor-pointer outline-none mb-2 md:mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        scroll={false}
      >
        <h2
          className={`text-4xl xs:text-5xl md:text-8xl font-bold tracking-tighter text-center md:text-left transition-all duration-500 leading-[0.9] md:leading-tight
            ${isHovered ? "text-[var(--accent-color)]" : "text-inherit"}`}
        >
          See other projects
          <span className="text-[var(--accent-color)]">.</span>
        </h2>

        <div
          className={`w-[256px] h-[128px] transition-transform duration-700 ease-out 
            ${isHovered ? "scale-110 rotate-3" : "scale-100"}`}
        >
          <CarScene hover={isHovered} />
        </div>
      </Link>

      <div
        className={`h-[2px] bg-[var(--accent-color)] transition-all duration-500 ease-in-out ${isHovered ? "w-1/2" : "w-0"}`}
      />
    </ProjectContainer>
  );
}
