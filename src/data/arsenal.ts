import type { ArsenalGroup } from "@/types";

export const arsenal: ArsenalGroup[] = [
  {
    group: "Backend Systems",
    blurb: "Where the money and the data move.",
    items: [
      { name: "Node.js", use: "Production APIs, integrations, and webhook services — fast to ship, easy to operate.", projects: ["ZainPOS", "SolNest", "Lifelark", "RektRadar"] },
      { name: "Express / Next.js", use: "HTTP services and full-stack apps with typed routes and explicit middleware.", projects: ["SolNest", "Lifelark", "ZainPOS"] },
      { name: "Python services", use: "Reconciliation jobs, reporting, data pipelines, and automation.", projects: ["ZainPOS", "Lead Triage", "TradeLens AI"] },
      { name: "Rust · Actix · Tokio", use: "Latency-critical services where memory safety and throughput are non-negotiable.", projects: ["ZainPOS", "Lifelark", "Chain Sentinel"] },
      { name: "REST APIs", use: "Versioned, validated HTTP APIs with typed errors and predictable contracts.", projects: ["ZainPOS", "Lifelark"] },
      { name: "PostgreSQL", use: "System of record — transactions, constraints, and migrations hold the invariants.", projects: ["ZainPOS", "Lifelark", "SolNest"] },
      { name: "Redis", use: "Queues, transient state, and coordination behind pooled connections.", projects: ["ZainPOS"] },
      { name: "Typed data access", use: "Prisma, SQLAlchemy, and SQLx — schema drift surfaces at build time.", projects: ["ZainPOS", "Lifelark", "SolNest"] },
      { name: "Schedulers & queues", use: "Cron jobs and idempotent workers for settlement, reconciliation, and delivery.", projects: ["ZainPOS"] },
    ],
  },
  {
    group: "Blockchain",
    blurb: "Custody, settlement, and trustless coordination.",
    items: [
      { name: "Solana", use: "Building on Solana where settlement speed and sub-cent fees matter.", projects: ["SolNest"] },
      { name: "Anchor", use: "Rust framework for Solana programs — accounts, constraints, and PDA derivation.", projects: ["SolNest"] },
      { name: "EVM", use: "Protocol work on EVM chains: governance, voting, and private exchange designs.", projects: ["BoardroomX", "VoteSafe", "Private DEX"] },
      { name: "Solidity", use: "Smart contracts with Foundry-driven testing and security review.", projects: ["BoardroomX", "Puppy Raffle audit"] },
      { name: "Smart contracts", use: "Escrow, voting, and payment logic where state transitions need consensus.", projects: ["SolNest", "VoteSafe"] },
      { name: "Foundry", use: "Fuzzing, invariant testing, and exploit reproduction for contract security.", projects: ["Puppy Raffle audit"] },
      { name: "SPL tokens & PDAs", use: "Token custody via program-derived vaults and associated token accounts.", projects: ["SolNest"] },
      { name: "zk-SNARKs", use: "Privacy-preserving proofs for governance and confidential transactions.", projects: ["BoardroomX", "Private DEX"] },
    ],
  },
  {
    group: "Languages",
    blurb: "Polyglot by design — the right tool for each layer.",
    items: [
      { name: "TypeScript", use: "Backend services, SDKs, frontends, and protocol integrations with strong typing end to end.", projects: ["ZainPOS", "SolNest", "Lifelark", "RektRadar"] },
      { name: "Node.js", use: "The runtime behind APIs, workers, CLIs, and on-chain indexers.", projects: ["ZainPOS", "SolNest", "Chain Sentinel"] },
      { name: "Python", use: "Data pipelines, scoring engines, reconciliation, and automation.", projects: ["Lead Triage", "ZainPOS", "TradeLens AI"] },
      { name: "Rust", use: "Performance-critical services and Solana programs.", projects: ["ZainPOS", "SolNest", "Lifelark"] },
      { name: "Go", use: "Systems and tooling where simplicity and deployment matter.", projects: ["ZainPOS", "ZainPay", "Kano State systems"] },
      { name: "JavaScript", use: "Interfaces and integrations across the stack.", projects: ["SolNest"] },
      { name: "Solidity", use: "EVM smart contracts with Foundry test suites.", projects: ["BoardroomX", "VoteSafe"] },
      { name: "Java", use: "Taught it — and still read it fluently when systems demand it.", projects: ["Aptech instruction"] },
    ],
  },
  {
    group: "Infrastructure & Tooling",
    blurb: "How systems run and stay running.",
    items: [
      { name: "Linux", use: "Daily driver — services, containers, and debugging live here.", projects: ["Everything"] },
      { name: "Docker", use: "Reproducible services and environments for dev and production.", projects: ["ZainPOS"] },
      { name: "Git", use: "History, review, and collaboration — the base layer of every project.", projects: ["Everything"] },
      { name: "CI/CD", use: "Automated build, test, and deploy pipelines that gate releases.", projects: ["ZainPOS"] },
      { name: "AWS", use: "EC2 and S3 for production hosting and storage.", projects: ["ZainPOS"] },
      { name: "Performance profiling", use: "Query plans, connection pools, and async concurrency, measured.", projects: ["ZainPOS"] },
      { name: "Testing", use: "TDD, fuzzing, and invariant testing — correctness as a habit.", projects: ["ZainPOS", "Puppy Raffle audit", "Lead Triage"] },
      { name: "Observability", use: "Structured tracing logs and metrics that make production legible.", projects: ["ZainPOS", "TradeLens AI"] },
    ],
  },
];
