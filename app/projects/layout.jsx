import ProjectFooter from "@/components/ui/projects/footer";
import ProjectNavbar from "@/components/ui/projects/navbar";

export default function Layout({ children }) {
  return (
    <div className="relative flex w-full flex-col items-center bg-[var(--background)] opacity-[var(--contentVisibility)]">
      <ProjectNavbar />
      {children}
      <ProjectFooter />
    </div>
  );
}
