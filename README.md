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

## Database setup

The schema lives in [supabase/migrations/0001_initial.sql](supabase/migrations/0001_initial.sql).

To apply against a Supabase project:

```bash
# Option A — Supabase CLI (recommended)
supabase link --project-ref <ref>
supabase db push

# Option B — paste 0001_initial.sql into the Supabase SQL editor and run.
```

The migration creates:
- `founding_insiders` table with unique email, atomic position-number trigger (advisory lock), and badge eligibility (true for positions 1–1000)
- `email_events` table for tracking welcome / weekly / app-invite sends and Resend webhook callbacks
- RLS: anon can `INSERT` to `founding_insiders` (the form). All other access is service-role only.

## Manually testing /api/signup

With env vars in `.env.local` and migration applied:

```bash
curl -X POST http://localhost:3000/api/signup \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"User","email":"you@example.com"}'
# => { "status": "created", "position": 1, "badgeEligible": true, "firstName": "Test" }

# Duplicate returns existing position, no new row, no second email:
curl -X POST http://localhost:3000/api/signup \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"User","email":"you@example.com"}'
# => { "status": "already_signed_up", "position": 1, ... }
```

UTM, referrer, and source can also be sent in the JSON body (`utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `source`). IP and User-Agent are captured server-side from request headers.

## Implementation status

This codebase ships in milestones — see `CadesCoveTraffic_PRD.md`.

- [x] **Milestone 0:** Bootstrap (Next.js, Tailwind, env scaffolding, deploy config)
- [x] **Milestone 1:** Database schema and signup endpoint
- [x] **Milestone 2:** Homepage layout and content
- [ ] **Milestone 3:** Founding Insider conversion flow
- [ ] **Milestone 4:** Article pages
- [ ] **Milestone 5:** SEO, analytics, launch prep
