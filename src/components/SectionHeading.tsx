import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ index, label, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-2">
        <span className="h-[7px] w-[7px] bg-accent" aria-hidden="true" />
        <span>{index}</span>
        <span className="text-ink-3">/</span>
        <span>{label}</span>
      </div>
      <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{description}</p> : null}
    </div>
  );
}
