import React from "react";
import Image from "next/image";

export default function ProjectDoubleImage({
  linkLeft,
  linkRight,
  altLeft = "Project detail left",
  altRight = "Project detail right",
}) {
  return (
    <div className="relative container w-full h-full flex items-center justify-center m-auto">
      <div className="absolute left-[25%] top-4 -translate-x-1/2 w-5/12 h-full transition-transform -rotate-6">
        <Image
          src={linkLeft}
          alt={altLeft}
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="720px"
        />
      </div>

      <div className="absolute left-[75%] bottom-4 -translate-x-1/2 w-5/12 h-full transition-transform rotate-6">
        <Image
          src={linkRight}
          alt={altRight}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="720px"
        />
      </div>
    </div>
  );
}
