import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            index="05"
            label="Experience"
            title="Built in production."
            description="Where I've shipped and what I owned — focused on engineering impact."
          />
        </Reveal>

        <div className="relative mt-14">
          {/* rail */}
          <span className="absolute bottom-0 left-[5px] top-0 w-px bg-line md:left-[129px]" aria-hidden="true" />

          <div className="space-y-14">
            {experience.map((e, i) => (
              <Reveal key={e.org} delay={Math.min(i * 0.06, 0.18)}>
                <article className="relative grid gap-4 pl-8 md:grid-cols-[120px_1fr] md:gap-10 md:pl-0">
                  {/* dot */}
                  <span
                    className={`absolute left-0 top-[7px] h-[11px] w-[11px] border md:left-[124px] ${
                      e.current
                        ? "border-accent bg-accent shadow-[0_0_14px_rgba(52,211,153,0.6)]"
                        : "border-line-strong bg-bg"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="md:pt-0">
                    <p className="font-mono text-[12px] tracking-[0.14em] text-ink-3 md:pt-0.5">
                      {e.period}
                    </p>
                    {e.current ? (
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-accent">
                        <span className="h-1 w-1 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
                        current
                      </p>
                    ) : null}
                  </div>

                  <div className="border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-line-strong md:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-lg font-medium text-ink md:text-xl">
                        {e.role} <span className="text-ink-3">·</span>{" "}
                        <span className="text-ink-2">{e.org}</span>
                      </h3>
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                        <MapPin className="h-3 w-3" /> {e.location}
                      </p>
                    </div>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{e.description}</p>

                    <ul className="mt-4 space-y-2">
                      {e.contributions.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-2">
                          <span className="mt-[8px] h-1 w-1 shrink-0 bg-accent/70" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                      {e.technologies.map((t) => (
                        <span key={t} className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-ink-3">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
