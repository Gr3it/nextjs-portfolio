import React from "react";

export default function ProjectTechStack({
  items = [],
  title = "Technologies used",
  alignment = "right",
}) {
  if (items.length === 0) return null;

  const containerAlignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const tagsAlignment = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={`flex flex-col gap-4 ${
        containerAlignment[alignment] || containerAlignment.right
      }`}
    >
      <p className="text-[var(--grey)] text-xs uppercase tracking-[0.2em]">
        {title}
      </p>
      <div
        className={`flex flex-wrap gap-3 ${
          tagsAlignment[alignment] || tagsAlignment.right
        }`}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-[var(--hoverBg)] border border-[var(--borderColor)] text-sm font-medium hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all duration-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
