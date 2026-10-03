"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, MapPin } from "lucide-react";
import { SystemField } from "@/components/SystemField";
import { engineeringSignals, profile } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <a
      ref={ref}
      href="#work"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * 0.18,
          y: (e.clientY - (r.top + r.height / 2)) * 0.18,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </a>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* ambient system field */}
      <div className="absolute inset-0 z-0">
        <SystemField />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0) 30%, rgba(8,8,10,0) 70%, rgba(8,8,10,0.9) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          {/* ── Left: headline ─────────────────────────────── */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-2"
            >
              <span className="mr-2 inline-block h-[7px] w-[7px] bg-accent align-middle" aria-hidden="true" />
              Backend · Payments · Blockchain
            </motion.p>

            <h1 className="mt-7 font-display font-medium leading-[0.95] tracking-[-0.03em] text-ink">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease }}
                className="block text-[clamp(3.2rem,9vw,6.4rem)]"
              >
                Salman
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.16, ease }}
                className="block text-[clamp(3.2rem,9vw,6.4rem)]"
              >
                Muhammad
                <span className="ml-3 inline-block h-[0.16em] w-[0.34em] translate-y-[-0.04em] bg-accent align-baseline" aria-hidden="true" />
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease }}
              className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] uppercase tracking-[0.22em] text-accent"
            >
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
              {profile.title}
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-2"
            >
              {profile.heroStatement}
            </motion.p>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-3"
            >
              {profile.heroSupport}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease }}
              className="mt-10 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic>
                <span className="group relative inline-flex items-center gap-2 overflow-hidden bg-accent px-6 py-3 text-[14px] font-medium text-[#04120c] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(52,211,153,0.35)]">
                  <span className="absolute left-0 top-0 h-full w-0 bg-[#04120c] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
                    View Projects <ArrowDown className="h-4 w-4" />
                  </span>
                </span>
              </Magnetic>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-6 py-3 text-[14px] font-medium text-ink transition-all duration-300 hover:border-accent-line hover:bg-accent-soft"
              >
                <Github className="h-4 w-4 text-ink-2 transition-colors group-hover:text-accent" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-2 py-3 text-[14px] font-medium text-ink-2 transition-colors hover:text-ink"
              >
                Let&apos;s talk
                <span className="block h-px w-6 bg-ink-3 transition-all duration-300 group-hover:w-10 group-hover:bg-accent" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {profile.location} · {profile.timezone} · {profile.availability.toLowerCase()}
            </motion.p>
          </div>

          {/* ── Right: system panel ────────────────────────── */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="relative hidden lg:block"
          >
            <div className="relative border border-line bg-surface/80 backdrop-blur-sm">
              {/* corner brackets */}
              <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" aria-hidden="true" />
              <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-accent" aria-hidden="true" />
              <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent" aria-hidden="true" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" aria-hidden="true" />

              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-3">sys.status</p>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
                  {profile.availability}
                </p>
              </div>

              <dl className="divide-y divide-line">
                {[
                  { k: "location", v: profile.location },
                  { k: "timezone", v: profile.timezone },
                  { k: "stack", v: "TypeScript · Node.js · Python · Rust" },
                  { k: "email", v: profile.email, mono: true },
                ].map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-6 px-5 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">{row.k}</dt>
                    <dd className="truncate text-right font-mono text-[11px] text-ink-2">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-line px-5 py-4">
                <div className="grid grid-cols-2 gap-px bg-line">
                  {engineeringSignals.map((s) => (
                    <div key={s.code} className="group bg-surface-2 px-4 py-3.5 transition-colors duration-300 hover:bg-accent-soft">
                      <p className="font-mono text-[12px] font-medium tracking-[0.14em] text-ink transition-colors group-hover:text-accent">
                        {s.code}
                      </p>
                      <p className="mt-1 text-[10px] leading-snug text-ink-3">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-3">scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute left-0 top-0 h-4 w-px animate-drift bg-accent" />
        </span>
      </motion.div>
    </section>
  );
}
