"use client";

import { useState, useEffect, useRef } from "react";
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
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 2500);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <>
      {Object.values(worldConfig.sections).map((sec, i) => (
        <ZoneTrigger
          key={i}
          section={sec}
          onReached={() => handleZoneReached(sec)}
        />
      ))}

      {/* Cinematic shadow overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-700 z-10"
        style={{
          // Ellipse: 1338×366px (70%×40% of 1912×914), centered horizontally, Y at 15%
          background:
            "radial-gradient(ellipse 1338px 366px at 50% 15%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 80%)",
          opacity: visible ? 1 : 0,
        }}
      >
        {Object.values(worldConfig.sections).map((sec, i) => {
          const isActive = activeZone?.section === sec.section && visible;
          const title = sec.section?.replace(/-/g, " ").toUpperCase() ?? "";
          const subtitle = sec.text?.toUpperCase() ?? "";

          return (
            <div
              key={i}
              className="absolute inset-x-4 flex flex-col items-center text-center px-4 transition-all duration-700 ease-in-out"
              style={{
                top: "15%",
                transform: `translateY(-50%) translateY(${isActive ? "0px" : "-8px"})`,
                opacity: isActive ? 1 : 0,
                filter: isActive ? "none" : "blur(2px)",
                scale: isActive ? "1" : "0.95",
              }}
            >
              <h1 className="text-gray-100 text-3xl md:text-5xl tracking-[0.3em] font-medium">
                {title}
              </h1>
              {subtitle && (
                <h2
                  className="text-gray-300 text-base md:text-xl tracking-[0.4em] mt-3 font-light"
                  style={{ textShadow: "0px 2px 5px rgba(0,0,0,1)" }}
                >
                  {subtitle}
                </h2>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
