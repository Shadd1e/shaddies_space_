-- Shaddies.Space shared account and project-enquiry foundation.
-- Applied to the linked Supabase project as shaddies_space_main_site_foundation.
-- Deliberately does NOT create any ax_* tables or Automate-X course tables.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  official_name text,
  country text,
  username text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_official_name_length check (official_name is null or char_length(official_name) <= 120),
  constraint profiles_country_length check (country is null or char_length(country) <= 100),
  constraint profiles_username_length check (username is null or char_length(username) between 3 and 32)
);

create or replace function private.set_profile_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function private.set_profile_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_profile_updated_at();

create or replace function private.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function private.handle_new_user_profile() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function private.handle_new_user_profile();

alter table public.profiles enable row level security;
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

grant select, insert, update on public.profiles to authenticated;

create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  project_name text not null,
  project_description text not null,
  contact_method text not null default 'email'
    check (contact_method in ('email', 'whatsapp', 'either')),
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'closed'))
);

create index if not exists project_inquiries_created_at_idx
on public.project_inquiries (created_at desc);

alter table public.project_inquiries enable row level security;
drop policy if exists "Anyone can submit a project enquiry" on public.project_inquiries;
create policy "Anyone can submit a project enquiry"
on public.project_inquiries for insert to anon, authenticated
with check (
  char_length(contact_name) between 1 and 100
  and char_length(contact_email) between 5 and 254
  and (contact_phone is null or char_length(contact_phone) <= 40)
  and char_length(project_name) between 1 and 160
  and char_length(project_description) between 20 and 8000
  and contact_method in ('email', 'whatsapp', 'either')
  and status = 'new'
);

grant insert on public.project_inquiries to anon, authenticated;
-- No public SELECT/UPDATE/DELETE policy: enquiry rows remain private.
