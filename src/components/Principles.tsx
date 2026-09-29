import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { principles } from "@/data/experience";

export function Principles() {
  return (
    <section id="principles" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            index="04"
            label="How I think about systems"
            title="Principles."
            description="The constraints I design within — the decisions that keep systems correct when the pressure is on."
          />
        </Reveal>

        <div className="mt-14">
          {principles.map((p, i) => (
            <Reveal key={p.index} delay={Math.min(i * 0.05, 0.2)}>
              <div className="group relative grid gap-4 border-b border-line py-8 transition-colors duration-300 first:border-t hover:bg-surface/40 md:grid-cols-[96px_1fr_1.2fr] md:gap-8 md:py-10">
                <span
                  className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <p className="font-mono text-[13px] tracking-[0.2em] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                  {p.index}
                </p>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-[1.45rem]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                    {p.statement}
                  </p>
                </div>
                <p className="text-[13.5px] leading-relaxed text-ink-2 md:pt-1">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
