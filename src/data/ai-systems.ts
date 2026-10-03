import type { AiSystem } from "@/types";

/* Production-grade AI systems built through the Koya AI Automation Program. */
export const aiProgram = {
  name: "Koya AI Automation Program",
  year: "2026",
};

export const aiSystems: AiSystem[] = [
  {
    name: "RelayPay Support Agent",
    kind: "Voice customer-support agent",
    description:
      "A voice-first support agent for a B2B cross-border payments company: customers call or chat, and the agent looks up accounts, transactions, and payouts, answers from an approved knowledge base, and opens tickets or escalations.",
    highlights: [
      "A deterministic decision engine picks the next step; Claude only phrases the reply",
      "Custom MCP server with six support tools, each call written to an audit trail",
      "Eleven evaluation scenarios run end-to-end and stored as evidence",
    ],
    stack: ["Vapi", "Claude Agent SDK", "MCP", "Fastify", "React", "Supabase"],
    repo: "https://github.com/salmern/relaypay-support-agent",
    live: { label: "relaypay-support-agent-1.onrender.com", href: "https://relaypay-support-agent-1.onrender.com" },
  },
  {
    name: "Koya Lead Agent",
    kind: "Lead research & outreach agent",
    description:
      "An agent that refines a qualification objective into an ICP, discovers and researches companies with tools, qualifies leads with evidence, and drafts 3-step outreach sequences for human review.",
    highlights: [
      "Claude Agent SDK runtime with five project skills and custom MCP tools",
      "A deterministic quality gate decides completed vs needs-review — the model's opinion is never trusted",
      "Never sends outreach or hunts personal emails; RBAC, RLS, and SSRF-safe scraping",
    ],
    stack: ["Claude Agent SDK", "MCP", "Next.js", "Supabase", "Apify", "Firecrawl"],
    repo: "https://github.com/salmern/salman-koya-lead-outreach-agent",
    live: { label: "salman-koya-lead-outreach-agent.vercel.app", href: "https://salman-koya-lead-outreach-agent.vercel.app" },
  },
  {
    name: "Koya Content Agent",
    kind: "Content research & publishing",
    description:
      "A supervised content pipeline: source research, planning, grounded drafting, automated evaluation, human review, channel adaptation for LinkedIn, X, and newsletter, then scheduled publishing.",
    highlights: [
      "Drafts scored on nine dimensions; auto-revision capped at three passes before human review",
      "Separation of duties prevents self-approval; idempotency keys prevent double-publishing",
      "Advance-on-read pipeline keeps long AI runs inside serverless time limits",
    ],
    stack: ["Next.js", "TypeScript", "Claude API", "Firecrawl", "Supabase", "Vitest"],
    repo: "https://github.com/salmern/salman-koya-content-agent",
    live: { label: "salman-koya-content-agent.vercel.app", href: "https://salman-koya-content-agent.vercel.app" },
  },
  {
    name: "Koya Proposals",
    kind: "AI proposal generation",
    description:
      "Turns discovery-call notes into client-ready proposals with Claude, then routes them through human approval, branded PDF generation, and tracked email delivery.",
    highlights: [
      "Per-section regeneration with version history and an immutable activity log",
      "Approval workflow with role-based access enforced by Supabase row-level security",
      "Completeness score derived from the data, not from model confidence",
    ],
    stack: ["Next.js", "TypeScript", "Claude API", "Supabase", "Zod", "React-PDF", "Resend"],
    repo: "https://github.com/salmern/koya-proposals",
    live: { label: "koya-proposals-gamma.vercel.app", href: "https://koya-proposals-gamma.vercel.app" },
  },
  {
    name: "Koya Operations",
    kind: "AI reporting dashboard",
    description:
      "An operations dashboard over an automated reporting workflow: sales, project, and people metrics per run, an AI-written executive summary with risks and recommended actions, and the workflow's own health.",
    highlights: [
      "Tracks run success rate, runtime, records processed, and report confidence",
      "Surfaces when AI output failed validation and a fallback was used",
      "Data-quality warnings by source, field, and severity",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Recharts"],
    repo: "https://github.com/salmern/Salman-AI-Reporting-dashboard",
    live: { label: "salmanreporting.vercel.app", href: "https://salmanreporting.vercel.app" },
  },
  {
    name: "Lead Triage",
    kind: "Deterministic scoring pipeline",
    description:
      "Cleans, scores, and qualifies inbound lead exports into Contact Now, Nurture, or Disqualify — with an explainable 0–100 score where every point traces back to the phrase that earned it.",
    highlights: [
      "Lossless cleaning: junk and duplicates are flagged with reasons, never silently deleted",
      "Six weighted factors and disqualifier overrides, all tunable from one config",
      "Same core functions drive the CLI and the Streamlit UI",
    ],
    stack: ["Python", "pandas", "Streamlit", "pytest"],
    repo: "https://github.com/salmern/Lead-Triage--",
    caseStudy: "lead-triage",
  },
];
