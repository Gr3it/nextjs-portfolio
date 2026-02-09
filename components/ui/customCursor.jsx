import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };

    const rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove);

    const handleShow = (e) => {
      cursor.classList.add("active");
    };
    const handleHide = () => cursor.classList.remove("active");

    window.addEventListener("showCustomCursor", handleShow);
    window.addEventListener("hideCustomCursor", handleHide);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("showCustomCursor", handleShow);
      window.removeEventListener("hideCustomCursor", handleHide);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-pos flex items-center justify-center`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl">
        <div className={`absolute -top-2 -right-2 text-white arrow-bracket`}>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
          </svg>
        </div>

        <div className={`absolute -bottom-2 -left-2 text-white arrow-bracket`}>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 17H7V7" />
          </svg>
        </div>

        <div className="relative z-10">
          <span className="text-xs font-bold tracking-[0.3em] text-black uppercase leading-none ml-[0.3em]">
            VIEW
          </span>
        </div>
      </div>
    </div>
  );
}
