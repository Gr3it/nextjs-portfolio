import {
  ProjectHero,
  ProjectHighlight,
  ProjectSingleImage,
} from "@/components/ui/projects";
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
          height={982}
          width={1512}
          alt="Plan It Homepage"
        />
      </ProjectHighlight>
    </>
  );
}
