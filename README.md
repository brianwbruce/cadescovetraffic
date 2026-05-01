# CadesCoveTraffic.com

Content-led SEO landing page and Founding Cove Insider lead capture for the SmokyFlow ecosystem.

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS v4** (CSS-first theme in `app/globals.css`)
- **Supabase** — Postgres + Auth (email signups)
- **Resend** — transactional + weekly newsletter
- **PostHog** — product analytics
- **pnpm** — package manager
- **Netlify** — hosting

## Local setup

```bash
# 1. Enable pnpm (one-time)
corepack enable pnpm

# 2. Install deps
pnpm install

# 3. Copy env template and fill in service credentials
cp .env.example .env.local

# 4. Run dev server
pnpm dev
```

Visit http://localhost:3000.

## Required environment variables

See [.env.example](.env.example). All keys are documented there.

In dev, the homepage will render without service credentials. Routes that hit Supabase/Resend (e.g. `/api/signup`) will throw `Missing required environment variable` until the keys are present.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server on port 3000 |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint via Next config |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier write |

## Deployment

Configured for **Netlify** via [netlify.toml](netlify.toml). Set the env vars from [.env.example](.env.example) in the Netlify dashboard. The `@netlify/plugin-nextjs` plugin handles SSR/ISR.

## Repository layout

```
app/                 Next.js App Router pages and API routes
components/          UI components (forms, widgets, cards)
content/articles/    MDX article files
lib/                 Service clients (Supabase, Resend, PostHog) and business logic
public/              Static assets
supabase/migrations/ SQL migrations
```

## Adding a new article

1. Create `content/articles/my-slug.mdx` with frontmatter (`title`, `description`, `slug`, `publishDate`, `updatedDate`, `readTime`).
2. Add the slug to the articles index if it's not auto-generated.
3. Run `pnpm dev` and visit `/articles/my-slug` to verify.

## Implementation status

This codebase ships in milestones — see `CadesCoveTraffic_PRD.md`.

- [x] **Milestone 0:** Bootstrap (Next.js, Tailwind, env scaffolding, deploy config)
- [ ] **Milestone 1:** Database schema and signup endpoint
- [ ] **Milestone 2:** Homepage layout and content
- [ ] **Milestone 3:** Founding Insider conversion flow
- [ ] **Milestone 4:** Article pages
- [ ] **Milestone 5:** SEO, analytics, launch prep
