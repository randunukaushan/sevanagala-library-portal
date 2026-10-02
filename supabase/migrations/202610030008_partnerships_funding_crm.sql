-- Partnerships & Funding CRM
-- Extends the existing supporters -> pledges -> donations model without duplicating it.
-- Gmail/password/token secrets are intentionally not stored in these tables.

insert into public.permissions (key, description)
values (
  'partnerships.manage',
  'Manage partnership contacts, funding opportunities, outreach records, and follow-up tasks'
)
on conflict (key) do update
set description = excluded.description;

with mapping(role_key, permission_key) as (
  values
    ('partnership_manager', 'partnerships.manage'),
    ('library_admin', 'partnerships.manage')
)
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from mapping m
join public.roles r on r.key = m.role_key
join public.permissions p on p.key = m.permission_key
on conflict do nothing;

create table public.supporter_contacts (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 160),
  job_title text check (job_title is null or char_length(job_title) <= 160),
  email text check (email is null or char_length(email) between 3 and 254),
  phone text check (phone is null or char_length(phone) <= 80),
  preferred_contact_method text not null default 'email'
    check (preferred_contact_method in ('email', 'phone', 'whatsapp', 'other')),
  is_primary boolean not null default false,
  notes text check (notes is null or char_length(notes) <= 2000),
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create trigger supporter_contacts_set_updated_at
before update on public.supporter_contacts
for each row execute function public.set_updated_at();

create unique index supporter_contacts_one_primary_idx
on public.supporter_contacts(supporter_id)
where is_primary = true;

create unique index supporter_contacts_email_unique_idx
on public.supporter_contacts(supporter_id, lower(email))
where email is not null and email <> '';

create index supporter_contacts_supporter_idx
on public.supporter_contacts(supporter_id);

create table public.partnership_opportunities (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete restrict,
  need_id uuid references public.needs(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  pledge_id uuid references public.pledges(id) on delete set null,
  title text not null check (char_length(title) between 3 and 200),
  support_type text not null default 'funding'
    check (support_type in (
      'funding',
      'books',
      'technology',
      'furniture',
      'facilities',
      'services',
      'training',
      'connectivity',
      'other'
    )),
  stage text not null default 'research'
    check (stage in (
      'research',
      'ready_to_contact',
      'contacted',
      'replied',
      'interested',
      'proposal_sent',
      'reviewing',
      'converted_to_pledge',
      'not_now',
      'closed'
    )),
  source text not null default 'manual'
    check (source in ('manual', 'gmail', 'website', 'referral', 'other')),
  expected_support_summary text
    check (expected_support_summary is null or char_length(expected_support_summary) <= 2000),
  estimated_value numeric(14,2)
    check (estimated_value is null or estimated_value >= 0),
  estimated_currency text
    check (estimated_currency is null or char_length(estimated_currency) = 3),
  next_step text check (next_step is null or char_length(next_step) <= 1000),
  next_follow_up_at timestamptz,
  owner_id uuid references public.profiles(id) on delete set null,
  internal_notes text check (internal_notes is null or char_length(internal_notes) <= 4000),
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (estimated_value is null or estimated_currency is not null)
);

create trigger partnership_opportunities_set_updated_at
before update on public.partnership_opportunities
for each row execute function public.set_updated_at();

create index partnership_opportunities_supporter_idx
on public.partnership_opportunities(supporter_id);

create index partnership_opportunities_stage_idx
on public.partnership_opportunities(stage);

create index partnership_opportunities_follow_up_idx
on public.partnership_opportunities(next_follow_up_at)
where next_follow_up_at is not null;

create index partnership_opportunities_need_idx
on public.partnership_opportunities(need_id)
where need_id is not null;

create index partnership_opportunities_project_idx
on public.partnership_opportunities(project_id)
where project_id is not null;

create table public.outreach_interactions (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete restrict,
  contact_id uuid references public.supporter_contacts(id) on delete set null,
  opportunity_id uuid references public.partnership_opportunities(id) on delete set null,
  direction text not null
    check (direction in ('outbound', 'inbound')),
  channel text not null default 'email'
    check (channel in ('email', 'phone', 'whatsapp', 'meeting', 'website', 'other')),
  subject text check (subject is null or char_length(subject) <= 300),
  summary text not null check (char_length(summary) between 1 and 3000),
  occurred_at timestamptz not null default now(),
  gmail_thread_id text check (gmail_thread_id is null or char_length(gmail_thread_id) <= 255),
  gmail_message_id text check (gmail_message_id is null or char_length(gmail_message_id) <= 255),
  external_reference text check (external_reference is null or char_length(external_reference) <= 500),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index outreach_interactions_supporter_idx
on public.outreach_interactions(supporter_id, occurred_at desc);

create index outreach_interactions_opportunity_idx
on public.outreach_interactions(opportunity_id, occurred_at desc)
where opportunity_id is not null;

create unique index outreach_interactions_gmail_message_unique_idx
on public.outreach_interactions(gmail_message_id)
where gmail_message_id is not null and gmail_message_id <> '';

create table public.follow_up_tasks (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete restrict,
  contact_id uuid references public.supporter_contacts(id) on delete set null,
  opportunity_id uuid references public.partnership_opportunities(id) on delete set null,
  title text not null check (char_length(title) between 3 and 200),
  due_at timestamptz not null,
  priority text not null default 'medium'
    check (priority in ('high', 'medium', 'low')),
  status text not null default 'open'
    check (status in ('open', 'done', 'cancelled')),
  assigned_to uuid references public.profiles(id) on delete set null,
  notes text check (notes is null or char_length(notes) <= 2000),
  completed_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (status = 'done' and completed_at is not null)
    or (status <> 'done' and completed_at is null)
  )
);

create trigger follow_up_tasks_set_updated_at
before update on public.follow_up_tasks
for each row execute function public.set_updated_at();

create index follow_up_tasks_due_idx
on public.follow_up_tasks(status, due_at);

create index follow_up_tasks_supporter_idx
on public.follow_up_tasks(supporter_id);

create index follow_up_tasks_opportunity_idx
on public.follow_up_tasks(opportunity_id)
where opportunity_id is not null;

-- Partnership staff need read-only visibility into need/project records to match
-- opportunities without receiving edit/publish permissions.
alter policy needs_staff_read
on public.needs
using (
  public.has_permission('needs.manage')
  or public.has_permission('needs.publish')
  or public.has_permission('partnerships.manage')
);

alter policy projects_staff_read
on public.projects
using (
  public.has_permission('projects.manage')
  or public.has_permission('projects.publish')
  or public.has_permission('partnerships.manage')
);

grant select, insert, update
on public.supporter_contacts,
   public.partnership_opportunities,
   public.follow_up_tasks
to authenticated;

grant select, insert
on public.outreach_interactions
to authenticated;

alter table public.supporter_contacts enable row level security;
alter table public.partnership_opportunities enable row level security;
alter table public.outreach_interactions enable row level security;
alter table public.follow_up_tasks enable row level security;

create policy supporter_contacts_staff_read
on public.supporter_contacts for select
to authenticated
using (public.has_permission('partnerships.manage'));

create policy supporter_contacts_staff_insert
on public.supporter_contacts for insert
to authenticated
with check (public.has_permission('partnerships.manage'));

create policy supporter_contacts_staff_update
on public.supporter_contacts for update
to authenticated
using (public.has_permission('partnerships.manage'))
with check (public.has_permission('partnerships.manage'));

create policy partnership_opportunities_staff_read
on public.partnership_opportunities for select
to authenticated
using (public.has_permission('partnerships.manage'));

create policy partnership_opportunities_staff_insert
on public.partnership_opportunities for insert
to authenticated
with check (public.has_permission('partnerships.manage'));

create policy partnership_opportunities_staff_update
on public.partnership_opportunities for update
to authenticated
using (public.has_permission('partnerships.manage'))
with check (public.has_permission('partnerships.manage'));

create policy outreach_interactions_staff_read
on public.outreach_interactions for select
to authenticated
using (public.has_permission('partnerships.manage'));

create policy outreach_interactions_staff_insert
on public.outreach_interactions for insert
to authenticated
with check (public.has_permission('partnerships.manage'));

create policy follow_up_tasks_staff_read
on public.follow_up_tasks for select
to authenticated
using (public.has_permission('partnerships.manage'));

create policy follow_up_tasks_staff_insert
on public.follow_up_tasks for insert
to authenticated
with check (public.has_permission('partnerships.manage'));

create policy follow_up_tasks_staff_update
on public.follow_up_tasks for update
to authenticated
using (public.has_permission('partnerships.manage'))
with check (public.has_permission('partnerships.manage'));

create or replace function public.create_partnership_supporter(
  p_supporter_type text,
  p_internal_name text,
  p_country text default null,
  p_public_website text default null,
  p_contact_name text default null,
  p_contact_title text default null,
  p_contact_email text default null,
  p_contact_phone text default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_supporter_id uuid;
begin
  if not public.has_permission('supporters.manage')
    or not public.has_permission('partnerships.manage') then
    raise exception 'insufficient partnership permissions';
  end if;

  if p_supporter_type not in ('organisation', 'individual', 'community_group') then
    raise exception 'invalid supporter type';
  end if;

  if char_length(trim(p_internal_name)) < 2 then
    raise exception 'supporter name is required';
  end if;

  insert into public.supporters (
    supporter_type,
    internal_name,
    country,
    public_website,
    contact_person,
    contact_email,
    contact_phone,
    created_by
  )
  values (
    p_supporter_type,
    trim(p_internal_name),
    nullif(trim(coalesce(p_country, '')), ''),
    nullif(trim(coalesce(p_public_website, '')), ''),
    nullif(trim(coalesce(p_contact_name, '')), ''),
    nullif(trim(coalesce(p_contact_email, '')), ''),
    nullif(trim(coalesce(p_contact_phone, '')), ''),
    auth.uid()
  )
  returning id into new_supporter_id;

  if nullif(trim(coalesce(p_contact_name, '')), '') is not null
    and (
      nullif(trim(coalesce(p_contact_email, '')), '') is not null
      or nullif(trim(coalesce(p_contact_phone, '')), '') is not null
    ) then
    insert into public.supporter_contacts (
      supporter_id,
      full_name,
      job_title,
      email,
      phone,
      is_primary,
      created_by,
      updated_by
    )
    values (
      new_supporter_id,
      trim(p_contact_name),
      nullif(trim(coalesce(p_contact_title, '')), ''),
      nullif(trim(coalesce(p_contact_email, '')), ''),
      nullif(trim(coalesce(p_contact_phone, '')), ''),
      true,
      auth.uid(),
      auth.uid()
    );
  end if;

  return new_supporter_id;
end;
$$;

revoke all on function public.create_partnership_supporter(
  text, text, text, text, text, text, text, text
) from public, anon;

grant execute on function public.create_partnership_supporter(
  text, text, text, text, text, text, text, text
) to authenticated;
