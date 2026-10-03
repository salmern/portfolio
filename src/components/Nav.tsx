"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/site";

const links = [
  { id: "work", label: "Work" },
  { id: "ai-systems", label: "AI Systems" },
  { id: "about", label: "About" },
  { id: "arsenal", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "building", label: "Building" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* Tracks which home-page section is currently under the header. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setActive(atBottom ? "contact" : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, enabled]);

  return active;
}

const sectionIds = [...links.map((l) => l.id), "contact"];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const active = useActiveSection(sectionIds, isHome);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  // Section anchors must resolve to the home page from any route.
  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8" aria-label="Primary">
        <Link
          href={isHome ? "#top" : "/"}
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — home`}
        >
          <span className="relative flex h-8 w-8 items-center justify-center border border-line-strong bg-surface-2 font-mono text-[11px] font-medium tracking-wide text-ink transition-colors duration-300 group-hover:border-accent-line">
            <span className="absolute left-0 top-0 h-[3px] w-[3px] bg-accent" aria-hidden="true" />
            {profile.monogram}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[14px] font-medium text-ink">Salman Muhammad</span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
              {profile.title}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center rounded-full border border-line bg-surface/60 p-1 backdrop-blur-sm md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id} className="relative">
                <a
                  href={hrefFor(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                  )}
                >
                  {l.label}
                </a>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-full border border-accent-line bg-accent-soft"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={hrefFor("contact")}
            className={cn(
              "group hidden items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-300 md:flex",
              active === "contact"
                ? "border-accent bg-accent text-[#04120c]"
                : "border-line-strong bg-surface-2 text-ink hover:border-accent-line hover:bg-accent-soft"
            )}
          >
            Let&apos;s talk
            <ArrowUpRight
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                active === "contact" ? "text-[#04120c]" : "text-accent"
              )}
            />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-2 transition-colors hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* scroll progress */}
      <motion.div
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {[...links, { id: "contact", label: "Contact" }].map((l, i) => {
                const isActive = active === l.id;
                return (
                  <motion.li
                    key={l.id}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * i, ease }}
                  >
                    <a
                      href={hrefFor(l.id)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className="flex items-center justify-between border-b border-line py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                        <span className={cn("font-display text-[22px] tracking-tight", isActive ? "text-accent" : "text-ink")}>
                          {l.label}
                        </span>
                      </span>
                      <ArrowUpRight className={cn("h-4 w-4", isActive ? "text-accent" : "text-ink-3")} />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="px-5 pb-8">
              <a
                href={hrefFor("contact")}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-accent px-4 py-3.5 text-[14px] font-medium text-[#04120c]"
              >
                Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {profile.title} · {profile.location}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
