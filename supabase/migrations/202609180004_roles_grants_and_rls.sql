-- Roles, permissions, least-privilege grants, and Row Level Security.

insert into public.permissions (key, description) values
  ('library.manage', 'Manage library profile and service configuration'),
  ('content.edit', 'Create and edit draft/review public content'),
  ('content.publish', 'Approve and publish public content'),
  ('collection.manage', 'Manage books, categories, imports, and book requests'),
  ('needs.manage', 'Create and update development needs'),
  ('needs.publish', 'Approve/publicly publish development needs'),
  ('projects.manage', 'Create and update development projects and milestones'),
  ('projects.publish', 'Approve/publicly publish development projects'),
  ('supporters.manage', 'Manage supporter private records and recognition consent'),
  ('pledges.manage', 'Manage pledges'),
  ('donations.record', 'Record received donations'),
  ('donations.verify', 'Verify received donations'),
  ('media.manage', 'Manage media records and permission status'),
  ('enquiries.manage', 'Manage public and partnership enquiries'),
  ('users.manage', 'Manage staff accounts and roles'),
  ('audit.view', 'View audit events'),
  ('settings.manage', 'Manage approved application settings')
on conflict (key) do update
set description = excluded.description;

insert into public.roles (key, name, description) values
  ('content_editor', 'Content Editor', 'Drafts public pages, news, and approved media.'),
  ('collection_manager', 'Collection Manager', 'Manages books, categories, and book requests.'),
  ('needs_manager', 'Needs Manager', 'Manages development needs and projects.'),
  ('partnership_manager', 'Partnership Manager', 'Manages supporters, pledges, donation recording, and enquiries.'),
  ('approver', 'Content and Verification Approver', 'Approves public content and verifies sensitive status changes.'),
  ('library_admin', 'Library Administrator', 'Broad operational administration for the library portal.'),
  ('technical_admin', 'Technical Administrator', 'Technical operational role; institutional publishing authority is not implied.')
on conflict (key) do update
set
  name = excluded.name,
  description = excluded.description;

with mapping(role_key, permission_key) as (
  values
    ('content_editor', 'content.edit'),
    ('content_editor', 'media.manage'),

    ('collection_manager', 'collection.manage'),

    ('needs_manager', 'needs.manage'),
    ('needs_manager', 'projects.manage'),

    ('partnership_manager', 'supporters.manage'),
    ('partnership_manager', 'pledges.manage'),
    ('partnership_manager', 'donations.record'),
    ('partnership_manager', 'enquiries.manage'),

    ('approver', 'content.publish'),
    ('approver', 'needs.publish'),
    ('approver', 'projects.publish'),
    ('approver', 'donations.verify'),
    ('approver', 'audit.view'),

    ('technical_admin', 'audit.view'),

    ('library_admin', 'library.manage'),
    ('library_admin', 'content.edit'),
    ('library_admin', 'content.publish'),
    ('library_admin', 'collection.manage'),
    ('library_admin', 'needs.manage'),
    ('library_admin', 'needs.publish'),
    ('library_admin', 'projects.manage'),
    ('library_admin', 'projects.publish'),
    ('library_admin', 'supporters.manage'),
    ('library_admin', 'pledges.manage'),
    ('library_admin', 'donations.record'),
    ('library_admin', 'donations.verify'),
    ('library_admin', 'media.manage'),
    ('library_admin', 'enquiries.manage'),
    ('library_admin', 'users.manage'),
    ('library_admin', 'audit.view'),
    ('library_admin', 'settings.manage')
)
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from mapping m
join public.roles r on r.key = m.role_key
join public.permissions p on p.key = m.permission_key
on conflict do nothing;

create or replace function public.is_active_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles pr
    where pr.id = auth.uid()
      and pr.account_status = 'active'
  );
$$;

create or replace function public.has_permission(requested_permission text)
returns boolean
language sql
stable
security definer
set search_path = public
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

revoke all on function public.set_updated_at() from public;
revoke all on function public.handle_new_auth_user() from public;
revoke all on function public.is_active_staff() from public;
revoke all on function public.has_permission(text) from public;

grant execute on function public.is_active_staff() to authenticated;
grant execute on function public.has_permission(text) to authenticated;

grant usage on schema public to anon, authenticated;

-- Explicit table privileges. RLS below determines which rows/actions are allowed.
revoke all on all tables in schema public from anon, authenticated;

grant select on public.library_profile, public.services, public.media_assets,
  public.projects, public.project_milestones, public.project_updates,
  public.need_categories, public.needs, public.need_specifications,
  public.book_categories, public.books, public.pages, public.news_posts
to anon, authenticated;

grant insert on public.contact_messages to anon, authenticated;

grant select on public.roles, public.permissions, public.role_permissions, public.profiles,
  public.supporters, public.pledges, public.donations, public.donation_evidence,
  public.book_requests, public.contact_messages, public.audit_events
to authenticated;

grant insert, update on public.library_profile, public.services, public.media_assets,
  public.projects, public.project_milestones, public.project_updates,
  public.need_categories, public.needs, public.need_specifications,
  public.supporters, public.pledges, public.donations, public.donation_evidence,
  public.book_categories, public.books, public.book_requests, public.pages,
  public.news_posts, public.profiles
to authenticated;

grant update on public.contact_messages to authenticated;

-- RLS enablement.
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.profiles enable row level security;
alter table public.library_profile enable row level security;
alter table public.services enable row level security;
alter table public.media_assets enable row level security;
alter table public.projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_updates enable row level security;
alter table public.need_categories enable row level security;
alter table public.needs enable row level security;
alter table public.need_specifications enable row level security;
alter table public.supporters enable row level security;
alter table public.pledges enable row level security;
alter table public.donations enable row level security;
alter table public.donation_evidence enable row level security;
alter table public.book_categories enable row level security;
alter table public.books enable row level security;
alter table public.book_requests enable row level security;
alter table public.pages enable row level security;
alter table public.news_posts enable row level security;
alter table public.contact_messages enable row level security;
alter table public.audit_events enable row level security;

-- Role metadata: active staff may read role definitions.
create policy roles_staff_read
on public.roles for select
to authenticated
using (public.is_active_staff());

create policy permissions_staff_read
on public.permissions for select
to authenticated
using (public.is_active_staff());

create policy role_permissions_staff_read
on public.role_permissions for select
to authenticated
using (public.is_active_staff());

-- Profiles.
create policy profiles_self_or_user_admin_read
on public.profiles for select
to authenticated
using (id = auth.uid() or public.has_permission('users.manage'));

create policy profiles_user_admin_update
on public.profiles for update
to authenticated
using (public.has_permission('users.manage'))
with check (public.has_permission('users.manage'));

-- Library profile.
create policy library_profile_public_read
on public.library_profile for select
to anon, authenticated
using (public_visible = true);

create policy library_profile_staff_read
on public.library_profile for select
to authenticated
using (public.has_permission('library.manage') or public.has_permission('settings.manage'));

create policy library_profile_staff_insert
on public.library_profile for insert
to authenticated
with check (public.has_permission('library.manage') or public.has_permission('settings.manage'));

create policy library_profile_staff_update
on public.library_profile for update
to authenticated
using (public.has_permission('library.manage') or public.has_permission('settings.manage'))
with check (public.has_permission('library.manage') or public.has_permission('settings.manage'));

-- Shared content helpers are expressed directly in policies to keep policy intent visible.

-- Services.
create policy services_public_read
on public.services for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy services_staff_read
on public.services for select
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'));

create policy services_staff_insert
on public.services for insert
to authenticated
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

create policy services_staff_update
on public.services for update
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'))
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

-- Media.
create policy media_public_read
on public.media_assets for select
to anon, authenticated
using (public_visible = true and permission_status = 'approved');

create policy media_staff_read
on public.media_assets for select
to authenticated
using (public.has_permission('media.manage'));

create policy media_staff_insert
on public.media_assets for insert
to authenticated
with check (public.has_permission('media.manage'));

create policy media_staff_update
on public.media_assets for update
to authenticated
using (public.has_permission('media.manage'))
with check (public.has_permission('media.manage'));

-- Projects and milestones.
create policy projects_public_read
on public.projects for select
to anon, authenticated
using (
  published_at is not null
  and published_at <= now()
  and status in ('approved', 'seeking_support', 'in_progress', 'completed', 'archived')
);

create policy projects_staff_read
on public.projects for select
to authenticated
using (public.has_permission('projects.manage') or public.has_permission('projects.publish'));

create policy projects_staff_insert
on public.projects for insert
to authenticated
with check (public.has_permission('projects.manage') and status = 'planned' and published_at is null);

create policy projects_staff_update
on public.projects for update
to authenticated
using (public.has_permission('projects.manage') or public.has_permission('projects.publish'))
with check (public.has_permission('projects.manage') or public.has_permission('projects.publish'));

create policy milestones_public_read
on public.project_milestones for select
to anon, authenticated
using (
  exists (
    select 1 from public.projects p
    where p.id = project_id
      and p.published_at is not null
      and p.published_at <= now()
  )
);

create policy milestones_staff_read
on public.project_milestones for select
to authenticated
using (public.has_permission('projects.manage') or public.has_permission('projects.publish'));

create policy milestones_staff_insert
on public.project_milestones for insert
to authenticated
with check (public.has_permission('projects.manage'));

create policy milestones_staff_update
on public.project_milestones for update
to authenticated
using (public.has_permission('projects.manage'))
with check (public.has_permission('projects.manage'));

create policy project_updates_public_read
on public.project_updates for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy project_updates_staff_read
on public.project_updates for select
to authenticated
using (public.has_permission('projects.manage') or public.has_permission('projects.publish'));

create policy project_updates_staff_insert
on public.project_updates for insert
to authenticated
with check (
  public.has_permission('projects.publish')
  or (public.has_permission('projects.manage') and status in ('draft', 'review'))
);

create policy project_updates_staff_update
on public.project_updates for update
to authenticated
using (public.has_permission('projects.manage') or public.has_permission('projects.publish'))
with check (
  public.has_permission('projects.publish')
  or (public.has_permission('projects.manage') and status in ('draft', 'review'))
);

-- Needs.
create policy need_categories_public_read
on public.need_categories for select
to anon, authenticated
using (active = true);

create policy need_categories_staff_read
on public.need_categories for select
to authenticated
using (public.has_permission('needs.manage') or public.has_permission('needs.publish'));

create policy need_categories_staff_insert
on public.need_categories for insert
to authenticated
with check (public.has_permission('needs.manage'));

create policy need_categories_staff_update
on public.need_categories for update
to authenticated
using (public.has_permission('needs.manage'))
with check (public.has_permission('needs.manage'));

create policy needs_public_read
on public.needs for select
to anon, authenticated
using (
  published_at is not null
  and published_at <= now()
  and status in (
    'seeking_support',
    'partially_pledged',
    'fully_pledged',
    'partially_received',
    'fulfilled',
    'paused',
    'archived'
  )
);

create policy needs_staff_read
on public.needs for select
to authenticated
using (public.has_permission('needs.manage') or public.has_permission('needs.publish'));

create policy needs_staff_insert
on public.needs for insert
to authenticated
with check (
  public.has_permission('needs.manage')
  and status = 'draft'
  and published_at is null
);

create policy needs_staff_update
on public.needs for update
to authenticated
using (public.has_permission('needs.manage') or public.has_permission('needs.publish'))
with check (public.has_permission('needs.manage') or public.has_permission('needs.publish'));

create policy need_specs_public_read
on public.need_specifications for select
to anon, authenticated
using (
  public_visible = true
  and exists (
    select 1 from public.needs n
    where n.id = need_id
      and n.published_at is not null
      and n.published_at <= now()
  )
);

create policy need_specs_staff_read
on public.need_specifications for select
to authenticated
using (public.has_permission('needs.manage') or public.has_permission('needs.publish'));

create policy need_specs_staff_insert
on public.need_specifications for insert
to authenticated
with check (public.has_permission('needs.manage'));

create policy need_specs_staff_update
on public.need_specifications for update
to authenticated
using (public.has_permission('needs.manage'))
with check (public.has_permission('needs.manage'));

-- Supporters and support tracking stay staff-only in the foundation.
create policy supporters_staff_read
on public.supporters for select
to authenticated
using (public.has_permission('supporters.manage'));

create policy supporters_staff_insert
on public.supporters for insert
to authenticated
with check (public.has_permission('supporters.manage'));

create policy supporters_staff_update
on public.supporters for update
to authenticated
using (public.has_permission('supporters.manage'))
with check (public.has_permission('supporters.manage'));

create policy pledges_staff_read
on public.pledges for select
to authenticated
using (public.has_permission('pledges.manage') or public.has_permission('donations.record') or public.has_permission('donations.verify'));

create policy pledges_staff_insert
on public.pledges for insert
to authenticated
with check (public.has_permission('pledges.manage'));

create policy pledges_staff_update
on public.pledges for update
to authenticated
using (public.has_permission('pledges.manage'))
with check (public.has_permission('pledges.manage'));

create policy donations_staff_read
on public.donations for select
to authenticated
using (public.has_permission('donations.record') or public.has_permission('donations.verify'));

create policy donations_record_insert
on public.donations for insert
to authenticated
with check (
  public.has_permission('donations.record')
  and verified_quantity = 0
  and verified_at is null
  and verified_by is null
);

create policy donations_verify_update
on public.donations for update
to authenticated
using (public.has_permission('donations.verify'))
with check (public.has_permission('donations.verify'));

create policy donation_evidence_staff_read
on public.donation_evidence for select
to authenticated
using (public.has_permission('donations.record') or public.has_permission('donations.verify'));

create policy donation_evidence_staff_insert
on public.donation_evidence for insert
to authenticated
with check (public.has_permission('donations.record') or public.has_permission('donations.verify'));

create policy donation_evidence_staff_update
on public.donation_evidence for update
to authenticated
using (public.has_permission('donations.verify'))
with check (public.has_permission('donations.verify'));

-- Collection.
create policy book_categories_public_read
on public.book_categories for select
to anon, authenticated
using (active = true);

create policy book_categories_staff_read
on public.book_categories for select
to authenticated
using (public.has_permission('collection.manage'));

create policy book_categories_staff_insert
on public.book_categories for insert
to authenticated
with check (public.has_permission('collection.manage'));

create policy book_categories_staff_update
on public.book_categories for update
to authenticated
using (public.has_permission('collection.manage'))
with check (public.has_permission('collection.manage'));

create policy books_public_read
on public.books for select
to anon, authenticated
using (public_visible = true);

create policy books_staff_read
on public.books for select
to authenticated
using (public.has_permission('collection.manage'));

create policy books_staff_insert
on public.books for insert
to authenticated
with check (public.has_permission('collection.manage'));

create policy books_staff_update
on public.books for update
to authenticated
using (public.has_permission('collection.manage'))
with check (public.has_permission('collection.manage'));

create policy book_requests_staff_read
on public.book_requests for select
to authenticated
using (public.has_permission('collection.manage') or public.has_permission('needs.manage'));

create policy book_requests_staff_insert
on public.book_requests for insert
to authenticated
with check (public.has_permission('collection.manage') or public.has_permission('needs.manage'));

create policy book_requests_staff_update
on public.book_requests for update
to authenticated
using (public.has_permission('collection.manage') or public.has_permission('needs.manage'))
with check (public.has_permission('collection.manage') or public.has_permission('needs.manage'));

-- Pages and news.
create policy pages_public_read
on public.pages for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy pages_staff_read
on public.pages for select
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'));

create policy pages_staff_insert
on public.pages for insert
to authenticated
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

create policy pages_staff_update
on public.pages for update
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'))
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

create policy news_public_read
on public.news_posts for select
to anon, authenticated
using (status = 'published' and published_at is not null and published_at <= now());

create policy news_staff_read
on public.news_posts for select
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'));

create policy news_staff_insert
on public.news_posts for insert
to authenticated
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

create policy news_staff_update
on public.news_posts for update
to authenticated
using (public.has_permission('content.edit') or public.has_permission('content.publish'))
with check (
  public.has_permission('content.publish')
  or (public.has_permission('content.edit') and status in ('draft', 'review'))
);

-- Enquiries.
create policy contact_public_insert
on public.contact_messages for insert
to anon, authenticated
with check (
  status = 'new'
  and assigned_to is null
  and deleted_at is null
);

create policy contact_staff_read
on public.contact_messages for select
to authenticated
using (public.has_permission('enquiries.manage'));

create policy contact_staff_update
on public.contact_messages for update
to authenticated
using (public.has_permission('enquiries.manage'))
with check (public.has_permission('enquiries.manage'));

-- Audit is intentionally read-only to normal app roles in this foundation.
create policy audit_authorized_read
on public.audit_events for select
to authenticated
using (public.has_permission('audit.view'));
