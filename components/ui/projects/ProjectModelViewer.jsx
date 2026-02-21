"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Html } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          Loading Model...
        </span>
      </div>
    </Html>
  );
}

export default function ProjectModelViewer({
  modelPath,
  children,
  className = "",
  aspect = "aspect-square",
}) {
  return (
    <div
      className={`relative w-full ${aspect} bg-white/[0.03] rounded-3xl border border-white/10 overflow-hidden group transition-all duration-500 hover:bg-white/[0.05] ${className}`}
    >
      <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [10, 10, 10] }}>
        <color attach="background" args={["#0a0a0a"]} />
        <Suspense fallback={<Loader />}>
          <Stage intensity={0.5} environment="city" adjustCamera={true} center>
            {modelPath ? <Model url={modelPath} /> : children}
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      {/* Interactive Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
          Drag to orbit
        </span>
      </div>
    </div>
  );
}
