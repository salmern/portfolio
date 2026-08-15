import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/site";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center pt-16">
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-medium tracking-tight text-ink">
          This route doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-ink-2">
          The system returned no matching handler for that path. The index below still resolves.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 bg-accent px-6 py-3 text-[14px] font-medium text-[#04120c] transition-all duration-300 hover:shadow-[0_0_28px_rgba(52,211,153,0.35)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to {profile.name}
        </Link>
      </div>
    </main>
  );
}
