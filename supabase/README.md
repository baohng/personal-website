# Supabase

SQL migrations for the Postgres schema backing the website CMS.

## Apply migrations

### Option A — SQL editor (simplest)

1. Open Supabase Dashboard -> SQL Editor.
2. Paste the contents of each file in `migrations/` in order, run them.

### Option B — Supabase CLI

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

## After applying migrations

Set the admin email by inserting into `app_config` (single-row table):

```sql
insert into public.app_config (id, admin_email)
values (true, 'you@example.com')
on conflict (id) do update set admin_email = excluded.admin_email,
                                updated_at = now();
```

(replace with your real admin email — must equal `ADMIN_EMAIL` in `.env.local`).

Then create the admin user from the Auth dashboard (Authentication -> Users -> Add user) with that same email and a strong password.

> Note: an earlier draft of these instructions used `alter database postgres set app.admin_email = ...`. That approach is rejected by Supabase managed Postgres (`permission denied to set parameter`) and has been replaced by `0002_admin_email_table.sql`.
