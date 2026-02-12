import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import ProjectSingleImage from "@/components/ui/projects/singleImage";
import React from "react";

const PAGE_DATA = {
  title: "Survivor.Io Sniping Bot",
  description:
    "Real-time OCR automation and profit analysis for auction events",
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
          link={"/images/SurvivorIoBot/preview.png"}
          alt="Bot Running Img"
        />
      </ProjectHighlight>
    </>
  );
}
