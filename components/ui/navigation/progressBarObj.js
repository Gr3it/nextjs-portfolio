import React from "react";
import Checkpoint from "../icons/checkpoint";
import FlagPole from "../icons/flagPole";
import Star from "../icons/star";

const getAlignment = (alignment) => {
  if (alignment === "left") return " ml-1";
  if (alignment === "center") return " -translate-x-1/2";
  return "";
};

export function ProgressBarObj({
  callback = () => {},
  positionPercentage = 0,
  start = 0,
  type = "circle",
  reached = false,
}) {
  return (
    (type === "circle" && (
      <div
        id={`animate-perc-${start}`}
        onClick={callback}
        style={{ left: `${positionPercentage}%` }}
        className={
          "origin-bottom cursor-pointer h-3 w-3 absolute rounded-full top-1/2 -translate-1/2" +
          (reached ? " bg-red-500" : " bg-black")
        }
      />
    )) ||
    (type === "checkpoint" && (
      <div
        id={`animate-perc-${start}`}
        style={{ left: `${positionPercentage}%` }}
        className={
          "origin-bottom absolute cursor-pointer w-9 bottom-1/2 -translate-x-1/2" +
          (reached ? " text-red-500" : " text-black")
        }
        onClick={callback}
      >
        <Checkpoint />
      </div>
    )) ||
    (type === "flagpole" && (
      <div
        id={`animate-perc-${start}`}
        style={{ left: `${positionPercentage}%` }}
        className={
          "origin-bottom absolute cursor-pointer w-9 bottom-1/2 -translate-x-1/2" +
          (reached ? " text-red-500" : " text-black")
        }
        onClick={callback}
      >
        <FlagPole />
      </div>
    )) ||
    (type === "star" && (
      <div
        style={{ left: `${positionPercentage}%`, color: "#FFD700" }}
        className="absolute w-6 bottom-1/2 -translate-x-1/2 translate-y-1/2"
      >
        <Star />
      </div>
    )) ||
    null
  );
}

export default function ProgressBarObjWithText({
  callback = () => {},
  positionPercentage = 0,
  start = 0,
  type = "circle",
  reached = false,
  text = "",
  textAlignment = "left",
}) {
  return (
    <>
      <ProgressBarObj
        callback={callback}
        positionPercentage={positionPercentage}
        start={start}
        type={type}
        reached={reached}
      />
      <div
        onClick={callback}
        style={{ left: `${positionPercentage}%` }}
        className={
          "cursor-pointer absolute top-full text-sm font-medium mt-0.5" +
          getAlignment(textAlignment)
        }
      >
        {text}
      </div>
    </>
  );
}
