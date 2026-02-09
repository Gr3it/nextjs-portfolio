import NotFoundLink from "@/components/mixed/notFoundLink";
import React from "react";

export const metadata = {
  title: "Are you lost?",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6">
      <p className="text-[var(--grey)] font-light text-sm md:text-base mb-2 tracking-[0.3em] uppercase">
        404 — You've gone off-road
      </p>

      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center leading-tight">
        Lost in <span className="text-[var(--accent-color)]">transit.</span>
      </h1>

      <NotFoundLink />

      <div className="absolute bottom-8 left-8 opacity-60">
        <span className="text-[var(--grey)] text-[10px] md:text-xs font-mono uppercase tracking-[0.4em]">
          Error: Page_Not_Found_Sequence
        </span>
      </div>
    </main>
  );
}
