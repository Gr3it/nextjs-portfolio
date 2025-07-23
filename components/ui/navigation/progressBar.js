"use client";

import React, { useState } from "react";
import { animate, createSpring } from "animejs";
import ProgressBarObjWithText, { ProgressBarObj } from "./progressBarObj";
import { useScrollProxyListener } from "../../3D/scrollProxy/scrollProxy";

import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

function getPositionInPercentage(value) {
  return Math.min(
    (value / (worldConfig.height - cameraConfig.frustumHeightOnPlane)) * 100,
    100
  );
}

function calculateGradient() {
  const { sections, height } = worldConfig;

  const colorStops = sections
    .map((s, i) => {
      const start = getPositionInPercentage(s.start) - (i === 0 ? 0 : 0.5);
      const end =
        getPositionInPercentage(sections[i + 1]?.start ?? height) -
        (i === sections.length - 1 ? 0 : 1.5);
      return `${s.color} ${start}% , ${s.color} ${end}%`;
    })
    .join(", ");

  const gradient = `linear-gradient(to right, ${colorStops})`;
  return gradient;
}

const triggerAnimation = (position) => {
  animate(`#animate-perc-${position}`, {
    scale: [
      { to: 1.2, ease: "inOut(3)", duration: 200 },
      { to: 1, ease: createSpring({ stiffness: 300 }) },
    ],
  });
};

export default function ProgressBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reachedPositions, setReachedPositions] = useState(new Set());

  useScrollProxyListener((offset) => {
    const percentage = offset * 100;

    setScrollPosition(percentage);

    setReachedPositions((prev) => {
      const newPositions = new Set(prev);
      worldConfig.sections.forEach(({ start, text }) => {
        if (
          percentage >= getPositionInPercentage(start) - 0.1 &&
          !prev.has(text)
        ) {
          triggerAnimation(start);
          newPositions.add(text);
        }
      });
      return newPositions;
    });
  });

  return (
    <div className="bg-white/70 flex flex-col w-full h-full rounded-2xl p-2">
      <div
        className="w-full mt-6 rounded-lg h-6 border-2 border-neutral-700 px-4"
        style={{
          background: `linear-gradient(to right,${
            worldConfig.sections.at(0).color
          } 47%, ${worldConfig.sections.at(-1).color} 53%)`,
        }}
      >
        <div
          className="w-full relative h-full"
          style={{ background: calculateGradient() }}
        >
          {worldConfig.sections
            .filter(({ text }) => text != null)
            .map(({ start, text, type, textAlignment }) => (
              <ProgressBarObjWithText
                key={start}
                positionPercentage={
                  text === "End" ? 100 : getPositionInPercentage(start)
                }
                start={start}
                type={type}
                reached={reachedPositions.has(text)}
                text={text}
                textAlignment={textAlignment}
                callback={() => {
                  const targetPosition =
                    (window.innerHeight * start) /
                    cameraConfig.frustumHeightOnPlane;

                  window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                  });
                }}
              />
            ))}
          <ProgressBarObj positionPercentage={scrollPosition} type="star" />
        </div>
      </div>
    </div>
  );
}
