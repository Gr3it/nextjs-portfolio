import React from "react";
import { useSnapshot } from "valtio";
import { cameraStore, CAMERA_CONFIG } from "@/stores/cameraStorage";

export default function ZoomControls() {
  const { zoomValue } = useSnapshot(cameraStore);
  const { MIN, MAX, STEP } = CAMERA_CONFIG.ZOOM;

  const adjustZoom = (delta) => {
    const nextZoom = Math.round((zoomValue + delta) * 100) / 100;
    if (nextZoom >= MIN && nextZoom <= MAX) {
      cameraStore.zoomValue = nextZoom;
    }
  };

  const isMax = zoomValue >= MAX;
  const isMin = zoomValue <= MIN;

  const btnClass =
    "flex items-center justify-center w-10 h-10 text-xl font-bold text-white transition-opacity duration-200 bg-[#373737] rounded-full shadow-lg cursor-pointer active:scale-95 disabled:opacity-60 disabled:grayscale disabled:cursor-auto";

  return (
    <div className="absolute bottom-6 right-6 flex gap-[15px] z-[20] pointer-events-auto">
      <button
        onClick={() => adjustZoom(STEP)}
        disabled={isMax}
        className={btnClass}
      >
        +
      </button>

      <button
        onClick={() => adjustZoom(-STEP)}
        disabled={isMin}
        className={btnClass}
      >
        −
      </button>
    </div>
  );
}
