-- Replace the GUC-based admin email lookup with a table-based one.
-- Supabase managed Postgres does not allow `alter database ... set
-- app.admin_email = ...` for the postgres role (permission denied to
-- set parameter), so the previous approach can't be applied.
--
-- This migration:
--   1) creates a single-row app_config table holding the admin email,
--   2) replaces is_admin() to read from it,
--   3) locks the table down with RLS so only service_role can read or
--      write it. The is_admin() function is SECURITY DEFINER so it can
--      still read the row when called from a normal user's policy.

create table if not exists public.app_config (
  id boolean primary key default true,
  admin_email text not null,
  updated_at timestamptz not null default now(),
  constraint app_config_singleton check (id = true)
);

alter table public.app_config enable row level security;

-- No public policies. Reads happen via is_admin() (SECURITY DEFINER);
-- writes happen via the service-role key, which bypasses RLS.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    auth.jwt() ->> 'email' = (select admin_email from public.app_config where id = true),
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
