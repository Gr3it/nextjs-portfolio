import {
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectLayout,
  ProjectContainer,
  ProjectSection,
  ProjectTechStack,
  ProjectTypography,
  ProjectSingleImage,
  ProjectVerticalStack,
  ProjectGridShowcase,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Crypto Price Tracker",
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

      <ProjectContainer>
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">Context</ProjectTypography>
              <ProjectTypography variant="title">
                The Data Visualization Sandbox
              </ProjectTypography>
              <ProjectTypography variant="body">
                Developed in November 2021 as a personal deep-dive into the
                React ecosystem, this project served as a playground for
                mastering complex API integrations and high-performance data
                rendering. The goal was simple: recreate the sophisticated
                ranking and charting systems seen on leading platforms like
                CoinMarketCap using real-world market data.
              </ProjectTypography>
            </div>
            <ProjectVerticalStack>
              <ProjectInsight
                title="Learning Objective"
                content="Bridge the gap between static web apps and dynamic, data-heavy dashboards through RESTful API management."
              />
              <ProjectTechStack
                items={["React", "Express", "Node.js", "amCharts 5"]}
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <ProjectSingleImage
              link="/images/CryptoPriceTracker/Home.png"
              height={1080}
              width={1920}
              alt="Crypto Dashboard Home"
            />
            <div>
              <ProjectTypography variant="eyebrow">
                Architecture
              </ProjectTypography>
              <ProjectTypography variant="title">
                Bypassing CORS with Custom Proxy
              </ProjectTypography>
              <ProjectTypography variant="body">
                To interact with external market data securely, I architected a
                backend middleware using Express. This marked my first
                experience building a Node.js proxy to handle CORS policies,
                ensuring that client-side requests could communicate seamlessly
                with the CoinGecko API without exposing sensitive logic or
                hitting browser-level security blocks.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                Technical Challenge
              </ProjectTypography>
              <ProjectTypography variant="title">
                Synchronizing Paginated Ranking
              </ProjectTypography>
              <ProjectTypography variant="body">
                The most significant hurdle was maintaining data integrity
                during infinite scrolling. Because crypto rankings are highly
                volatile, a coin could shift positions between page fetches,
                leading to duplicate entries in the UI. I solved this by casting
                the incoming data streams into a Set-based validation layer,
                which automatically pruned duplicates and ensured a smooth,
                error-free scrolling experience even during high market
                volatility.
              </ProjectTypography>
            </div>
            <ProjectSingleImage
              link="/images/CryptoPriceTracker/Scrolled.png"
              height={1080}
              width={1920}
              alt="Infinite Scroll Preview"
            />
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="1">
            <div className="mb-12">
              <ProjectTypography variant="eyebrow">Features</ProjectTypography>
              <ProjectTypography variant="title">
                High-Fidelity Trading Charts
              </ProjectTypography>
              <ProjectTypography variant="body">
                Built with the amCharts 5 engine, the application provides
                interactive candlestick charts that allow users to analyze price
                movements across various timelines. Each asset page aggregates
                key metrics including trading volume, circulating supply, and
                real-time price correlations, delivering a professional-grade
                analytical toolset.
              </ProjectTypography>
            </div>
            <ProjectLayout cols="2">
              <ProjectSingleImage
                link="/images/CryptoPriceTracker/Bitcoin.png"
                height={1080}
                width={1920}
                alt="Bitcoin Chart Detail"
              />
              <ProjectSingleImage
                link="/images/CryptoPriceTracker/Ethereum.png"
                height={1080}
                width={1920}
                alt="Ethereum Chart Detail"
              />
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="flex-start">
            <div>
              <ProjectTypography variant="eyebrow">Evolution</ProjectTypography>
              <ProjectTypography variant="title">
                Growth & Refactoring Philosophy
              </ProjectTypography>
              <ProjectTypography variant="body">
                Looking back at this project, it represents a crucial milestone
                in my development journey. While the original "Single Component"
                structure for data fetching was functional, it taught me the
                importance of component modularity. Today, I would leverage
                Custom Hooks and specialized UI components to decouple data
                logic from presentation, further optimizing the application's
                maintainability and performance.
              </ProjectTypography>
            </div>
            <ProjectVerticalStack>
              <ProjectInsight
                title="Key Takeaway"
                content="Real-time data volatility requires robust state validation. The 'Set' solution remains a testament to early problem-solving skills."
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
