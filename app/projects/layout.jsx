import ProjectFooter from "@/components/ui/projects/footer";
import ProjectNavbar from "@/components/ui/projects/navbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full flex-col items-center">
      <ProjectNavbar />
      {children}
      <ProjectFooter />
    </div>
  );
}
