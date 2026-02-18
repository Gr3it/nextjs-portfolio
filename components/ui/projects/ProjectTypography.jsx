import React from "react";

export default function ProjectTypography({ 
  variant = "body", 
  children, 
  content, 
  className = "" 
}) {
  const text = content || children;

  const variants = {
    eyebrow: "text-[var(--grey)] font-light text-sm md:text-base tracking-[0.3em] uppercase mb-4 block",
    title: "text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6",
    subtitle: "text-xl md:text-2xl font-medium text-[var(--foreground)] opacity-90 mb-4",
    body: "text-base md:text-lg text-[var(--foreground)] opacity-80 leading-relaxed mb-4 max-w-3xl",
    caption: "text-sm text-[var(--grey)] italic mt-4 block text-center",
  };

  const Component = variant === "title" ? "h2" : variant === "subtitle" ? "h3" : "p";

  return (
    <Component className={`${variants[variant] || variants.body} ${className}`}>
      {text}
      {variant === "title" && <span className="text-[var(--accent-color)] ml-1">.</span>}
    </Component>
  );
}
