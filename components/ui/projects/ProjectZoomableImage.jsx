"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ProjectZoomableImage({
  link,
  height,
  width,
  alt = "Project detail",
  caption = "Click to explore in detail",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      handleReset(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleZoom = (delta, clientX, clientY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Mouse position relative to the container center
    const mouseX = clientX - rect.left - rect.width / 2;
    const mouseY = clientY - rect.top - rect.height / 2;

    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale + delta, 0.5), 8);

      // Calculate how much the scale changed
      const scaleRatio = newScale / prevScale;

      // Adjust position to keep the point under the mouse stable
      // Formula: newPos = mouse - (mouse - oldPos) * ratio
      setPosition((prevPos) => ({
        x: mouseX - (mouseX - prevPos.x) * scaleRatio,
        y: mouseY - (mouseY - prevPos.y) * scaleRatio,
      }));

      return newScale;
    });
  };

  const handleZoomIn = (e) => {
    e?.stopPropagation();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      handleZoom(0.5, rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      setScale((prev) => Math.min(prev + 0.5, 8));
    }
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      handleZoom(-0.5, rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      setScale((prev) => Math.max(prev - 0.5, 0.5));
    }
  };

  const handleWheel = (e) => {
    e.stopPropagation();
    const delta = -e.deltaY * 0.002; // Fine-tuned sensitivity
    handleZoom(delta, e.clientX, e.clientY);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const onMouseDown = (e) => {
    if (scale <= 1 && position.x === 0 && position.y === 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      <div
        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-[var(--borderColor)] bg-white transition-all hover:border-[var(--accent-color)]"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={link}
          alt={alt}
          height={height}
          width={width}
          className="object-contain w-full h-auto transition-transform duration-500 group-hover:scale-[1.02] p-4"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <span className="translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium shadow-xl">
            {caption}
          </span>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-4 md:p-12"
          onClick={() => setIsOpen(false)}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={handleWheel}
        >
          {/* Zoom Controls */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-4 bg-[var(--accent-color)] p-2 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20"
            onClick={stopPropagation}
          >
            <button
              onClick={handleZoomOut}
              className="p-3 hover:brightness-110 rounded-full transition-all text-white cursor-pointer active:scale-90"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span className="text-white text-sm font-bold font-mono min-w-[3rem] text-center select-none">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-3 hover:brightness-110 rounded-full transition-all text-white cursor-pointer active:scale-90"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div className="h-6 w-[1px] bg-white/30" />
            <button
              onClick={handleReset}
              className="px-4 py-2 hover:brightness-110 rounded-full transition-all text-white text-xs font-medium uppercase tracking-widest cursor-pointer active:scale-90"
            >
              Reset
            </button>
          </div>

          {/* Image Container */}
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white rounded-lg shadow-2xl select-none"
            onClick={stopPropagation}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            style={{
              cursor:
                scale > 1 || position.x !== 0 || position.y !== 0
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "default",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                transformOrigin: "center center",
              }}
            >
              <img
                src={link}
                alt={alt}
                className="max-w-[90%] max-h-[90%] w-auto h-auto object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-8 right-8 text-white bg-[var(--accent-color)] hover:brightness-110 p-4 rounded-full transition-all shadow-xl border border-white/20 active:scale-95 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
