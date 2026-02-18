import React from "react";
import Image from "next/image";

export default function ProjectSingleImage({
  link,
  height,
  width,
  alt = "Project detail",
}) {
  return (
    <div className="drop-shadow-2xl h-auto">
      <Image
        src={link}
        alt={alt}
        height={height}
        width={width}
        className="object-contain h-full"
        priority
      />
    </div>
  );
}
