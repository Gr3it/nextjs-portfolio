import {
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectContainer,
  ProjectSection,
  ProjectTechStack,
  ProjectTypography,
  ProjectSingleImage,
  ProjectDoubleImage,
  ProjectLayout,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Meta Empire",
  description:
    "Engineering a high-security NFT ecosystem with gas-optimized smart contracts and Merkle Tree whitelisting.",
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

      <ProjectContainer>
        {/* Section 1: Context & The Roman Brief */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow" content="The Context" />
              <ProjectTypography
                variant="title"
                content="Architecture for the Ancient World"
              />
              <ProjectTypography variant="body">
                In March 2022, during the height of the NFT movement, I was
                commissioned to architect the smart contract layer for Meta
                Empire—an ambitious collection inspired by the Roman Empire.
              </ProjectTypography>
              <ProjectTypography variant="body">
                As the sole blockchain developer for this project, I was
                responsible for translating a complex ancient-themed vision into
                a secure, immutable, and gas-efficient reality on the Ethereum
                blockchain. The project demanded a suite of features that
                balanced fair distribution with high-performance execution.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="Commissioned Role"
                content="Operating as the lead smart contract architect, working closely with creators with deep Web3 knowledge to build a robust on-chain foundation."
              />
              <ProjectTechStack
                items={[
                  "Solidity 0.8.11",
                  "Hardhat",
                  "Mocha & Chai",
                  "Merkle Tree Proofs",
                  "Dutch Auctions",
                  "ERC721 Standards",
                  "OpenZeppelin",
                ]}
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Security & The 100% Coverage Mandate */}
        <ProjectSection>
          <div className="mb-12">
            <ProjectTypography variant="eyebrow" content="The Engineering" />
            <ProjectTypography
              variant="title"
              content="Bulletproof Security Through Extreme Testing"
            />
          </div>

          <ProjectVerticalStack className="gap-24">
            <ProjectLayout cols="2" alignItems="center">
              <div>
                <ProjectTypography
                  variant="subtitle"
                  content="The 900+ Line Test Suite"
                />
                <ProjectTypography variant="body">
                  In blockchain, code is law and bugs are permanent. To combat
                  this, I developed an extensive testing suite using Hardhat,
                  Mocha, and Chai that exceeded 900 lines of code. This allowed
                  us to achieve 100% coverage, simulating every possible edge
                  case and attack vector before deployment.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The contract was designed to be state-of-the-art, following
                  strict industry standards. By utilizing the
                  Checks-Effects-Interactions pattern, I avoided the need for
                  external ReentrancyGuards, keeping the contract lean and
                  auditable.
                </ProjectTypography>
              </div>
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 3: Technical Innovation - Merkle Whitelisting */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <ProjectVerticalStack className="gap-8">
              <ProjectSingleImage
                link="/images/MetaEmpire/Carbon_Merkle.png"
                height={600}
                width={1200}
                alt="Merkle Tree Whitelist Implementation Code"
              />
              <ProjectTypography variant="caption" className="text-center">
                Merkle Tree verification within the minting function.
              </ProjectTypography>
            </ProjectVerticalStack>

            <ProjectVerticalStack className="gap-8">
              <div>
                <ProjectTypography variant="eyebrow" content="Innovation" />
                <ProjectTypography
                  variant="title"
                  content="Revolutionizing Whitelist Efficiency"
                />
                <ProjectTypography variant="body">
                  At the time, traditional whitelisting methods were often
                  gas-intensive. I implemented a Merkle Tree system for reducing
                  on-chain storage costs. By storing only the 32-byte Merkle
                  Root, users verified their membership through a provided
                  proof.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  This significantly lowered gas fees for the whitelist
                  verification, making the pre-sale accessible and fair for all
                  participants.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="The Gas Advantage"
                content="Using Merkle Trees turned an O(n) storage problem into an O(log n) verification problem, ensuring that as the whitelist grew, the gas costs remained stable and low."
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 4: Market Dynamics - The Dutch Auction */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <ProjectVerticalStack className="gap-8">
              <div>
                <ProjectTypography variant="eyebrow" content="Distribution" />
                <ProjectTypography
                  variant="title"
                  content="Dynamic Pricing for Fair Discovery"
                />
                <ProjectTypography variant="body">
                  For the public sale, I implemented a Dutch Auction mechanism.
                  The price was calculated dynamically based on time passed
                  since the start of the sale, utilizing a linear decay formula
                  highly optimized to minimize gas usage during the minting
                  process.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="Dynamic Scaling"
                content="The price decreased over set intervals, allowing the market to define the fair value of the assets while preventing bot-driven gas wars during the public launch."
              />
            </ProjectVerticalStack>
            <ProjectVerticalStack className="gap-8">
              <ProjectSingleImage
                link="/images/MetaEmpire/Carbon_Auction.png"
                height={600}
                width={1200}
                alt="Dutch Auction Price Logic Code"
              />
              <ProjectTypography variant="caption" className="text-center">
                Mathematical implementation of the Dutch Auction price decay.
              </ProjectTypography>
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: User Experience - Integrated Staking */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <ProjectVerticalStack className="gap-8">
              <ProjectSingleImage
                link="/images/MetaEmpire/Carbon_Staking.png"
                height={600}
                width={1200}
                alt="Integrated Staking and Transfer Logic Code"
              />
              <ProjectTypography variant="caption" className="text-center">
                Transfer overrides ensuring automatic unstaking for a better UX.
              </ProjectTypography>
            </ProjectVerticalStack>

            <ProjectVerticalStack className="gap-8">
              <div>
                <ProjectTypography variant="eyebrow" content="Functionality" />
                <ProjectTypography
                  variant="title"
                  content="Silent Staking & Interaction"
                />
                <ProjectTypography variant="body">
                  Beyond the minting process, I integrated a custom staking
                  logic directly into the main contract. This "Silent Staking"
                  allowed users to lock their assets for rewards without moving
                  them to an external vault.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  To ensure a seamless user experience, I overrode the transfer
                  functions to include an automatic unstake mechanism,
                  preventing common staking-related user errors.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="UX-Driven Smart Contracts"
                content="Every technical choice was made with the end-user in mind, ensuring that the complexity of the blockchain layer never compromised the simplicity of the experience."
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 6: Outcomes & Growth */}
        <ProjectSection>
          <ProjectLayout cols="2-1">
            <div>
              <ProjectTypography variant="eyebrow" content="Retrospective" />
              <ProjectTypography
                variant="title"
                content="A Foundation of Security"
              />
              <ProjectTypography variant="body">
                Meta Empire was a cornerstone project in my development as a
                Web3 engineer. It taught me the critical importance of proactive
                security and the psychological weight of managing immutable
                contracts.
              </ProjectTypography>
              <ProjectTypography variant="body">
                While external factors prevented the official public launch, the
                work remains a testament to high-quality blockchain engineering:
                optimized for the user, tested to the extreme, and ahead of the
                technological curve of its time.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Career Impact"
              content="This project solidified my obsession with secure, gas-optimized code—philosophies that I continue to apply to every decentralized application I build today."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
