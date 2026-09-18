-- Collection, content, enquiries, and audit data.

create table public.book_categories (
  id uuid primary key default gen_random_uuid(),
  classification_code text not null,
  parent_id uuid references public.book_categories(id) on delete set null,
  title jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (classification_code, parent_id)
);

create trigger book_categories_set_updated_at
before update on public.book_categories
for each row execute function public.set_updated_at();

create table public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  author text,
  isbn text,
  language text not null check (language in ('si', 'en', 'ta', 'other')),
  classification_code text,
  category_id uuid references public.book_categories(id) on delete set null,
  publisher text,
  publication_year integer
    check (publication_year is null or publication_year between 1400 and 2200),
  edition text,
  copy_count integer not null default 1 check (copy_count >= 0),
  circulation_type text not null default 'lending'
    check (circulation_type in ('lending', 'reference_only', 'restricted')),
  condition text not null default 'good'
    check (condition in ('good', 'fair', 'worn', 'damaged', 'unusable', 'missing', 'under_review')),
  review_status text not null default 'current'
    check (review_status in (
      'current',
      'review_needed',
      'outdated_review_confirmed',
      'replacement_recommended',
      'historical_retain',
      'withdrawn_approved'
    )),
  location text,
  public_visible boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger books_set_updated_at
before update on public.books
for each row execute function public.set_updated_at();

create unique index books_isbn_unique_idx
on public.books(isbn)
where isbn is not null and isbn <> '';

create table public.book_requests (
  id uuid primary key default gen_random_uuid(),
  title text,
  author text,
  isbn text,
  language text not null check (language in ('si', 'en', 'ta', 'other')),
  category_id uuid references public.book_categories(id) on delete set null,
  requested_topic text,
  education_level text,
  exact_title_required boolean not null default false,
  alternative_acceptable boolean not null default true,
  requested_copies integer not null default 1 check (requested_copies > 0),
  aggregate_request_count integer not null default 1 check (aggregate_request_count > 0),
  priority text not null default 'medium'
    check (priority in ('high', 'medium', 'low')),
  reason text,
  status text not null default 'open'
    check (status in ('open', 'matching', 'pledged', 'received', 'fulfilled', 'closed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (title is not null or requested_topic is not null)
);

create trigger book_requests_set_updated_at
before update on public.book_requests
for each row execute function public.set_updated_at();

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  excerpt jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger news_posts_set_updated_at
before update on public.news_posts
for each row execute function public.set_updated_at();

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  organisation text check (organisation is null or char_length(organisation) <= 180),
  country text check (country is null or char_length(country) <= 120),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 1 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  related_need_id uuid references public.needs(id) on delete set null,
  related_project_id uuid references public.projects(id) on delete set null,
  status text not null default 'new'
    check (status in ('new', 'assigned', 'in_progress', 'resolved', 'closed')),
  assigned_to uuid references public.profiles(id) on delete set null,
  received_at timestamptz not null default now(),
  retention_until timestamptz not null default (now() + interval '180 days'),
  deleted_at timestamptz
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  previous_state_summary jsonb,
  new_state_summary jsonb,
  reason text,
  created_at timestamptz not null default now()
);

create index books_category_idx on public.books(category_id);
create index books_public_idx on public.books(public_visible);
create index book_requests_status_idx on public.book_requests(status);
create index pages_status_idx on public.pages(status);
create index news_posts_status_idx on public.news_posts(status);
create index contact_messages_status_idx on public.contact_messages(status);
create index contact_messages_retention_idx on public.contact_messages(retention_until);
create index audit_events_entity_idx on public.audit_events(entity_type, entity_id);
create index audit_events_created_idx on public.audit_events(created_at desc);
