import { capabilityStrip } from "@/data/site";

export function SignalStrip() {
  const items = [...capabilityStrip, ...capabilityStrip];
  return (
    <div className="relative z-10 border-y border-line bg-surface/60">
      <div className="mask-fade-x overflow-hidden py-4" aria-hidden="true">
        <div className="animate-marquee flex w-max items-center" style={{ ["--marquee-duration" as string]: "34s" }}>
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center">
              <span className="px-7 font-display text-[15px] font-medium uppercase tracking-[0.3em] text-ink-2">
                {item}
              </span>
              <span className="h-1.5 w-1.5 bg-accent/70" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Focus areas: {capabilityStrip.join(", ")}
      </p>
    </div>
  );
}
