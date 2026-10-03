import type { OtherWork, Project } from "@/types";
import { productionCases } from "@/data/production-cases";

export const projects: Project[] = [
  {
    slug: "zainpos",
    index: "01",
    title: "ZainPOS",
    tagline: "Payment terminal & settlement infrastructure",
    summary:
      "Production payment infrastructure: terminal onboarding, card processing, virtual accounts, settlement reconciliation, and loan disbursement — ten services moving money, built in TypeScript/Node.js, Python, and Rust.",
    role: "Senior Software Engineer",
    year: "2021 — present",
    status: "Production",
    statusTone: "live",
    stack: ["TypeScript", "Node.js", "Go", "Python", "Rust", "PostgreSQL", "Redis", "Docker", "AWS"],
    problem: [
      "Payments infrastructure sits between merchants, terminals, banks, and providers. Every flow — onboarding a terminal, authorizing a card payment, disbursing a loan, settling to a provider — has to be correct the first time, because a settlement error is real money.",
      "Merchants arrive in very different shapes: registered businesses, individuals, and public institutions (which have no CAC number). Each needs KYC verification, virtual accounts, and terminal provisioning — without leaking state between tenants.",
      "Money movement had to survive process crashes. Settlement runs, webhook deliveries, and queue workers needed idempotency and reconciliation.",
    ],
    approach: [
      "Ten services, one concern each: web, POS, and mobile entry points; merchant services; an aggregator and super-aggregator for provider routing; schedulers for cron jobs and queue workers; a notifications service; and a shared common crate.",
      "All state lives in PostgreSQL, with typed queries in every service. Redis (behind a pooled connection manager) carries queues and transient state. tokio-cron-scheduler drives batch work like settlement reconciliation.",
      "TypeScript and Node.js power the merchant dashboard APIs, provider integrations, and webhook delivery. Python handles reconciliation reports, settlement audits, and data migrations. Rust runs the latency-critical transaction path.",
      "Money is modeled as exact decimals in every language. Binary floats never touch an amount."
    ],
    architecture: {
      caption: "A request flows: entry point → merchant services → validation → business logic → queues → ledger, with provider adapters and scheduled workers around the edges.",
      nodes: [
        { id: "entry", title: "Entry points", sub: "Web · POS · Mobile", kind: "entry" },
        { id: "api", title: "Merchant services", sub: "Node.js · TypeScript · Rust", kind: "process" },
        { id: "validation", title: "Validation", sub: "JWT + Argon2 · Dojah BVN/CAC", kind: "process" },
        { id: "business", title: "Business logic", sub: "Cards · virtual accounts · loans", kind: "process" },
        { id: "queues", title: "Queues & schedulers", sub: "Redis · workers · Python recon", kind: "process" },
        { id: "ledger", title: "PostgreSQL", sub: "migrations · exact decimals", kind: "store" },
        { id: "providers", title: "Providers", sub: "ZainPay · Jigo · SendGrid · Dojah", kind: "external" },
        { id: "output", title: "Webhooks & mail", sub: "signature-verified deliveries", kind: "output" },
      ],
      edges: [
        { from: "entry", to: "api", label: "HTTPS" },
        { from: "api", to: "validation", label: "authenticate" },
        { from: "validation", to: "business", label: "authorize" },
        { from: "business", to: "queues", label: "enqueue" },
        { from: "queues", to: "ledger", label: "commit" },
        { from: "business", to: "providers", label: "settle" },
        { from: "providers", to: "queues", label: "webhooks" },
        { from: "queues", to: "output", label: "notify" },
      ],
    },
    decisions: [
      {
        title: "Decimal money, never floats",
        body: "A settlement rejected as Invalid_amount because a binary float carried a fractional tail (18388.749999999996) is a real outage. Amounts are formatted to fixed 2-decimal strings before signing — the signed payload matches exactly what is transmitted.",
      },
      {
        title: "Idempotent queue workers",
        body: "Settlement and reconciliation workers can be re-run without double-paying. A repush worker moves failed transactions back onto the Redis queue with backoff instead of dropping them.",
      },
      {
        title: "Single-transaction invariants",
        body: "Terminal IDs are drawn from a pool and released in the same transaction as reassignment, so the pool can never drift or double-assign.",
      },
      {
        title: "Provider adapters isolate quirks",
        body: "Third-party eccentricities — Dojah's company-type mapping, SendGrid's implicit TLS on port 465 vs STARTTLS on 587 — live in one client each.",
      },
      {
        title: "Async throughout",
        body: "A request pipeline built on tokio and Actix Web with connection pooling, so p99 latency stays predictable while load scales.",
      },
    ],
    challenges: [
      {
        title: "Correctness at the boundary",
        body: "Providers enforce their own validation rules. Payloads must match the signed bytes exactly, which means formatting decisions (decimals, casing, field order) are made once, in the adapter.",
      },
      {
        title: "KYC variance",
        body: "Businesses, individuals, and public institutions each take a different verification path — CAC lookup, BVN lookup, or admin-verified onboarding. One wrong mapping breaks production onboarding.",
      },
      {
        title: "Delivery guarantees",
        body: "Webhooks and settlement confirmations must be delivered or reconciled — never silently dropped. That drove the queue/worker design rather than fire-and-forget calls.",
      },
    ],
    result: [
      "Production fintech infrastructure handling payment processing, POS terminals, digital wallets, and the Kano State government revenue (IGR) platform.",
      "Merchant onboarding covering registered businesses, individuals, and public institutions — each with the correct KYC path.",
      "Settlement and reconciliation automated end-to-end: queue workers, cron schedulers, and repush recovery for failed transactions.",
    ],
    technologies: [
      { group: "Backend", items: ["TypeScript", "Node.js", "Express", "Go", "Rust", "Actix Web", "Tokio", "SQLx"] },
      { group: "Data & automation", items: ["Python", "pandas", "PostgreSQL", "Redis", "migrations", "reconciliation reports"] },
      { group: "Security", items: ["JWT", "Argon2", "secrecy", "webhook signature verification"] },
      { group: "Infrastructure", items: ["Docker", "AWS", "Tracing / Bunyan logs", "wiremock · mockito tests"] },
    ],
    links: [{ label: "zainpos.ng", href: "https://zainpos.ng/" }],
    next: "zainpay",
  },
  ...productionCases,
  {
    slug: "solnest",
    index: "01",
    title: "SolNest",
    tagline: "Rental escrow on Solana",
    summary:
      "Trustless rental agreements: lease funds locked in a smart-contract escrow until both parties confirm — Anchor programs, PDA vaults, and SPL token custody with a timeout-triggered refund path.",
    role: "Smart Contract & Backend Engineer",
    year: "2025",
    status: "Devnet · MVP",
    statusTone: "dev",
    stack: ["TypeScript", "Node.js", "Python", "Rust", "Solana", "Anchor", "React", "PostgreSQL"],
    problem: [
      "The rental market runs on trust: renters risk losing deposits to dishonest landlords, owners risk non-payment from unreliable tenants, and everyone pays for intermediaries and slow disputes.",
      "The escrow problem — funds held until both sides fulfil their side — is exactly what a blockchain can do without a trusted third party. The hard part is getting custody, settlement, and failure handling right.",
    ],
    approach: [
      "The escrow lifecycle lives on-chain: a renter deposits into a PDA-derived vault, the owner confirms lease fulfilment, and funds are released. A 72-hour confirmation window protects both sides — if the owner never confirms, the renter can reclaim.",
      "Only the state transitions that need trust live on-chain. Listings, documents, and images sit off-chain in PostgreSQL and IPFS, keeping on-chain state small and predictable.",
      "Custody uses SPL tokens (USDC/USDT, 6-decimal), so lease amounts aren't exposed to SOL volatility.",
      "A TypeScript/Node.js API serves listings and leases and indexes on-chain events. Python scripts seed devnet and run end-to-end escrow scenarios before each release.",
    ],
    architecture: {
      caption: "Frontend signs and submits transactions; the Anchor program owns custody via PDA vaults; metadata stays off-chain.",
      nodes: [
        { id: "frontend", title: "React frontend", sub: "Wallet adapter · Phantom/Solflare", kind: "entry" },
        { id: "backend", title: "Backend API", sub: "Node.js · TypeScript · Express", kind: "process" },
        { id: "program", title: "Anchor program", sub: "Rust · instruction validation", kind: "process" },
        { id: "vault", title: "PDA escrow vault", sub: "derived from lease seeds", kind: "store" },
        { id: "tokens", title: "SPL tokens", sub: "USDC / USDT · 6 decimals", kind: "store" },
        { id: "metadata", title: "Off-chain store", sub: "IPFS · PostgreSQL", kind: "external" },
        { id: "refund", title: "Timeout path", sub: "72h · auto-refund", kind: "output" },
      ],
      edges: [
        { from: "frontend", to: "backend", label: "metadata" },
        { from: "backend", to: "metadata", label: "store" },
        { from: "frontend", to: "program", label: "instructions" },
        { from: "program", to: "vault", label: "hold" },
        { from: "vault", to: "tokens", label: "transfer" },
        { from: "vault", to: "refund", label: "timeout" },
      ],
    },
    decisions: [
      {
        title: "PDA-derived vaults",
        body: "Escrow accounts are derived deterministically from lease seeds. No wallet holds renter funds — custody is a program invariant.",
      },
      {
        title: "Token-native settlement",
        body: "USDC/USDT with explicit 6-decimal handling keeps lease amounts stable and predictable, and settles in seconds with sub-cent fees.",
      },
      {
        title: "Timeout protection",
        body: "A 72-hour confirmation window with an automatic refund path means funds can never be locked forever by an unresponsive counterparty.",
      },
      {
        title: "On-chain trust, off-chain ergonomics",
        body: "Only custody and settlement need consensus. Everything else — listings, KYC metadata, documents — lives off-chain where it's cheap and editable.",
      },
    ],
    challenges: [
      {
        title: "Anchor account constraints",
        body: "Every instruction must validate its full account set — signers, seeds, and program ownership. Getting these wrong is the classic Solana footgun, so constraints are written defensively.",
      },
      {
        title: "SPL custody flows",
        body: "Associated token accounts, decimal handling, and transfer authority had to be correct inside the escrow lifecycle — deposit, hold, release, and reclaim all move real token state.",
      },
    ],
    result: [
      "A working escrow flow on Solana devnet: property listing → lease creation → deposit → owner confirmation → release, with automatic refund on timeout.",
      "Multi-role platform (renter / owner / admin) with IPFS-backed document storage and admin verification of listings.",
    ],
    technologies: [
      { group: "Blockchain", items: ["Solana", "Anchor 0.32", "Rust", "SPL Token", "PDAs", "Web3.js"] },
      { group: "Backend", items: ["TypeScript", "Node.js", "Express", "PostgreSQL", "IPFS / Pinata"] },
      { group: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS", "Wallet Adapter"] },
      { group: "Tooling", items: ["Python", "devnet seeding", "E2E escrow scenarios"] },
    ],
    homeSection: "building",
    next: "lifelark",
  },
  {
    slug: "lifelark",
    index: "02",
    title: "Lifelark",
    tagline: "Healthcare platform backend",
    summary:
      "A clinic operating system: patients, doctors, appointments, and medical records behind strict role-based access — a layered API in Rust, TypeScript, and Python, with an availability engine for scheduling.",
    role: "Backend Engineer",
    year: "2025",
    status: "Active development",
    statusTone: "dev",
    stack: ["TypeScript", "Node.js", "Python", "Rust", "Next.js", "PostgreSQL", "JWT"],
    problem: [
      "Clinics run on paper diaries and trust. Records are scattered, permissions are enforced by people rather than by the system, and nobody has one coherent view of the practice.",
      "The system had to enforce, automatically: a patient sees only their own records; a doctor sees the patients they treat; an admin sees everything. Authorization must be a property of the system.",
    ],
    approach: [
      "A layered API — routes → services → repositories → PostgreSQL — with every layer typed and each concern testable in isolation.",
      "An availability engine derives bookable slots from doctor working hours and days off, and validates every appointment against it at creation time.",
      "JWT access tokens with refresh rotation; passwords hashed with Argon2; input validated at the boundary with typed error responses.",
      "A Next.js and Node.js layer in TypeScript handles sessions, notifications, and appointment reminders. Python jobs produce clinic reports and seed test data.",
    ],
    architecture: {
      caption: "Requests pass through typed layers; authorization is enforced in the service layer where it can be unit-tested.",
      nodes: [
        { id: "client", title: "Next.js frontend", sub: "TypeScript · Node.js BFF", kind: "entry" },
        { id: "routes", title: "Actix Web routes", sub: "validation · authn", kind: "process" },
        { id: "services", title: "Service layer", sub: "RBAC · business rules", kind: "process" },
        { id: "avail", title: "Availability engine", sub: "slots from working hours", kind: "process" },
        { id: "repos", title: "Repositories", sub: "SQLx · typed queries", kind: "process" },
        { id: "db", title: "PostgreSQL", sub: "migrations · transactions", kind: "store" },
      ],
      edges: [
        { from: "client", to: "routes", label: "HTTPS" },
        { from: "routes", to: "services", label: "claims" },
        { from: "services", to: "avail", label: "validate" },
        { from: "services", to: "repos", label: "query" },
        { from: "avail", to: "repos", label: "slots" },
        { from: "repos", to: "db", label: "SQL" },
      ],
    },
    decisions: [
      {
        title: "RBAC in the service layer",
        body: "Authorization rules live where they can be unit-tested and reasoned about, instead of being sprinkled through handlers.",
      },
      {
        title: "SQLx with migrations",
        body: "Runtime-checked queries and versioned migrations keep schema and code evolving together, so a drift surfaces at compile time.",
      },
      {
        title: "Explicit error model",
        body: "Typed errors via thiserror map to HTTP responses with actionable messages — the UI can offer a retry instead of failing silently.",
      },
      {
        title: "Token rotation with recovery",
        body: "Refresh tokens rotate on use, with a quiet re-issue path so users aren't logged out mid-task.",
      },
    ],
    challenges: [
      {
        title: "Scheduling correctness",
        body: "Overlapping slots, working hours vs days off, and appointment durations all interact; the availability engine had to be deterministic and easy to test.",
      },
      {
        title: "Multi-role data isolation",
        body: "Every query that touches patient data must respect the caller's role — a patient fetching another patient's records is a bug.",
      },
    ],
    result: [
      "A full-stack platform — Rust core API, TypeScript/Node.js services, and a Next.js frontend — managing patients, doctors, appointments, and medical records with role-based access enforced end-to-end.",
      "A repeatable backend foundation: typed layers, tested authorization, and an availability engine reusable for other scheduling domains.",
    ],
    technologies: [
      { group: "Backend", items: ["Rust", "Actix Web", "Tokio", "SQLx", "validator", "thiserror"] },
      { group: "Data", items: ["PostgreSQL", "rust_decimal", "UUID", "migrations"] },
      { group: "Security", items: ["JWT", "Argon2", "RBAC", "refresh rotation"] },
      { group: "Web & services", items: ["TypeScript", "Node.js", "Next.js", "reminder jobs"] },
      { group: "Data & reporting", items: ["Python", "pandas", "report generation"] },
    ],
    homeSection: "building",
    next: "solnest",
  },
  {
    slug: "lead-triage",
    index: "06",
    title: "Lead Triage",
    tagline: "Deterministic lead scoring engine",
    summary:
      "Clean, score, and qualify inbound leads with a transparent 0–100 model. Every point is traceable to the phrase that earned it — same export in, same scores out, no API keys.",
    role: "Data / Backend Engineer",
    year: "2025",
    status: "Delivered",
    statusTone: "done",
    stack: ["Python", "TypeScript", "Node.js", "pandas", "Streamlit"],
    problem: [
      "A marketing agency was triaging messy inbound-lead exports by hand — slow, inconsistent, and impossible to defend when asked why a lead was prioritized.",
      "LLM-based scoring was the obvious shortcut, but it is non-reproducible, costs money per run, and can't explain a score point-by-point. The requirement was the opposite: deterministic, explainable, and free to run.",
    ],
    approach: [
      "Three strict layers with no hidden behaviour: cleaning (normalize columns, parse emails/dates/budgets, flag junk and duplicates with reasons — never silently delete), signal extraction (a deterministic phrase/pattern engine over free-text notes), and scoring (six weighted factors, max 100).",
      "The same core functions power the CLI and the Streamlit UI, so the numbers always agree.",
      "A small TypeScript/Node.js ingestion service pulls fresh exports from the agency's CRM, so scoring runs without manual uploads.",
      "Recommendation rules on top: disqualifier overrides, a buying-signal gate, and an early-stage floor — each decision recorded with its evidence.",
    ],
    architecture: {
      caption: "Raw exports pass through cleaning → signals → scoring; every layer logs what it did and why.",
      nodes: [
        { id: "raw", title: "Raw export", sub: ".xlsx / .csv · Node.js ingest", kind: "entry" },
        { id: "clean", title: "Cleaning layer", sub: "normalize · flag · audit", kind: "process" },
        { id: "signal", title: "Signal layer", sub: "phrase engine · evidence", kind: "process" },
        { id: "score", title: "Scoring layer", sub: "6 factors · max 100", kind: "process" },
        { id: "rules", title: "Recommendation rules", sub: "overrides · gates · floors", kind: "process" },
        { id: "ui", title: "Streamlit UI", sub: "KPIs · drill-down · export", kind: "output" },
        { id: "cli", title: "CLI runner", sub: "same core functions", kind: "output" },
      ],
      edges: [
        { from: "raw", to: "clean", label: "ingest" },
        { from: "clean", to: "signal", label: "valid rows" },
        { from: "signal", to: "score", label: "SignalSet" },
        { from: "score", to: "rules", label: "scores" },
        { from: "rules", to: "ui", label: "ranked" },
        { from: "rules", to: "cli", label: "CSV" },
      ],
    },
    decisions: [
      {
        title: "Deterministic and explainable over clever",
        body: "Same export → same scores, always. Every point is traceable to the verbatim phrase that earned it — auditable by a human, defensible to a client.",
      },
      {
        title: "No API keys",
        body: "A phrase/pattern engine instead of an LLM: free to run, no vendor dependency, and reproducible in any environment.",
      },
      {
        title: "Minimal dependencies",
        body: "pandas, openpyxl, streamlit — nothing else. The system stays runnable for years with zero maintenance burden.",
      },
      {
        title: "Lossless cleaning",
        body: "Nothing is silently deleted. Junk and duplicates are flagged with reasons, so the pipeline can be audited end to end.",
      },
    ],
    challenges: [
      {
        title: "Messy real-world data",
        body: "[at]-obfuscated emails, day-first dates, $6-8k budgets, 35-55 employee counts. Every normalization had to be lossless, logged, and reversible.",
      },
      {
        title: "Explaining a score",
        body: "A number is useless without evidence. The scoring layer had to emit the reasoning alongside the score.",
      },
    ],
    result: [
      "Scored 500 valid leads from a 520-row export in a single pass — 109 Contact Now, 225 Nurture, 166 Disqualify — with per-lead reasoning exposed in the UI.",
      "A reusable pipeline: new exports process with zero code changes, and every decision is explainable to a client.",
    ],
    technologies: [
      { group: "Languages", items: ["Python 3.10+", "TypeScript", "Node.js"] },
      { group: "Data", items: ["pandas", "openpyxl", "deterministic rule engine"] },
      { group: "UI", items: ["Streamlit", "sortable tables", "CSV export"] },
      { group: "Quality", items: ["pytest", "property-style tests on scoring config"] },
    ],
    links: [{ label: "GitHub", href: "https://github.com/salmern/Lead-Triage--" }],
    homeSection: "ai-systems",
  },
];

export const otherWork: OtherWork[] = [
  {
    name: "RektRadar",
    kind: "Protocol tooling",
    description:
      "A single-call A2MCP service that inspects a wallet's Aave V3 lending positions across Ethereum, Arbitrum, and Base and returns a plain-English liquidation risk assessment. Built for the OKX.AI Genesis Hackathon.",
    stack: ["TypeScript", "Node.js", "Python", "Aave V3", "A2MCP"],
  },
  {
    name: "TradeLens AI",
    kind: "Observability",
    description:
      "Observability and evaluation infrastructure for autonomous trading agents: high-throughput event ingestion, a risk engine with anomaly detection, and real-time dashboards.",
    stack: ["TypeScript", "Node.js", "Python", "Rust", "React"],
  },
  {
    name: "Chain Sentinel",
    kind: "On-chain monitor",
    description:
      "A Rust/alloy daemon watching USDC and WETH exposure against a Uniswap v4 PoolManager, alerting when a position crosses a configured threshold.",
    stack: ["TypeScript", "Node.js", "Python", "Rust", "alloy"],
  },
  {
    name: "Puppy Raffle audit",
    kind: "Security review",
    description:
      "A structured smart-contract security review: Foundry-based exploit reproduction and a written report covering reentrancy, weak randomness, and dangerous strict balance checks.",
    stack: ["Solidity", "Foundry", "TypeScript", "Node.js", "Python · Slither"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectOrder(): string[] {
  return projects.map((p) => p.slug);
}
