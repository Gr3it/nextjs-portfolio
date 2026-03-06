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
    () =>
      Object.values(worldConfig.sections).filter(({ text }) => text != null),
    [],
  );

  const mainGradient = useMemo(() => {
    const sectionsArray = Object.values(worldConfig.sections);
    return {
      background: `linear-gradient(to bottom, ${sectionsArray.at(0).color} 47%, ${sectionsArray.at(-1).color} 53%)`,
    };
  }, []);

  const handleScroll = useCallback((offset) => {
    const percentage = offset * 100;
    scrollStore.percentage = percentage;

    let hasNewReached = false;

    Object.values(worldConfig.sections).forEach(({ start, text }) => {
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
    <nav className="fixed inset-y-4 left-4 sm:inset-y-8 sm:left-8 z-50 flex flex-col justify-center">
      <div
        className="w-7 h-full max-h-[1000px] py-3 rounded-xl border-3 border-[var(--background)] group/navbar pointer-events-auto"
        style={mainGradient}
      >
        <div className="w-full h-full relative" style={gradientStyle}>
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
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }}
            />
          ))}
          <ScrollCursor />
        </div>
      </div>
    </nav>
  );
}
