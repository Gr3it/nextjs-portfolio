import React from "react";

export default function ProjectInsight({
  title,
  content,
  icon: Icon,
  className = "",
  expand = false,
}) {
  return (
    <div
      className={`w-full p-8 rounded-3xl bg-[var(--hoverBg)] border border-[var(--borderColor)] hover:border-[var(--accent-color)] transition-all duration-300 group ${
        expand ? "h-full " : "h-fit "
      } ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-[var(--background)] flex items-center justify-center mb-6 text-[var(--accent-color)] group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
      )}
      <h4 className="text-xl font-bold mb-3 tracking-tight">{title}</h4>
      <p className="text-[var(--grey)] leading-relaxed">{content}</p>
    </div>
  );
}
