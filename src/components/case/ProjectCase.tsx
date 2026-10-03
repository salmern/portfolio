import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Decision, Project, TechGroup } from "@/types";

/* ── Meta hero ─────────────────────────────────────────────── */

export function ProjectHero({ project }: { project: Project }) {
  const tone =
    project.statusTone === "live"
      ? "text-accent"
      : project.statusTone === "done"
        ? "text-ink-2"
        : "text-warn";

  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <Link
            href={`/#${project.homeSection ?? "work"}`}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.26em] text-ink-3">
            <span>Project {project.index}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            <span>{project.role}</span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            {project.title}
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-2">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <dl className="mt-12 grid grid-cols-2 border border-line bg-surface/40 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { k: "project", v: project.slug },
              { k: "role", v: project.role },
              { k: "year", v: project.year },
              { k: "stack", v: project.stack.slice(0, 4).join(" · ") },
            ].map((row) => (
              <div key={row.k} className="border-line px-4 py-3.5 [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+3)]:border-b lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:nth-child(3)]:border-b lg:[&:nth-child(4)]:border-b-0">
                <dt className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">{row.k}</dt>
                <dd className="mt-1.5 font-mono text-[12px] text-ink">{row.v}</dd>
              </div>
            ))}
            <div className="border-line px-4 py-3.5 [&:nth-child(odd)]:border-r sm:[&:nth-child(4)]:border-r-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(4)]:border-r lg:[&:nth-child(5)]:border-l">
              <dt className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">status</dt>
              <dd className={cn("mt-1.5 flex items-center gap-2 font-mono text-[12px]", tone)}>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    project.statusTone === "live" ? "animate-pulse-dot bg-accent" : "bg-current opacity-70"
                  )}
                  aria-hidden="true"
                />
                {project.status}
              </dd>
            </div>
          </dl>
        </Reveal>

        {project.links?.length ? (
          <Reveal delay={0.22}>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-4 py-2.5 font-mono text-[12px] text-ink-2 transition-all duration-300 hover:border-accent-line hover:text-ink"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

/* ── Section shell ─────────────────────────────────────────── */

export function CaseSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-2">
            <span className="h-[7px] w-[7px] bg-accent" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">{title}</h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={Math.min(i * 0.04, 0.12)}>
          <p className="text-[15px] leading-[1.8] text-ink-2">{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Decisions / challenges ────────────────────────────────── */

export function DecisionGrid({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2">
      {decisions.map((d, i) => (
        <Reveal key={d.title} delay={Math.min(i * 0.05, 0.15)}>
          <div className="group h-full bg-bg p-6 transition-colors duration-300 hover:bg-surface md:p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-[16px] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
              {d.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">{d.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Technologies ──────────────────────────────────────────── */

export function TechGrid({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g, i) => (
        <Reveal key={g.group} delay={Math.min(i * 0.05, 0.15)}>
          <div className="border border-line bg-surface/40 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">{g.group}</p>
            <ul className="mt-4 space-y-2">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-mono text-[12px] text-ink-2">
                  <span className="h-1 w-1 shrink-0 bg-accent/70" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Next project ──────────────────────────────────────────── */

export function NextProject({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-sm mask-fade absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-3">Next project</p>
          <Link
            href={`/projects/${project.slug}`}
            className="group mt-5 flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <span className="font-mono text-[12px] tracking-[0.2em] text-ink-3">/{project.slug}</span>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                {project.title}
              </h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">{project.tagline}</p>
            </div>
            <span className="flex h-14 w-14 items-center justify-center border border-line-strong text-ink-2 transition-all duration-300 group-hover:border-accent-line group-hover:bg-accent-soft group-hover:text-accent">
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
