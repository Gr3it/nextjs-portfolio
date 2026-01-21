import React, { useState, useEffect, useRef } from "react";
import LightsWindow from "./coding/LightWindow";
import DebugWindow from "./coding/DebugWindow";
import ClickBoundary from "@/components/3D/core/clickBoundary";

export default function Coding() {
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [hideDebug, setHideDebug] = useState(false);

  const timeoutRef = useRef(null);

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
        <DebugWindow isFocused={focusedWindow === "Debug"} hide={hideDebug} />
      </ClickBoundary>

      <ClickBoundary
        onInside={() => setFocusedWindow("Lights")}
        onOutside={() => {
          setFocusedWindow((prev) => (prev === "Lights" ? null : prev));
        }}
      >
        <LightsWindow isFocused={focusedWindow === "Lights"} />
      </ClickBoundary>
    </group>
  );
}
