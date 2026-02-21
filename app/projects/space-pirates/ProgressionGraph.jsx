"use client";

import React, { useMemo } from "react";

export default function ProgressionGraph({ title = "Days To Familiar Level" }) {
  // LaTeX: Domain [0, 550], Function: sqrt(20 * x)
  const xMax = 550;
  const yMax = 110; // Slightly above sqrt(20 * 550) ≈ 104.8
  const padding = 70;
  const chartWidth = 500;
  const chartHeight = 500;
  const viewBoxWidth = chartWidth + padding * 2;
  const viewBoxHeight = chartHeight + padding * 2;

  // Generate path data
  const pathData = useMemo(() => {
    let points = [];
    const samples = 100;
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * xMax;
      const y = Math.sqrt(20 * x);

      // Map to SVG coordinates
      const svgX = padding + (x / xMax) * chartWidth;
      const svgY = padding + chartHeight - (y / yMax) * chartHeight;
      points.push(`${i === 0 ? "M" : "L"} ${svgX} ${svgY}`);
    }
    return points.join(" ");
  }, []);

  // Generate Ticks
  const xTicks = [0, 100, 200, 300, 400, 500];
  const yTicks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center rounded-3xl border border-white/10">
      <div className="w-full ">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
          Analytical Model
        </div>
        <div className="text-lg font-bold text-white">{title}</div>
      </div>

      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full"
      >
        {/* Grids */}
        {xTicks.map((tick) => (
          <line
            key={`grid-x-${tick}`}
            x1={padding + (tick / xMax) * chartWidth}
            y1={padding}
            x2={padding + (tick / xMax) * chartWidth}
            y2={padding + chartHeight}
            stroke="white"
            strokeOpacity="0.05"
            strokeDasharray="2 2"
          />
        ))}
        {yTicks.map((tick) => (
          <line
            key={`grid-y-${tick}`}
            x1={padding}
            y1={padding + chartHeight - (tick / yMax) * chartHeight}
            x2={padding + chartWidth}
            y2={padding + chartHeight - (tick / yMax) * chartHeight}
            stroke="white"
            strokeOpacity="0.05"
            strokeDasharray="2 2"
          />
        ))}

        {/* Axes (Thick like LaTeX) */}
        <line
          x1={padding}
          y1={padding + chartHeight}
          x2={padding + chartWidth}
          y2={padding + chartHeight}
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={padding + chartHeight}
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />

        {/* Tick Labels */}
        {xTicks.map((tick) => (
          <text
            key={`tick-x-${tick}`}
            x={padding + (tick / xMax) * chartWidth}
            y={padding + chartHeight + 25}
            fill="white"
            fillOpacity="0.5"
            fontSize="18"
            textAnchor="middle"
            className="font-mono"
          >
            {tick}
          </text>
        ))}
        {yTicks.map((tick) => (
          <text
            key={`tick-y-${tick}`}
            x={padding - 15}
            y={padding + chartHeight - (tick / yMax) * chartHeight + 5}
            fill="white"
            fillOpacity="0.5"
            fontSize="18"
            textAnchor="end"
            className="font-mono"
          >
            {tick}
          </text>
        ))}

        {/* Axis Labels */}
        <text
          x={padding + chartWidth / 2}
          y={viewBoxHeight - 15}
          fill="white"
          fillOpacity="0.6"
          fontSize="20"
          textAnchor="middle"
          className="font-medium italic"
        >
          days (x)
        </text>
        <text
          x={15}
          y={padding + chartHeight / 2}
          fill="white"
          fillOpacity="0.6"
          fontSize="20"
          textAnchor="middle"
          className="font-medium italic"
          transform={`rotate(-90, 15, ${padding + chartHeight / 2})`}
        >
          familiar lvl (y)
        </text>

        {/* The Curve */}
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        <path
          d={pathData}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]"
        />

        {/* LEGEND (LaTeX Style) */}
        <g transform={`translate(${padding + 20}, ${padding + 20})`}>
          {/* Legend Box */}
          <rect
            width="180"
            height="50"
            fill="#000"
            fillOpacity="0.7"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            rx="6"
          />
          {/* Legend Content */}
          <line
            x1="15"
            y1="25"
            x2="45"
            y2="25"
            stroke="#ef4444"
            strokeWidth="4"
          />
          <text
            x="55"
            y="31"
            fill="white"
            fontSize="20"
            className="font-mono font-bold"
          >
            (20·x)^½
          </text>
        </g>

        {/* End point pulse */}
        <circle
          cx={padding + chartWidth}
          cy={
            padding + chartHeight - (Math.sqrt(20 * xMax) / yMax) * chartHeight
          }
          r="5"
          fill="#ef4444"
          className="animate-pulse shadow-lg"
        />
      </svg>
    </div>
  );
}
