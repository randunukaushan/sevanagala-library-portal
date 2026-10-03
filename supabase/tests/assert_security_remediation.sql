-- Isolated CI fixtures. Always rolled back; never persist test identities.
begin;
create or replace function auth.uid()
returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

insert into auth.users(id, email) values
  ('00000000-0000-4000-8000-000000000201', 'security-manager@example.invalid'),
  ('00000000-0000-4000-8000-000000000202', 'security-publisher@example.invalid');
update public.profiles set account_status = 'active',
  role_id = (select id from public.roles where key = 'needs_manager')
where id = '00000000-0000-4000-8000-000000000201';
update public.profiles set account_status = 'active',
  role_id = (select id from public.roles where key = 'approver')
where id = '00000000-0000-4000-8000-000000000202';
insert into public.projects(id, slug, status, published_at) values
  ('00000000-0000-4000-8000-000000000211','security-draft','planned',null),
  ('00000000-0000-4000-8000-000000000212','security-public','approved',now());
insert into public.needs(id, category_id, slug, target_quantity, unit, status, published_at)
select '00000000-0000-4000-8000-000000000221'::uuid, id, 'security-draft', 1, 'item', 'draft', null
from public.need_categories order by id limit 1;
insert into public.needs(id, category_id, slug, target_quantity, unit, status, published_at)
select '00000000-0000-4000-8000-000000000222'::uuid, id, 'security-public', 1, 'item', 'seeking_support', now()
from public.need_categories order by id limit 1;
insert into public.project_milestones(id, project_id) values
  ('00000000-0000-4000-8000-000000000231','00000000-0000-4000-8000-000000000211'),
  ('00000000-0000-4000-8000-000000000232','00000000-0000-4000-8000-000000000212');
insert into public.need_specifications(id, need_id, key, value, public_visible) values
  ('00000000-0000-4000-8000-000000000241','00000000-0000-4000-8000-000000000221','test','draft',false),
  ('00000000-0000-4000-8000-000000000242','00000000-0000-4000-8000-000000000222','test','public',true);

set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-4000-8000-000000000201';
set local request.jwt.claims = '{"aal":"aal1","sub":"00000000-0000-4000-8000-000000000201"}';
do $$
declare changed integer;
begin
  if public.has_permission('projects.manage') or public.is_active_staff() then
    raise exception 'Password-only session received privileged permissions';
  end if;
  if not exists (select 1 from public.profiles where id = auth.uid()) then
    raise exception 'MFA enrollment lost self-profile access';
  end if;
  update public.projects set summary = '{"en":"denied"}' where slug = 'security-draft';
  get diagnostics changed = row_count;
  if changed <> 0 then raise exception 'AAL1 write succeeded'; end if;
end;
$$;

set local request.jwt.claims = '{"aal":"aal2","sub":"00000000-0000-4000-8000-000000000201"}';
do $$
declare changed integer;
begin
  if not public.has_permission('projects.manage') then raise exception 'AAL2 manager denied'; end if;
  update public.project_milestones set title = '{"en":"draft edit"}'
  where id = '00000000-0000-4000-8000-000000000231';
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Draft milestone edit denied'; end if;
  update public.need_specifications set value = 'draft edit'
  where id = '00000000-0000-4000-8000-000000000241';
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Draft specification edit denied'; end if;
  update public.project_milestones set title = '{"en":"denied"}'
  where id = '00000000-0000-4000-8000-000000000232';
  get diagnostics changed = row_count;
  if changed <> 0 then raise exception 'Published milestone edited by manager'; end if;
  update public.need_specifications set value = 'denied'
  where id = '00000000-0000-4000-8000-000000000242';
  get diagnostics changed = row_count;
  if changed <> 0 then raise exception 'Published specification edited by manager'; end if;
  begin
    insert into public.project_milestones(project_id) values ('00000000-0000-4000-8000-000000000212');
    raise exception 'Published milestone insert succeeded';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.need_specifications(need_id,key,value,public_visible)
    values ('00000000-0000-4000-8000-000000000222','bypass','denied',true);
    raise exception 'Published specification insert succeeded';
  exception when insufficient_privilege then null; end;
  begin
    update public.project_milestones set project_id = '00000000-0000-4000-8000-000000000212'
    where id = '00000000-0000-4000-8000-000000000231';
    raise exception 'Milestone reparent bypass succeeded';
  exception when insufficient_privilege then null; end;
  begin
    update public.need_specifications set need_id = '00000000-0000-4000-8000-000000000222'
    where id = '00000000-0000-4000-8000-000000000241';
    raise exception 'Specification reparent bypass succeeded';
  exception when insufficient_privilege then null; end;
end;
$$;

set local request.jwt.claim.sub = '00000000-0000-4000-8000-000000000202';
set local request.jwt.claims = '{"aal":"aal2","sub":"00000000-0000-4000-8000-000000000202"}';
do $$
declare changed integer;
begin
  update public.project_milestones set title = '{"en":"approved edit"}'
  where id = '00000000-0000-4000-8000-000000000232';
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Publisher cannot edit public milestone'; end if;
  update public.need_specifications set value = 'approved edit'
  where id = '00000000-0000-4000-8000-000000000242';
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Publisher cannot edit public specification'; end if;
  update public.projects set updated_by = '00000000-0000-4000-8000-000000000201',
    summary = '{"en":"approved change"}'
  where id = '00000000-0000-4000-8000-000000000212';
  if not exists (select 1 from public.projects
    where id = '00000000-0000-4000-8000-000000000212' and updated_by = auth.uid()) then
    raise exception 'Staff attribution can be forged';
  end if;
  begin
    insert into public.audit_events(action,entity_type) values ('forged','projects');
    raise exception 'Client forged audit event';
  exception when insufficient_privilege then null; end;
end;
$$;

reset role;
do $$
declare table_name text;
begin
  if not exists (select 1 from public.audit_events
    where actor_id = '00000000-0000-4000-8000-000000000202'
      and entity_id = '00000000-0000-4000-8000-000000000212' and action = 'update') then
    raise exception 'Staff action was not audited';
  end if;
  if exists (select 1 from public.audit_events
    where new_state_summary ? 'summary' or new_state_summary ? 'contact_email') then
    raise exception 'Audit leaked private content';
  end if;
  foreach table_name in array array['supporter_contacts','partnership_opportunities','outreach_interactions','follow_up_tasks'] loop
    if has_table_privilege('anon', 'public.' || table_name, 'INSERT')
      or has_table_privilege('anon', 'public.' || table_name, 'UPDATE')
      or has_table_privilege('anon', 'public.' || table_name, 'DELETE') then
      raise exception 'Unnecessary anonymous CRM write grant remains';
    end if;
  end loop;
end;
$$;
rollback;
