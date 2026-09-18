# Supabase Backend Foundation

## 1. Status

### 1.1 Current State

The repository contains the first database migration set, but it is not yet connected to a remote Supabase project.

Do not treat these migrations as applied to production until they have been tested in a local/development Supabase environment.

## 2. Migration Order

### 2.1 Foundation

`202609180001_foundation.sql`

Creates:

- roles;
- permissions;
- role-permission mapping;
- staff profiles tied to Supabase Auth;
- library profile;
- services;
- media metadata;
- timestamp helpers;
- new-auth-user profile trigger.

### 2.2 Development and Support

`202609180002_development_and_support.sql`

Creates:

- projects;
- milestones;
- project updates;
- need categories;
- needs;
- need specifications;
- supporters;
- pledges;
- donations;
- donation evidence.

### 2.3 Collection and Content

`202609180003_collection_content_and_audit.sql`

Creates:

- book categories;
- books;
- aggregated book requests;
- managed public pages;
- news posts;
- contact messages;
- audit events.

### 2.4 Roles, Grants and RLS

`202609180004_roles_grants_and_rls.sql`

Creates/seeds:

- application permissions;
- staff roles;
- role-permission mappings;
- active-staff helper;
- permission-check helper;
- explicit grants;
- Row Level Security policies.

## 3. Security Boundary

### 3.1 Public Data

Anonymous users can only read intentionally publishable records such as:

- visible library profile;
- published services;
- approved public media;
- published projects;
- published needs;
- active categories;
- public-visible books;
- published pages/news.

### 3.2 Private Support Data

The following remain staff-only in this foundation:

- supporter contact information;
- pledges;
- donation verification records;
- internal evidence;
- book requests;
- enquiries;
- audit events.

A separate safe public transparency read model will be added later. Do not expose supporter tables directly to anonymous users.

### 3.3 Contact Form

Anonymous users may insert a new contact message only with the default new/unassigned state.

They cannot read submitted messages.

## 4. Authentication

### 4.1 Auth Source

Supabase Auth owns authentication credentials.

The application stores no custom passwords.

### 4.2 Staff Profile

A new Auth user receives a pending profile automatically.

An authorised administrator must later:

- activate the account;
- assign an approved role.

## 5. Roles

### 5.1 Seeded Roles

- Content Editor
- Collection Manager
- Needs Manager
- Partnership Manager
- Content and Verification Approver
- Library Administrator
- Technical Administrator

### 5.2 Important Rule

A technical role does not automatically receive institutional publishing authority.

## 6. Applying Migrations

### 6.1 Local First

When Supabase CLI/project setup is added:

1. start a local development stack;
2. apply migrations from a clean database;
3. seed sample development data;
4. run RLS tests;
5. test rollback/rebuild;
6. only then apply to a remote development project.

### 6.2 Production

Never test a new migration for the first time against production.

## 7. Required Tests Before Remote Use

### 7.1 Schema

Confirm:

- all migrations apply in order;
- foreign keys work;
- check constraints reject invalid states;
- updated-at triggers work.

### 7.2 RLS

Test at minimum:

- anon public reads;
- anon cannot read private donor data;
- anon can submit but cannot read enquiries;
- editor cannot publish without publish permission;
- collection manager cannot manage donors;
- partnership manager cannot verify donations;
- approver can verify;
- disabled staff lose permission;
- library admin has expected operational permissions.

### 7.3 Support Accounting

Test:

- accepted pledge;
- cancellation;
- partial receipt;
- verification;
- no double counting.

## 8. Secrets

### 8.1 Repository

Never commit:

- service-role key;
- database password;
- access token;
- production credentials.

### 8.2 Browser

Only browser-safe publishable configuration may use public environment variables.

Privileged actions must remain server-side or database-controlled.
