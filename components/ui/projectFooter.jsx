"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { RiggedCar } from "@/models/vehicles/RiggedCar";
import Link from "next/link";

export default function ProjectFooter() {
  const [hover, setHover] = useState(false);

  return (
    <footer className="w-full py-24 flex flex-col items-center justify-center border-t border-[#0000001a]">
      <p className="text-zinc-400 font-light text-xl mb-4 tracking-widest uppercase">
        Enjoyed the journey?
      </p>

      <Link href="/">
        <div
          className="group relative flex flex-col md:flex-row items-center gap-6 cursor-pointer transition-all duration-500"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <h2
            className={`text-6xl md:text-8xl font-bold tracking-tighter transition-all duration-500 ${hover ? "text-[var(--accent-color)]" : "text-zinc-900"}`}
          >
            See other projects
            <span className="text-[var(--accent-color)]">.</span>
          </h2>

          <div
            className={`w-64 h-40 transition-transform duration-700 ease-out ${hover ? "scale-110 rotate-2" : "scale-100"}`}
          >
            <Canvas
              orthographic
              shadows
              dpr={[1, 2]}
              camera={{ position: [-3, 5, 10], zoom: 60 }}
              gl={{ alpha: true, antialias: true, precision: "highp" }}
            >
              <ambientLight intensity={1.5} />
              <directionalLight
                position={[5, 8, -3]}
                intensity={2}
                castShadow
              />
              <Suspense fallback={null}>
                <RiggedCar
                  rotation={[0, -Math.PI / 2, 0]}
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
              </Suspense>
            </Canvas>
          </div>
        </div>
      </Link>

      <div
        className={`h-[2px] bg-[var(--accent-color)] transition-all duration-500 ease-in-out ${hover ? "w-1/2" : "w-0"}`}
      />
    </footer>
  );
}
