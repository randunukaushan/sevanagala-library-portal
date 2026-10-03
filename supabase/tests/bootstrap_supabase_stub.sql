-- Minimal Supabase-compatible stubs for migration syntax/RLS CI.
-- This is NOT a replacement for testing against the real local Supabase stack.

create role anon noinherit;
create role authenticated noinherit;

create schema auth;

-- Match Supabase's helper-function access, without granting auth.users access.
grant usage on schema auth to anon, authenticated;

create table auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  raw_user_meta_data jsonb not null default '{}'::jsonb
);

create or replace function auth.uid()
returns uuid
language sql
stable
as $$
  select null::uuid;
$$;

create or replace function auth.jwt()
returns jsonb language sql stable
as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb;
$$;
