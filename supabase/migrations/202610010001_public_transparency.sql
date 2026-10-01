-- Safe public transparency and lifecycle calculations.
-- Private supporter/contact records remain inaccessible to anonymous users.

create or replace function public.get_public_need_progress()
returns table (
  need_id uuid,
  slug text,
  title jsonb,
  target_quantity numeric,
  unit text,
  verified_received_quantity numeric,
  outstanding_accepted_pledge_quantity numeric,
  remaining_uncommitted_quantity numeric
)
language sql
stable
security definer
set search_path = public
as $$
  with verified as (
    select
      d.need_id,
      coalesce(sum(d.verified_quantity), 0)::numeric as quantity
    from public.donations d
    where d.need_id is not null
      and d.status not in ('rejected')
    group by d.need_id
  ),
  pledge_verified as (
    select
      d.pledge_id,
      coalesce(sum(d.verified_quantity), 0)::numeric as quantity
    from public.donations d
    where d.pledge_id is not null
      and d.status not in ('rejected')
    group by d.pledge_id
  ),
  outstanding_pledges as (
    select
      p.need_id,
      coalesce(sum(greatest(p.quantity - coalesce(pv.quantity, 0), 0)), 0)::numeric as quantity
    from public.pledges p
    left join pledge_verified pv on pv.pledge_id = p.id
    where p.need_id is not null
      and p.status in ('accepted', 'scheduled', 'in_transit', 'partially_received')
    group by p.need_id
  )
  select
    n.id,
    n.slug,
    n.title,
    n.target_quantity,
    n.unit,
    least(n.target_quantity, coalesce(v.quantity, 0)) as verified_received_quantity,
    least(
      greatest(n.target_quantity - coalesce(v.quantity, 0), 0),
      coalesce(op.quantity, 0)
    ) as outstanding_accepted_pledge_quantity,
    greatest(
      n.target_quantity - coalesce(v.quantity, 0) - coalesce(op.quantity, 0),
      0
    ) as remaining_uncommitted_quantity
  from public.needs n
  left join verified v on v.need_id = n.id
  left join outstanding_pledges op on op.need_id = n.id
  where n.published_at is not null
    and n.status in (
      'seeking_support',
      'partially_pledged',
      'fully_pledged',
      'partially_received',
      'fulfilled'
    );
$$;

revoke all on function public.get_public_need_progress() from public;
grant execute on function public.get_public_need_progress() to anon, authenticated;

create or replace function public.get_public_supporter_recognition()
returns table (
  supporter_id uuid,
  public_name text,
  public_website text,
  public_logo_media_id uuid
)
language sql
stable
security definer
set search_path = public
as $$
  select
    s.id,
    s.public_name,
    s.public_website,
    s.public_logo_media_id
  from public.supporters s
  where s.recognition_consent = true
    and s.public_visibility = true
    and nullif(btrim(s.public_name), '') is not null;
$$;

revoke all on function public.get_public_supporter_recognition() from public;
grant execute on function public.get_public_supporter_recognition() to anon, authenticated;
