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
        <div className="w-fit after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full after:border-x-[20px] after:border-x-transparent after:border-t-[20px] after:border-t-current text-[var(--background)]">
          <div className="border-6 border-current rounded-tr-4xl rounded-bl-4xl overflow-hidden">
            <Image
              priority
              src={images}
              alt="Project preview"
              width={300}
              height={200}
              className="max-h-[200px] w-auto block object-contain"
            />
          </div>
        </div>
      </Html>
    </group>
  );
});
