import {
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectContainer,
  ProjectSection,
  ProjectTechStack,
  ProjectTypography,
  ProjectSingleImage,
  ProjectLayout,
  ProjectSingleVideo,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Color Screen Test",
  description:
    "A React Native utility for display testing and color accuracy comparison on hardware-level screens.",
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
        <ProjectSingleVideo
          link={"/images/ColorScreentest/Trailer.webm"}
          poster={"/images/ColorScreentest/ScreenLogo.jpg"}
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: The Challenge & Context */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                The Context
              </ProjectTypography>
              <ProjectTypography variant="title">
                From Classroom Debates to Mobile Development
              </ProjectTypography>
              <ProjectTypography variant="body">
                The idea for Color Screen Test was born during my high school
                years. My classmates and I frequently debated which smartphone
                had the superior display, but comparing them using YouTube
                videos was ineffective due to varying video quality and
                compression.
              </ProjectTypography>
              <ProjectTypography variant="body">
                I decided to solve this by building my very first mobile
                application. The goal was simple but technically focused: create
                a tool that could render pure, uncompressed colors across the
                entire screen, allowing for objective side-by-side hardware
                comparisons.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="Learning Objective"
                content="This project marked my transition from web development (React) to mobile (React Native), focusing on hardware-level display management and the Google Play Store publishing ecosystem."
              />
              <ProjectTechStack
                items={[
                  "React Native",
                  "Expo",
                  "Java (Native Modules)",
                  "Android Build System",
                  "Google Play Console",
                  "RGB Color Logic",
                ]}
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Core Utility & Features */}
        <ProjectSection>
          <div className="mb-12">
            <ProjectTypography variant="eyebrow">
              The Solution
            </ProjectTypography>
            <ProjectTypography variant="title">
              A Pure Visualizer for Display Testing
            </ProjectTypography>
          </div>

          <ProjectLayout cols="2" alignItems="center">
            <ProjectVerticalStack>
              <ProjectSingleImage
                link="/images/ColorScreentest/ScreenMenu1.jpg"
                height={4500}
                width={8000}
                alt="RGB Slider Interface"
              />
              <ProjectTypography variant="caption">
                Custom RGB slider interface for precision color selection.
              </ProjectTypography>
            </ProjectVerticalStack>
            <div>
              <ProjectTypography variant="subtitle">
                Presets and Precision Control
              </ProjectTypography>
              <ProjectTypography variant="body">
                The application provides two main modes of interaction. Users
                can either manually dial in an exact color using RGB sliders or
                choose from 24 curated presets—including an 8-step grayscale and
                16 vibrant colors—to quickly verify screen performance.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Beyond simple comparison, the app became a utility for detecting
                OLED burn-in. By displaying a solid white or grey background at
                full intensity across the entire screen, users could easily spot
                pixel degradation, especially in areas typically hidden by the
                navigation bar.
              </ProjectTypography>
              <ProjectInsight
                title="Burn-in Detection"
                content="The full-screen mode disables system bars to allow users to inspect the notification and navigation areas, which are the most susceptible to status-bar burn-in on OLED panels."
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Technical Deep Dive */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <div className="order-2 md:order-1">
              <ProjectTypography variant="eyebrow">
                Engineering
              </ProjectTypography>
              <ProjectTypography variant="title">
                Bypassing Native Constraints
              </ProjectTypography>
              <ProjectTypography variant="body">
                As my first React Native project, I quickly discovered that
                high-level abstractions sometimes get in the way of low-level
                control. One major hurdle was Android&apos;s system-wide dark
                mode, which would automatically overlay tint on my
                &quot;pure&quot; colors.
              </ProjectTypography>
              <ProjectTypography variant="body">
                To solve this, I had to move beyond the Expo abstraction and
                manually modify the Android build files in Java. I forced the
                application into a perpetual light theme within the native
                configuration, ensuring that the display hardware always
                received the raw RGB values I intended.
              </ProjectTypography>
              <div className="mt-8 flex flex-col gap-6">
                <ProjectInsight
                  title="Native Bridging"
                  content="Manipulated the Android Manifest and Java theme files to prevent system-level color overrides, a critical step for a tool dedicated to color accuracy."
                />
              </div>
            </div>
            <div className="flex flex-col gap-8 order-1 md:order-2">
              <ProjectSingleImage
                link="/images/ColorScreentest/ScreenMenu2.jpg"
                height={4500}
                width={8000}
                alt="Color Preset Grid"
              />
              <ProjectTypography variant="caption">
                The 24-color preset grid for rapid hardware switching.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 4: Interface Design */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="Minimalist HUD"
                content="The menu is a translucent bottom-overlay that occupies only 20% of the screen. A single tap hides it entirely, leaving nothing but the test color."
              />
            </div>
            <div>
              <ProjectTypography variant="eyebrow">
                User Experience
              </ProjectTypography>
              <ProjectTypography variant="title">
                Designed for Seamless Interaction
              </ProjectTypography>
              <ProjectTypography variant="body">
                The UI was designed to stay out of the way. I implemented a
                gesture-based system where a simple click anywhere on the screen
                would toggle the UI overlay. This HUD (Heads-Up Display) can be
                swiped left or right to switch between the RGB sliders and the
                preset grid.
              </ProjectTypography>
              <ProjectTypography variant="body">
                The translucent nature of the menu was a deliberate choice,
                allowing the user to still see the background color even while
                making adjustments, ensuring the transition from
                &quot;tuning&quot; to &quot;viewing&quot; felt fluid.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: Outcomes & Retrospective */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                Retrospective
              </ProjectTypography>
              <ProjectTypography variant="title">
                The Value of Shipping
              </ProjectTypography>
              <ProjectTypography variant="body">
                Color Screen Test was successfully published on the Google Play
                Store. While it was never intended to be a mass-market success,
                the process of generating all the required store assets,
                navigating the submission review, and handling binary versioning
                was an invaluable part of my education.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Today, I look back at this project as the moment I realized that
                building a tool is only half the battle—the other half is
                understanding the platform it runs on. It solidified my interest
                in mobile development and gave me the confidence to dive into
                native code when the situation demands it.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectSingleImage
                link="/images/ColorScreentest/3Devices.jpg"
                height={4500}
                width={8000}
                alt="Overview of the app screens including loading, sliders, and presets"
              />
              <ProjectTypography variant="caption">
                UI overview: showcase of the splash screen, custom RGB sliders,
                and the preset grid.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
