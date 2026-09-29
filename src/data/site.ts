import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Salman Muhammad Yahya",
  monogram: "SM",
  title: "Senior Software Engineer",
  heroStatement: "I design and ship production systems — backend services, payment rails, and blockchain infrastructure — where reliability, correctness, and performance matter.",
  heroSupport:
    "TypeScript & Node.js, Python, Go and Rust — choosing the right tool for each layer, from APIs and data pipelines to smart contracts.",
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
  "TypeScript",
  "Node.js",
  "Python",
  "Rust",
  "Backend",
  "Payments",
  "Blockchain",
  "Security",
] as const;

export const engineeringSignals = [
  { code: "TS / NODE", label: "APIs · SDKs · services" },
  { code: "PYTHON", label: "data · pipelines · automation" },
  { code: "RUST", label: "high-performance services" },
  { code: "PAYMENTS", label: "settlement · reconciliation" },
  { code: "BLOCKCHAIN", label: "Solana · EVM · contracts" },
  { code: "SECURITY", label: "by design, not afterthought" },
] as const;
