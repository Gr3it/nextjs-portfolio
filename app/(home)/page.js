import ProjectCard from "@/components/projectCard";
import Image from "next/image";

export default function Home({ is3d = true }) {
  const getConditionalProps = (props) => {
    return is3d ? {} : props;
  };

  return (
    <>
      <div
        {...getConditionalProps({
          "data-section": "Start",
          "data-sectioncolor": "var(--bg-home)",
        })}
        style={{ backgroundColor: "var(--bg-home)" }}
        className=" w-full    grid
    grid-cols-[repeat(32,var(--tile-size))]
    grid-rows-[repeat(16,var(--tile-size))]
    overflow-hidden
    justify-center
    items-center
    h-[calc(16*var(--tile-size))]"
      >
        home {is3d}
        {Array.from({ length: 32 * 16 }).map((_, i) => (
          <div
            key={i}
            className="border border-white/10 bg-white/5"
            style={{ width: "var(--tile-size)", height: "var(--tile-size)" }}
          />
        ))}
      </div>

      <div
        {...getConditionalProps({
          id: "My Projects",
          "data-section": "My Projects",
          "data-sectioncolor": "var(--bg-project-sec-1)",
        })}
        style={{ backgroundColor: "var(--bg-project-sec-1)" }}
        className="w-full flex items-center justify-center h-[99vh] flex-col"
      >
        <ProjectCard
          title="Space Pirates"
          description="Explore the galaxy as a rogue captain in Space Pirates! Collect and upgrade powerful familiars, master tactical combat, and uncover cosmic secrets in this action-packed space adventure."
          tag="Blockchain, Gaming"
        />
        <Image
          className="remove-rotation"
          src="/sedan-sports.png"
          width={125}
          height={125}
          alt="Galeon"
        />
        Projects Post Uni
      </div>
      <div
        {...getConditionalProps({
          "data-sectioncolor": "var(--bg-project-sec-2)",
        })}
        style={{ backgroundColor: "var(--bg-project-sec-2)" }}
        className="w-full flex flex-col gap-20 items-center justify-center h-[3000px]"
      >
        Projects Uni
        <div className="remove-rotation h-20 w-[40%] bg-red-500" />
        <div className="h-1 w-[66.5%] bg-red-500" />
        <div className="h-1 w-[80%] bg-red-500" />
        <div className="h-1 w-[99%] bg-red-500" />
      </div>
      <div
        {...getConditionalProps({
          "data-sectioncolor": "var(--bg-project-sec-3)",
        })}
        style={{ backgroundColor: "var(--bg-project-sec-3)" }}
        className="w-full flex items-center justify-center h-[1300px]"
      >
        Projects Highschool
      </div>

      <div
        {...getConditionalProps({
          id: "About Me",
          "data-section": "About Me",
          "data-sectioncolor": "var(--bg-about)",
        })}
        style={{ backgroundColor: "var(--bg-about)" }}
        className="w-full flex items-center justify-center h-[2000px]"
      >
        About
      </div>

      <div
        {...getConditionalProps({
          id: "Contact Me",
          "data-section": "Contact Me",
          "data-sectioncolor": "var(--bg-contact)",
        })}
        style={{ backgroundColor: "var(--bg-contact)" }}
        className="w-full flex items-center justify-center h-[2000px]"
      >
        Contact
      </div>

      <div
        {...getConditionalProps({
          "data-section": "End",
          "data-sectioncolor": "var(--bg-footer)",
        })}
        style={{ backgroundColor: "var(--bg-footer)" }}
        className="w-full flex items-center justify-center h-[400px]"
      >
        Footer
      </div>
    </>
  );
}
