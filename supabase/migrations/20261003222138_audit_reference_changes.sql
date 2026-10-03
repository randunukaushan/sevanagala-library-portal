create or replace function private.record_staff_audit()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  old_record jsonb := case when tg_op <> 'INSERT' then to_jsonb(old) else '{}'::jsonb end;
  new_record jsonb := case when tg_op <> 'DELETE' then to_jsonb(new) else '{}'::jsonb end;
  summary_keys text[] := array['status','published_at','account_status','role_id','permission_id',
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
do $$
declare table_name text;
begin
  foreach table_name in array array['roles','permissions','role_permissions','book_categories'] loop
    execute format('create trigger staff_actor_stamp before insert or update on public.%I for each row execute function private.stamp_staff_actor()', table_name);
    execute format('create trigger staff_change_audit after insert or update or delete on public.%I for each row execute function private.record_staff_audit()', table_name);
  end loop;
end;
$$;
