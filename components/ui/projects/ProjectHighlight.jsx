import React from "react";

import ProjectContainer from "./ProjectContainer";

export default function ProjectHighlight({ children }) {
  return (
    <ProjectContainer
      isContainer={true}
      className="h-[60rem] flex flex-col justify-center items-center bg-[var(--accent-color)] overflow-hidden"
      containerClassName="h-full flex flex-col justify-center items-center"
    >
      {children}
    </ProjectContainer>
  );
}
