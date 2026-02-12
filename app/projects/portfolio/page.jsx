import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import ProjectSingleImage from "@/components/ui/projects/singleImage";
import ProjectTripleImageDiff from "@/components/ui/projects/tripleImageDiff";
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
      <ProjectHighlight>
        <ProjectTripleImageDiff
          images={[
            "/images/Portfolio/Wireframe.png",
            "/images/Portfolio/Clay.png",
            "/images/Portfolio/Render.png",
          ]}
        />
        {/*         <ProjectSingleImage
          link={"/images/Portfolio/Preview.png"}
          alt="Staged Render"
        /> */}
      </ProjectHighlight>
    </>
  );
}
