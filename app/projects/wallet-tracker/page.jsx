import {
  ProjectContainer,
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectSection,
  ProjectSingleImage,
  ProjectTechStack,
  ProjectTypography,
  ProjectVerticalStack,
  ProjectLayout,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Wallet Tracker",
  description:
    "A cross-chain DeFi portfolio visualizer built as a high-speed proof of concept for real-time asset tracking",
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
          alt="Wallet Tracker Dashboard"
          className="h-full"
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: Context & Vision */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow" content="The Pitch" />
              <ProjectTypography
                variant="title"
                content="Bridging TradFi and DeFi Tracking"
              />
              <ProjectTypography variant="body">
                In 2022, while the DeFi ecosystem was expanding rapidly, many
                traditional investment tracking tools lacked native blockchain
                support. I identified an opportunity to bridge this gap by
                developing a proof of concept for a prominent financial
                influencer who owned a portfolio tracking platform.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The goal was to demonstrate how their existing infrastructure
                could seamlessly support crypto assets. I built this functional
                prototype in a single-day development sprint, focusing on
                speed-to-market and demonstrating core feasibility rather than
                production-ready scalability.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="Business Proactivity"
                content="By delivering a working PoC within 24 hours, I showcased the agility required in the Web3 space, transforming a technical idea into a strategic business proposal."
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Architecture */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="Pragmatic Engineering"
                content="To avoid the gas costs and complexity of deploying custom Multicall contracts on every chain (especially Ethereum), I opted for individual contract queries."
              />
              <ProjectTechStack
                alignment="left"
                items={[
                  "React",
                  "Ethers.js",
                  "Axios",
                  "CoinMarketCap API",
                  "EVM Chains",
                ]}
              />
            </div>
            <div>
              <ProjectTypography variant="eyebrow" content="The Stack" />
              <ProjectTypography
                variant="title"
                content="Direct On-Chain Data Fetching"
              />
              <ProjectTypography variant="body">
                The application was architected as a React-based visualizer that
                leveraged direct on-chain queries. To provide a comprehensive
                view, I integrated with multiple EVM-compatible networks,
                ensuring a wide coverage of the then-dominant ecosystems.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Querying tokens across seven different chains (including
                Ethereum, BSC, Polygon, and Avalanche) required a hybrid
                approach: using the CoinMarketCap API for metadata and smart
                contract addresses, while using Ethers.js for the actual balance
                fetching.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Performance & Multi-Chain */}
        <ProjectSection>
          <div className="mb-12">
            <ProjectTypography variant="eyebrow" content="Implementation" />
            <ProjectTypography
              variant="title"
              content="Real-Time Cross-Chain Aggregation"
            />
          </div>

          <ProjectVerticalStack className="gap-24">
            <ProjectLayout cols="2-1" alignItems="center">
              <div>
                <ProjectTypography
                  variant="subtitle"
                  content="Async Fetching Logic"
                />
                <ProjectTypography variant="body">
                  To handle the significant load of querying dozens of contracts
                  per user, I implemented a concurrent fetching logic using{" "}
                  <code>Promise.all</code>. This allowed the dashboard to
                  populate incrementally as data points arrived, significantly
                  reducing the perceived latency.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The system supported a wide array of networks: Ethereum, BSC,
                  Polygon, Fantom, Avalanche, Arbitrum, and Moonriver, providing
                  a unified spaccato of assets regardless of their native chain.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="Frontend Strategy"
                content="The dashboard updated in real-time as each fetch resolved, providing immediate feedback even when some chains were slower than others."
              />
            </ProjectLayout>

            <ProjectLayout cols="1">
              <ProjectSingleImage
                link={"/images/WalletTracker/Coins.png"}
                width={2537}
                height={1274}
                alt="Asset Selection Interface"
              />
              <ProjectTypography variant="caption" className="text-center mt-4">
                Users could select which ERC20 tokens to track across all
                supported networks.
              </ProjectTypography>
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 4: Retrospective */}
        <ProjectSection>
          <ProjectLayout cols="2-1">
            <div>
              <ProjectTypography variant="eyebrow" content="Retrospective" />
              <ProjectTypography
                variant="title"
                content="A Foundational Web3 Experience"
              />
              <ProjectTypography variant="body">
                Looking back, this project was a foundational experience in
                handling blockchain data at scale. Today, I would optimize this
                architecture by utilizing indexing services to first identify
                which contracts a wallet has interacted with, rather than
                querying a static list.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Modern tools like Viem or specialized indexing APIs would now
                replace the manual RPC management, and Multicall would be
                standard practice to batch hundreds of queries into single
                calls, drasticallly reducing overhead and improving
                responsiveness.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Key Takeaway"
              content="Even a 24-hour prototype can validate complex technical integrations and provide a solid foundation for future, more scalable architectures."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
