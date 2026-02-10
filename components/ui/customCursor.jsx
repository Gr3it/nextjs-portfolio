import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const getScale = () => {
  if (typeof window === "undefined") return 0;
  const max = Math.max(window.innerWidth, window.innerHeight);
  return max / 32;
};

export default function CustomCursor({ pathname }) {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const transitionRef = useRef(null);
  const isFirstRender = useRef(true);

  const handleShow = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    document.body.style.cursor = "none";
    container.classList.add("active");
  }, []);

  const handleHide = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    document.body.style.cursor = "auto";
    container.classList.remove("active");
  }, []);

  const triggerTransitionIn = useCallback(() => {
    const el = transitionRef.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = `scale(${getScale()})`;
    void el.offsetWidth;

    if (window.location.pathname === "/") {
      document.documentElement.style.setProperty("--contentVisibility", "0");
    }

    const onEnd = (e) => {
      if (e.propertyName === "transform") {
        el.style.transition = "none";
        el.style.transform = "scale(0)";
        el.style.opacity = "0";
        el.removeEventListener("transitionend", onEnd);
      }
    };
    el.addEventListener("transitionend", onEnd);

    requestAnimationFrame(() => {
      el.style.transition = "transform 0.5s ease-out";
      el.style.transform = "scale(0)";
    });
  }, []);

  const triggerTransitionOut = useCallback(() => {
    const el = transitionRef.current;
    if (!el) return;

    handleHide();
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = "scale(0)";
    void el.offsetWidth;

    const onEnd = (e) => {
      if (e.propertyName === "transform") {
        if (window.location.pathname !== "/") {
          document.documentElement.style.setProperty(
            "--contentVisibility",
            "1",
          );
        }
        el.style.transition = "none";
        el.style.transform = "scale(0)";
        el.style.opacity = "0";
        el.removeEventListener("transitionend", onEnd);
      }
    };
    el.addEventListener("transitionend", onEnd);

    requestAnimationFrame(() => {
      el.style.transition = "transform 0.5s ease-in-out";
      el.style.transform = `scale(${getScale()})`;
    });
  }, [handleHide]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (pathname === "/") {
        document.documentElement.style.setProperty("--contentVisibility", "0");
      } else {
        document.documentElement.style.setProperty("--contentVisibility", "1");
      }
      return;
    }

    if (pathname === "/") {
      triggerTransitionIn();
    } else {
      triggerTransitionOut();
    }
  }, [pathname, triggerTransitionIn, triggerTransitionOut]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
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
    window.addEventListener("showCustomCursor", handleShow);
    window.addEventListener("hideCustomCursor", handleHide);
    window.addEventListener("startTransitionIn", triggerTransitionIn);
    window.addEventListener("startTransitionOut", triggerTransitionOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("showCustomCursor", handleShow);
      window.removeEventListener("hideCustomCursor", handleHide);
      window.removeEventListener("startTransitionIn", triggerTransitionIn);
      window.removeEventListener("startTransitionOut", triggerTransitionOut);
      cancelAnimationFrame(rafId);
    };
  }, [handleShow, handleHide, triggerTransitionIn, triggerTransitionOut]);

  return (
    <div
      ref={cursorRef}
      className="flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <div
        ref={containerRef}
        className="custom-cursor-pos flex items-center justify-center"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl bg-[var(--background)]">
          <div className="absolute -top-2 -right-2 text-[var(--background)]">
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
          <div className="absolute -bottom-2 -left-2 text-[var(--background)]">
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
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--foreground)] ml-[0.3em]">
              VIEW
            </span>
          </div>
        </div>
      </div>
      <div
        ref={transitionRef}
        className="absolute h-16 w-16 rounded-full bg-[var(--background)] pointer-events-none"
        style={{
          transform: "scale(0)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      ></div>
    </div>
  );
}
