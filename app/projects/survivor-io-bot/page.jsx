import {
  ProjectHero,
  ProjectHighlight,
  ProjectSingleImage,
} from "@/components/ui/projects";
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
          width={2539}
          height={1382}
          alt="Bot Running Img"
        />
      </ProjectHighlight>
    </>
  );
}
