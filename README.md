# Silent Revolution

Patient-first healthcare prototype built with Next.js 15, TypeScript, Tailwind CSS,
and Supabase Auth/PostgreSQL.

## Features

- Responsive landing page with patient and doctor workspaces
- Patient and doctor registration, sign-in, sign-out, and session refresh
- Protected routes with role-aware access (patient / verified doctor)
- Doctor applications reviewed by an admin; roles cannot be self-assigned
- PostgreSQL row-level security for profiles and applications

Demo dashboards use synthetic data only. This prototype does not diagnose,
prescribe, confirm appointments, or dispatch emergency services.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase credentials the app runs in a clearly
labelled demo mode: dashboards are viewable with synthetic data and real
authentication is disabled.

## Configure authentication

1. Create a Supabase project.
2. Run `supabase/migrations/20261017000000_profiles_and_roles.sql` in the Supabase
   SQL editor (or with `supabase db push`).
3. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Restart the dev server.

Use only the anon (public) key in the app. Never expose the service role key to the
browser.

### Approve a doctor

Registration always creates a patient profile. After reviewing a doctor
application, run this with a trusted server-side/admin connection (service role or
Supabase SQL editor):

```sql
update public.profiles
set role = 'doctor', is_verified = true
where id = '<user-uuid>';

update public.doctor_applications
set status = 'approved'
where user_id = '<user-uuid>';
```

### Security model

- Profile `role` and `is_verified` columns cannot be updated by app users.
- Doctor access requires both `role = 'doctor'` and `is_verified = true`.
- RLS limits profile and application reads to the signed-in owner.
- Unverified users are redirected to the patient workspace.

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```
