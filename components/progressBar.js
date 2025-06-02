"use client";

// let progress bar compare when is ready and use faze animation

import React, { useState, useEffect } from "react";
import { animate, createSpring, utils } from "animejs";
import ProgressBarObjWithText, { ProgressBarObj } from "./progressBarObj";

// sections for the progress bar
let sections = [];

const getObjOverride = (section) => {
  if (section === "Start")
    return { type: "circle", position: 0, textAlignment: "center" };
  if (section === "End")
    return { type: "flagpole", position: 100, textAlignment: "center" };
  return {};
};

export default function ProgressBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reachedPositions, setReachedPositions] = useState(new Set());
  const [gradientStyle, setGradientStyle] = useState({ background: "" });

  useEffect(() => {
    const triggerAnimation = (position) => {
      animate(`#animate-perc-${position.toFixed(0)}`, {
        scale: [
          { to: 1.2, ease: "inOut(3)", duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) },
        ],
      });
    };
    // Calculate positions at startup
    const calculatePositions = () => {
      const clientHeight = window.innerHeight;
      const midpoint = clientHeight / 2;
      const scrollHeight = document.documentElement.scrollHeight;
      const calculatedSections = [];

      document.querySelectorAll("[data-sectioncolor]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - midpoint;
        const percentage = (sectionTop / (scrollHeight - clientHeight)) * 100;
        const id = element.getAttribute("data-section");
        const color = element.getAttribute("data-sectioncolor") || "#ffffff";
        calculatedSections.push({
          position: percentage,
          text: id,
          type: "checkpoint",
          color: color,
          callback: () => {
            const targetPosition =
              element.getBoundingClientRect().top +
              window.pageYOffset -
              (id === "End" ? 0 : window.innerHeight / 2);

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          },
          ...getObjOverride(id),
        });
      });

      calculatedSections.sort((a, b) => a.position - b.position);
      sections = [...calculatedSections];
      updateGradient(calculatedSections);
    };

    const updateGradient = (sections) => {
      const colorStops = sections
        .map((section, index) => {
          const nextPosition = sections[index + 1]?.position || 101.5;
          return `${section.color} ${section.position - 0.5}% , ${
            section.color
          } ${nextPosition - 1.5}%`;
        })
        .join(", ");

      const gradient = `linear-gradient(to right, ${colorStops})`;
      setGradientStyle({ background: gradient });
    };

    const getScrollPercentage = () => {
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const scrollTop = window.scrollY;
      return (scrollTop / (scrollHeight - clientHeight)) * 100;
    };

    const updateScroll = () => {
      const percentage = getScrollPercentage();
      setScrollPosition(percentage);
      setReachedPositions((prev) => {
        const newPositions = new Set(prev);
        sections.forEach(({ position, text }) => {
          if (percentage >= position && !prev.has(text)) {
            triggerAnimation(position);
            newPositions.add(text);
          }
        });
        return newPositions;
      });
    };

    calculatePositions();
    updateScroll();
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    window.addEventListener("resize", calculatePositions);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("resize", calculatePositions);
    };
  }, []);

  return (
    !gradientStyle.background || (
      <div className="bg-white/70 flex flex-col w-full h-full rounded-2xl p-2">
        <div
          className="w-full mt-6 rounded-lg h-6 border-2 border-neutral-700 px-4"
          style={{
            background:
              "linear-gradient(to right,var(--bg-home) 47%, var(--bg-footer) 53%)",
          }}
        >
          <div className="w-full relative h-full" style={gradientStyle}>
            {sections
              .filter(({ text }) => text != null)
              .map(({ position, text, type, textAlignment, callback }) => (
                <ProgressBarObjWithText
                  key={position}
                  positionPercentage={position}
                  type={type}
                  reached={reachedPositions.has(text)}
                  text={text}
                  textAlignment={textAlignment}
                  callback={callback}
                />
              ))}
            <ProgressBarObj positionPercentage={scrollPosition} type="star" />
          </div>
        </div>
      </div>
    )
  );
}
