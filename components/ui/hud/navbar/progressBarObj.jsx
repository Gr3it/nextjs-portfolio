import React from "react";
import Checkpoint from "../../icons/checkpoint";
import FlagPole from "../../icons/flagPole";
import Star from "../../icons/star";

const typesConfig = {
  circle: {
    Component: null,
    className: "h-3 w-3 rounded-full top-1/2 -translate-y-1/2",
    useBgColor: true,
  },
  checkpoint: {
    Component: Checkpoint,
    className: "w-9 bottom-1/2 translate-y-0",
    useBgColor: false,
  },
  flagpole: {
    Component: FlagPole,
    className: "w-9 bottom-1/2 translate-y-0",
    useBgColor: false,
  },
  star: {
    Component: Star,
    className: "w-6 bottom-1/2 translate-y-1/2",
    useBgColor: false,
    fixedColor: "#FFD700",
  },
};

const getAlignmentClass = (alignment) => {
  const map = {
    left: " ml-1",
    center: " -translate-x-1/2",
  };
  return map[alignment] || "";
};

export default function ProgressBarObj({
  callback = () => {},
  positionPercentage = 0,
  start = 0,
  type = "circle",
  reached = false,
  text = "",
  textAlignment = "left",
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
    <>
      <div
        id={start ? `animate-perc-${start}` : undefined}
        onClick={callback}
        style={{
          left: `${positionPercentage}%`,
          color: fixedColor || undefined,
        }}
        className={`absolute origin-bottom cursor-pointer -translate-x-1/2 transition-colors duration-300 ${className} ${dynamicColorClass}`}
      >
        {Component && <Component />}
      </div>

      {text && (
        <div
          onClick={callback}
          style={{ left: `${positionPercentage}%` }}
          className={`absolute top-full cursor-pointer text-sm font-medium mt-0.5 whitespace-nowrap ${getAlignmentClass(textAlignment)}`}
        >
          {text}
        </div>
      )}
    </>
  );
}
