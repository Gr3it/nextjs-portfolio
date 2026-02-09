import ProjectHero from "@/components/ui/projects/hero";
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
    </>
  );
}
