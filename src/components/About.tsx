import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const focus = [
  "Backend systems in TypeScript/Node.js, Python & Rust",
  "Payment infrastructure & financial correctness",
  "Blockchain — Solana & EVM, contracts & custody",
  "Databases, queues, and the seams between them",
];

const facts = [
  { k: "experience", v: "6+ yrs production systems" },
  { k: "blockchain", v: "3+ yrs protocol & contracts" },
  { k: "languages", v: "TS · Node · Python · Rust" },
  { k: "level", v: "Senior engineer" },
];

export function About() {
  return (
    <section id="about" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading index="03" label="About" title="Engineering." />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal delay={0.05}>
            <div className="space-y-5 text-[15px] leading-[1.8] text-ink-2">
              <p>
                I&apos;m a senior software engineer who works where the stakes are real: payment rails,
                settlement systems, and the smart contracts that hold money. I&apos;m polyglot by
                design — <span className="text-ink">TypeScript and Node.js</span> for APIs,
                integrations, and product services; <span className="text-ink">Python</span> for data
                pipelines, reconciliation, and automation; and <span className="text-ink">Rust</span>{" "}
                where raw performance and memory safety are the requirement.
              </p>
              <p>
                Most of my production work has been in <span className="text-ink">payment infrastructure</span>:
                terminal onboarding, card processing, virtual accounts, and settlement reconciliation
                for a system that moves money daily. I care about the unglamorous parts — decimal
                arithmetic instead of floats, idempotent workers, signature-verified webhooks —
                because that&apos;s where financial systems actually fail.
              </p>
              <p>
                On the blockchain side I build with <span className="text-ink">Solana (Anchor)</span>{" "}
                and <span className="text-ink">EVM (Solidity, Foundry)</span>: escrow programs with
                PDA vaults, governance and voting protocols, and security reviews where exploits are
                reproduced before they&apos;re written up. I think about databases, distributed
                systems, and smart contracts as the same discipline: <span className="text-ink">
                state that must stay consistent under failure.</span>
              </p>
              <p className="text-ink-3">
                I enjoy difficult engineering problems — the kind where the answer isn&apos;t
                obvious, and getting it wrong costs more than a redeploy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border border-line bg-surface/60">
              <div className="border-b border-line px-5 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-3">
                  core.focus
                </p>
              </div>
              <ul className="divide-y divide-line">
                {focus.map((f) => (
                  <li key={f} className="flex items-start gap-3 px-5 py-4">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                    <span className="text-[13.5px] leading-relaxed text-ink-2">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 border-t border-line">
                {facts.map((f) => (
                  <div key={f.k} className="border-line px-5 py-4 [&:nth-child(odd)]:border-r">
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">{f.k}</p>
                    <p className="mt-1.5 font-mono text-[12px] text-ink">{f.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
