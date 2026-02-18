import React from "react";
import Image from "next/image";

export default function ProjectMedia({ 
  type = "image", 
  src, 
  alt = "Project asset", 
  caption, 
  className = "",
  aspectRatio = "aspect-video",
  priority = false
}) {
  return (
    <figure className={`w-full group ${className}`}>
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl bg-[var(--hoverBg)] border border-[var(--borderColor)] transition-transform duration-500 hover:scale-[1.01]`}>
        {type === "image" ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        ) : (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="text-sm text-[var(--grey)] italic mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
