import { ProjectFooter, ProjectNavbar } from "@/components/ui/projects";

export default function Layout({ children }) {
  return (
    <div className="relative flex w-full flex-col items-center bg-[var(--background)] opacity-[var(--contentVisibility)]">
      <ProjectNavbar />
      {children}
      <ProjectFooter />
    </div>
  );
}
