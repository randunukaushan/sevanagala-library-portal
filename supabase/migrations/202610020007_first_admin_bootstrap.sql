-- One-time first administrator bootstrap.
-- The plaintext bootstrap secret is never stored in the repository or database.
-- Only its SHA-256 hash is stored here, and the record is consumed after success.

create table private.staff_bootstrap (
  singleton boolean primary key default true check (singleton),
  token_hash text,
  used_at timestamptz,
  used_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

revoke all on table private.staff_bootstrap from public, anon, authenticated;

insert into private.staff_bootstrap (singleton, token_hash)
values (true, 'bfb10e872c40ddd1753ba8dd2052a94ac6a56c275a6326342c917858b3f3ebd0');

create or replace function private.claim_first_admin(requested_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  stored_hash text;
  bootstrap_used_at timestamptz;
  admin_role_id uuid;
begin
  if current_user_id is null then
    return false;
  end if;

  select sb.token_hash, sb.used_at
    into stored_hash, bootstrap_used_at
  from private.staff_bootstrap sb
  where sb.singleton = true
  for update;

  if bootstrap_used_at is not null
    or stored_hash is null
    or requested_hash is null
    or stored_hash <> requested_hash then
    return false;
  end if;

  if exists (
    select 1
    from public.profiles pr
    where pr.account_status = 'active'
  ) then
    return false;
  end if;

  select r.id
    into admin_role_id
  from public.roles r
  where r.key = 'library_admin'
  limit 1;

  if admin_role_id is null then
    raise exception 'library_admin role is not configured';
  end if;

  update public.profiles
  set
    account_status = 'active',
    role_id = admin_role_id,
    updated_at = now()
  where id = current_user_id;

  if not found then
    return false;
  end if;

  update private.staff_bootstrap
  set
    token_hash = null,
    used_at = now(),
    used_by = current_user_id
  where singleton = true;

  return true;
end;
$$;

revoke all on function private.claim_first_admin(text) from public, anon;
grant execute on function private.claim_first_admin(text) to authenticated;

create or replace function public.claim_first_admin(requested_hash text)
returns boolean
language sql
volatile
security invoker
set search_path = ''
as $$
  select private.claim_first_admin(requested_hash);
$$;

revoke all on function public.claim_first_admin(text) from public, anon;
grant execute on function public.claim_first_admin(text) to authenticated;
