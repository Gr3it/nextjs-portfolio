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
  ProjectGridShowcase,
  ProjectVerticalStack,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Smart Parking App",
  description:
    "A logistics-driven approach to student access and parking optimization",
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
            "/images/SmartParkingApp/loading_screen.png",
            "/images/SmartParkingApp/confirm_booking_page.png",
            "/images/SmartParkingApp/create_feed_page.png",
            "/images/SmartParkingApp/profile_page.png",
            "/images/SmartParkingApp/news_page.png",
            "/images/SmartParkingApp/open_feed_page.png",
          ]}
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* Section 1: The Challenge */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow" content="The Context" />
              <ProjectTypography
                variant="title"
                content="Solving the 'Far West' of Campus Parking"
              />
              <ProjectTypography variant="body">
                Developed for the Human-Computer Interaction course at the
                University of Trento, this project tackled the chaotic state of
                the Povo 1 parking lot. An unpaved, irregular space with no
                marked slots, it frequently led to blocked exits, unauthorized
                usage, and massive student frustration.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Our mission was to transition from a "first-come, first-served"
                chaos to a structured, digital ecosystem that respects user time
                and campus security, all while working within the constraints of
                an unmanaged physical space.
              </ProjectTypography>
            </div>
            <div className="flex flex-col gap-8">
              <ProjectInsight
                title="The Objective"
                content="Create a frictionless booking system that manages access and slot assignment without the need for expensive physical infrastructure or permanent pavement marking."
              />
              <ProjectTechStack
                items={[
                  "Axure RP",
                  "UI/UX Design",
                  "HCI Research",
                  "PACT Analysis",
                  "User Testing",
                  "Computer Vision Logic",
                ]}
              />
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 2: Research & Insights */}
        <ProjectSection>
          <ProjectLayout cols="1-2">
            <div>
              <ProjectTypography variant="eyebrow" content="The Process" />
              <ProjectTypography
                variant="title"
                content="Data-Driven Design Decisions"
              />
              <ProjectTypography variant="body">
                We didn't just design an app; we studied the pain points.
                Through PACT analysis and interviews with students, we
                discovered that the primary frustrations stemmed from the
                uncertainty of finding a spot upon arrival and the lack of a
                centralized channel for receiving real-time campus parking news
                and updates.
              </ProjectTypography>
            </div>

            <ProjectLayout cols="3">
              <ProjectSingleImage
                link="/images/SmartParkingApp/confirm_booking_page.png"
                height={845}
                width={390}
                alt="Booking a Parking Slot"
              />
              <ProjectSingleImage
                link="/images/SmartParkingApp/parking_page.png"
                height={845}
                width={390}
                alt="Parking Availability View"
              />
              <ProjectSingleImage
                link="/images/SmartParkingApp/news_page.png"
                height={845}
                width={390}
                alt="Campus News and Updates"
              />
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 3: Technical Innovation */}
        <ProjectSection>
          <ProjectLayout cols="2" alignItems="center">
            <ProjectLayout cols="2">
              <ProjectSingleImage
                link="/images/SmartParkingApp/loading_screen.png"
                height={845}
                width={390}
                alt="Parking Availability View"
              />
              <ProjectSingleImage
                link="/images/SmartParkingApp/log-in.png"
                height={845}
                width={390}
                alt="Parking Availability View"
              />
            </ProjectLayout>

            <ProjectVerticalStack>
              <div>
                <ProjectTypography variant="eyebrow" content="Logistics & CV" />
                <ProjectTypography
                  variant="title"
                  content="Visual Intelligence Over Physical Hardware"
                />
                <ProjectTypography variant="body">
                  Since the ground is unpaved, physical sensors were impractical
                  and costly. Our solution proposed using Computer Vision to
                  identify available space and assign 'virtual slots'. This
                  allows for a dynamic parking grid that can be reconfigured via
                  software without any construction work or cabling on the lot
                  itself.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Access is handled via the existing gate, upgraded with a QR
                  scanner. Entry is permitted exclusively through the app using
                  the institutional university account, ensuring that parking
                  remains reserved for verified campus members.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="Pragmatic Innovation"
                content="Instead of burying sensors in unpaved ground, we leveraged the university building's height. A single rooftop camera combined with AI vision provides a full, adaptable view of the lot at a fraction of the cost."
              />
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 4: Community Feed */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <div>
              <ProjectTypography
                variant="eyebrow"
                content="Community Engagement"
              />
              <ProjectTypography
                variant="title"
                content="The Ranked Reporting System"
              />
              <ProjectTypography variant="body">
                To bridge the gap between students and administration, we
                implemented a forum-style feed. Users can report issues like ice
                or surface damage. An upvote system ranks these reports,
                allowing the university to prioritize the most critical problems
                instead of being overwhelmed by individual emails or non-issues.
              </ProjectTypography>
            </div>
            <ProjectLayout cols="3">
              <ProjectSingleImage
                link="/images/SmartParkingApp/feed_page.png"
                alt="Community Feed"
                height={845}
                width={390}
              />
              <ProjectSingleImage
                link="/images/SmartParkingApp/open_feed_page.png"
                alt="Reporting an Issue"
                height={845}
                width={390}
              />
              <ProjectSingleImage
                link="/images/SmartParkingApp/create_feed_page.png"
                height={845}
                width={390}
                alt="Reporting an Issue"
              />
            </ProjectLayout>
          </ProjectLayout>
        </ProjectSection>

        {/* Section 5: My Role */}
        <ProjectSection>
          <ProjectLayout cols="2-1">
            <div>
              <ProjectTypography
                variant="eyebrow"
                content="Role & Leadership"
              />
              <ProjectTypography variant="title" content="Driving the Vision" />
              <ProjectTypography variant="body">
                As the Team Leader, I managed the multidisciplinary workflow,
                ensuring that our technical constraints didn't limit the depth
                of our solution. I personally focused on the low and
                medium-fidelity prototyping in Axure, translating complex
                logistical requirements into a simple, 1-click mobile interface
                that feels intuitive even in a hurry.
              </ProjectTypography>
            </div>
            <ProjectInsight
              title="Key Takeaway"
              content="In HCI, the best solution is often the most invisible one. By placing a camera on a roof instead of sensors in the ground, we solved a complex logistics problem with minimal infrastructure and maximum flexibility."
            />
          </ProjectLayout>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
