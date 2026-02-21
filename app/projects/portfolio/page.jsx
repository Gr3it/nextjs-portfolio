import FlagDemo from "./FlagDemo";
import VehicleFleet from "@/components/3D/entities/vehicleFleet";
import {
  ProjectContainer,
  ProjectHero,
  ProjectHighlight,
  ProjectInsight,
  ProjectLayout,
  ProjectSection,
  ProjectTechStack,
  ProjectTypography,
  ProjectVerticalStack,
  ProjectTripleImageDiff,
  ProjectModelViewer,
  ProjectSingleImage,
} from "@/components/ui/projects";
import React from "react";

const PAGE_DATA = {
  title: "Portfolio",
  description:
    "An interactive 3D experience powered by game-inspired navigation",
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
        <ProjectTripleImageDiff
          images={[
            "/images/Portfolio/Wireframe.png",
            "/images/Portfolio/Clay.png",
            "/images/Portfolio/Render.png",
          ]}
        />
      </ProjectHighlight>

      <ProjectContainer>
        {/* SECTION 1: CONTEXT & VISION */}
        <ProjectSection>
          <ProjectLayout cols="2-1" alignItems="center">
            <div>
              <ProjectTypography variant="eyebrow">
                The Backstory
              </ProjectTypography>
              <ProjectTypography variant="title">
                A Vision Beyond 2D
              </ProjectTypography>
              <ProjectTypography variant="body">
                The journey began with my first portfolio in 2021—a traditional
                React application that, while functional, suffered from
                technical debt, poor SEO practices, and an over-reliance on
                client-side rendering. As I evolved as a developer, I realized
                that my personal site shouldn't just be a list of links; it
                should be a testament to my technical curiosity and my passion
                for interactive storytelling.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Inspired by Bruno Simon's legendary portfolio and modern
                websites featuring interactive SVG paths, I envisioned a
                vertical scrolling adventure. The concept was simple yet
                ambitious: a scroll-driven vehicle traversing a predefined
                narrative path through my projects, character, and skills. The
                goal was to transform standard navigation into an immersive
                exploration, where every scroll feel like a step forward in a
                curated journey.
              </ProjectTypography>
            </div>
            <ProjectTechStack
              items={[
                "Next.js",
                "React Three Fiber",
                "Three.js",
                "Valtio",
                "Godot",
                "Blender",
                "gltfjsx",
                "Drei",
              ]}
            />
          </ProjectLayout>
        </ProjectSection>

        {/* SECTION 2: THE PIPELINE */}
        <ProjectSection>
          <ProjectLayout cols="1-2" alignItems="center">
            <ProjectModelViewer aspect="">
              <VehicleFleet />
            </ProjectModelViewer>
            <ProjectVerticalStack>
              <div>
                <ProjectTypography variant="eyebrow">
                  Development
                </ProjectTypography>
                <ProjectTypography variant="title">
                  The Engineering Pipeline
                </ProjectTypography>
                <ProjectTypography variant="body">
                  Transitioning to a fully 3D site required a completely new
                  workload. Since I was starting from scratch with 3D
                  fundamentals, the site became my personal laboratory. I
                  developed a hybrid workflow where I leveraged Godot for level
                  design—specifically using its 3D GridMap system to compose
                  tiles into complex environments—before moving to Blender for
                  final fine-tuning and export.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  To bridge the gap between heavy 3D assets and the browser, I
                  employed `gltfjsx` to generate performant React components.
                  This pipeline allowed me to maintain high-fidelity visuals
                  while keeping the scene highly reactive to the Next.js state
                  management system.
                </ProjectTypography>
              </div>
              <ProjectLayout cols="2">
                <ProjectInsight
                  title="Godot-to-Web Pipeline"
                  content="I used Godot's GridMap system to design the environments as modular tile-based worlds, then exported and optimized them for the web using Blender and gltfjsx."
                />
                <ProjectInsight
                  title="Blender Magic"
                  content="Every asset underwent rigorous optimization in Blender, from UV map editing and shading to complex rigging and animations for the custom vehicles."
                />
              </ProjectLayout>
            </ProjectVerticalStack>
          </ProjectLayout>
        </ProjectSection>

        {/* SECTION 3: KINETIC PHYSICS */}
        <ProjectSection>
          <ProjectVerticalStack>
            <ProjectLayout cols="2-1">
              <div>
                <ProjectTypography variant="eyebrow">Physics</ProjectTypography>
                <ProjectTypography variant="title">
                  The Science of Movement
                </ProjectTypography>
                <ProjectTypography variant="body">
                  One of the greatest technical hurdles was synchronizing the 3D
                  vehicle movement with traditional browser scrolling. I didn't
                  want linear movement; I wanted weight, momentum, and fluidity.
                  The vehicle shouldn't just "be" there; it should feel like it
                  is propelled by the user's intent.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  I implemented a custom `Vehicle1D` class that calculates
                  motion trajectories using 5th-degree polynomials (quintics).
                  By solving for boundary conditions—initial and final position,
                  velocity, and acceleration—the vehicles can smoothly
                  transition between targets even during active scrolling. This
                  prevents "snapping" and ensures the vehicle always stays
                  perfectly framed within the camera's safe zone.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  To achieve this, the vehicles follow a predefined path defined
                  by a Bezier curve built from specific input points. I
                  developed a custom tool to edit this curve, which was then
                  exported to Godot as tube geometry to design the world around
                  it. This ensures that the vehicle remains perfectly aligned
                  with the environment throughout the entire journey.
                </ProjectTypography>
              </div>
              <ProjectInsight
                title="Quintic Trajectories"
                content="The math handles 4th-order velocity functions, ensuring that acceleration and deceleration curves feel natural rather than robotic. The trajectory is recalculated on-the-fly whenever the user's scroll intent changes."
              />
            </ProjectLayout>
            <ProjectLayout cols="2">
              <ProjectSingleImage
                link="/images/Portfolio/SafeZone.png"
                width={2560}
                height={1278}
                alt="Debugging Safe Zone Tool"
              />
              <ProjectSingleImage
                link="/images/Portfolio/SupportCamera.png"
                width={2560}
                height={1278}
                alt="Support Camera View"
              />
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* SECTION 4: PERFORMANCE BATTLES */}
        <ProjectSection>
          <ProjectLayout cols="1-2">
            <ProjectVerticalStack>
              <ProjectInsight
                title="Draco Fixes"
                content="Solved Draco quantization artifacts (misaligned tiles) by creating a custom R3F component that traverses meshes and applies precision vertex rounding."
              />
              <ProjectInsight
                title="Rendering Efficiency"
                content="Balanced draw calls and vertex count by manually joining meshes with shared materials and implementing distance-based frustum culling chunks."
              />
            </ProjectVerticalStack>
            <div>
              <ProjectTypography variant="eyebrow">
                Optimization
              </ProjectTypography>
              <ProjectTypography variant="title">
                Performance Engineering
              </ProjectTypography>
              <ProjectTypography variant="body">
                A common pitfall in 3D web development is the initial loading
                experience. To avoid long wait times for Three.js and asset
                initialization, I pre-rendered the loading animation as a
                lightweight video. Using React's lazy loading, the full 3D
                engine only initializes once the visitor engages with the site,
                ensuring zero "white-screen" time.
              </ProjectTypography>
              <ProjectTypography variant="body">
                Moreover, I implemented a persistent 3D layout. The scene stays
                loaded in the background while users view project case studies,
                enabling instant transitions back to the 3D world without
                re-fetching assets. A custom "freeze-unfreeze" scroll logic
                ensures that when you exit a case study, you return exactly to
                the frame where you left off.
              </ProjectTypography>
            </div>
          </ProjectLayout>
        </ProjectSection>

        {/* SECTION 5: INTERACTIVE GEMS */}
        <ProjectSection>
          <ProjectVerticalStack>
            <ProjectLayout cols="2-1" alignItems="center">
              <div>
                <ProjectTypography variant="eyebrow">
                  User Experience
                </ProjectTypography>
                <ProjectTypography variant="title">
                  Playful Interactions
                </ProjectTypography>
                <ProjectTypography variant="body">
                  To maintain the "game" feel, I replaced the traditional
                  navigation menu with a Mario-inspired progress HUD.
                  Checkpoints reached in the 3D world turn red on the UI,
                  signaling progress.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The progress bar background itself is a dynamic gradient that
                  captures the primary colors of the 3D scene. This provides a
                  subtle visual preview of the "major colors" of each area,
                  making the HUD feel deeply connected to the environment the
                  player is traversing.
                </ProjectTypography>
                <ProjectTypography variant="body">
                  The site is filled with interactive easter eggs, such as the
                  "Carbon" code tabs. Users can modify the actual code—changing
                  lighting parameters or enabling debug features—within a safe
                  environment protected by a robust validation layer that
                  prevents crashes or malicious code execution.
                </ProjectTypography>
              </div>
              <FlagDemo />
            </ProjectLayout>
            <ProjectLayout cols="3" className="mt-12">
              <ProjectInsight
                expand
                title="Minecraft Voxel Canvas"
                content="A custom 3D playground built in Minecraft and exported as a voxel canvas. It features editor-style tools like an orientation gizmo (X, Y, Z), a coordinate grid, and world axes, alongside interactive elements like the RGB sheep."
              />
              <ProjectInsight
                expand
                title="Interactive Validation"
                content="The 'Carbon' code components feature a real-time validation layer. This allows users to tweak scene parameters safely without crashing the 3D engine."
              />
              <ProjectInsight
                expand
                title="Seamless Transitions"
                content="Navigation between pages is entirely fluid thanks to a persistent 3D layout. The background scene remains active during transitions, eliminating reload times and maintaining immersion."
              />
            </ProjectLayout>
          </ProjectVerticalStack>
        </ProjectSection>

        {/* SECTION 6: REFLECTIONS */}
        <ProjectSection>
          <ProjectVerticalStack>
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div>
                <ProjectTypography variant="eyebrow">
                  Conclusion
                </ProjectTypography>
                <ProjectTypography variant="title">
                  Continuous Growth
                </ProjectTypography>
              </div>
              <ProjectTypography variant="body">
                This portfolio is the result of 12 months of self-driven
                research and technical experimentation. It marks my transition
                from a traditional web developer to someone capable of
                architecting complex 3D environments, blending the
                responsiveness of React with the depth of real-time rendering.
              </ProjectTypography>
              <ProjectTypography variant="body">
                More than just a showcase, this project served as a definitive
                bridge between two worlds: the precision of high-performance
                engineering and the creativity of game design. From solving
                kinetic math problems to optimizing vertex precision, every
                technical victory has solidified my commitment to building
                immersive digital experiences at the intersection of code and
                interactive art.
              </ProjectTypography>
              <ProjectInsight
                title="The Next Milestone"
                content="Future updates will focus on heightening the sensory experience. I plan to implement dynamic area titles that overlay when transitioning between zones, refine CSS micro-animations for non-3D pages, and integrate spatial audio to bring the 3D environments to life."
              />
            </div>
          </ProjectVerticalStack>
        </ProjectSection>
      </ProjectContainer>
    </>
  );
}
