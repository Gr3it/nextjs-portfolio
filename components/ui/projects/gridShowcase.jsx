import React from "react";
import Image from "next/image";

const gridPositions = [
  "col-start-2 row-start-1",
  "col-start-1 row-start-2",
  "col-start-3 row-start-2",
  "col-start-2 row-start-3",
  "col-start-4 row-start-3",
  "col-start-3 row-start-4",
];

export default function ProjectGridShowcase({ images = [] }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] grid grid-cols-4 grid-rows-4 items-center justify-items-center gap-8 h-[175%] aspect-square">
      {images.slice(0, 6).map((src, index) => (
        <div
          key={index}
          className={`relative w-full h-full flex items-center justify-center ${gridPositions[index]}`}
        >
          <div className="relative w-[175%] h-[175%] shrink-0">
            <Image
              src={src}
              alt={`Project screen ${index + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="966px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
