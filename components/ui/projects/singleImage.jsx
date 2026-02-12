import React from "react";
import Image from "next/image";

export default function ProjectSingleImage({ link, alt = "Project detail" }) {
  return (
    <div className="container h-full m-auto drop-shadow-2xl aspect-video">
      <Image
        src={link}
        alt={alt}
        fill
        className="object-contain"
        priority
        sizes="1536px"
      />
    </div>
  );
}
