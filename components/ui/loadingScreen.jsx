"use client";

import React from "react";
import Car from "./icons/car";

export default function LoadingScreen({ progress }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-black">
      <div className="relative w-64 h-32 overflow-hidden border-b-2 border-black">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 animate-car-bounce">
          <Car />
        </div>

        <div className="absolute bottom-0 flex w-[200%] animate-[road_0.6s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-full flex justify-around">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-8 h-[2px] bg-black/30" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="font-mono text-4xl font-bold italic">
          {Math.round(progress)}%
        </span>
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-black/70">
          Loading World...
        </span>
      </div>
    </div>
  );
}
