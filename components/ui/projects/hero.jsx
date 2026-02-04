"use client";

import React from "react";

export default function ProjectHero({ title, description }) {
  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="container">
        <div className="max-w-6xl">
          <h1 className="text-[var(--grey)] font-light text-xl md:text-2xl tracking-[0.2em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {title}
          </h1>
          <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] md:leading-[1.05]">
            {description}
            <span className="text-[var(--accent-color)] ml-1">.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[var(--accent-color)] font-mono font-medium text-sm rotate-90 origin-center tracking-[0.3em] opacity-60 uppercase">
            Scroll
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--accent-color)] to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
