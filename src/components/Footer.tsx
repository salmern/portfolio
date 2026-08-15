import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-line-strong bg-surface-2 font-mono text-[11px] font-medium text-ink">
              {profile.monogram}
            </span>
            <div>
              <p className="font-display text-[15px] font-medium text-ink">{profile.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                Rust · Backend · Blockchain · Payments
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-ink-3">
            Backend and blockchain systems for production. Designed to be correct, secure, and
            boring in the right ways.
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "GitHub", href: profile.github },
                { label: "LinkedIn", href: profile.linkedin },
                { label: "Email", href: `mailto:${profile.email}` },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 text-ink-3 transition-colors group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">Index</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Work", href: "#work" },
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <p>© {year} {profile.name}</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Built with Next.js — {profile.timezone} local
          </p>
        </div>
      </div>
    </footer>
  );
}
