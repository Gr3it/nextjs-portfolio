import React from "react";
import ProjectHero from "@/components/ui/projects/hero";
import ProjectGridShowcase from "@/components/ui/projects/gridShowcase";
import ProjectHighlight from "@/components/ui/projects/highlight";

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
    </>
  );
}
