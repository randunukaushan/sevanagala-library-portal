-- Harden SECURITY DEFINER helpers and RLS evaluation without changing application behaviour.

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

create or replace function private.is_active_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles pr
    where pr.id = auth.uid()
      and pr.account_status = 'active'
  );
$$;

create or replace function private.has_permission(requested_permission text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles pr
    join public.role_permissions rp on rp.role_id = pr.role_id
    join public.permissions p on p.id = rp.permission_id
    where pr.id = auth.uid()
      and pr.account_status = 'active'
      and p.key = requested_permission
  );
$$;

revoke all on function private.is_active_staff() from public, anon;
revoke all on function private.has_permission(text) from public, anon;
grant execute on function private.is_active_staff() to authenticated, service_role;
grant execute on function private.has_permission(text) to authenticated, service_role;

-- Keep existing policy references stable while making the API-visible helpers
-- SECURITY INVOKER wrappers around non-exposed privileged helpers.
create or replace function public.is_active_staff()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_active_staff();
$$;

create or replace function public.has_permission(requested_permission text)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.has_permission(requested_permission);
$$;

revoke all on function public.is_active_staff() from public, anon;
revoke all on function public.has_permission(text) from public, anon;
grant execute on function public.is_active_staff() to authenticated, service_role;
grant execute on function public.has_permission(text) to authenticated, service_role;

-- Trigger-only function: it should not be directly callable through the Data API.
revoke all on function public.handle_new_auth_user() from public, anon, authenticated, service_role;

-- Move the privileged aggregation behind a non-exposed function. The public RPC
-- remains SECURITY INVOKER and returns only the intentionally shaped public fields.
create or replace function private.get_public_needs()
returns table (
  id uuid,
  slug text,
  title jsonb,
  purpose jsonb,
  category_title jsonb,
  target_quantity numeric,
  unit text,
  priority text,
  status text,
  pledged_quantity numeric,
  verified_received_quantity numeric,
  remaining_quantity numeric,
  last_verified_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  with verified_by_pledge as (
    select
      d.pledge_id,
      sum(d.verified_quantity) as verified_quantity
    from public.donations d
    where d.pledge_id is not null
      and d.verified_quantity > 0
      and d.status in ('verified', 'allocated', 'deployed', 'catalogued', 'closed')
    group by d.pledge_id
  ),
  active_pledges as (
    select
      p.need_id,
      sum(
        greatest(
          p.quantity - coalesce(vbp.verified_quantity, 0),
          0
        )
      ) as pledged_quantity
    from public.pledges p
    left join verified_by_pledge vbp on vbp.pledge_id = p.id
    where p.need_id is not null
      and p.status in ('accepted', 'scheduled', 'in_transit', 'partially_received')
    group by p.need_id
  ),
  verified_donations as (
    select
      d.need_id,
      sum(d.verified_quantity) as verified_received_quantity
    from public.donations d
    where d.need_id is not null
      and d.verified_quantity > 0
      and d.status in ('verified', 'allocated', 'deployed', 'catalogued', 'closed')
    group by d.need_id
  )
  select
    n.id,
    n.slug,
    n.title,
    n.purpose,
    nc.title as category_title,
    n.target_quantity,
    n.unit,
    n.priority,
    n.status,
    coalesce(ap.pledged_quantity, 0) as pledged_quantity,
    coalesce(vd.verified_received_quantity, 0) as verified_received_quantity,
    greatest(
      n.target_quantity
        - coalesce(ap.pledged_quantity, 0)
        - coalesce(vd.verified_received_quantity, 0),
      0
    ) as remaining_quantity,
    n.last_verified_at
  from public.needs n
  join public.need_categories nc on nc.id = n.category_id
  left join active_pledges ap on ap.need_id = n.id
  left join verified_donations vd on vd.need_id = n.id
  where n.published_at is not null
    and n.published_at <= now()
    and n.status in (
      'seeking_support',
      'partially_pledged',
      'fully_pledged',
      'partially_received',
      'fulfilled'
    )
  order by
    case n.priority
      when 'critical' then 1
      when 'high' then 2
      when 'medium' then 3
      else 4
    end,
    n.updated_at desc;
$$;

revoke all on function private.get_public_needs() from public;
grant execute on function private.get_public_needs() to anon, authenticated, service_role;

create or replace function public.get_public_needs()
returns table (
  id uuid,
  slug text,
  title jsonb,
  purpose jsonb,
  category_title jsonb,
  target_quantity numeric,
  unit text,
  priority text,
  status text,
  pledged_quantity numeric,
  verified_received_quantity numeric,
  remaining_quantity numeric,
  last_verified_at timestamptz
)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.get_public_needs();
$$;

revoke all on function public.get_public_needs() from public;
grant execute on function public.get_public_needs() to anon, authenticated, service_role;

-- Avoid per-row auth.uid() re-evaluation in the self-profile policy.
alter policy profiles_self_or_user_admin_read
on public.profiles
using (
  id = (select auth.uid())
  or public.has_permission('users.manage')
);

-- Future public-schema functions should not inherit EXECUTE for PUBLIC by default.
alter default privileges for role postgres in schema public
revoke execute on functions from public;

alter default privileges for role postgres in schema private
revoke execute on functions from public;
