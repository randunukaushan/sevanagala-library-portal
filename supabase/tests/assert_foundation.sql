-- Structural assertions after all migrations have been applied.

do $$
declare
  missing_table text;
  rls_missing text;
  role_count integer;
  permission_count integer;
begin
  select x.table_name
  into missing_table
  from (
    values
      ('profiles'),
      ('library_profile'),
      ('projects'),
      ('needs'),
      ('supporters'),
      ('pledges'),
      ('donations'),
      ('books'),
      ('book_requests'),
      ('pages'),
      ('news_posts'),
      ('contact_messages'),
      ('audit_events')
  ) as x(table_name)
  where to_regclass('public.' || x.table_name) is null
  limit 1;

  if missing_table is not null then
    raise exception 'Required table missing: %', missing_table;
  end if;

  select c.relname
  into rls_missing
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public'
    and c.relname in (
      'profiles',
      'needs',
      'supporters',
      'pledges',
      'donations',
      'books',
      'pages',
      'contact_messages',
      'audit_events'
    )
    and c.relrowsecurity = false
  limit 1;

  if rls_missing is not null then
    raise exception 'RLS is not enabled on required table: %', rls_missing;
  end if;

  select count(*) into role_count from public.roles;
  if role_count < 7 then
    raise exception 'Expected seeded application roles, found only %', role_count;
  end if;

  select count(*) into permission_count from public.permissions;
  if permission_count < 16 then
    raise exception 'Expected seeded application permissions, found only %', permission_count;
  end if;

  if has_table_privilege('anon', 'public.supporters', 'SELECT') then
    raise exception 'anon must not have SELECT privilege on private supporters table';
  end if;

  if not has_table_privilege('anon', 'public.needs', 'SELECT') then
    raise exception 'anon should have SELECT privilege on public-facing needs table';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_messages'
      and policyname = 'contact_public_insert'
  ) then
    raise exception 'Public contact insert policy is missing';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'donations'
      and policyname = 'donations_verify_update'
  ) then
    raise exception 'Donation verification policy is missing';
  end if;

  if exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'needs'
      and policyname = 'needs_staff_update'
  ) then
    raise exception 'Legacy broad needs update policy must not exist';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'needs'
      and policyname = 'needs_manager_update_drafts'
  ) then
    raise exception 'Draft-only needs manager policy is missing';
  end if;

  if to_regprocedure('public.get_public_needs()') is null then
    raise exception 'Safe public needs read function is missing';
  end if;

  if not has_function_privilege('anon', 'public.get_public_needs()', 'EXECUTE') then
    raise exception 'anon should be able to execute safe public needs function';
  end if;

  if to_regprocedure('public.get_public_need_progress()') is null then
    raise exception 'Safe public need progress function is missing';
  end if;

  if not has_function_privilege('anon', 'public.get_public_need_progress()', 'EXECUTE') then
    raise exception 'anon should be able to execute safe public need progress function';
  end if;

  if to_regprocedure('public.get_public_supporter_recognition()') is null then
    raise exception 'Safe public supporter recognition function is missing';
  end if;

  if has_table_privilege('anon', 'public.supporters', 'SELECT') then
    raise exception 'Public recognition must not require anon SELECT on private supporters table';
  end if;
end
$$;

-- Basic anonymous contact insert should be allowed by grants + RLS.
set role anon;

insert into public.contact_messages (
  name,
  email,
  subject,
  message
) values (
  'Migration CI Sample',
  'sample@example.invalid',
  'Test',
  'This row exists only during migration CI.'
);

reset role;
