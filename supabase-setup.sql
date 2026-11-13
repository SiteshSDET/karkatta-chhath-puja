create table if not exists public.shared_register (
  id text primary key,
  members jsonb not null,
  event_year integer not null check (event_year between 1 and 9999),
  event_title text not null default 'Chhath Puja',
  updated_at timestamptz not null default now()
);

alter table public.shared_register
  add column if not exists event_title text not null default 'Chhath Puja';

alter table public.shared_register enable row level security;
grant select on public.shared_register to anon, authenticated;
grant insert, update on public.shared_register to authenticated;

drop policy if exists "Anyone can read the shared register" on public.shared_register;
create policy "Anyone can read the shared register"
  on public.shared_register for select
  using (true);

drop policy if exists "Register admins can create the shared register" on public.shared_register;
create policy "Register admins can create the shared register"
  on public.shared_register for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'register_admin') = 'true');

drop policy if exists "Register admins can update the shared register" on public.shared_register;
create policy "Register admins can update the shared register"
  on public.shared_register for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'register_admin') = 'true')
  with check ((auth.jwt() -> 'app_metadata' ->> 'register_admin') = 'true');

-- After creating the admin user in Supabase Authentication, replace the email
-- below and run this separately to grant that user permission to edit.
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"register_admin": true}'::jsonb
-- where email = 'admin@example.com';

notify pgrst, 'reload schema';
