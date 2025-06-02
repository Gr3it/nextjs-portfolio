"use client";

import { useEffect, useRef } from "react";

export default function Plain3D({ scrollProxy, content }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Handle scroll events
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const currentZ = -scrollTop;
      container.style.transform = `translateZ(${currentZ}px) rotateX(90deg)`;
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="w-full h-screen fixed top-0 left-0" // can remove fixed to add scroll bar
        style={{
          perspective: "var(--perspective)",
          perspectiveOrigin: "var(--perspective-origin)",
        }}
      >
        <div
          className="w-full flex justify-center flex-col items-center preserve-3d origin-top"
          style={{ transform: "translateZ(0px) rotateX(90deg)" }}
          ref={containerRef}
        >
          {content}
        </div>
      </div>
      <div className="opacity-0 w-full pointer-events-none select-none">
        {scrollProxy}
      </div>
    </>
  );
}
