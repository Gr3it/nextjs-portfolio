import ProjectFooter from "@/components/ui/projectFooter";
import ProjectNavbar from "@/components/ui/projectNavbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full flex-col items-center pt-16">
      <ProjectNavbar />
      {children}
      <ProjectFooter />
    </div>
  );
}
