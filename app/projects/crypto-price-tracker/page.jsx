import {
  ProjectGridShowcase,
  ProjectHero,
  ProjectHighlight,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Cripto Price Tracker",
  description: "Live crypto data visualization and interactive market charts",
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
        <ProjectGridShowcase
          images={[
            "/images/CryptoPriceTracker/Scrolled.png",
            "/images/CryptoPriceTracker/Ethereum.png",
            "/images/CryptoPriceTracker/Home.png",
            "/images/CryptoPriceTracker/Bitcoin.png",
            "/images/CryptoPriceTracker/Search.png",
            "/images/CryptoPriceTracker/BinanceCoin.png",
          ]}
        />
      </ProjectHighlight>
    </>
  );
}
