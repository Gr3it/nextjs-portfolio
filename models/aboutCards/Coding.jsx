import React, { useState, useEffect, useRef } from "react";
import { a, useSpring } from "@react-spring/three";
import LightsWindow from "./coding/LightWindow";
import DebugWindow from "./coding/DebugWindow";
import ClickBoundary from "@/components/3D/core/clickBoundary";
import { useTargetReached } from "@/hooks/useTargetReached";
import aboutCards from "@/config/about-cards.json";

const WORLD_Z = aboutCards.find((c) => c.title === "Coding").position[2];

export default function Coding() {
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [hideDebug, setHideDebug] = useState(false);

  const timeoutRef = useRef(null);

  const inView = useTargetReached(WORLD_Z, null, 65);

  // Single t: 0→1, shared by both windows — scale = 1 + sin(t*π)*0.15
  const { t } = useSpring({
    from: { t: 0 },
    to: { t: inView ? 1 : 0 },
    config: { duration: 500 },
  });
  const scale = t.to((v) => 1 + Math.sin(v * Math.PI) * 0.15);

  useEffect(() => {
    if (focusedWindow === "Lights") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setHideDebug(true);
    } else {
      if (hideDebug) {
        timeoutRef.current = setTimeout(() => {
          setHideDebug(false);
          timeoutRef.current = null;
        }, 150);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [focusedWindow, hideDebug]);

  return (
    <group>
      <ClickBoundary
        onInside={() => setFocusedWindow("Debug")}
        onOutside={() => {
          setFocusedWindow((prev) => (prev === "Debug" ? null : prev));
        }}
      >
        <a.group scale={scale}>
          <DebugWindow isFocused={focusedWindow === "Debug"} hide={hideDebug} />
        </a.group>
      </ClickBoundary>

      <ClickBoundary
        onInside={() => setFocusedWindow("Lights")}
        onOutside={() => {
          setFocusedWindow((prev) => (prev === "Lights" ? null : prev));
        }}
      >
        <a.group scale={scale}>
          <LightsWindow isFocused={focusedWindow === "Lights"} />
        </a.group>
      </ClickBoundary>
    </group>
  );
}
