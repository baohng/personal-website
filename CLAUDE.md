# Project: Personal Website

## Overview

Personal portfolio with a built-in CMS. Public visitors see Home, About, Skills, Experience, Projects (Personal / Company), and Contact. The owner signs in at `/login` and manages content under `/admin`.

## Repository

- GitHub: https://github.com/baohng/personal-website.git
- Default branch: `main`

## Tech stack

- Next.js 16 App Router with TypeScript, Turbopack, Server Actions
- Tailwind CSS v4 + shadcn/ui (style: `base-nova`, base color: `neutral`)
- Supabase (Postgres + Auth + Storage)
- next-themes for dark/light mode
- Deploys on Vercel

## Conventions

- Communication with the maintainer happens in Vietnamese.
- All source code, comments, documentation, commit messages, and identifiers must be written in English.
- Each implementation step lands as its own commit pushed to `origin/main`.
- shadcn `base-nova` `Button` uses `@base-ui/react` and does **not** support `asChild`. Use `buttonVariants()` with `<Link>` instead.
- Next.js 16 renamed `middleware.ts` → `proxy.ts` and the export `middleware` → `proxy`. Use the new names.
- Forms use Server Actions + `useActionState`. `lib/schemas.ts` holds the zod schemas; coercion (empty string → null, CSV → string[]) lives there.

## Security model

- `NEXT_PUBLIC_*` keys are public by design.
- `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAIL` are server-only. Never import them into client components or files without `import "server-only"`.
- Mutations always go through `requireAdmin()` (server-side) before touching the DB. RLS is the second layer of defense.
- `media` storage bucket is public-read; writes happen only via the server route `/api/admin/upload`.

## Repository layout

- `app/(routes)` — see README "Routes" table.
- `app/admin/<resource>/{actions.ts, page.tsx, new/page.tsx, [id]/page.tsx, <resource>-form.tsx}` — CRUD pattern shared across projects, experience, skills.
- `app/api/admin/upload/route.ts` — image upload to Supabase Storage.
- `components/` — shared UI; `components/ui/` are shadcn primitives.
- `lib/supabase/{client,server,admin}.ts` — three Supabase clients with distinct trust levels.
- `lib/auth.ts` — `getAdminUser()`, `requireAdmin()`, `UnauthorizedError`.
- `lib/data.ts` and `lib/admin-data.ts` — server-only read helpers.
- `lib/schemas.ts` — zod input schemas.
- `lib/types.ts` — shared row types.
- `supabase/migrations/` — SQL migrations.
- `proxy.ts` — refreshes Supabase auth cookies.
- `plan/` — local-only implementation plans (gitignored).

## Setup

See `README.md` for the full setup walkthrough (Supabase project, schema migration, admin user, env vars).
