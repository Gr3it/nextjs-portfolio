import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import ProjectParralaxDemo from "@/components/ui/projects/parralaxDemo";
import React from "react";

const PAGE_DATA = {
  title: "Flynet",
  description:
    "Bridging public flight information with secure administrative controls",
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
        <ProjectParralaxDemo />
      </ProjectHighlight>
    </>
  );
}
