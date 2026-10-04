# Data Model and Database Design

## 1. Purpose

### 1.1 Objective

Define a database structure that supports the public website, needs tracking, projects, donors, donations, partners, books, content, media, staff permissions, and auditability.

### 1.2 Database Direction

Recommended baseline:

- PostgreSQL;
- Supabase managed platform;
- Supabase Auth;
- Supabase Storage;
- Row Level Security;
- migration-based schema changes.

## 2. Design Principles

### 2.1 Public/Private Separation

Every table must define which fields are:

- public;
- staff-only;
- restricted;
- security-sensitive.

### 2.2 Stable IDs

Use UUIDs for primary application records unless a strong reason exists otherwise.

### 2.3 Auditability

Important state changes should preserve who changed what and when.

### 2.4 Soft Delete

Prefer archival or soft-deletion for public-history records such as projects and verified donations.

### 2.5 Timestamps

Core records should include:

- created_at;
- updated_at;
- created_by where relevant;
- updated_by where relevant.

## 3. Identity and Access Tables

### 3.1 auth.users

Managed by Supabase Auth.

Do not duplicate passwords or authentication secrets.

### 3.2 profiles

Suggested fields:

- id;
- display_name;
- staff_role;
- account_status;
- locale;
- created_at;
- updated_at.

### 3.3 roles

Suggested fields:

- id;
- key;
- name;
- description.

### 3.4 permissions

Suggested fields:

- id;
- key;
- description.

### 3.5 role_permissions

Maps roles to permissions.

## 4. Library Tables

### 4.1 libraries

The architecture should evolve from a single-profile assumption to a configurable library entity without forcing immediate multi-library UI.

Suggested fields:

- id;
- code / slug;
- official_name_si;
- official_name_en;
- official_name_ta;
- description translations;
- address translations;
- district;
- divisional_secretariat;
- local_authority;
- postal_code;
- latitude / longitude where verified;
- public_email;
- public_phone;
- opening_hours;
- website_status;
- active;
- last_verified_at.

The current `library_profile` table may remain during transition. Do not replace it destructively until a migration path and data mapping are approved.

Sensitive or unapproved details should not be stored as public fields.

### 4.2 services

Suggested fields:

- id;
- slug;
- title translations;
- description translations;
- status;
- display_order.

## 5. Needs Tables

### 5.1 need_categories

Fields:

- id;
- key;
- title translations;
- description translations;
- display_order;
- active.

### 5.2 needs

Fields:

- id;
- category_id;
- project_id nullable;
- slug;
- title translations;
- description translations;
- purpose translations;
- target_quantity;
- unit;
- priority;
- status;
- estimated_unit_cost nullable;
- estimated_currency nullable;
- public_notes translations;
- last_verified_at;
- published_at;
- created_at;
- updated_at.

### 5.3 need_specifications

For structured specifications:

- id;
- need_id;
- key;
- value;
- public_visible.

## 6. Project Tables

### 6.1 projects

Fields:

- id;
- slug;
- title translations;
- summary translations;
- problem translations;
- objective translations;
- beneficiary_summary translations;
- status;
- start_date;
- target_end_date;
- completed_at;
- last_verified_at;
- published_at.

### 6.2 project_milestones

Fields:

- id;
- project_id;
- title translations;
- status;
- target_date;
- completed_at;
- display_order.

### 6.3 project_updates

Fields:

- id;
- project_id;
- title translations;
- body translations;
- published_at;
- author_id;
- status.

## 7. Donor and Partner Tables

### 7.1 supporters

Use a neutral supporter entity for an individual or organisation.

Fields:

- id;
- type;
- internal_name;
- country;
- contact_person;
- contact_email;
- contact_phone;
- public_name;
- public_website;
- public_logo_media_id;
- recognition_consent;
- public_visibility;
- internal_notes;
- created_at.

Public and private fields must be protected separately.

### 7.2 pledges

Fields:

- id;
- supporter_id;
- need_id nullable;
- project_id nullable;
- description;
- quantity;
- status;
- expected_date;
- expires_at;
- accepted_at;
- internal_notes;
- created_at;
- updated_at.

### 7.3 donations

Fields:

- id;
- supporter_id;
- pledge_id nullable;
- need_id nullable;
- project_id nullable;
- description;
- received_quantity;
- verified_quantity;
- received_at;
- verified_at;
- status;
- public_summary translations;
- created_at;
- updated_at.

### 7.4 donation_evidence

Fields:

- id;
- donation_id;
- media_id;
- evidence_type;
- public_visible;
- note;
- created_at.

### 7.5 supporter_contacts

Multiple staff-only operational contacts may belong to one supporter.

Fields:

- id;
- supporter_id;
- full_name;
- job_title;
- email;
- phone;
- preferred_contact_method;
- is_primary;
- notes;
- audit fields.

### 7.6 partnership_opportunities

Pre-pledge relationship/funding pipeline.

Fields:

- id;
- supporter_id;
- need_id nullable;
- project_id nullable;
- pledge_id nullable;
- title;
- support_type;
- stage;
- source;
- expected_support_summary;
- estimated_value/currency nullable;
- next_step;
- next_follow_up_at;
- owner_id;
- internal_notes;
- audit fields.

Opportunity estimates are internal planning values and must not be counted as pledged or received support.

### 7.7 outreach_interactions

Minimal staff-only contact history.

Fields:

- supporter_id;
- contact_id nullable;
- opportunity_id nullable;
- direction;
- channel;
- subject;
- summary;
- occurred_at;
- optional Gmail thread/message IDs;
- created_by.

Do not store Gmail passwords, OAuth tokens, or unnecessary full email bodies.

### 7.8 follow_up_tasks

Staff attention queue.

Fields:

- supporter_id;
- contact_id nullable;
- opportunity_id nullable;
- title;
- due_at;
- priority;
- status;
- assigned_to;
- notes;
- completed_at;
- audit fields.

## 8. Book and Catalogue Data

### 8.1 Data Ownership Rule

Before creating or changing catalogue tables, determine the authoritative source for each field.

Possible roles for the Smart Library database include:

- authoritative application-owned data;
- import staging;
- data-cleaning workspace;
- search index/cache;
- enrichment metadata;
- integration mappings.

If Koha or another approved LMS owns live bibliographic, item, patron, or circulation data, do not create a second operational source of truth.

### 8.2 book_categories

Fields:

- id;
- classification_code;
- parent_id nullable;
- title translations;
- active;
- display_order.

### 8.3 bibliographic_records

Conceptual fields:

- id;
- source_system;
- source_record_id;
- title;
- subtitle;
- identifiers such as ISBN-13;
- language;
- classification_code;
- publisher;
- publication_year;
- edition;
- description;
- MARC / metadata payload where appropriate;
- public_visible;
- synchronization metadata;
- created_at;
- updated_at.

Contributors and subjects should be modelled so one record can have multiple authors, editors, translators, subjects, or classifications where required.

### 8.4 book_items

Conceptual copy/item fields:

- id;
- bibliographic_record_id;
- source_system;
- source_item_id;
- library_id;
- barcode;
- RFID identifier nullable;
- collection;
- shelving_location;
- circulation_type;
- circulation_status;
- condition;
- public_visible;
- synchronization metadata;
- created_at;
- updated_at.

Live circulation status should come from the authoritative library-management source.

### 8.5 Existing books Table

The current `books` table must be treated as an existing implementation asset, not automatically deleted.

Until the final integration model is verified, it may serve as:

- temporary catalogue storage;
- import staging;
- cleaned discovery data;
- search cache/index;
- enrichment data.

A later migration may map it into a more normalized bibliographic/item structure only after compatibility, rollback, and authoritative-source rules are documented.

### 8.6 book_requests

Fields:

- id;
- title nullable;
- author nullable;
- isbn nullable;
- language;
- category_id nullable;
- requested_topic nullable;
- education_level nullable;
- exact_title_required;
- alternative_acceptable;
- requested_copies;
- aggregate_request_count;
- priority;
- reason;
- status;
- created_at;
- updated_at.

### 8.7 collection_category_stats

Optional materialised or derived data:

- category_id;
- total_copies;
- suitable_copies;
- review_needed;
- replacement_needed;
- request_count;
- calculated_at.

## 9. Content Tables

### 9.1 news_posts

Fields:

- id;
- slug;
- title translations;
- body translations;
- excerpt translations;
- status;
- author_id;
- published_at;
- updated_at.

### 9.2 pages

For manageable static pages:

- id;
- slug;
- title translations;
- body translations;
- status;
- published_at;
- updated_at.

### 9.3 media_assets

Fields:

- id;
- storage_path;
- file_type;
- alt_text translations;
- caption translations;
- copyright_owner;
- permission_status;
- public_visible;
- uploaded_by;
- created_at.

## 10. Enquiry Tables

### 10.1 contact_messages

Fields:

- id;
- name;
- organisation nullable;
- country nullable;
- email;
- subject;
- message;
- related_need_id nullable;
- related_project_id nullable;
- status;
- received_at;
- retention_until;
- deleted_at nullable.

### 10.2 Anti-Spam Metadata

Keep only what is needed.

If IP or technical anti-abuse metadata is retained, document purpose, access, and retention period.

## 11. Audit Tables

### 11.1 audit_events

Fields:

- id;
- actor_id;
- action;
- entity_type;
- entity_id;
- previous_state_summary;
- new_state_summary;
- reason nullable;
- created_at.

Do not write passwords, access tokens, private message bodies, or unnecessary personal data into audit logs.

## 12. Derived Quantities

### 12.1 Accepted Pledged Quantity

Derived from active accepted pledge records.

### 12.2 Verified Received Quantity

Derived from verified donation records.

### 12.3 Remaining Quantity

Recommended:

```text
remaining =
max(
  target_quantity
  - active_accepted_pledge_quantity
  - verified_received_quantity,
  0
)
```

Implementation must avoid counting a donation twice when a received item originates from a pledge.

### 12.4 Safer Implementation

Once a pledge becomes received, either:

- reduce the active pledge balance by the amount received; or
- calculate remaining from a state-aware allocation model.

Add database tests for these transitions.

## 13. Row Level Security

### 13.1 Public Role

Unauthenticated users may select only intentionally public views/rows.

### 13.2 Authenticated Staff

Permissions depend on role.

### 13.3 Service Role

Service-role secrets remain server-side and must never be exposed in frontend code.

### 13.4 Public Views

If database views are used, verify their security behaviour. Do not assume underlying RLS automatically protects an unsafe security-definer view.

## 14. Storage Model

### 14.1 Public Media Bucket

Only approved public images/documents.

### 14.2 Private Media Bucket

Internal evidence and administrative documents.

### 14.3 Upload Policy

Validate:

- file type;
- file size;
- authorisation;
- filename/path;
- public permission status.

## 15. Database Migrations

### 15.1 Rule

Schema changes must be committed as migrations.

### 15.2 Environments

Use separate:

- local/development;
- preview/staging;
- production

environments.

### 15.3 Seed Data

Development seed data must use fictitious people and organisations unless real public information has been approved.

## 16. Backup and Recovery

### 16.1 Backup

Configure platform-supported database backups appropriate to the selected plan.

### 16.2 Export

Maintain a documented export method for critical structured data.

### 16.3 Recovery Test

Test recovery periodically rather than assuming backups are sufficient.

## 17. Research Basis

### 17.1 Supabase Security

Supabase documents that RLS and database grants work together and recommends RLS for exposed schemas.

Reference:
https://supabase.com/docs/guides/database/postgres/row-level-security

### 17.2 Supabase Storage

Storage access should be controlled with RLS policies.

Reference:
https://supabase.com/docs/guides/storage/security/access-control

### 17.3 Supabase Data Security

Secret/service-role keys must remain server-side.

Reference:
https://supabase.com/docs/guides/database/secure-data


## 18. Integration and Synchronization Data

### 18.1 integration_connections

Store configuration metadata for approved external systems without storing secrets in public application tables.

Possible fields:

- id;
- library_id;
- system_type;
- system_name;
- base_url or endpoint identifier;
- status;
- capabilities;
- last_successful_sync_at;
- last_error_at;
- created_at;
- updated_at.

Secrets must remain in secure environment/server configuration.

### 18.2 integration_mappings

Map Smart Library entities to external authoritative identifiers.

Possible fields:

- id;
- library_id;
- entity_type;
- local_id nullable;
- source_system;
- source_id;
- metadata;
- last_synced_at.

### 18.3 sync_state

Track safe synchronization state such as:

- source;
- cursor/version;
- last_started_at;
- last_completed_at;
- result;
- error summary.

Do not place private patron payloads or secrets into generic synchronization logs.

### 18.4 Failure Behavior

If an authoritative system is temporarily unavailable:

- do not fabricate availability or member status;
- public informational pages should remain available;
- cached catalogue data may be shown only when clearly identified as non-live where necessary;
- live-only actions such as hold, renew, or current-loan status should fail safely with a clear message.

## 19. Multi-Library Scalability

### 19.1 Library Foreign Keys

Application-owned entities that logically belong to a library should be capable of carrying a `library_id` when expansion requires it.

Do not hard-code Sevanagala identifiers throughout business logic.

### 19.2 Network Discovery

Future network-level search should support one bibliographic work being held by multiple libraries without duplicating the conceptual title unnecessarily.

### 19.3 Tenant Isolation

If multiple libraries eventually share the platform, define explicit access boundaries so staff from one library cannot access another library's restricted operational data unless granted network-level authority.
