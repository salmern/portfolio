import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { StatusBadge } from "@/components/CaseStudyRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { aiProgram, aiSystems } from "@/data/ai-systems";

const linkClass =
  "group/link inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-2 transition-colors hover:text-accent";

export function AiSystems() {
  return (
    <section id="ai-systems" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              index="02"
              label="AI Automation & Agentic Systems"
              title="Agents with guardrails."
              description={`Voice and research agents, content and proposal pipelines, and operational reporting, built through the ${aiProgram.name}. LLMs handle the language; deterministic code makes the decisions, gates the actions, and keeps the audit trail.`}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-2 border border-line-strong bg-surface-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-2">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              Koya AI Automation · {aiProgram.year}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {aiSystems.map((p, i) => (
            <Reveal key={p.name} delay={Math.min((i % 2) * 0.06, 0.12)}>
              <article className="group relative flex h-full flex-col bg-bg p-6 transition-colors duration-300 hover:bg-surface md:p-8">
                <span
                  className="absolute inset-y-0 left-0 w-px scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[13px] tracking-[0.2em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.live ? <StatusBadge status="Deployed" tone="live" /> : null}
                </div>

                <h3 className="mt-5 font-display text-[1.45rem] font-medium tracking-tight text-ink">{p.name}</h3>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">{p.kind}</p>

                <p className="mt-4 text-[13.5px] leading-relaxed text-ink-2">{p.description}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 bg-accent/70" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-ink-3">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
                  <a href={p.repo} target="_blank" rel="noreferrer" className={linkClass}>
                    <Github className="h-3.5 w-3.5" />
                    Repository
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                  {p.live ? (
                    <a href={p.live.href} target="_blank" rel="noreferrer" title={p.live.label} className={linkClass}>
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
                      Live app
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  ) : null}
                  {p.caseStudy ? (
                    <Link href={`/projects/${p.caseStudy}`} className={linkClass}>
                      Case study
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </Link>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
