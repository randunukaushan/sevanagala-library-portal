-- Development needs, projects, supporters, pledges, and donations.

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{}'::jsonb,
  summary jsonb not null default '{}'::jsonb,
  problem jsonb not null default '{}'::jsonb,
  objective jsonb not null default '{}'::jsonb,
  beneficiary_summary jsonb not null default '{}'::jsonb,
  status text not null default 'planned'
    check (status in ('planned', 'approved', 'seeking_support', 'in_progress', 'completed', 'archived')),
  start_date date,
  target_end_date date,
  completed_at timestamptz,
  last_verified_at timestamptz,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title jsonb not null default '{}'::jsonb,
  status text not null default 'planned'
    check (status in ('planned', 'in_progress', 'completed', 'cancelled')),
  target_date date,
  completed_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger project_milestones_set_updated_at
before update on public.project_milestones
for each row execute function public.set_updated_at();

create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger project_updates_set_updated_at
before update on public.project_updates
for each row execute function public.set_updated_at();

create table public.need_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger need_categories_set_updated_at
before update on public.need_categories
for each row execute function public.set_updated_at();

create table public.needs (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.need_categories(id) on delete restrict,
  project_id uuid references public.projects(id) on delete set null,
  slug text not null unique,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  purpose jsonb not null default '{}'::jsonb,
  target_quantity numeric(12,2) not null check (target_quantity > 0),
  unit text not null check (char_length(unit) between 1 and 40),
  priority text not null default 'medium'
    check (priority in ('critical', 'high', 'medium', 'low')),
  status text not null default 'draft'
    check (status in (
      'draft',
      'pending_approval',
      'seeking_support',
      'partially_pledged',
      'fully_pledged',
      'partially_received',
      'fulfilled',
      'paused',
      'archived'
    )),
  estimated_unit_cost numeric(14,2) check (estimated_unit_cost is null or estimated_unit_cost >= 0),
  estimated_currency text check (estimated_currency is null or char_length(estimated_currency) = 3),
  public_notes jsonb not null default '{}'::jsonb,
  last_verified_at timestamptz,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger needs_set_updated_at
before update on public.needs
for each row execute function public.set_updated_at();

create table public.need_specifications (
  id uuid primary key default gen_random_uuid(),
  need_id uuid not null references public.needs(id) on delete cascade,
  key text not null,
  value text not null,
  public_visible boolean not null default true,
  created_at timestamptz not null default now(),
  unique (need_id, key)
);

create table public.supporters (
  id uuid primary key default gen_random_uuid(),
  supporter_type text not null
    check (supporter_type in ('organisation', 'individual', 'community_group')),
  internal_name text not null,
  country text,
  contact_person text,
  contact_email text,
  contact_phone text,
  public_name text,
  public_website text,
  public_logo_media_id uuid references public.media_assets(id) on delete set null,
  recognition_consent boolean not null default false,
  public_visibility boolean not null default false,
  internal_notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger supporters_set_updated_at
before update on public.supporters
for each row execute function public.set_updated_at();

create table public.pledges (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete restrict,
  need_id uuid references public.needs(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  description text not null,
  quantity numeric(12,2) not null check (quantity > 0),
  status text not null default 'proposed'
    check (status in (
      'proposed',
      'under_review',
      'accepted',
      'scheduled',
      'in_transit',
      'partially_received',
      'received',
      'cancelled',
      'expired'
    )),
  expected_date date,
  expires_at timestamptz,
  accepted_at timestamptz,
  internal_notes text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (need_id is not null or project_id is not null)
);

create trigger pledges_set_updated_at
before update on public.pledges
for each row execute function public.set_updated_at();

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete restrict,
  pledge_id uuid references public.pledges(id) on delete set null,
  need_id uuid references public.needs(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  description text not null,
  received_quantity numeric(12,2) not null check (received_quantity > 0),
  verified_quantity numeric(12,2) not null default 0
    check (verified_quantity >= 0 and verified_quantity <= received_quantity),
  received_at timestamptz not null default now(),
  verified_at timestamptz,
  status text not null default 'recorded'
    check (status in (
      'recorded',
      'received',
      'under_verification',
      'verified',
      'allocated',
      'deployed',
      'catalogued',
      'closed',
      'rejected'
    )),
  public_summary jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  verified_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (need_id is not null or project_id is not null)
);

create trigger donations_set_updated_at
before update on public.donations
for each row execute function public.set_updated_at();

create table public.donation_evidence (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete restrict,
  evidence_type text not null,
  public_visible boolean not null default false,
  note text,
  created_at timestamptz not null default now()
);

create index projects_status_idx on public.projects(status);
create index needs_status_idx on public.needs(status);
create index needs_category_idx on public.needs(category_id);
create index needs_project_idx on public.needs(project_id);
create index pledges_need_idx on public.pledges(need_id);
create index pledges_status_idx on public.pledges(status);
create index donations_need_idx on public.donations(need_id);
create index donations_status_idx on public.donations(status);
create index supporters_public_idx on public.supporters(public_visibility, recognition_consent);
