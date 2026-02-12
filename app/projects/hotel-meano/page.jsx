import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import ProjectSingleImage from "@/components/ui/projects/singleImage";
import React from "react";

const PAGE_DATA = {
  title: "Hotel Meano",
  description:
    "Redefining hospitality through interactive booking and 3D visualization",
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
        <ProjectSingleImage link={"/images/HotelMeano/Home.jpg"} />
      </ProjectHighlight>
    </>
  );
}
