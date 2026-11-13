create table if not exists public.shared_register (
  id text primary key,
  members jsonb not null,
  event_year integer not null check (event_year between 1 and 9999),
  event_title text not null default 'Chhath Puja',
  updated_at timestamptz not null default now()
);

alter table public.shared_register
  add column if not exists event_title text not null default 'Chhath Puja';

alter table public.shared_register
  add column if not exists hero_eyebrow text not null default 'A KARKATTA COMMUNITY CELEBRATION',
  add column if not exists hero_description text not null default E'Together in devotion. Together in gratitude.\nCelebrating the beauty of Chhath in Karkatta.',
  add column if not exists hero_caption text not null default 'ARAGHYA · GRATITUDE · TOGETHERNESS',
  add column if not exists hero_image_path text,
  add column if not exists gallery_media jsonb not null default '[]'::jsonb,
  add column if not exists finance_expenses jsonb not null default '[]'::jsonb,
  add column if not exists finance_carry_forward numeric not null default 2000 check (finance_carry_forward >= 0);

insert into storage.buckets (id, name, public, file_size_limit)
values ('karkatta-community', 'karkatta-community', true, null)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "Anyone can view Karkatta community media" on storage.objects;
create policy "Anyone can view Karkatta community media"
  on storage.objects for select
  using (bucket_id = 'karkatta-community');

drop policy if exists "Register admins can upload Karkatta community media" on storage.objects;
create policy "Register admins can upload Karkatta community media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'karkatta-community'
    and (auth.jwt() -> 'app_metadata' ->> 'register_admin') = 'true'
  );

drop policy if exists "Register admins can delete Karkatta community media" on storage.objects;
create policy "Register admins can delete Karkatta community media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'karkatta-community'
    and (auth.jwt() -> 'app_metadata' ->> 'register_admin') = 'true'
  );

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
