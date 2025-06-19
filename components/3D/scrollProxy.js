import React, { useEffect, useRef } from "react";
import { easing } from "maath";

export function ScrollProxy({ id, height = 2 }) {
  return (
    <div
      id={id}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          height: `${height * 100 - 100}%`,
          width: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export const useScrollProxyListener = (
  id,
  callback,
  damping = 0.2,
  threshold = 0.0001
) => {
  const target = useRef(0);
  const current = useRef(0);
  const previous = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const verticalPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      target.current = verticalPercent;
    };

    const update = () => {
      easing.damp(current, "current", target.current, damping, 1 / 60);

      if (Math.abs(current.current - previous.current) > threshold) {
        previous.current = current.current;
        callback(current.current);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, [callback, id, damping, threshold]);
};
