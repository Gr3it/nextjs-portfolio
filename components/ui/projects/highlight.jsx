import React from "react";

export default function ProjectHighlight({ children }) {
  return (
    <section className="relative w-full h-[60rem] py-20 flex flex-col justify-center items-center bg-[var(--accent-color)] overflow-hidden">
      {children}
    </section>
  );
}
