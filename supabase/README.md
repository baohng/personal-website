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

## After applying `0001_init.sql`

Set the admin email GUC so the `is_admin()` function can match it:

```sql
alter database postgres set app.admin_email = 'you@example.com';
```

(replace with your real admin email — must equal `ADMIN_EMAIL` in `.env.local`).

Then create the admin user from the Auth dashboard (Authentication -> Users -> Add user) with that same email and a strong password.
