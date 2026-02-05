"use client";

import React from "react";

export default function LoadingScreen({ progress, onVideoReady }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <div className="h-72 w-2xl flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          fetchPriority="high"
          preload="metadata"
          className="w-full h-full object-cover"
          onCanPlayThrough={() => {
            onVideoReady();
          }}
        >
          <source src="/video/car-animation.webm" type="video/webm" />
        </video>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="font-mono text-6xl font-black italic tracking-tighter transition-all duration-300">
            {Math.round(progress)}%
          </span>
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 ml-2">
            Loading World
          </span>
        </div>

        <div className="w-64 h-[2px] bg-[var(--borderColor)] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent-color)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
