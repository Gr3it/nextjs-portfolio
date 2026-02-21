import {
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectLayout,
  ProjectParallaxDemo,
  ProjectContainer,
  ProjectSection,
  ProjectTechStack,
  ProjectTypography,
  ProjectSingleImage,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Flynet",
  description:
    "Bridging public flight information with secure administrative controls",
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
        <ProjectParallaxDemo />
      </ProjectHighlight>

      <ProjectContainer>
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">The Brief</ProjectTypography>
              <ProjectTypography variant="title">
                Legacy Tech meets Creative Vision
              </ProjectTypography>
              <ProjectTypography variant="body">
                Born as a high school assignment, Flynet was designed to manage
                a real-world-inspired airport database. While the core
                requirements focused on data handling through Java Servlets and
                JSP, I pushed the boundaries by integrating GSAP-powered
                animations to transform a utility tool into an immersive
                experience.
              </ProjectTypography>
            </div>
            <ProjectVerticalStack>
              <ProjectInsight
                title="Core Assignment"
                content="Create a functional airport management system with live-syncing flight boards and administrative CRUD capabilities."
              />

              <ProjectTechStack
                items={["Java Servlets", "JSP", "MySQL", "GSAP", "ScrollMagic"]}
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>
        <ProjectSection>
          <ProjectLayout cols="1">
            <ProjectLayout cols="1">
              <div>
                <ProjectTypography variant="eyebrow">
                  The Experience
                </ProjectTypography>
                <ProjectTypography variant="title">
                  Data at a Glance
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The platform features dedicated Arrival and Departure boards,
                  meticulously styled for readability. Using alternating row
                  patterns and a clean typographic hierarchy, flight information
                  is presented efficiently to the user.
                </ProjectTypography>
              </div>

              <ProjectLayout cols="2">
                <ProjectSingleImage
                  link="/images/Flynet/Departures.jpg"
                  height={1287}
                  width={2560}
                  alt="Departures Board"
                />
                <ProjectSingleImage
                  link="/images/Flynet/Arrivals.jpg"
                  height={1287}
                  width={2560}
                  alt="Arrivals Board"
                />
              </ProjectLayout>
            </ProjectLayout>

            <ProjectLayout cols="2" alignItems="center">
              <ProjectSingleImage
                link="/images/Flynet/Admin.jpg"
                height={1287}
                width={2560}
                alt="Administrative Panel"
              />
              <div>
                <ProjectTypography variant="eyebrow">
                  Management
                </ProjectTypography>
                <ProjectTypography variant="title">
                  Secure Control
                </ProjectTypography>
                <ProjectTypography variant="body">
                  A private administration area allows authorized users to
                  manage the airport's ecosystem. Using dedicated Java Servlets,
                  the system handles complex queries to manage flight schedules,
                  airlines, and real-time search filters.
                </ProjectTypography>
              </div>
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="flex-start">
            <div>
              <ProjectTypography variant="eyebrow">
                Reflection
              </ProjectTypography>
              <ProjectTypography variant="title">
                From JSP to the Modern Web
              </ProjectTypography>
              <ProjectTypography variant="body">
                Working with JSP highlighted the challenges of server-side
                rendering in legacy environments. Today, I would architect this
                using Next.js for its superior SEO, instant pre-fetching, and
                API routes, potentially adding a Redis layer for flight data
                caching to ensure sub-millisecond responsiveness.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Key Takeaway"
              content="Even within rigid academic constraints, aesthetic experimentation (like the parallax hero) can significantly elevate a project's impact."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
