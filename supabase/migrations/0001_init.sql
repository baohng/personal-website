-- Initial schema for personal website CMS.
-- Tables: projects, work_experiences, technical_skills.
-- Auth model: public read, writes restricted to a single admin email.
--
-- Apply via Supabase SQL editor or `supabase db push`.

-- =====================================================================
-- Helper: returns true when the current JWT belongs to the admin user.
-- The admin email is stored as a Postgres GUC so it isn't hard-coded
-- in policies. Set it once per project:
--     alter database postgres set app.admin_email = 'you@example.com';
-- =====================================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true),
    false
  );
$$;

-- =====================================================================
-- Common updated_at trigger
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- projects
-- =====================================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[] not null default '{}',
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  github_url text,
  demo_url text,
  start_date date,
  end_date date,
  category text not null check (category in ('personal', 'company')),
  company_name text,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_display_order_idx on public.projects (display_order);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  using (is_published = true);

drop policy if exists "projects_admin_all" on public.projects;
create policy "projects_admin_all"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- =====================================================================
-- work_experiences
-- =====================================================================
create table if not exists public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  role text not null,
  start_date date not null,
  end_date date,
  description text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists work_experiences_start_date_idx
  on public.work_experiences (start_date desc);

drop trigger if exists work_experiences_set_updated_at on public.work_experiences;
create trigger work_experiences_set_updated_at
before update on public.work_experiences
for each row execute function public.set_updated_at();

alter table public.work_experiences enable row level security;

drop policy if exists "work_experiences_public_read" on public.work_experiences;
create policy "work_experiences_public_read"
  on public.work_experiences for select
  using (true);

drop policy if exists "work_experiences_admin_all" on public.work_experiences;
create policy "work_experiences_admin_all"
  on public.work_experiences for all
  using (public.is_admin())
  with check (public.is_admin());

-- =====================================================================
-- technical_skills
-- =====================================================================
create table if not exists public.technical_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  proficiency int check (proficiency between 1 and 5),
  icon_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists technical_skills_category_idx
  on public.technical_skills (category);

drop trigger if exists technical_skills_set_updated_at on public.technical_skills;
create trigger technical_skills_set_updated_at
before update on public.technical_skills
for each row execute function public.set_updated_at();

alter table public.technical_skills enable row level security;

drop policy if exists "technical_skills_public_read" on public.technical_skills;
create policy "technical_skills_public_read"
  on public.technical_skills for select
  using (true);

drop policy if exists "technical_skills_admin_all" on public.technical_skills;
create policy "technical_skills_admin_all"
  on public.technical_skills for all
  using (public.is_admin())
  with check (public.is_admin());

-- =====================================================================
-- Storage bucket for media (project covers, galleries, skill icons).
-- Public read; writes only via service-role key from server routes.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- No insert/update/delete policy for anon/auth users. Server uses the
-- service-role key, which bypasses RLS, for all media writes.
