create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  case_id text not null,
  alias text not null,
  answers jsonb not null,
  scores jsonb not null,
  tags text[] not null default '{}',
  public_health_tags text[] not null default '{}',
  archetype text not null,
  cause text not null,
  estimated_age integer not null,
  report jsonb not null
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are not publicly readable" on public.profiles;
create policy "Profiles are not publicly readable"
on public.profiles for select
using (false);

drop policy if exists "Profiles are not publicly insertable" on public.profiles;
create policy "Profiles are not publicly insertable"
on public.profiles for insert
with check (false);

create index if not exists profiles_created_at_idx on public.profiles (created_at desc);
create index if not exists profiles_tags_idx on public.profiles using gin (tags);
