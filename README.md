# Personal Website

Portfolio site with a built-in CMS for managing projects, work experience, and technical skills.

## Tech stack

- **Next.js 16** (App Router, Turbopack, Server Actions)
- **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**
- **Supabase** for Postgres, auth, and storage
- **next-themes** for dark/light mode
- Deployed on **Vercel**

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

- Sign up at [supabase.com](https://supabase.com) and create a new project.
- Copy these values from **Project Settings → API**:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(server-only, never expose)*

### 3. Apply the schema

Open Supabase SQL editor and run, in order:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_admin_email_table.sql`

Then set the admin email:

```sql
insert into public.app_config (id, admin_email)
values (true, 'you@example.com')
on conflict (id) do update set admin_email = excluded.admin_email,
                                updated_at = now();
```

(replace with the email you want to use for admin login).

### 4. Create the admin user

In Supabase: **Authentication → Users → Add user**, with the same email as `app.admin_email` and a strong password.

### 5. Configure env vars

```bash
cp .env.local.example .env.local
# fill in the values
```

`.env.local` is gitignored and must never be committed.

### 6. Run

```bash
npm run dev
```

Open <http://localhost:3000>.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/skills` | Technical skills |
| `/experience` | Work experience timeline |
| `/projects` | Landing → split into Personal / Company |
| `/projects/personal` | Personal projects |
| `/projects/company` | Company projects |
| `/contact` | Contact links |
| `/login` | Admin sign-in (email + password) |
| `/admin` | Admin dashboard (gated) |
| `/admin/projects` | CRUD projects |
| `/admin/experience` | CRUD work experience |
| `/admin/skills` | CRUD skills |

## Security model

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public — exposed to the browser by design.
- `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAIL` are server-only and never exposed. They are only imported in server modules (`lib/supabase/admin.ts`, `lib/auth.ts`) and route handlers under `/api/admin/*`.
- Row Level Security on every table allows public reads but restricts writes to the admin email; mutations also re-check `requireAdmin()` server-side as a second layer.
- The `media` storage bucket is public-read; writes only happen on the server with the service-role key.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

## Deployment (Vercel)

1. Import the GitHub repo at <https://vercel.com/new>.
2. Add the four env vars from `.env.local.example` in **Project → Settings → Environment Variables**. Mark `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_EMAIL` as encrypted — they must NOT be exposed to client builds.
3. Deploy.

## Repository layout

- `app/` — App Router pages (public + `/admin` + `/api/admin`).
- `components/` — shared UI; `components/ui/` are shadcn primitives.
- `lib/supabase/` — `client.ts` (browser, anon key), `server.ts` (RSC, cookie session), `admin.ts` (service-role, server-only).
- `lib/auth.ts` — `getAdminUser()` and `requireAdmin()`.
- `lib/data.ts` — public-page server queries.
- `lib/admin-data.ts` — admin-side server queries (service-role).
- `lib/schemas.ts` — zod input schemas for server actions.
- `supabase/migrations/` — SQL migrations.
- `proxy.ts` — refreshes Supabase auth cookies on every request.
- `plan/` — local-only implementation plans (gitignored).
