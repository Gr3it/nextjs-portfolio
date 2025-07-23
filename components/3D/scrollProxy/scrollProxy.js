import React, { useEffect, useRef } from "react";
import { easing } from "maath";

export function ScrollProxy({ id, height = 2 }) {
  return (
    <div
      id={id}
      className="w-full pointer-events-none select-none"
      style={{
        minHeight: `${height * 100}vh`,
      }}
    ></div>
  );
}

export const useScrollProxyListener = (callback, options = {}) => {
  const target = useRef(0);
  const current = useRef(0);
  const previous = useRef(0);
  const rafRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    const damping = options.damping || 0.2;
    const threshold = 0.000001;
    const {
      start = 0,
      end = document.documentElement.scrollHeight - window.innerHeight,
    } = options;

    // Initialize with current scroll position
    const initializePosition = () => {
      if (initialized.current) return;

      const scrollTop = window.scrollY;

      if (scrollTop < start) {
        // Before start range - set to 0
        target.current = 0;
        current.current = 0;
        previous.current = 0;
      } else if (scrollTop >= start && scrollTop <= end) {
        // Within range - calculate normalized value
        const normalizedValue =
          end > start ? (scrollTop - start) / (end - start) : 0;
        const clampedValue = Math.max(0, Math.min(1, normalizedValue));
        target.current = clampedValue;
        current.current = clampedValue;
        previous.current = clampedValue;
      } else {
        // After end range - set to 1
        target.current = 1;
        current.current = 1;
        previous.current = 1;
      }

      initialized.current = true;
      // Call callback in next frame to avoid render issues
      requestAnimationFrame(() => callback(current.current));
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;

      // Always update target based on scroll position
      if (scrollTop < start) {
        // Before start range - set to 0
        target.current = 0;
      } else if (scrollTop >= start && scrollTop <= end) {
        // Within range - calculate normalized value
        const normalizedValue =
          end > start ? (scrollTop - start) / (end - start) : 0;
        target.current = Math.max(0, Math.min(1, normalizedValue));
      } else {
        // After end range - set to 1
        target.current = 1;
      }
    };

    const update = () => {
      easing.damp(current, "current", target.current, damping, 1 / 60);

      if (Math.abs(current.current - previous.current) > threshold) {
        previous.current = current.current;
        callback(current.current);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    // Initialize position on mount
    initializePosition();

    rafRef.current = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      initialized.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [callback, options]);
};
