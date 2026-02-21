import {
  ProjectContainer,
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectLayout,
  ProjectSection,
  ProjectSingleImage,
  ProjectTechStack,
  ProjectTypography,
  ProjectVerticalStack,
  ProjectModelViewer,
} from "@/components/ui/projects";
import React from "react";
import ProgressionGraph from "./ProgressionGraph";

const PAGE_DATA = {
  title: "Space Pirates",
  description:
    "Bridging traditional RPG mechanics with transparent, player-owned digital assets",
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
          link={"/images/SpacePirates/Preview.webp"}
          width={1792}
          height={1024}
          alt="Space Pirates banner"
          className="h-full"
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: The Genesis */}
        <ProjectSection>
          <ProjectVerticalStack>
            <ProjectLayout cols="2-1">
              <div>
                <ProjectTypography variant="eyebrow">
                  The Evolution
                </ProjectTypography>
                <ProjectTypography variant="title">
                  From Smart Contract Sandbox to immersive RPG
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Space Pirates began in July 2022 as an ambitious playground
                  for blockchain exploration. At the time, the goal was to push
                  the boundaries of Solidity by implementing a comprehensive
                  suite of Web3 features: staking mechanisms, ERC-1155
                  multi-token standards, coin splitting for decentralized
                  revenue, and MasterChef-inspired reward engines.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  I led a team of three, acting as the lead architect and
                  mentor. My role involved training the other two members on
                  Solidity best practices, performing rigorous code reviews, and
                  optimizing gas consumption for every transaction. By the end
                  of this phase, I had personally authored the majority of the
                  26 complex smart contracts that formed the backbone of the
                  initial system. However, as colleagues moved toward other
                  academic and professional paths, the project entered a
                  hiatus—awaiting a vision that would truly bridge the gap
                  between "technology" and "entertainment."
                </ProjectTypography>
              </div>
              <ProjectVerticalStack>
                <ProjectInsight
                  title="Leadership & Mentoring"
                  content="Managing the team required translating complex blockchain concepts into actionable tasks, maintaining a high contribution weight while ensuring code quality through rigorous reviews and best practices."
                />
                <ProjectTechStack
                  title="Early Foundation"
                  items={[
                    "Solidity",
                    "Hardhat",
                    "ERC-1155",
                    "Chai",
                    "Etherjs",
                    "Openzeppelin/contracts",
                  ]}
                />
              </ProjectVerticalStack>
            </ProjectLayout>
            <ProjectSingleImage
              link="/images/SpacePirates/OldRoadmap.png"
              width={2930}
              height={1574}
              alt="Old Roadmap: Visualizing 26+ Interconnected Smart Contracts"
            />
            <ProjectTypography variant="caption">Old Roadmap</ProjectTypography>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 2: Game Design Pivot */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <ProjectTechStack
              title="Advanced Tech Stack"
              alignment="left"
              items={[
                "Solidity",
                "Avalanche L1",
                "Advanced Game Math",
                "DALL·E 3 & AI Concept Art",
                "Game design",
              ]}
            />
            <div>
              <ProjectTypography variant="eyebrow">
                The Revamp
              </ProjectTypography>
              <ProjectTypography variant="title">
                A "Game-First" Philosophy
              </ProjectTypography>
              <ProjectTypography variant="body">
                Returning to the project for my University Thesis in 2024, I
                executed a 180-degree pivot. I realized that for a Web3 game to
                succeed, it must first be an excellent game. I discarded the
                original focus on pure contract complexity to embrace intensive
                Game Design research. This involved an exhaustive study of
                balancing concepts and analyzing dozens of industry-leading
                titles to deconstruct their combat flow, world-building
                mechanics, and player retention strategies.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The result was an exhaustive and interconnected Game Design
                Document (GDD) that detailed every facet of the universe: from
                the lore of floating planetary islands to the exact mathematical
                formulas governing combat, progression, and the economy. This
                shift ensured that every technical choice served the player's
                immersion, making the blockchain layer a powerful—but often
                invisible—ally.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Deep Dive into Mechanics */}
        <ProjectSection>
          <ProjectVerticalStack>
            <div>
              <ProjectTypography variant="eyebrow">
                Core Gameplay
              </ProjectTypography>
              <ProjectTypography variant="title" className="mb-12">
                Tactical 5v5 Turn-Based Battles
              </ProjectTypography>
            </div>

            <ProjectLayout cols="2" alignItems="start">
              <div className="space-y-6">
                <ProjectTypography variant="subtitle">
                  Strategic Positioning
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Unlike standard RPGs, Space Pirates uses a{" "}
                  <strong>Priority Target System</strong>. Players arrange their
                  five Familiars on a grid where front-line units act as
                  physical shields. Back-line damage dealers or healers cannot
                  be targeted unless the enemy uses specialized "piercing" or
                  "area-of-effect" attacks. This forces a constant chess-like
                  struggle for board control.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The strategic depth is multiplied by:
                  <br />
                  <strong>• Triple Role Synergy:</strong> Balancing Attack
                  (glass cannons), Defense (heavy tanks), and Support
                  (buffers/healers).
                  <br />
                  <strong>• Elemental Cycle:</strong> An 8-element system with
                  15-30% modifiers, ensuring every team has a counter.
                  <br />
                  <strong>• Status Mastery:</strong> 8 distinct states (Frozen,
                  Burned, Paralyzed, etc.) that interact with specific spells to
                  trigger devastating combos.
                </ProjectTypography>
              </div>

              <ProjectVerticalStack>
                <ProjectSingleImage
                  link="/images/SpacePirates/ElementalAdvantage.png"
                  width={1240}
                  height={548}
                  alt="Elemental Advantage"
                />
                <ProjectInsight
                  title="Combat Design"
                  content="The 5v5 system is tuned for high-stakes decision making. By enforcing front-line protection, I created a layer of depth where target priority and turn-order manipulation become more critical than raw power."
                />
              </ProjectVerticalStack>
            </ProjectLayout>
            <ProjectSingleImage
              link="/images/SpacePirates/BattleScheme.png"
              width={3006}
              height={1024}
              alt="Combat Scheme"
            />
            <ProjectTypography variant="caption">
              Positioning of Familiars in battles
            </ProjectTypography>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 4: Mathematical Precision */}
        <ProjectSection>
          <ProjectLayout cols="1-2">
            <ProjectVerticalStack>
              <ProgressionGraph title="Days to Familiar Level Progression" />
            </ProjectVerticalStack>
            <div>
              <ProjectTypography variant="eyebrow">
                The Methodology
              </ProjectTypography>
              <ProjectTypography variant="title">
                Balance Through Simulation
              </ProjectTypography>
              <ProjectTypography variant="body">
                To guarantee a fair and engaging experience, I moved away from
                "guesswork" and into rigorous simulation. Using{" "}
                <strong>GeoGebra and Excel</strong>, I plotted every variable in
                the game. I established a core damage formula that balances
                additive and multiplicative bonuses to prevent the "stat-creep"
                common in modern RPGs.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Progression was calibrated to provide a constant sense of 'Aha!'
                moments. By analyzing the time-to-level for both player and
                Familiar, I created a synced curve that keeps the challenge
                relevant across all stages of exploration, from the first impact
                point of the ship to the final conquest of the 100-floor Tower.
              </ProjectTypography>
              <ProjectInsight
                title="Analytical Balancing"
                content="Leveraging cubic regression models helped me simulate long-term progression, ensuring that the 'effort-to-reward' ratio remains consistent across 500+ days of expected gameplay."
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: The "Invisible" Blockchain Layer */}
        <ProjectSection>
          <ProjectVerticalStack>
            <div>
              <ProjectTypography variant="eyebrow">
                Blockchain Architecture
              </ProjectTypography>
              <ProjectTypography variant="title">
                Frictionless Web3 Ownership
              </ProjectTypography>
              <ProjectTypography variant="body">
                The most significant technical challenge was making the
                blockchain <strong>seamless</strong>. I architected a
                multi-layer system on an Avalanche L1:
              </ProjectTypography>
            </div>
            <ProjectLayout cols="3" className="mt-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <ProjectTypography variant="subtitle" className="mb-4">
                  Subsidized Gas
                </ProjectTypography>
                <ProjectTypography variant="body" className="text-sm">
                  A custom fee model where the game subsidizes transactions,
                  removing the need for players to own native gas tokens for
                  core interactions.
                </ProjectTypography>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <ProjectTypography variant="subtitle" className="mb-4">
                  Account Abstraction
                </ProjectTypography>
                <ProjectTypography variant="body" className="text-sm">
                  Players use Smart Contract Wallets. They can choose a managed
                  "Web2-like" login or bridge to a direct-ownership "Web3"
                  wallet at any time.
                </ProjectTypography>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <ProjectTypography variant="subtitle" className="mb-4">
                  Cross-Chain Economy
                </ProjectTypography>
                <ProjectTypography variant="body" className="text-sm">
                  Built-in interoperability allows in-game assets and currency
                  to be bridged to Avalanche's C-Chain for open market trading.
                </ProjectTypography>
              </div>
            </ProjectLayout>
            <ProjectSingleImage
              link="/images/SpacePirates/Architettura.png"
              height={720}
              width={1872}
              alt="Architecture Diagram"
            />
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 6: World Building */}
        <ProjectSection>
          <ProjectLayout cols="3" alignItems="center">
            <ProjectSingleImage
              link="/images/SpacePirates/Island1.jpg"
              width={1024}
              height={1024}
              alt="Floating Island Concept"
            />{" "}
            <div>
              <ProjectTypography variant="eyebrow">
                The Universe
              </ProjectTypography>
              <ProjectTypography variant="title">
                Floating Biomes
              </ProjectTypography>
              <ProjectTypography variant="body">
                The world of Space Pirates is fragmented into floating islands,
                each hosting a unique ecosystem and lore. These environments
                were designed to be more than just battle arenas; they are
                living spaces where exploration rewards players with narrative
                discoveries and unique NPC encounters.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The visual challenge was to maintain stylistic coherence across
                radically different biomes, from lush jungles to the frozen
                peaks of the outer islands, ensuring a unified feel throughout
                the exploration phase.
              </ProjectTypography>
            </div>
            <ProjectSingleImage
              link="/images/SpacePirates/Island2.jpg"
              width={1024}
              height={1024}
              alt="Floating Island Concept"
            />
          </ProjectLayout>
        </ProjectSection>

        {/* Section 7: Visual Pipeline */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <ProjectVerticalStack>
              <div>
                <ProjectTypography variant="eyebrow">
                  Visual Pipeline
                </ProjectTypography>
                <ProjectTypography variant="title">
                  From Dream to Mesh
                </ProjectTypography>

                <ProjectTypography variant="body">
                  The creative process leveraged AI integration as a rapid
                  style-prototyping tool. Using DALL·E 3, I generated
                  high-fidelity visual guides that served as a "graphical
                  vocabulary" to quickly communicate the intended aesthetic
                  direction of the project.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  These rough concepts allowed for the creation of initial 3D
                  prototypes to test scale, silhouette, and movement. While
                  these AI-assisted assets enabled me to build a cohesive vision
                  independently, they are designed as blueprints: in a full
                  production cycle, they would serve as the definitive brief for
                  professional artists to refine and evolve into final,
                  hand-crafted assets.
                </ProjectTypography>
              </div>
            </ProjectVerticalStack>

            <ProjectLayout cols="2" alignItems="center">
              <ProjectVerticalStack>
                <ProjectSingleImage
                  link="/images/SpacePirates/Azureon.jpeg"
                  width={1024}
                  height={1024}
                  alt="2D Concept"
                />
                <ProjectSingleImage
                  link="/images/SpacePirates/Kragor.jpeg"
                  width={1024}
                  height={1024}
                  alt="2D Concept"
                />
              </ProjectVerticalStack>
              <ProjectVerticalStack>
                <ProjectModelViewer modelPath="/models/spacePirates/Azureon-transformed.glb" />
                <ProjectModelViewer modelPath="/models/spacePirates/Kragor-transformed.glb" />
              </ProjectVerticalStack>
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 7: Retrospective & Future */}
        <ProjectSection>
          <ProjectLayout cols="1">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div>
                <ProjectTypography variant="eyebrow">
                  Final Thoughts
                </ProjectTypography>
                <ProjectTypography variant="title">
                  Lessons in Massive Project Management
                </ProjectTypography>
              </div>
              <ProjectTypography variant="body">
                Space Pirates has been more than just a project; it has been my
                professional forge. Spanning two years, it taught me how to
                manage vast amounts of documentation, how to lead and mentor a
                technical team, and how to remain disciplined when a vision
                exceeds available resources.
              </ProjectTypography>
              <ProjectTypography variant="body">
                While current constraints have placed the project on pause, the
                roadmap toward a Minimum Viable Product (MVP) is fully defined.
                Today, I would focus on 'Scaling Down to Scale Up'—streamlining
                the massive GDD into a core battle experience to reach the
                market faster. This project remains the definitive proof of my
                ability to synthesize complex backend engineering with
                player-centric game design.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
