"use client";

import React, { useState, useEffect } from "react";
import InfoIcon from "../icons/info";
import creditsData from "@/config/credits.json";

export default function Credits() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 h-10 bg-[var(--background)] rounded-full shadow-lg cursor-pointer active:scale-95 transition-all duration-200 border border-white/10 hover:border-white/20 group uppercase font-bold tracking-tighter text-sm"
        title="Credits"
      >
        <span className="text-[var(--foreground)] group-hover:text-[var(--accent-color)] transition-colors inline-flex items-center">
          Credits
        </span>
        <div className="w-6 h-6 text-[var(--foreground)] group-hover:text-[var(--accent-color)] transition-colors flex items-center justify-center -mr-1">
          <InfoIcon />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] bg-[var(--background)] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--foreground)]">
                  Credits
                </h2>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">
                  3D Assets & External Resources
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all active:scale-90"
              >
                <svg
                  className="w-6 h-6 text-[var(--foreground)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 pb-16 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 grid-flow-row-dense">
                {creditsData.map((group, idx) => {
                  const itemsCount = group.assets ? group.assets.length : 0;
                  const colSpan = Math.max(1, Math.min(itemsCount, 3));

                  const spanClass =
                    colSpan === 1
                      ? "col-span-1"
                      : colSpan === 2
                        ? "col-span-1 md:col-span-2"
                        : "col-span-1 md:col-span-2 lg:col-span-3";

                  const innerGridClass =
                    colSpan === 1
                      ? "grid-cols-1"
                      : colSpan === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

                  return (
                    <div key={idx} className={`space-y-6 ${spanClass}`}>
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <div className="flex items-center gap-3 min-w-0">
                          <h3 className="text-xl font-bold text-[var(--foreground)] truncate">
                            {group.author}
                          </h3>
                          {group.link && (
                            <a
                              href={group.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 px-3 py-1 bg-white/5 hover:bg-[var(--accent-color)]/20 hover:text-[var(--accent-color)] rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
                            >
                              Profile
                            </a>
                          )}
                        </div>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>

                      <div className={`grid gap-4 ${innerGridClass}`}>
                        {group.assets.map((asset, aIdx) => (
                          <div
                            key={aIdx}
                            className="group relative p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-[var(--accent-color)]/30 transition-all flex flex-col h-full"
                          >
                            <div className="flex justify-between items-start gap-3 mb-3">
                              <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent-color)] transition-colors leading-snug">
                                {asset.name}
                              </h4>
                              <a
                                href={asset.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg transition-all border border-white/5 hover:border-[var(--accent-color)]/30"
                                title="View Source"
                              >
                                <span className="text-[10px] font-black tracking-tighter">
                                  SRC
                                </span>
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                              </a>
                            </div>

                            <div className="mt-auto space-y-2.5">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                  License
                                </span>
                                <span className="text-[11px] font-medium text-white/70 truncate">
                                  {asset.license}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                  Changes
                                </span>
                                <p className="text-[11px] font-medium text-white/70 line-clamp-2 leading-relaxed">
                                  {asset.changes}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
