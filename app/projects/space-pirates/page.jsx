import {
  ProjectHero,
  ProjectHighlight,
  ProjectSingleImage,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Space Pirates",
  description:
    "Bridging traditional RPG mechanics with transparent, player-owned digital assets",
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
          link={"/images/SpacePirates/preview.webp"}
          width={1792}
          height={1024}
          alt="Space Pirates banner"
        />
      </ProjectHighlight>
    </>
  );
}
