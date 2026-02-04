import React, { memo } from "react";
import Image from "next/image";
import { Html } from "@react-three/drei";

export const ProjectImagePreview = memo(({ images, hover }) => {
  if (!images) return null;
  return (
    <group>
      <Html
        pointerEvents="none"
        center
        transform
        sprite
        zIndexRange={[40, 0]}
        style={{
          transition: "opacity 0.2s ease",
          opacity: hover ? 1 : 0,
        }}
      >
        <div className="text-[var(--background)] w-[300px] rounded-tr-4xl rounded-bl-4xl border-6 overflow-hidden after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:border-x-[20px] after:border-x-transparent after:border-t-[20px] ">
          <Image
            priority
            loading="eager"
            src={images}
            alt="Project preview"
            width={300}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </div>
      </Html>
    </group>
  );
});
