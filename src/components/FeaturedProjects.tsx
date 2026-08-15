import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import { profile } from "@/data/site";
import type { Project } from "@/types";

function StatusBadge({ project }: { project: Project }) {
  const tone =
    project.statusTone === "live"
      ? "text-accent"
      : project.statusTone === "done"
        ? "text-ink-2"
        : "text-warn";
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${tone}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          project.statusTone === "live" ? "animate-pulse-dot bg-accent" : "bg-current opacity-70"
        }`}
        aria-hidden="true"
      />
      {project.status}
    </span>
  );
}

export function FeaturedProjects() {
  return (
    <section id="work" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              index="01"
              label="Selected work"
              title="Case studies, not cards."
              description="Each project below is a system with a problem, an architecture, and decisions worth explaining. Open one to read how it was built."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-4 py-2.5 text-[13px] font-medium text-ink-2 transition-all duration-300 hover:border-accent-line hover:text-ink"
            >
              More on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.2)}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block border-b border-line py-8 transition-colors duration-300 first:border-t hover:bg-surface/50 md:py-10"
              >
                {/* hover accent rail */}
                <span
                  className="absolute inset-y-0 left-0 w-px scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  aria-hidden="true"
                />

                <div className="grid items-start gap-5 px-2 md:grid-cols-[64px_1.1fr_1fr_auto] md:gap-8 md:px-4">
                  <span className="font-mono text-[13px] tracking-[0.2em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                    {project.index}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-all duration-300 group-hover:translate-x-1 sm:text-[1.8rem]">
                        {project.title}
                      </h3>
                      <StatusBadge project={project} />
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    <p className="max-w-md text-[13.5px] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] tracking-wide text-ink-3 transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="hidden h-10 w-10 items-center justify-center border border-line-strong text-ink-3 transition-all duration-300 group-hover:border-accent-line group-hover:bg-accent-soft group-hover:text-accent md:flex">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* revealed on hover: read the case study */}
                <p className="mt-5 flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-[0.26em] text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 md:px-4">
                  Open case study <span className="h-px w-8 bg-accent" aria-hidden="true" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
