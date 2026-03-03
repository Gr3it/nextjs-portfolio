"use client";

import React, { useState, useEffect, useRef } from "react";
import worldConfig from "@/config/world-config.json";
import { useTargetReached } from "@/hooks/useTargetReached";

const ZoneTrigger = ({ section, onReached }) => {
  useTargetReached(section.start, onReached, 0);
  return null;
};

export default function ZoneNotifier() {
  const [activeZone, setActiveZone] = useState(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleZoneReached = (section) => {
    setActiveZone(section);
    setVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2500); // The title stays visible for 2.5 seconds
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Invisible triggers that monitor scroll position */}
      {worldConfig.sections.map((sec, index) => (
        <ZoneTrigger
          key={`zone-trigger-${index}`}
          section={sec}
          onReached={() => handleZoneReached(sec)}
        />
      ))}

      {/* Cinematic Black Radial Shadow */}
      <div
        className={`fixed inset-0 w-full h-screen pointer-events-none flex flex-col items-center justify-start pt-[15vh] transition-opacity duration-700 z-10`}
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 80%)   ",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="relative w-full flex justify-center">
          {worldConfig.sections.map((sec, index) => {
            const isActive = activeZone?.section === sec.section && visible;

            // Formats to match the "Hollow Knight" feel
            const titleText = sec.section
              ? sec.section.replace(/-/g, " ").toUpperCase()
              : "";
            const subtitleText = sec.text ? sec.text.toUpperCase() : "";

            return (
              <div
                key={`zone-title-${index}`}
                className={`absolute top-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-y-0 scale-100 blur-none"
                    : "opacity-0 -translate-y-2 scale-95 blur-[2px]"
                }`}
              >
                <h1 className="text-gray-100 text-4xl md:text-5xl tracking-[0.3em] font-medium">
                  {titleText}
                </h1>
                {subtitleText && (
                  <h2
                    className="text-gray-300 text-lg md:text-xl tracking-[0.4em] mt-3 font-light"
                    style={{ textShadow: "0px 2px 5px rgba(0,0,0,1)" }}
                  >
                    {subtitleText}
                  </h2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
