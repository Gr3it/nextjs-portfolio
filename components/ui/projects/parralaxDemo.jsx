"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Shrikhand } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shrikhand",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectParralaxDemo() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom -100%",
          scrub: 0.5,
        },
      });

      tl.to(".cloud-img", { y: -350 }, 0)
        .to(".main-title", { y: -350, x: 400 }, 0)
        .to(".airplane-img", { y: -750, x: -800, scale: 0.5 }, 0)
        .to(".dark-panel", { y: "-100%" }, 0);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative container aspect-video shadow-2xl overflow-hidden m-auto"
    >
      <Image
        src="/images/Flynet/Background.png"
        alt="Background"
        fill
        className="object-cover background-img"
        priority
        sizes="1536px"
      />
      <Image
        src="/images/Flynet/Cloud.png"
        alt="Cloud"
        fill
        className="object-cover cloud-img"
        priority
        sizes="1536px"
      />

      <h2
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-[var(--background)] z-10 main-title ${shrikhand.className}`}
      >
        Flynet
      </h2>

      <Image
        src="/images/Flynet/Airplane.png"
        alt="Airplane"
        fill
        className="object-cover airplane-img z-20"
        priority
        sizes="1536px"
      />

      <div className="dark-panel absolute top-full left-0 w-full h-full bg-[var(--background)] z-30" />
    </div>
  );
}
