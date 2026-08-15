import type { ArsenalGroup } from "@/types";

export const arsenal: ArsenalGroup[] = [
  {
    group: "Backend Systems",
    blurb: "Where the money and the data move.",
    items: [
      { name: "Rust", use: "Primary language for production services — where memory safety, performance, and correctness are non-negotiable.", projects: ["ZainPOS", "Lifelark", "TradeLens AI"] },
      { name: "Actix Web", use: "High-throughput HTTP services with typed routes and explicit middleware.", projects: ["ZainPOS", "Lifelark", "TradeLens AI"] },
      { name: "Tokio", use: "Async runtime for concurrent services, schedulers, and queue workers.", projects: ["ZainPOS", "Chain Sentinel"] },
      { name: "REST APIs", use: "Versioned, validated HTTP APIs with typed errors and predictable contracts.", projects: ["ZainPOS", "Lifelark"] },
      { name: "PostgreSQL", use: "System of record — transactions, constraints, and migrations hold the invariants.", projects: ["ZainPOS", "Lifelark", "SolNest"] },
      { name: "Redis", use: "Queues, transient state, and coordination behind pooled connections.", projects: ["ZainPOS"] },
      { name: "SQLx", use: "Compile-time-checked SQL — schema drift surfaces at build time, not in prod.", projects: ["ZainPOS", "Lifelark"] },
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
    blurb: "The right tool for the layer.",
    items: [
      { name: "Rust", use: "Backend services, blockchain programs, and performance-critical tooling.", projects: ["ZainPOS", "SolNest", "Lifelark"] },
      { name: "Go", use: "Systems and tooling where simplicity and deployment matter.", projects: ["Tooling"] },
      { name: "TypeScript", use: "Frontends, SDKs, and protocol integrations with strong typing.", projects: ["SolNest", "RektRadar"] },
      { name: "JavaScript", use: "Interfaces and integrations across the stack.", projects: ["SolNest"] },
      { name: "Python", use: "Data pipelines, scoring engines, and quick analysis.", projects: ["Lead Triage"] },
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
      { name: "Performance profiling", use: "Query plans, connection pools, and async concurrency — measured, not guessed.", projects: ["ZainPOS"] },
      { name: "Testing", use: "TDD, fuzzing, and invariant testing — correctness as a habit.", projects: ["ZainPOS", "Puppy Raffle audit", "Lead Triage"] },
      { name: "Observability", use: "Structured tracing logs and metrics that make production legible.", projects: ["ZainPOS", "TradeLens AI"] },
    ],
  },
];
