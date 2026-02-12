import ProjectHero from "@/components/ui/projects/hero";
import ProjectHighlight from "@/components/ui/projects/highlight";
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
      <ProjectHighlight></ProjectHighlight>
    </>
  );
}
