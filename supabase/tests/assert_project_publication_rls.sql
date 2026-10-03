-- Exercise the publication boundary with actual client roles. The fixture and
-- auth.uid override are rolled back after this test.
begin;

create or replace function auth.uid()
returns uuid
language sql stable
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

insert into auth.users (id, email) values
  ('00000000-0000-4000-8000-000000000101', 'manager@example.invalid'),
  ('00000000-0000-4000-8000-000000000102', 'publisher@example.invalid');

update public.profiles
set account_status = 'active',
    role_id = (select id from public.roles where key = 'needs_manager')
where id = '00000000-0000-4000-8000-000000000101';

update public.profiles
set account_status = 'active',
    role_id = (select id from public.roles where key = 'approver')
where id = '00000000-0000-4000-8000-000000000102';

insert into public.projects (slug, status, published_at) values
  ('rls-planned-test', 'planned', null),
  ('rls-published-test', 'approved', now());

set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-4000-8000-000000000101';

do $$
declare
  changed integer;
begin
  update public.projects
  set summary = '{"en":"Edited draft"}'::jsonb
  where slug = 'rls-planned-test';
  get diagnostics changed = row_count;
  if changed <> 1 then
    raise exception 'Project manager could not edit a planned project';
  end if;

  begin
    update public.projects
    set status = 'approved', published_at = now()
    where slug = 'rls-planned-test';
    raise exception 'Project manager was able to publish';
  exception when insufficient_privilege then
    null;
  end;

  update public.projects
  set summary = '{"en":"Not allowed"}'::jsonb
  where slug = 'rls-published-test';
  get diagnostics changed = row_count;
  if changed <> 0 then
    raise exception 'Project manager was able to edit a published project';
  end if;
end
$$;

set local request.jwt.claim.sub = '00000000-0000-4000-8000-000000000102';

update public.projects
set status = 'approved', published_at = now()
where slug = 'rls-planned-test';

do $$
begin
  if not exists (
    select 1 from public.projects
    where slug = 'rls-planned-test' and published_at is not null
  ) then
    raise exception 'Project publisher could not publish';
  end if;
end
$$;

rollback;

