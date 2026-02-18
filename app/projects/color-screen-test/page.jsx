import {
  ProjectHero,
  ProjectHighlight,
  ProjectSingleVideo,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Color Screentest",
  description:
    "Full-screen RGB visualizer for screen testing and color comparison",
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
        <ProjectSingleVideo
          link={"/images/ColorScreenTest/Trailer.webm"}
          poster={"/images/ColorScreenTest/ScreenLogo.jpg"}
        />
      </ProjectHighlight>
    </>
  );
}
