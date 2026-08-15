import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Salman Muhammad Yahya",
  monogram: "SM",
  title: "Rust Backend & Blockchain Payments Engineer",
  heroStatement: "I engineer secure backend and blockchain infrastructure for systems where reliability, correctness, and performance matter.",
  heroSupport:
    "Payment rails, on-chain escrow, and the systems behind them — built to move value reliably.",
  location: "Kano, Nigeria",
  timezone: "UTC+1",
  availability: "Open to remote engineering opportunities",
  email: "salmanx550@gmail.com",
  // TODO: replace with real URLs before launch
  github: "https://github.com/salmern",
  githubHandle: "salmern",
  linkedin: "https://www.linkedin.com/in/salman-muhammad-yahya-743a53141/",
};

export const capabilityStrip = [
  "Rust",
  "Backend",
  "Blockchain",
  "Payments",
  "Systems",
  "Security",
] as const;

export const engineeringSignals = [
  { code: "RUST", label: "systems programming" },
  { code: "BACKEND", label: "APIs · services · queues" },
  { code: "BLOCKCHAIN", label: "Solana · EVM · contracts" },
  { code: "PAYMENTS", label: "settlement · reconciliation" },
  { code: "SYSTEMS", label: "distributed · reliable" },
  { code: "SECURITY", label: "by design, not afterthought" },
] as const;
