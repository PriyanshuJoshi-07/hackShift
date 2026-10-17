-- Silent Revolution: profiles, roles, and doctor applications
-- Roles are never self-assigned. New accounts are always patients.
-- A verified admin/service-role action grants the doctor role.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null default 'patient' check (role in ('patient', 'doctor')),
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
-- Column-level privilege: users may edit only their display name.
grant update (full_name) on public.profiles to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_own_name" on public.profiles;
create policy "profiles_update_own_name"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Profile rows are created by this trigger only. Role metadata from signup is ignored.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, is_verified)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'New user'),
    'patient',
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.doctor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  specialty text not null,
  license_number text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.doctor_applications enable row level security;

revoke all on public.doctor_applications from anon, authenticated;
grant select, insert on public.doctor_applications to authenticated;

drop policy if exists "doctor_applications_select_own" on public.doctor_applications;
create policy "doctor_applications_select_own"
  on public.doctor_applications for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "doctor_applications_insert_own_pending" on public.doctor_applications;
create policy "doctor_applications_insert_own_pending"
  on public.doctor_applications for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'pending');

-- Doctor approval is a trusted, server-side admin action (service role only):
--   update public.profiles
--     set role = 'doctor', is_verified = true
--     where id = '<user-uuid>';
--   update public.doctor_applications
--     set status = 'approved'
--     where user_id = '<user-uuid>';
-- Never expose the service role key to the browser.
