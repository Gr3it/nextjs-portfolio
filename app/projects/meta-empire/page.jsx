import ProjectDoubleImage from "@/components/ui/projects/doubleImage";
import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
import React from "react";

const PAGE_DATA = {
  title: "Meta Empire",
  description:
    "Conquering the blockchain with strategic NFT drops and historic art",
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
        <ProjectDoubleImage
          linkLeft={"/images/MetaEmpire/Roman.jpg"}
          linkRight={"/images/MetaEmpire/Warrior.jpg"}
        />
      </ProjectHighlight>
    </>
  );
}
