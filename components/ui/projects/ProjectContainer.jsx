import React from "react";

export default function ProjectContainer({
  children,
  className = "",
  containerClassName = "",
  isContainer = true,
  as: Component = "section",
}) {
  return (
    <Component className={`w-full py-12 md:py-16 ${className}`}>
      {isContainer ? (
        <div className={`container mx-auto px-4 md:px-8 ${containerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
