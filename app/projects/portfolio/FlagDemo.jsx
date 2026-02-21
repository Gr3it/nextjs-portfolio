"use client";

import React, { useState, Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { FlagWithStars } from "@/components/3D/environment/flag/flagWithStars";

export default function FlagDemo() {
  const [isReached, setIsReached] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger only when scrolling down and hitting the middle
        if (entry.isIntersecting) {
          setIsReached(true);
        }
      },
      {
        // This margin creates a trigger point at exactly 50% of the viewport height
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-full min-h-[450px] bg-white/[0.02] rounded-3xl border border-white/10 overflow-hidden"
    >
      {/* 3D Scene Area */}
      <div className="relative flex-1">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 60, position: [0.5, 1, 5], zoom: 1.25 }}
        >
          <group position={[0, -1, 0]}>
            <Suspense fallback={null}>
              <Stage
                intensity={0.5}
                environment="city"
                adjustCamera={false}
                center={false}
              >
                <FlagWithStars reached={isReached} />
              </Stage>
            </Suspense>
          </group>
        </Canvas>
      </div>

      {/* Divider line */}
      <div className="h-[1px] w-full bg-white/10" />

      {/* Control Area */}
      <div className="flex items-center justify-between p-6 bg-white/[0.02]">
        <span className="text-xs font-mono text-[var(--grey)] uppercase tracking-[0.2em] font-medium">
          Waypoint Status
        </span>

        <button
          onClick={() => setIsReached(!isReached)}
          className="flex items-center gap-4 cursor-pointer group/toggle active:scale-95 transition-transform"
        >
          <span
            className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 font-semibold ${
              isReached ? "text-[var(--accent-color)]" : "text-[var(--grey)]"
            }`}
          >
            Reached
          </span>
          <div
            className={`relative w-12 h-6 rounded-full border-2 transition-all duration-500 ${
              isReached
                ? "bg-[var(--accent-color)]/20 border-[var(--accent-color)]/50"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all duration-500 shadow-xl ${
                isReached
                  ? "left-7 bg-[var(--accent-color)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.6)]"
                  : "left-1 bg-[var(--grey)]"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
