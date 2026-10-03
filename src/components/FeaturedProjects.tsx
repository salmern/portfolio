import { CaseStudyRow } from "@/components/CaseStudyRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const productionWork = projects.filter((p) => (p.homeSection ?? "work") === "work");

export function FeaturedProjects() {
  return (
    <section id="work" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            index="01"
            label="Selected work"
            title="Production systems."
            description="Payment infrastructure and government platforms I build and maintain as a Senior Software Engineer at Betastack. Open one to read the problem, the architecture, and the decisions behind it."
          />
        </Reveal>

        <div className="mt-14">
          {productionWork.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.2)}>
              <CaseStudyRow project={project} index={project.index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
