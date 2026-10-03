"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { arsenal } from "@/data/arsenal";
import type { ArsenalItem } from "@/types";

export function Arsenal() {
  const [active, setActive] = useState<ArsenalItem | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="arsenal" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            index="04"
            label="Engineering arsenal"
            title="Tools, by capability."
            description="Not a logo wall — organized by what each tool does in a system, with the projects it shows up in. Hover a technology for context."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-14">
          {/* groups */}
          <div className="grid gap-10 sm:grid-cols-2">
            {arsenal.map((group, gi) => (
              <Reveal key={group.group} delay={Math.min(gi * 0.05, 0.15)}>
                <div>
                  <div className="flex items-baseline justify-between border-b border-line pb-3">
                    <h3 className="font-display text-[17px] font-medium text-ink">{group.group}</h3>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-3">{group.blurb}</p>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const isActive = active?.name === item.name;
                      return (
                        <li key={item.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(item)}
                            onFocus={() => setActive(item)}
                            onMouseLeave={() => setActive((cur) => (cur?.name === item.name ? null : cur))}
                            onBlur={() => setActive((cur) => (cur?.name === item.name ? null : cur))}
                            onClick={() => setActive(isActive ? null : item)}
                            aria-pressed={isActive}
                            className={`border px-3 py-1.5 font-mono text-[11.5px] tracking-wide transition-all duration-200 ${
                              isActive
                                ? "border-accent-line bg-accent-soft text-accent"
                                : "border-line bg-surface-2 text-ink-2 hover:border-line-strong hover:text-ink"
                            }`}
                          >
                            {item.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* detail panel */}
          <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative min-h-[190px] border border-line bg-surface/60">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-3">detail.inspect</p>
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              </div>

              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.name}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5"
                  >
                    <p className="font-mono text-[13px] font-medium tracking-[0.14em] text-accent">{active.name}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{active.use}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">used in</p>
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {active.projects.map((p) => (
                        <span key={p} className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-ink-3">
                          {p}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-[190px] flex-col items-start justify-center gap-3 p-5"
                  >
                    <ArrowUpRight className="h-4 w-4 text-ink-3" />
                    <p className="text-[13px] leading-relaxed text-ink-3">
                      Hover or tap a technology to see what it&apos;s for and where it&apos;s used.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
