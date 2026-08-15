import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative z-10 overflow-hidden border-t border-line">
      <div className="bg-grid-sm mask-fade absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: "radial-gradient(closest-side, rgba(52,211,153,0.08), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-2">
            <span className="h-[7px] w-[7px] animate-pulse-dot bg-accent" aria-hidden="true" />
            Now · {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            Have a difficult system
            <br />
            to build?
            <span className="text-ink-3"> Let&apos;s build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-2">
            If you&apos;re working on payment infrastructure, blockchain custody, or a backend
            where correctness is the product — I&apos;d like to hear about it. Email is the fastest
            way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2.5 bg-accent px-6 py-3.5 text-[14px] font-medium text-[#04120c] transition-all duration-300 hover:shadow-[0_0_32px_rgba(52,211,153,0.35)]"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-5 py-3.5 text-[14px] font-medium text-ink-2 transition-all duration-300 hover:border-accent-line hover:text-ink"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-5 py-3.5 text-[14px] font-medium text-ink-2 transition-all duration-300 hover:border-accent-line hover:text-ink"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-3">
            {profile.location} · {profile.timezone} · remote-friendly · replies within 24h
          </p>
        </Reveal>
      </div>
    </section>
  );
}
