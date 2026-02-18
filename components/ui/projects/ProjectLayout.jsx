import React from "react";

export default function ProjectLayout({
  cols = 1,
  children,
  alignItems = "items-start",
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    "1-2": "grid-cols-1 md:grid-cols-[1fr_2fr]",
    "2-1": "grid-cols-1 md:grid-cols-[2fr_1fr]",
    "1-3": "grid-cols-1 md:grid-cols-[1fr_3fr]",
    "3-1": "grid-cols-1 md:grid-cols-[3fr_1fr]",
    "1-4": "grid-cols-1 md:grid-cols-[1fr_4fr]",
    "4-1": "grid-cols-1 md:grid-cols-[4fr_1fr]",
  };

  return (
    <div
      className={`grid ${gridCols[cols] || gridCols[1]} gap-8 md:gap-12 ${alignItems} w-full h-full`}
    >
      {children}
    </div>
  );
}
