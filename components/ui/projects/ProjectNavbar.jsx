"use client";

import { usePathname } from "next/navigation";
import projectsConfig from "@/config/project-info.json";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import ArrowBack from "../icons/arrowBack";
import Github from "../icons/github";
import OpenInNew from "../icons/openInNew";
import Document from "../icons/document";
import { ProjectContainer } from ".";

const ICON_MAP = {
  github: Github,
  live: OpenInNew,
  figma: OpenInNew,
  azure: OpenInNew,
  notion: Document,
  drive: Document,
  default: OpenInNew,
};

const BASE_BUTTON_CLASS =
  "flex items-center gap-2 select-none font-medium py-2 px-4 rounded-2xl transition-all duration-200 hover:bg-[var(--hoverBg)]";
const ICON_WRAPPER_CLASS = "w-5 h-5 flex items-center justify-center";

export default function ProjectNavbar() {
  const pathname = usePathname();

  const project = useMemo(() => {
    const slug = pathname.split("/").filter(Boolean).pop();
    return projectsConfig[slug] || projectsConfig["default"];
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-color", project.keyColor);
    return () => root.style.removeProperty("--accent-color");
  }, [project.keyColor]);

  const NavLink = ({ href, label, type }) => {
    const Icon = ICON_MAP[type] || ICON_MAP.default;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BASE_BUTTON_CLASS} hover:text-[var(--accent-color)] text-sm md:text-base`}
      >
        <p>{label}</p>
        <span className={ICON_WRAPPER_CLASS}>
          <Icon />
        </span>
      </a>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center bg-[var(--background)] border-b border-[var(--borderColor)]">
      <ProjectContainer
        noPadding
        className="py-2"
        containerClassName="flex items-center"
      >
        <Link
          href="/"
          className={`${BASE_BUTTON_CLASS} shrink-0 sm:mr-auto`}
          scroll={false}
        >
          <span className={ICON_WRAPPER_CLASS}>
            <ArrowBack />
          </span>
          <p className="hidden sm:block">Back</p>
        </Link>

        {/* Vertical Separator - Only visible on mobile when 'Back' text is hidden */}
        <div className="w-[1px] h-5 bg-[var(--borderColor)] mx-2 shrink-0 sm:hidden" />

        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-2 md:gap-4 ml-auto min-w-max">
            {project?.links?.map((link, index) => (
              <NavLink
                key={index}
                href={link.url}
                label={link.label}
                type={link.type}
              />
            ))}
          </div>
        </div>
      </ProjectContainer>
    </nav>
  );
}
