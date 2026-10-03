import { ArrowUpRight, Github } from "lucide-react";
import { CaseStudyRow } from "@/components/CaseStudyRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { otherWork, projects } from "@/data/projects";
import { profile } from "@/data/site";

const independentCaseStudies = projects.filter((p) => p.homeSection === "building");

const protocolWork = [
  {
    name: "BoardroomX",
    status: "Hackathon winner",
    statusTone: "live" as const,
    description:
      "Privacy-first DAO governance on Avalanche Fuji: zk-SNARK proofs for anonymous auditor registration and encrypted voting, with a TypeScript SDK for proof generation.",
    stack: ["Solidity", "zk-SNARKs · Circom", "TypeScript", "Foundry"],
  },
  {
    name: "VoteSafe",
    status: "In development",
    statusTone: "dev" as const,
    description:
      "Anti-fragile DAO voting protocol: quadratic voting, timelock execution, and IPFS-backed proposal storage with a comprehensive Foundry test suite.",
    stack: ["Solidity", "Foundry", "IPFS", "Snapshot.js"],
  },
  {
    name: "Private DEX",
    status: "MVP",
    statusTone: "dev" as const,
    description:
      "Privacy-preserving DEX design: confidential ERC-20 swaps with zero-knowledge proofs, encrypted order books, and a modular architecture for cross-chain expansion.",
    stack: ["Solidity", "zk-SNARKs · Groth16", "Rust"],
  },
];

export function Building() {
  return (
    <section id="building" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              index="07"
              label="Building"
              title="I build."
              description="Independent projects outside my production work: two full case studies, plus tooling, monitoring, and protocol experiments."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 border border-line-strong bg-surface-2 px-5 py-3 text-[13.5px] font-medium text-ink transition-all duration-300 hover:border-accent-line hover:bg-accent-soft"
            >
              <Github className="h-4 w-4 text-ink-2 transition-colors group-hover:text-accent" />
              {profile.githubHandle}
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </Reveal>
        </div>

        {/* independent case studies */}
        <div className="mt-14">
          {independentCaseStudies.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.12)}>
              <CaseStudyRow project={project} index={project.index} />
            </Reveal>
          ))}
        </div>

        {/* other work grid */}
        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
          {otherWork.map((w, i) => (
            <Reveal key={w.name} delay={Math.min(i * 0.05, 0.15)}>
              <article className="group flex h-full flex-col bg-bg p-6 transition-colors duration-300 hover:bg-surface md:p-7">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">{w.kind}</p>
                  <span className="h-1.5 w-1.5 bg-accent/0 transition-colors duration-300 group-hover:bg-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                  {w.name}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-2">{w.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {w.stack.map((t) => (
                    <span key={t} className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-ink-3">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* protocol work */}
        <div className="mt-16">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-3">
              <span className="h-[7px] w-[7px] bg-accent" aria-hidden="true" />
              Protocol work
            </p>
          </Reveal>
          <div className="mt-6">
            {protocolWork.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i * 0.05, 0.12)}>
                <div className="group grid gap-3 border-b border-line py-6 transition-colors duration-300 first:border-t hover:bg-surface/40 md:grid-cols-[220px_1fr_auto] md:items-start md:gap-8">
                  <div>
                    <h4 className="font-display text-[16px] font-medium text-ink">{p.name}</h4>
                    <p
                      className={`mt-1.5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] ${
                        p.statusTone === "live" ? "text-accent" : "text-warn"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full ${p.statusTone === "live" ? "animate-pulse-dot bg-accent" : "bg-current"}`}
                        aria-hidden="true"
                      />
                      {p.status}
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-2 md:pt-0.5">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 md:w-56 md:justify-end">
                    {p.stack.map((t) => (
                      <span key={t} className="border border-line bg-surface-2 px-2 py-1 font-mono text-[10px] text-ink-3">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
