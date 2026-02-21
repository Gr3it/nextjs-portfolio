import {
  ProjectHero,
  ProjectHighlight,
  ProjectContainer,
  ProjectSection,
  ProjectLayout,
  ProjectTypography,
  ProjectInsight,
  ProjectTechStack,
  ProjectMedia,
  ProjectSingleImage,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Survivor.Io Sniping Bot",
  description:
    "Real-time OCR automation and profit analysis for auction events",
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
          link={"/images/SurvivorIoBot/Preview.png"}
          width={2539}
          height={1382}
          alt="Bot Preview"
          className="h-full"
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: Context & The Opportunity */}
        <ProjectSection>
          <ProjectLayout cols="2-1">
            <div>
              <ProjectTypography variant="eyebrow">
                The Auction Challenge
              </ProjectTypography>
              <ProjectTypography variant="title">
                Strategic Decisions in Seconds
              </ProjectTypography>
              <ProjectTypography variant="body">
                Survivor.Io events often feature high-stakes lottery mechanics
                where players compete for a limited stock of rare items. During
                a specific one-week event, the game introduced an auction-style
                pool where timing and ROI calculation were the difference
                between massive rewards and wasted resources.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Identifying a profitable pool required calculating the value of
                all remaining items against the cost of buying out the lottery.
                With other players competing for the same prizes, any delay
                meant losing the opportunity. I developed this bot as a{" "}
                <strong>real-time decision support tool</strong> to bridge the
                gap between intuition and data-driven sniping.
              </ProjectTypography>
            </div>
            <ProjectTechStack
              items={["Python", "RapidOCR", "MSS", "Tkinter", "Regex"]}
            />
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Technical Architecture */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <ProjectInsight
              title="Consultative Automation"
              content="Due to the complexity of game window interaction and the short development window, the bot was designed as a supportive dashboard rather than a fully autonomous agent, keeping the player in the loop while providing instant calculations."
            />
            <div>
              <ProjectTypography variant="title">
                The Vision Pipeline
              </ProjectTypography>
              <ProjectTypography variant="body">
                The core of the bot lies in its speed. Using{" "}
                <strong>MSS</strong> for high-speed screenlooping, the
                application captures the game window with minimal latency. The
                frames are then processed by <strong>RapidOCR</strong> to
                extract item quantities and prices.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The extraction logic relies on a combination of{" "}
                <strong>Regular Expressions</strong> and template matching. By
                scanning for specific delimiters and casting the read text into
                expected item formats, the bot transforms raw pixels into a
                structured ROI analysis in milliseconds.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Data Integrity */}
        <ProjectSection>
          <ProjectVerticalStack>
            <div>
              <ProjectTypography variant="eyebrow">
                Reliability Engineering
              </ProjectTypography>
              <ProjectTypography variant="title">
                Validating OCR Noise
              </ProjectTypography>
              <ProjectTypography variant="body">
                OCR is notoriously unreliable in dynamic game environments with
                overlapping sprites and varying font weights. To prevent costly
                miscalculations, I implemented a{" "}
                <strong>checksum validation system</strong>.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The bot cross-references the sum of all individually detected
                items against the game's own "Total Items Remaining" field. If a
                discrepancy is detected (e.g., an "8" read as a "3"), the UI
                instantly signals a validation error to the user. This failsafe
                ensured that no decision was made based on corrupted or
                incomplete data.
              </ProjectTypography>
            </div>
            <ProjectSingleImage
              link="/images/SurvivorIoBot/OCRvalidationExample.png"
              alt="OCR Validation Signaling"
              width={2501}
              height={1375}
            />
            <ProjectTypography variant="caption">
              The validation system in action, alerting the user to a reading
              discrepancy.
            </ProjectTypography>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 4: Economic Impact */}
        <ProjectSection>
          <ProjectLayout cols="1-2">
            <ProjectInsight
              title="Hidden ROI"
              content="While top-tier prizes were the main focus, the bot revealed that lower tiers (B to G) often accounted for over 40% of the cost ammortization. Mental math usually misses these, but the bot factored every single item into the final profit projection."
            />
            <div>
              <ProjectTypography variant="title">
                Gaining the Competitive Edge
              </ProjectTypography>
              <ProjectTypography variant="body">
                The bot's true value was realized in the{" "}
                <strong>depth of its analysis</strong>. By instantly calculating
                the value of the entire prize pool including secondary rewards,
                it identified opportunities that other players dismissed as too
                expensive.
              </ProjectTypography>
              <ProjectTypography variant="body">
                While luck played a role in group distribution, the tool's
                effectiveness was validated by its performance in active use. A
                close collaborator using the same bot managed to secure multiple
                high-value auctions by acting on data that was simply invisible
                to mental estimation.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: Retrospective */}
        <ProjectSection>
          <ProjectLayout cols="1">
            <div className="text-center max-w-4xl mx-auto">
              <ProjectTypography variant="title">
                Lessons in Rapid Prototyping
              </ProjectTypography>
              <ProjectTypography variant="body">
                Created in just a few hours to meet a strict one-week deadline,
                this project was a masterclass in{" "}
                <strong>utility-first development</strong>. It proved that in
                time-sensitive scenarios, functional integrity and data
                validation are far more valuable than aesthetic polish.
              </ProjectTypography>
              <ProjectTypography variant="body">
                For future iterations, I aim to implement a more robust
                custom-trained OCR and explore direct memory injection for 100%
                data accuracy. However, as a proof-of-concept developed under
                pressure, the bot successfully transformed a process of
                guesswork into a precise, tactical operation.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
