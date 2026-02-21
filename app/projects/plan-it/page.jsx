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
  ProjectZoomableImage,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Plan It",
  description:
    "Eliminating the cognitive burden of manual scheduling through rigorous software engineering",
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
          link={"/images/PlanIt/Calendar.png"}
          height={982}
          width={1512}
          alt="Plan It Calendar View"
          className="h-full"
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: The Scheduling Paradox */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                The Context
              </ProjectTypography>
              <ProjectTypography variant="title">
                The Scheduling Paradox
              </ProjectTypography>
              <ProjectTypography variant="body">
                Developed as a collaborative project for the Software
                Engineering course at the University of Trento, Plan It was born
                from a personal need: the desire to eliminate the mental energy
                spent on daily scheduling.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The core vision was a "smart" calendar that doesn't just store
                events, but actively manages them. By integrating user
                constraints—such as deadlines, priorities, and task weight—the
                application was designed to automatically find the optimal slot
                for every activity, from individual tasks to complex group
                meetings, balancing workload intensity to maintain a sustainable
                pace.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="The Vision"
                content="Transitioning from manual planning to high-level delegation, where the system understands human constraints and optimizes time for maximum productivity and minimum stress."
              />
              <ProjectTechStack
                items={[
                  "Next.js",
                  "Auth0",
                  "UML Modeling",
                  "OCL (Object Constraint Language)",
                  "MongoDB",
                  "Tailwind CSS",
                  "Figma Prototypes",
                ]}
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Engineering Process */}
        <ProjectSection>
          <div className="mb-12">
            <ProjectTypography variant="eyebrow" content="The Process" />
            <ProjectTypography
              variant="title"
              content="Design-First Engineering Rigor"
            />
          </div>

          <ProjectVerticalStack className="gap-24">
            <ProjectLayout cols="2" alignItems="center">
              <div>
                <ProjectTypography
                  variant="subtitle"
                  content="Requirements & Modeling"
                />
                <ProjectTypography variant="body">
                  The project followed a rigorous approach for requirements
                  elicitation and architectural design. We ensured that every
                  functional and non-functional requirement was accounted for
                  before a single line of code was written, creating a solid
                  foundation for the entire system.
                </ProjectTypography>
              </div>
              <ProjectSingleImage
                link="/images/PlanIt/Dashboard.png"
                height={1080}
                width={1920}
                alt="Plan It Dashboard Mockup"
              />
            </ProjectLayout>

            <ProjectLayout cols="2" alignItems="center">
              <ProjectSingleImage
                link="/images/PlanIt/Eventi.png"
                height={1080}
                width={1920}
                alt="Event Management View"
              />
              <div>
                <ProjectTypography
                  variant="subtitle"
                  content="Collaborative Peer Review"
                />
                <ProjectTypography variant="body">
                  As the Project Leader, I facilitated an environment of
                  constant exchange. Every UML diagram and OCL constraint was
                  cross-examined by all group members. This collaborative review
                  process was key to maximizing internal cohesion and ensuring
                  that the logic was bulletproof.
                </ProjectTypography>
              </div>
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 3: Architecture & DCL */}
        <ProjectSection>
          <ProjectLayout cols="1" alignItems="center">
            <div className="text-center mb-12">
              <ProjectTypography variant="eyebrow" content="The Architecture" />
              <ProjectTypography
                variant="title"
                content="Building a Scalable Data Core"
              />
              <ProjectTypography variant="body" className="mx-auto">
                One of the project's highlights was the creation of a
                comprehensive Domain Class Diagram (DCL). This architectural
                blueprint defines the complex relationships between users,
                calendars, flexible events, and synchronization interfaces.
              </ProjectTypography>
            </div>

            <div className="w-full max-w-5xl mx-auto">
              <ProjectZoomableImage
                link="/images/PlanIt/GraficoTotale.svg"
                height={2000}
                width={3000}
                alt="Detailed Domain Class Diagram"
                caption="Click to explore the full high-quality SVG"
              />
              <ProjectTypography variant="caption">
                The diagram illustrates the hierarchical user system, event
                constraints (priorities, deadlines), and integration points for
                external APIs like Google Calendar.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 4: Implementation - The MVP */}
        <ProjectSection>
          <div className="mb-12">
            <ProjectTypography variant="eyebrow" content="Implementation" />
            <ProjectTypography
              variant="title"
              content="From Architecture to a Functional MVP"
            />
          </div>

          <ProjectVerticalStack className="gap-24">
            <ProjectLayout cols="2" alignItems="center">
              <ProjectSingleImage
                link="/images/PlanIt/Login.png"
                height={1080}
                width={1920}
                alt="Auth0 Login Integration"
              />
              <div>
                <ProjectTypography
                  variant="subtitle"
                  content="Secure Authentication"
                />
                <ProjectTypography variant="body">
                  While the auto-scheduling logic remained a future roadmap
                  item, the MVP proved the technical feasibility of the core
                  stack. I personally implemented the Auth0 flow in Next.js,
                  ensuring that user data and private calendars were protected
                  behind a secure, industry-standard authentication layer.
                </ProjectTypography>
              </div>
            </ProjectLayout>

            <ProjectLayout cols="2" alignItems="center">
              <ProjectVerticalStack>
                <div>
                  <ProjectTypography
                    variant="subtitle"
                    content="Minimalist UI Design"
                  />
                  <ProjectTypography variant="body">
                    The UI follows a philosophy of "minimalism for focus." We
                    iterated on Figma to create a low-friction interface where
                    users can manage complex event constraints (priority,
                    location, deadlines) without feeling overwhelmed, staying
                    true to our goal of reducing cognitive load.
                  </ProjectTypography>
                </div>
                <ProjectInsight
                  title="Pragmatic Development"
                  content="The MVP was super faithful to the original Figma design, validating that our clean and minimal aesthetic was perfectly achievable with modern frontend frameworks like Next.js and Tailwind CSS."
                />
              </ProjectVerticalStack>
              <ProjectSingleImage
                link="/images/PlanIt/Attività.png"
                height={1080}
                width={1920}
                alt="Task Management Screen"
              />
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* Section 5: Outcomes & Learnings */}
        <ProjectSection>
          <ProjectLayout cols="2-1">
            <div>
              <ProjectTypography variant="eyebrow" content="Results" />
              <ProjectTypography
                variant="title"
                content="Engineering Excellence"
              />
              <ProjectTypography variant="body">
                The project was awarded a near-perfect grade of 29/30, with
                specific praise for the depth of our UML analysis and the
                robustness of the prototype. Beyond the grade, this experience
                taught me the critical importance of a collaborative leadership
                style.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Managing a multidisciplinary team where roles were clearly
                defined but ideas were constantly shared taught me that the best
                software isn't built by a single visionary, but by a cohesive
                group that isn't afraid to peer-review and refine each other's
                work.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Key Takeaway"
              content="A project's success is directly proportional to the clarity of its initial architecture. Rigorous design phase minimizes technical debt and creates a common language for the entire development team."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
