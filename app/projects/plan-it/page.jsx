import ProjectGridShowcase from "@/components/ui/projects/gridShowcase";
import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import ProjectSingleImage from "@/components/ui/projects/singleImage";
import React from "react";

const PAGE_DATA = {
  title: "Plan It",
  description: "Smart calendar automation for individual and team productivity",
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
        <ProjectSingleImage
          link={"/images/PlanIt/Calendar.png"}
          alt="Plan It Homepage"
        />
      </ProjectHighlight>
    </>
  );
}
