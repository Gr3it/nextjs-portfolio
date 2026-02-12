"use client";

import React, { useState, useRef, useEffect } from "react";

const ProjectTripleImageDiff = ({ images, minDistance = 10 }) => {
  const [wireframeWidth, setWireframeWidth] = useState(0);
  const [clayWidth, setClayWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isAnimating &&
          wireframeWidth === 0 &&
          !hasAnimated.current
        ) {
          setIsAnimating(true);
          setTimeout(() => {
            hasAnimated.current = true;
            setWireframeWidth(33);
            setClayWidth(66);
          }, 50);

          setTimeout(() => {
            setIsAnimating(false);
          }, 1050);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimating, wireframeWidth]);

  const handleDrag = (e, type) => {
    if (!containerRef.current) return;
    setIsAnimating(false);

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    const clampedPos = Math.max(0, Math.min(100, position));

    if (type === "wireframe") {
      setWireframeWidth(Math.min(clampedPos, clayWidth - minDistance));
    } else {
      setClayWidth(Math.max(clampedPos, wireframeWidth + minDistance));
    }
  };

  const transitionStyle = isAnimating
    ? { transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)" }
    : {};

  return (
    <div
      ref={containerRef}
      className="container relative w-full aspect-video select-none overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0">
        <img
          src={images[2]}
          alt="Final Render"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `inset(0 ${100 - clayWidth}% 0 0)`,
          ...transitionStyle,
        }}
      >
        <img
          src={images[1]}
          alt="Clay Render"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-0 z-20"
        style={{
          clipPath: `inset(0 ${100 - wireframeWidth}% 0 0)`,
          ...transitionStyle,
        }}
      >
        <img
          src={images[0]}
          alt="Wireframe"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-foreground cursor-col-resize"
        style={{
          left: `${wireframeWidth}%`,
          ...transitionStyle,
        }}
        onMouseDown={(e) => {
          const move = (ev) => handleDrag(ev, "wireframe");
          const up = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
          };
          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-[var(--accent-color)] outline-2 rounded-full shadow-lg" />
      </div>

      <div
        className="absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-foreground cursor-col-resize"
        style={{
          left: `${clayWidth}%`,
          ...transitionStyle,
        }}
        onMouseDown={(e) => {
          const move = (ev) => handleDrag(ev, "clay");
          const up = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
          };
          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", up);
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-[var(--accent-color)] outline-2 rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default ProjectTripleImageDiff;
