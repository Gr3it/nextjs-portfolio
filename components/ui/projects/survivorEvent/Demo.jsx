"use client";

import "./style.css";
import React, { useState } from "react";

export default function SurvivorEventDemo() {
  const ROWS = 9;
  const COLS = 7;
  const START_ROW = 4;
  const START_COL = 3;

  const [grid, setGrid] = useState(Array(ROWS * COLS).fill("0"));
  const [pathClasses, setPathClasses] = useState(Array(ROWS * COLS).fill(""));

  const chestLegend = [
    {
      id: "2",
      label: "Common Chest",
      displayValue: 5,
      internalValue: "5",
      img: "box_2.png",
    },
    {
      id: "3",
      label: "Rare Chest",
      displayValue: 10,
      internalValue: "11",
      img: "box_3.png",
    },
    {
      id: "4",
      label: "Epic Chest",
      displayValue: 25,
      internalValue: "28",
      img: "box_4.png",
    },
  ];

  const getMaxProfit = (board, row, col, steps, visited) => {
    if (steps.length === 16) {
      return {
        profit: steps.reduce((acc, step) => acc + board[step.row][step.col], 0),
        directions: steps.map((s) => s.direction).join(", "),
      };
    }

    const directions = [
      { dr: -1, dc: 0, dir: "u" },
      { dr: 1, dc: 0, dir: "d" },
      { dr: 0, dc: -1, dir: "l" },
      { dr: 0, dc: 1, dir: "r" },
    ];
    let maxProfit = { profit: -1, directions: "" };

    for (const d of directions) {
      const newRow = row + d.dr;
      const newCol = col + d.dc;

      if (
        newRow >= 0 &&
        newRow < ROWS &&
        newCol >= 0 &&
        newCol < COLS &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        steps.push({ row: newRow, col: newCol, direction: d.dir });

        const currentResult = getMaxProfit(
          board,
          newRow,
          newCol,
          steps,
          visited,
        );
        if (currentResult.profit > maxProfit.profit) {
          maxProfit = currentResult;
        }

        visited[newRow][newCol] = false;
        steps.pop();
      }
    }
    return maxProfit;
  };

  const handleCalculate = () => {
    const newPathClasses = Array(ROWS * COLS).fill("");

    const matrix = [];
    for (let i = 0; i < ROWS; i++) {
      matrix.push(
        grid.slice(i * COLS, i * COLS + COLS).map((v) => parseInt(v)),
      );
    }

    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    visited[START_ROW][START_COL] = true;

    const result = getMaxProfit(
      matrix,
      START_ROW,
      START_COL,
      [{ row: START_ROW, col: START_COL, direction: "" }],
      visited,
    );

    if (result.profit === -1) return;

    const dirs = result.directions.split(", ").filter(Boolean);

    let currR = START_ROW;
    let currC = START_COL;
    const pathPositions = [{ r: currR, c: currC }];

    dirs.forEach((dir) => {
      if (dir === "u") currR--;
      else if (dir === "d") currR++;
      else if (dir === "l") currC--;
      else if (dir === "r") currC++;
      pathPositions.push({ r: currR, c: currC });
    });

    pathPositions.forEach((pos, i) => {
      const index = pos.r * COLS + pos.c;
      const incomingDir = i === 0 ? "s" : getOppositeDir(dirs[i - 1]);
      const outgoingDir = i === pathPositions.length - 1 ? "f" : dirs[i];

      newPathClasses[index] = `path-cell ${incomingDir}${outgoingDir}`;

      if (outgoingDir !== "f") {
        newPathClasses[index] += ` arrow-${outgoingDir}`;
      }
    });

    setPathClasses(newPathClasses);
  };

  const getOppositeDir = (dir) => {
    const opposites = { u: "d", d: "u", l: "r", r: "l" };
    return opposites[dir] || "";
  };

  const cycleChest = (index) => {
    if (index === 31) return;
    const values = ["0", "5", "11", "28"];
    const nextValue = values[(values.indexOf(grid[index]) + 1) % values.length];
    const newGrid = [...grid];
    newGrid[index] = nextValue;
    setGrid(newGrid);
  };

  const handleReset = () => {
    setGrid(Array(ROWS * COLS).fill("0"));
    setPathClasses(Array(ROWS * COLS).fill(""));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4 sm:gap-10 xl:gap-20">
      <p className="font-bold text-2xl sm:text-4xl xl:text-6xl text-center">
        App Demo
      </p>
      <div className="w-full h-full flex flex-row items-center justify-center gap-3 md:gap-6 xl:gap-10">
        <div className="grid grid-cols-7 gap-[1px] sm:gap-1 bg-[#6e3e2b] p-1 sm:p-2 rounded-lg shadow-2xl shrink-0">
          {grid.map((val, i) => (
            <div
              key={i}
              onClick={() => cycleChest(i)}
              className={`relative cell w-[22px] h-[22px] sm:w-[32px] sm:h-[32px] md:w-10 md:h-10 xl:w-16 xl:h-16 flex items-center justify-center cursor-pointer ${
                i === 31 ? "selected-character" : `selected-${val}`
              } ${pathClasses[i]}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:gap-4 xl:gap-6 w-[160px] sm:w-[220px] xl:w-full max-w-xs p-2 sm:p-4 xl:p-6 border-2 rounded-xl xl:rounded-2xl bg-white/5 shrink-0">
          <div className="flex flex-col gap-1 sm:gap-2 xl:gap-3 p-2 sm:p-3 xl:p-4 bg-black/10 rounded-lg xl:rounded-xl">
            <p className="text-[10px] sm:text-xs xl:text-sm uppercase tracking-wider font-bold">
              Instructions
            </p>
            <p className="text-[10px] sm:text-xs xl:text-md font-light leading-snug">
              Click on the squares to cycle through chest types.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2 xl:gap-3 p-2 sm:p-3 xl:p-4 bg-black/10 rounded-lg xl:rounded-xl">
            <p className="text-[10px] sm:text-xs xl:text-sm uppercase tracking-wider font-bold">
              Chest Legend
            </p>
            {chestLegend.map((chest) => (
              <div
                key={chest.id}
                className="flex items-center gap-2 sm:gap-3 xl:gap-4"
              >
                <div className="w-5 h-5 sm:w-8 sm:h-8 xl:w-10 xl:h-10 flex-shrink-0 bg-[#6e3e2b] rounded-md overflow-hidden p-0.5 sm:p-1">
                  <img
                    src={`/images/SurvivorIoEventTool/${chest.img}`}
                    alt={chest.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] xl:text-xs font-normal uppercase leading-tight">
                    {chest.label}
                  </span>
                  <span className="text-[8px] sm:text-[10px] xl:text-sm font-mono font-light leading-tight">
                    Value: {chest.displayValue}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 xl:gap-3">
            <button
              onClick={handleCalculate}
              className="h-8 md:h-10 xl:h-14 text-[10px] sm:text-xs xl:text-base w-full bg-[var(--foreground)] text-[var(--accent-color)] rounded-lg xl:rounded-xl font-bold uppercase tracking-wide transition-transform cursor-pointer hover:bg-[var(--foreground)]/80 active:scale-95"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="h-8 md:h-10 xl:h-14 text-[10px] sm:text-xs xl:text-base w-full border-2 rounded-lg xl:rounded-xl font-bold uppercase tracking-wide transition-all cursor-pointer hover:bg-[var(--foreground)]/10 active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
