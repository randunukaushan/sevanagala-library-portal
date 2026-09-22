-- Needs vertical slice: seed categories, tighten workflow permissions,
-- and expose a safe public read model without exposing supporter/donation tables.

insert into public.need_categories (key, title, description, display_order)
values
  ('books', '{"en":"Books"}'::jsonb, '{"en":"Books, reference materials, and collection development."}'::jsonb, 10),
  ('technology', '{"en":"Technology"}'::jsonb, '{"en":"Computers and approved digital-learning equipment."}'::jsonb, 20),
  ('connectivity', '{"en":"Connectivity"}'::jsonb, '{"en":"Internet and approved network infrastructure."}'::jsonb, 30),
  ('furniture', '{"en":"Furniture"}'::jsonb, '{"en":"Shelving, tables, chairs, and reader-space furniture."}'::jsonb, 40),
  ('facilities', '{"en":"Facilities"}'::jsonb, '{"en":"Approved physical library improvements."}'::jsonb, 50),
  ('programmes', '{"en":"Learning Programmes"}'::jsonb, '{"en":"Approved literacy, learning, and community programmes."}'::jsonb, 60),
  ('other', '{"en":"Other"}'::jsonb, '{"en":"Other verified library-development needs."}'::jsonb, 90)
on conflict (key) do update
set
  title = excluded.title,
  description = excluded.description,
  display_order = excluded.display_order,
  active = true;

drop policy if exists needs_staff_update on public.needs;

create policy needs_manager_update_drafts
on public.needs for update
to authenticated
using (
  public.has_permission('needs.manage')
  and status in ('draft', 'pending_approval')
  and published_at is null
)
with check (
  public.has_permission('needs.manage')
  and status in ('draft', 'pending_approval')
  and published_at is null
);

create policy needs_publisher_update
on public.needs for update
to authenticated
using (public.has_permission('needs.publish'))
with check (public.has_permission('needs.publish'));

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
security definer
set search_path = public
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
      'fulfilled',
      'paused'
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

revoke all on function public.get_public_needs() from public;
grant execute on function public.get_public_needs() to anon, authenticated;
