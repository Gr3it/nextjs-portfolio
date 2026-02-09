import ProjectHero from "@/components/ui/projects/hero";
import React from "react";

const PAGE_DATA = {
  title: "Portfolio",
  description:
    "An interactive 3D experience powered by game-inspired navigation",
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
