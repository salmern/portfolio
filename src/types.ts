/* ── Shared domain types ─────────────────────────────────────── */

export interface Profile {
  name: string;
  monogram: string;
  title: string;
  heroStatement: string;
  heroSupport: string;
  location: string;
  timezone: string;
  availability: string;
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
}

export interface ArchNode {
  id: string;
  title: string;
  sub?: string;
  kind?: "entry" | "process" | "store" | "external" | "output";
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Decision {
  title: string;
  body: string;
}

export interface TechGroup {
  group: string;
  items: string[];
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  year: string;
  status: string;
  statusTone?: "live" | "dev" | "done";
  stack: string[];
  problem: string[];
  approach: string[];
  architecture: {
    nodes: ArchNode[];
    edges: ArchEdge[];
    caption?: string;
  };
  decisions: Decision[];
  challenges: Decision[];
  result: string[];
  technologies: TechGroup[];
  links?: ExternalLink[];
  /** Home-page section the case study is listed under (defaults to "work"). */
  homeSection?: string;
  next?: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface AiSystem {
  name: string;
  kind: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo: string;
  live?: ExternalLink;
  caseStudy?: string;
}

export interface OtherWork {
  name: string;
  kind: string;
  description: string;
  stack: string[];
}

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  contributions: string[];
  technologies: string[];
  current?: boolean;
}

export interface Principle {
  index: string;
  title: string;
  statement: string;
  detail: string;
}

export interface ArsenalItem {
  name: string;
  use: string;
  projects: string[];
}

export interface ArsenalGroup {
  group: string;
  blurb: string;
  items: ArsenalItem[];
}
