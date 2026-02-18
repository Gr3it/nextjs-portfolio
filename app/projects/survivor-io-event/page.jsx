import { ProjectHero, ProjectHighlight } from "@/components/ui/projects";
import SurvivorEventDemo from "@/components/ui/projects/survivorEvent/Demo";
import React from "react";

const PAGE_DATA = {
  title: "Survivor.Io Event Tool",
  description:
    "Automated path optimization and OCR input for board-based events",
};

export const metadata = {
  title: PAGE_DATA.title,
  description: PAGE_DATA.description,
};

export default function Page() {
  return (
    <>
      <ProjectHero
        title={PAGE_DATA.title}
        description={PAGE_DATA.description}
      />
      <ProjectHighlight>
        <SurvivorEventDemo />
      </ProjectHighlight>
    </>
  );
}
