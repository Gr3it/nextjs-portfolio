import {
  ProjectHero,
  ProjectHighlight,
  ProjectContainer,
  ProjectSection,
  ProjectLayout,
  ProjectTypography,
  ProjectInsight,
  ProjectTechStack,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import SurvivorEventDemo from "@/components/ui/projects/survivorEvent/Demo";
import React from "react";

const PAGE_DATA = {
  title: "Survivor.Io Event Tool",
  description:
    "Viral pathfinding tool with 750k+ views, powered by client-side computer vision",
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
        <SurvivorEventDemo />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: Context & Speed */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                The Opportunity
              </ProjectTypography>
              <ProjectTypography variant="title">
                Viral Speed-to-Market
              </ProjectTypography>
              <ProjectTypography variant="body">
                Survivor.Io events are fast-paced, 5-day challenges where
                efficiency is the difference between mediocre and top-tier
                rewards. I identified a recurring event featuring a 7x9 board
                where users had to navigate a 15-tile path to collect crates.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The most critical factor for this project was the{" "}
                <strong>time to deploy</strong>. Releasing the tool even one day
                late would have halved its value. I published a functional
                prototype within the <strong>first hour</strong> of the event
                starting. This "speed-first" strategy allowed the tool to
                capture the initial wave of community interest, eventually
                reaching over 750,000 views and being featured by top-tier
                YouTubers and official Discord guides.
              </ProjectTypography>
            </div>
            <ProjectTechStack
              items={[
                "HTML5",
                "Vanilla JS",
                "OpenCV.js",
                "Backtracking",
                "Netlify",
                "Google Analytics",
              ]}
            />
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Technical Logic */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <ProjectInsight
              title="Multi-Layer Optimization"
              content="The tool doesn't just find a path; it maximizes value. It prioritizes the highest coin yield first, then optimizes for secondary reward probability by targeting rarer crate types, all within the strict 15-tile constraint."
            />
            <div>
              <ProjectTypography variant="title">
                Pathfinding Efficiency
              </ProjectTypography>
              <ProjectTypography variant="body">
                To ensure 100% accuracy in reward maximization, I implemented a
                robust <strong>Backtracking Algorithm</strong>. While heuristic
                approaches (like A* or greedy searches) might have been faster
                for larger grids, the compact 7x9 board size allowed a
                exhaustive search to compute the absolute best solution in under{" "}
                <strong>2 seconds</strong>.
              </ProjectTypography>
              <ProjectTypography variant="body">
                This approach removed any guesswork for the players, providing a
                deterministic way to "win" the event. The logic was kept
                entirely in the browser, allowing the application to scale
                horizontally without any server-side bottleneck.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Vision Engineering */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                Computer Vision
              </ProjectTypography>
              <ProjectTypography variant="title">
                Client-Side OCR Logic
              </ProjectTypography>
              <ProjectTypography variant="body">
                To ensure universal compatibility, I avoided fixed-coordinate
                mapping, which would have failed across the myriad of screen
                aspect ratios in the mobile market. Instead, I engineered a
                dynamic grid-detection system that scans for pixel gradients at
                specific vertical percentages. This allows the tool to precisely
                isolate the board on any device—from ultra-wide tablets to
                notched smartphones—with zero manual calibration.
              </ProjectTypography>
              <ProjectTypography variant="body">
                As the tool's popularity grew, the developers launched a
                counter-strategy: starting from the{" "}
                <strong>3rd edition of the event</strong>, they introduced
                "camouflage" backgrounds with color signatures nearly identical
                to the crates. To overcome this, the tool employs{" "}
                <strong>OpenCV.js</strong> to calculate the{" "}
                <strong>Euclidean distance</strong> of each cell's average color
                against target profiles. This adaptive logic preserved the
                tool's effectiveness despite the developers' efforts to stop it.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Feedback Loop"
              content="I integrated an error-reporting system where users could send problematic screenshots. This 'crowdsourced' debugging allowed me to fine-tune the color-matching parameters for edge cases on specific devices in real-time."
            />
          </ProjectLayout>
        </ProjectSection>

        {/* Section 4: Analytics & Impact */}
        <ProjectSection>
          <ProjectLayout cols="1">
            <div className="text-center max-w-4xl mx-auto">
              <ProjectTypography variant="title">
                Market Disruption
              </ProjectTypography>
              <ProjectTypography variant="body">
                The tool's impact was so profound that it shifted the game's
                economy. In response, the developers eventually added an
                <strong>"auto-solver" feature</strong> directly into the game as
                a paid, pay-to-win mechanic. Seeing a free tool forced into the
                game's monetization strategy was a major validation of its
                effectiveness.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: Professional Growth */}
        <ProjectSection>
          <ProjectVerticalStack>
            <ProjectLayout cols="1-2" alignItems="center">
              <ProjectInsight
                title="Disruptive Innovation"
                content="Beyond the technical challenge, this project taught me about the power of transparency. By keeping the code in plain text, I invited the community to trust and analyze the tool, fostering a loyal user base that defended and shared the work."
              />
              <div>
                <ProjectTypography variant="title">
                  Scaling & Sustainability
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Building a tool that handles 750,000 views on a{" "}
                  <strong>zero-cost infrastructure</strong> (Netlify Free Tier +
                  Client-side logic) was a masterclass in scalable architecture.
                  It proved that complex utility doesn't always require
                  expensive cloud backends.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Today, I look back at the project not just as a successful
                  tool, but as a testament to the importance of speed, community
                  trust, and resilient engineering in the face of evolving
                  digital environments.
                </ProjectTypography>
              </div>
            </ProjectLayout>

            <div className="relative rounded-xl shadow-lg overflow-hidden aspect-video">
              <iframe
                src="https://lookerstudio.google.com/embed/reporting/4d7dd794-c59d-4511-b02a-d7bd83cead2b/page/kIV1C"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allowFullScreen
                tabIndex={-1}
              />
            </div>
            <ProjectTypography variant="caption">
              Google Analytics Dashboard
            </ProjectTypography>
          </ProjectVerticalStack>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
