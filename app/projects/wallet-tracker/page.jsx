import React from "react";
import ProjectHero from "@/components/ui/projects/hero";

export default function Page() {
  return (
    <>
      <ProjectHero
        title={"Wallet Tracker"}
        description={
          "A multi-chain visualizer for EVM-compatible assets and portfolio valuation"
        }
      />
    </>
  );
}
