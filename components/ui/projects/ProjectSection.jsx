import React from "react";

export default function ProjectSection({
  children,
  className = "",
  as: Component = "section",
}) {
  return (
    <Component
      className={`w-full py-8 md:py-12 border-t border-[var(--borderColor)] ${className} first:border-0 first:pt-0`}
    >
      {children}
    </Component>
  );
}
