import React from "react";

export default function ProjectContainer({
  children,
  className = "",
  containerClassName = "",
  isContainer = true,
  as: Component = "section",
  noPadding = false,
}) {
  return (
    <Component
      className={`w-full ${!noPadding ? "py-12 md:py-16" : ""} ${className}`}
    >
      {isContainer ? (
        <div
          className={`w-full max-w-[1536px] mx-auto px-4 md:px-8 ${containerClassName}`}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
