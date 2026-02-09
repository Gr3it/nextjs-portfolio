import ProjectHero from "@/components/ui/projects/hero";
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
    </>
  );
}
