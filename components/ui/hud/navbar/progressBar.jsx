"use client";

import React, { useCallback, useMemo, memo } from "react";
import { useSnapshot } from "valtio";
import { animate, createSpring } from "animejs";

import { scrollStore } from "@/stores/scrollStorage";
import ProgressBarObj from "./progressBarObj";
import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";
import { AttachCallbackToScrollEvent } from "@/components/3D/core/scrollControls";
import {
  calculateGradient,
  getPositionInPercentage,
} from "@/lib/worldCalculation";

const triggerAnimation = (position) => {
  animate(`#animate-perc-${position}`, {
    scale: [
      { to: 1.2, ease: "inOut(3)", duration: 200 },
      { to: 1, ease: createSpring({ stiffness: 300 }) },
    ],
  });
};

const ScrollCursor = memo(() => {
  const { percentage } = useSnapshot(scrollStore);
  return <ProgressBarObj positionPercentage={percentage} type="star" />;
});

export default function ProgressBar() {
  const { reachedPositions } = useSnapshot(scrollStore);
  const gradientStyle = useMemo(
    () => ({ background: calculateGradient() }),
    [],
  );

  const sections = useMemo(
    () => worldConfig.sections.filter(({ text }) => text != null),
    [],
  );

  const mainGradient = useMemo(
    () => ({
      background: `linear-gradient(to right, ${worldConfig.sections.at(0).color} 47%, ${worldConfig.sections.at(-1).color} 53%)`,
    }),
    [],
  );

  const handleScroll = useCallback((offset) => {
    const percentage = offset * 100;
    scrollStore.percentage = percentage;

    let hasNewReached = false;

    worldConfig.sections.forEach(({ start, text }) => {
      if (
        text &&
        percentage >= getPositionInPercentage(start) - 0.1 &&
        !scrollStore.reachedPositions.has(text)
      ) {
        triggerAnimation(start);
        scrollStore.reachedPositions.add(text);
        hasNewReached = true;
      }
    });

    if (hasNewReached) {
      scrollStore.reachedPositions = new Set(scrollStore.reachedPositions);
    }
  }, []);

  AttachCallbackToScrollEvent(handleScroll);

  return (
    <div className="shadow-md bg-white/70 flex flex-col w-full h-full rounded-2xl p-2 select-none">
      <div
        className="w-full mt-6 rounded-lg h-6 border-2 border-neutral-700 px-4"
        style={mainGradient}
      >
        <div className="w-full relative h-full" style={gradientStyle}>
          {sections.map(({ start, text, type, textAlignment }) => (
            <ProgressBarObj
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
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
              }}
            />
          ))}
          <ScrollCursor />
        </div>
      </div>
    </div>
  );
}
