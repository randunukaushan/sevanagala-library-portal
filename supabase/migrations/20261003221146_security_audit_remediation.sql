-- Require verified MFA for every privileged staff permission. Profile self-read
-- remains available at AAL1 so the enrollment flow can validate account status.
create or replace function private.is_active_staff()
returns boolean language sql stable security definer set search_path = ''
as $$
  select coalesce(auth.jwt()->>'aal', '') = 'aal2' and exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.account_status = 'active'
  );
$$;

create or replace function private.has_permission(requested_permission text)
returns boolean language sql stable security definer set search_path = ''
as $$
  select coalesce(auth.jwt()->>'aal', '') = 'aal2' and exists (
    select 1 from public.profiles pr
    join public.role_permissions rp on rp.role_id = pr.role_id
    join public.permissions p on p.id = rp.permission_id
    where pr.id = auth.uid() and pr.account_status = 'active'
      and p.key = requested_permission
  );
$$;
revoke all on function private.is_active_staff() from public, anon;
revoke all on function private.has_permission(text) from public, anon;
grant execute on function private.is_active_staff() to authenticated;
grant execute on function private.has_permission(text) to authenticated;

-- Protect both the existing parent (USING) and any reassigned parent (CHECK).
alter policy milestones_staff_insert on public.project_milestones with check (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and exists (
      select 1 from public.projects p where p.id = project_id
        and p.status = 'planned' and p.published_at is null
    )
  )
);
alter policy milestones_staff_update on public.project_milestones using (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and exists (
      select 1 from public.projects p where p.id = project_id
        and p.status = 'planned' and p.published_at is null
    )
  )
) with check (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and exists (
      select 1 from public.projects p where p.id = project_id
        and p.status = 'planned' and p.published_at is null
    )
  )
);
alter table public.need_specifications alter column public_visible set default false;
alter policy need_specs_staff_insert on public.need_specifications with check (
  public.has_permission('needs.publish') or (
    public.has_permission('needs.manage') and exists (
      select 1 from public.needs n where n.id = need_id
        and n.status in ('draft', 'pending_approval') and n.published_at is null
    )
  )
);
alter policy need_specs_staff_update on public.need_specifications using (
  public.has_permission('needs.publish') or (
    public.has_permission('needs.manage') and exists (
      select 1 from public.needs n where n.id = need_id
        and n.status in ('draft', 'pending_approval') and n.published_at is null
    )
  )
) with check (
  public.has_permission('needs.publish') or (
    public.has_permission('needs.manage') and exists (
      select 1 from public.needs n where n.id = need_id
        and n.status in ('draft', 'pending_approval') and n.published_at is null
    )
  )
);

-- Also prevent managers from retracting or reassigning an already-published update.
alter policy project_updates_staff_insert on public.project_updates with check (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and status in ('draft', 'review')
      and published_at is null
  )
);
alter policy project_updates_staff_update on public.project_updates using (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and status in ('draft', 'review')
      and published_at is null
  )
) with check (
  public.has_permission('projects.publish') or (
    public.has_permission('projects.manage') and status in ('draft', 'review')
      and published_at is null
  )
);

-- Serialize child edits against concurrent parent publication. RLS checks alone
-- can otherwise evaluate an earlier statement snapshot.
create function private.guard_publication_child()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  parent_id uuid;
  old_parent_id uuid;
  parent_ids uuid[];
  parent_record record;
  may_publish boolean;
begin
  if auth.uid() is null then return new; end if; -- trusted owner/service maintenance
  if tg_table_name = 'project_milestones' then
    parent_id := new.project_id;
    if tg_op = 'UPDATE' then old_parent_id := old.project_id; end if;
    may_publish := private.has_permission('projects.publish');
    parent_ids := array[parent_id, old_parent_id];
    for parent_record in
      select p.status, p.published_at from public.projects p
      where p.id = any(parent_ids) order by p.id for share
    loop
      if not may_publish and (
        not private.has_permission('projects.manage') or
        parent_record.status <> 'planned' or parent_record.published_at is not null
      ) then raise insufficient_privilege using message = 'Published milestones require publisher permission'; end if;
    end loop;
  else
    parent_id := new.need_id;
    if tg_op = 'UPDATE' then old_parent_id := old.need_id; end if;
    may_publish := private.has_permission('needs.publish');
    parent_ids := array[parent_id, old_parent_id];
    for parent_record in
      select n.status, n.published_at from public.needs n
      where n.id = any(parent_ids) order by n.id for share
    loop
      if not may_publish and (
        not private.has_permission('needs.manage') or
        parent_record.status not in ('draft', 'pending_approval') or
        parent_record.published_at is not null
      ) then raise insufficient_privilege using message = 'Published specifications require publisher permission'; end if;
    end loop;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_publication_child() from public, anon, authenticated;
create trigger publication_child_guard before insert or update on public.project_milestones
for each row execute function private.guard_publication_child();
create trigger publication_child_guard before insert or update on public.need_specifications
for each row execute function private.guard_publication_child();

-- Close current grants and default grants for future postgres-created tables.
revoke insert, update, delete, truncate, references, trigger
on public.supporter_contacts, public.partnership_opportunities,
   public.outreach_interactions, public.follow_up_tasks from anon;
alter default privileges for role postgres in schema public
revoke all on tables from anon;
revoke insert, update, delete, truncate, references, trigger
on public.audit_events from public, anon, authenticated;

-- Server-assigned provenance; preserve original attribution on client updates.
create function private.stamp_staff_actor()
returns trigger language plpgsql security invoker set search_path = ''
as $$
declare
  record_json jsonb := to_jsonb(new);
  patch jsonb := '{}'::jsonb;
begin
  if auth.uid() is null then return new; end if;
  if record_json ? 'created_by' then
    patch := patch || jsonb_build_object('created_by',
      case when tg_op = 'INSERT' then to_jsonb(auth.uid()) else to_jsonb(old)->'created_by' end);
  end if;
  if record_json ? 'updated_by' then
    patch := patch || jsonb_build_object('updated_by', auth.uid());
  end if;
  if tg_op = 'UPDATE' and record_json ? 'created_at' then
    patch := patch || jsonb_build_object('created_at', to_jsonb(old)->'created_at');
  end if;
  new := jsonb_populate_record(new, patch);
  return new;
end;
$$;
revoke all on function private.stamp_staff_actor() from public, anon, authenticated;

-- Append-only, minimal audit summaries: never copy contact details, content,
-- passwords, tokens, evidence URLs or notes into this table.
create function private.record_staff_audit()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  old_record jsonb := case when tg_op <> 'INSERT' then to_jsonb(old) else '{}'::jsonb end;
  new_record jsonb := case when tg_op <> 'DELETE' then to_jsonb(new) else '{}'::jsonb end;
  summary_keys text[] := array['status','published_at','account_status','role_id',
    'public_visible','public_visibility','recognition_consent',
    'verified_quantity','verified_at','completed_at'];
  before_summary jsonb;
  after_summary jsonb;
  actor uuid := auth.uid();
begin
  if tg_op = 'UPDATE' and old_record = new_record then return new; end if;
  if actor is not null and not exists (select 1 from public.profiles where id = actor) then actor := null; end if;
  select coalesce(jsonb_object_agg(key, value), '{}'::jsonb)
    into before_summary from jsonb_each(old_record) where key = any(summary_keys);
  select coalesce(jsonb_object_agg(key, value), '{}'::jsonb)
    into after_summary from jsonb_each(new_record) where key = any(summary_keys);
  insert into public.audit_events(actor_id, action, entity_type, entity_id,
    previous_state_summary, new_state_summary, reason)
  values (actor, lower(tg_op), tg_table_name,
    coalesce(new_record->>'id', old_record->>'id')::uuid,
    before_summary, after_summary,
    case when actor is null then 'Trusted database maintenance' else 'Authenticated staff change' end);
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
revoke all on function private.record_staff_audit() from public, anon, authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles','library_profile','services','media_assets','projects',
    'project_milestones','project_updates','need_categories','needs',
    'need_specifications','supporters','pledges','donations','donation_evidence',
    'books','book_requests','pages','news_posts','contact_messages',
    'supporter_contacts','partnership_opportunities','outreach_interactions','follow_up_tasks'
  ] loop
    execute format('create trigger staff_actor_stamp before insert or update on public.%I for each row execute function private.stamp_staff_actor()', table_name);
    execute format('create trigger staff_change_audit after insert or update or delete on public.%I for each row execute function private.record_staff_audit()', table_name);
  end loop;
end;
$$;
