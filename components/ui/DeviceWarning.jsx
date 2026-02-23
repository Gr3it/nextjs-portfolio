"use client";

import React, { useState, useEffect } from "react";

export default function DeviceWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the warning in this session
    if (sessionStorage.getItem("device-warning-dismissed")) return;

    // Mobile check: usually < 1024px width or vertical orientation
    const isSmallScreen = window.innerWidth < 1024;
    const isVertical = window.innerHeight > window.innerWidth;

    if (isSmallScreen || isVertical) {
      setIsVisible(true);
      // Trigger animation after a small delay
      setTimeout(() => setShowContent(true), 100);
    }
  }, []);

  const handleDismiss = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("device-warning-dismissed", "true");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-[var(--background)] border border-[var(--borderColor)] rounded-4xl p-4 sm:p-6 max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 ${showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* Abstract background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent-color)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--accent-color)] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700" />

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[var(--grey)] hover:text-[var(--foreground)] hover:bg-[var(--hoverBg)] rounded-full transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col landscape:flex-row-reverse items-center justify-between gap-8 landscape:gap-10">
          {/* Right Side (Icon & Title in landscape, Top in portrait) */}
          <div className="flex flex-col landscape:flex-row items-center gap-4 sm:gap-6 landscape:gap-4 shrink-0">
            <div className="relative mb-2 landscape:mb-0">
              <div className="absolute inset-0 bg-[var(--accent-color)] opacity-20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 landscape:w-14 landscape:h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-color)]/20 to-[var(--accent-color)]/5 border border-[var(--accent-color)]/20 flex items-center justify-center text-[var(--accent-color)] transition-all">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 landscape:w-7 landscape:h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl landscape:text-2xl font-black tracking-[-0.04em] leading-[1.1] sm:leading-[0.9] text-[var(--foreground)] uppercase flex flex-col items-center landscape:items-start text-center landscape:text-left transition-all">
              <span className="text-[var(--accent-color)] text-[10px] sm:text-sm landscape:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold mb-1 sm:mb-2 landscape:mb-0.5 ml-1">
                Optimized for
              </span>
              Desktop View
            </h2>
          </div>

          {/* Left Side (Description & Button in landscape, Bottom in portrait) */}
          <div className="flex flex-col items-center landscape:items-start flex-1 min-w-0">
            <p className="text-sm sm:text-base landscape:text-base text-[var(--grey)] leading-relaxed mb-6 sm:mb-8 landscape:mb-6 text-center landscape:text-left px-2 landscape:px-0">
              To fully experience the interactive world and high-quality 3D
              content, we highly recommend using a{" "}
              <span className="text-[var(--foreground)] font-medium underline decoration-[var(--accent-color)]/40 underline-offset-4">
                computer
              </span>{" "}
              or rotating your device to{" "}
              <span className="text-[var(--foreground)] font-medium underline decoration-[var(--accent-color)]/40 underline-offset-4">
                landscape mode
              </span>
              .
            </p>

            <button
              onClick={handleDismiss}
              className="group/btn relative w-full landscape:w-auto landscape:px-10 py-3.5 sm:py-4 bg-[var(--accent-color)] text-[var(--foreground)] font-bold rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(73,175,142,0.2)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                Continue anyway
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="translate-x-0 group-hover/btn:translate-x-1 transition-transform w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
