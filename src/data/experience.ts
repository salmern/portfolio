import type { ExperienceEntry, Principle } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    period: "2021 — present",
    role: "Senior Software Engineer",
    org: "Betastack",
    location: "Kano, Nigeria",
    current: true,
    description:
      "Building and scaling fintech infrastructure for payment processing, POS terminals, digital wallets, and government revenue platforms.",
    contributions: [
      "Payment terminal system (ZainPOS) and digital wallet platform (ZainPay) — the payment infrastructure in this portfolio's flagship case study.",
      "Kano State government revenue (IGR) automation: a production system collecting and reconciling government revenue.",
      "Microservice architecture with explicit error handling, retry mechanisms, and monitoring — designing for 99.9% availability rather than hoping for it.",
      "Database design, API development, and reliability ownership across the full lifecycle, from requirements through deployment.",
    ],
    technologies: ["TypeScript", "Node.js", "Python", "Rust", "PostgreSQL", "Redis", "Docker", "AWS", "CI/CD"],
  },
  {
    period: "2019 — 2021",
    role: "Technical Instructor",
    org: "Aptech Training Institute",
    location: "Kano, Nigeria",
    description:
      "Taught Java and C++ to 100+ students, with an emphasis on software-engineering fundamentals: debugging, system design, and production-grade standards.",
    contributions: [
      "Mentored junior developers through code reviews, pair programming, and collaborative problem-solving.",
      "Built curriculum around performance optimization and production coding standards — teaching forces precision.",
    ],
    technologies: ["Java", "C++", "Debugging", "System design"],
  },
  {
    period: "2017 — 2019",
    role: "Full-Stack Developer",
    org: "Freelance",
    location: "Abuja, Nigeria",
    description:
      "Delivered custom software for SMEs end-to-end — architecture, development, testing, and deployment.",
    contributions: [
      "Owned the full delivery loop: translating business requirements into working systems, then shipping and supporting them.",
    ],
    technologies: ["JavaScript", "Node.js", "Python", "PHP", "MySQL", "Linux"],
  },
];

export const principles: Principle[] = [
  {
    index: "01",
    title: "Correctness over cleverness",
    statement: "Systems should behave predictably.",
    detail:
      "A clever solution that fails subtly is a liability. I reach for the boring, correct thing first — explicit transactions, exact decimal arithmetic, idempotent workers — and only add cleverness where it earns its complexity.",
  },
  {
    index: "02",
    title: "Security by design",
    statement: "Security is part of architecture.",
    detail:
      "Authentication at the boundary, authorization in the layer where it can be tested, secrets that never touch code, and signatures verified before payloads are trusted. Security reviews happen when the design is drawn.",
  },
  {
    index: "03",
    title: "Explicit over magical",
    statement: "Engineers should be able to reason about the system.",
    detail:
      "Magic hides cost. I prefer systems where the flow is visible — a request path you can trace, a queue you can inspect, an error you can reproduce — so the next engineer can hold the whole thing in their head.",
  },
  {
    index: "04",
    title: "Deterministic where possible",
    statement: "Decisions should be explainable and reproducible.",
    detail:
      "Same input, same output — whether that's a scoring model, a settlement run, or a schema migration. Non-determinism is justified only when the domain requires it, and then it's contained and logged.",
  },
  {
    index: "05",
    title: "Simple architecture, difficult problems",
    statement: "Avoid unnecessary complexity while solving genuinely hard problems.",
    detail:
      "The difficulty should come from the problem — settlement correctness, escrow custody, scheduling under constraints. Ten small, understandable services beat one tangled one.",
  },
];
