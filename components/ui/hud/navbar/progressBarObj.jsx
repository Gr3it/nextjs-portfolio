import React from "react";
import Checkpoint from "../../icons/checkpoint";
import FlagPole from "../../icons/flagPole";
import Star from "../../icons/star";

const typesConfig = {
  circle: {
    Component: null,
    className:
      "h-3 w-3 rounded-full top-1/2 -translate-y-1/2 drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]",
    useBgColor: true,
  },
  checkpoint: {
    Component: Checkpoint,
    className:
      "w-8 origin-bottom bottom-1/2 drop-shadow-[0_0_1px_rgba(0,0,0,0.25)] -ml-1.25",
    useBgColor: false,
  },
  flagpole: {
    Component: FlagPole,
    className:
      "w-8 origin-bottom bottom-1/2 drop-shadow-[0_0_1px_rgba(0,0,0,0.25)] ml-1.25",
    useBgColor: false,
  },
  star: {
    Component: Star,
    className: "w-6 top-1/2 -translate-y-1/2 animate-star-glow",
    useBgColor: false,
    fixedColor: "#FFD700",
  },
};

export default function ProgressBarObj({
  callback = () => {},
  positionPercentage = 0,
  start = 0,
  type = "circle",
  reached = false,
  text = "",
}) {
  const config = typesConfig[type];
  if (!config) return null;

  const { Component, className, useBgColor, fixedColor } = config;

  const dynamicColorClass = useBgColor
    ? reached
      ? "bg-red-500"
      : "bg-black"
    : reached
      ? "text-red-500"
      : "text-black";

  return (
    <div
      onClick={callback}
      style={{ top: `${positionPercentage}%` }}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer w-10 h-10 z-20"
    >
      <div
        id={start ? `animate-perc-${start}` : undefined}
        style={{ color: fixedColor || undefined }}
        className={`absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${className} ${dynamicColorClass}`}
      >
        {Component && <Component />}
      </div>

      {text && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover/navbar:opacity-100 group-hover/navbar:translate-x-0 text-sm font-semibold tracking-wide whitespace-nowrap bg-[var(--background)] px-4 py-2 rounded-xl text-[var(--foreground)]">
          {text}
        </div>
      )}
    </div>
  );
}
