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
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Hotel Meano",
  description:
    "A pioneering hospitality platform featuring a pure CSS 3D interactive booking engine.",
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
          link="/images/HotelMeano/Home.jpg"
          height={927}
          width={1903}
          alt="Hotel Meano Home"
        />
      </ProjectHighlight>

      <ProjectContainer>
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow" content="The Challenge" />
              <ProjectTypography
                variant="title"
                content="Reimagining the Booking Experience"
              />
              <ProjectTypography variant="body">
                Developed as a high school graduation project from 5 years ago,
                this assignment originally requested a network infrastructure
                design (Cisco Packet Tracer) alongside a website. I saw an
                opportunity to go beyond a standard form-based interface. I
                wanted to give users a spatial understanding of their stay,
                allowing them to choose their room not just by list, but by
                physical location within the hotel structure.
              </ProjectTypography>
            </div>
            <ProjectVerticalStack>
              <ProjectInsight
                title="Constraint"
                content="Working without advanced 3D libraries like Three.js, the challenge was to create a convincing, interactive 3D environment using only standard web technologies available at the time."
              />
              <ProjectTechStack
                items={[
                  "PHP",
                  "MySQL",
                  "HTML5/CSS3",
                  "JavaScript (ES5)",
                  "AJAX",
                  "CSS Transforms",
                ]}
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="1">
            <ProjectLayout cols="1">
              <div>
                <ProjectTypography
                  variant="eyebrow"
                  content="The Core Innovation"
                />
                <ProjectTypography
                  variant="title"
                  content="Pure CSS 3D Architecture"
                />
                <ProjectTypography variant="body">
                  The centerpiece of the application is the interactive booking
                  map. Instead of using 3D rendering engines, I utilized CSS
                  perspective and transforms to construct a three-story hotel
                  model. Each room is a distinct HTML `div` element, positioned
                  in 3D space to reconstruct the building's floor plan.
                </ProjectTypography>
              </div>
            </ProjectLayout>
            <ProjectLayout cols="2"></ProjectLayout>

            <ProjectLayout cols="2" alignItems="center">
              <ProjectVerticalStack>
                <ProjectSingleImage
                  link="/images/HotelMeano/Page3.jpg"
                  height={928}
                  width={1920}
                  alt="User Data Entry"
                />
                <div className="mb-auto">
                  <ProjectTypography variant="eyebrow" content="System Logic" />
                  <ProjectTypography
                    variant="title"
                    content="Real-time Availability"
                  />
                  <ProjectTypography variant="body">
                    The booking flow is technically rigorous. When a user
                    selects their dates, an AJAX call queries the custom MySQL
                    database to check room status. The PHP backend returns the
                    availability, which dynamically updates the CSS classes of
                    the 3D room elements (e.g., turning occupied rooms red and
                    unclickable). This seamless connection between backend data
                    and frontend spatial visualization was a significant
                    technical feat.
                  </ProjectTypography>
                </div>
              </ProjectVerticalStack>
              <ProjectVerticalStack>
                <ProjectSingleImage
                  link="/images/HotelMeano/Page2.jpg"
                  height={1170}
                  width={1903}
                  alt="3D Room Selection Interface"
                />
                <ProjectSingleImage
                  link="/images/HotelMeano/Page1.jpg"
                  height={928}
                  width={1920}
                  alt="Date Selection Step"
                />
              </ProjectVerticalStack>
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="flex-start">
            <div>
              <ProjectTypography variant="eyebrow" content="Retrospective" />
              <ProjectTypography
                variant="title"
                content="Foundations of Full Stack"
              />
              <ProjectTypography variant="body">
                Looking back, Hotel Meano was a pivotal step in my journey. It
                taught me how to bridge the gap between creative frontend
                concepts—like a CSS-only 3D world—and solid backend logic. While
                the network design was the academic requirement, the booking
                engine became a playground for solving complex UX problems with
                ingenuity rather than heavy dependencies.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Key Takeaway"
              content="Constraints drive creativity. Building a 3D system without a 3D engine forced a deeper understanding of the DOM and CSS spatial properties."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
