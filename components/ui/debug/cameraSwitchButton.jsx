"use client";

import React from "react";
import { useSnapshot } from "valtio";
import { cameraStore } from "@/stores/cameraStorage";
import { debugStore } from "@/stores/debugStorage";

export default function CameraSwitchButton() {
  const { isSupportCameraActive } = useSnapshot(cameraStore);
  const { showSupportCamera } = useSnapshot(debugStore);

  if (!showSupportCamera) return null;

  const handleToggle = () => {
    cameraStore.isSupportCameraActive = !cameraStore.isSupportCameraActive;
  };

  return (
    <div className="fixed z-[30] right-4 top-[112px] 2xl:top-4 space-y-2">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center gap-2 w-full bg-white/70 hover:bg-gray-200/70 text-gray-800 px-3 py-2 rounded-2xl shadow-md transition-colors duration-200 text-sm font-medium cursor-pointer"
        aria-label={`Switch to ${isSupportCameraActive ? "main" : "support"} camera`}
      >
        <span className="flex items-center pb-0.5">
          {isSupportCameraActive ? "🎥" : "📷"}
        </span>
        <span>{isSupportCameraActive ? "Support Camera" : "Main Camera"}</span>
      </button>
    </div>
  );
}
