import {
  ProjectHero,
  ProjectHighlight,
  ProjectSingleImage,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Wallet Tracker",
  description:
    "A multi-chain visualizer for EVM-compatible assets and portfolio valuation",
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
          link={"/images/WalletTracker/Home.png"}
          width={2537}
          height={1274}
          alt="Wallet Tracker Preview"
        />
      </ProjectHighlight>
    </>
  );
}
