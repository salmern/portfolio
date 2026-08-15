# Salman Muhammad — Portfolio

A premium, production-quality portfolio for **Salman Muhammad — Rust Backend &
Blockchain Payments Engineer**. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, and Motion.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Stack

- **Next.js 15** (App Router, server components where possible)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first design tokens in `src/app/globals.css`)
- **Motion** (scroll reveals, micro-interactions — respects `prefers-reduced-motion`)
- **Lucide** icons
- **next/og** for the Open Graph image

## Before you ship — replace placeholders

All personal data lives in `src/data/site.ts`. Edit once, it flows everywhere:

| Field | Where |
| --- | --- |
| Email, GitHub, LinkedIn URLs | `src/data/site.ts` |
| Deployment URL | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` (search for `TODO`) |
| Case-study content | `src/data/projects.ts` |
| Other work / protocol projects | `src/data/projects.ts` (`otherWork`) and `src/components/Building.tsx` |
| Experience timeline | `src/data/experience.ts` |
| Engineering arsenal | `src/data/arsenal.ts` |
| Principles | `src/data/experience.ts` (`principles`) |

No metrics, employers, or results have been invented — content is grounded in
the actual repositories and CV. Anything you want to change is a data-file
edit, not a component edit.

## Project pages

Each featured project in `src/data/projects.ts` gets a static case-study page
at `/projects/[slug]`:

- Problem → Approach → Architecture (data-driven diagram) → Decisions →
  Challenges → Result → Technologies.
- The architecture diagram is generated from `project.architecture.nodes` and
  `.edges` — add a project and it renders automatically (schematic on desktop,
  vertical flow on mobile).
- `project.next` chains to the following case study.

## Structure

```
src/
  app/            # routes, layout, SEO (sitemap/robots/manifest/og-image)
  components/     # page sections + shared primitives
  components/case # case-study page building blocks
  data/           # all content: projects, experience, arsenal, site
  lib/            # utils
  types.ts        # shared domain types
```

## Verification

```bash
npm run lint        # ESLint (flat config)
npm run typecheck   # TypeScript (strict)
npm run build       # production build + static generation

# Browser QA against the production build (requires google-chrome):
npm run start &
bash scripts/verify.sh            # layout cases: overflow, console errors, broken links, reveals
node scripts/interact-test.mjs  # SystemFlow playback, arsenal hover, diagram, mobile menu
```

## Performance & accessibility

- Server components for all static sections; client JS only where interaction
  requires it (hero canvas, arsenal panel, system flow, nav, reveals).
- `next/font` self-hosts fonts; no layout shift from icon fonts.
- All animation respects `prefers-reduced-motion`.
- Semantic HTML, ARIA labels on interactive panels, keyboard-focusable
  technology chips.
