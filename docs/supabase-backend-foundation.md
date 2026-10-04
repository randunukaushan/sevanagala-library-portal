# Supabase Backend Foundation

## 1. Purpose

### 1.1 Objective

Translate the documented product/data/security model into the first migration-based Supabase/PostgreSQL foundation.

## 2. Current Scope

### 2.1 Included

The foundation includes:

- Supabase Auth profile linkage;
- role and permission model;
- library profile;
- services;
- media metadata;
- development needs;
- projects and milestones;
- supporters;
- pledges;
- donations and evidence;
- collection data;
- book requests;
- public pages;
- news;
- contact enquiries;
- audit-event storage;
- explicit grants;
- Row Level Security.

### 2.2 Not Yet Included

This phase does not yet include:

- remote Supabase project connection;
- real staff accounts;
- production data;
- storage buckets;
- frontend Supabase client libraries;
- real admin writes;
- public donor-transparency view/function;
- database transition functions for every workflow;
- RLS automated test suite;
- verified Koha/LMS connection;
- catalogue synchronization or integration mappings;
- physical item/copy model suitable for authoritative circulation;
- member circulation integration.

## 3. Identity Model

### 3.1 Supabase Auth

Credentials live in `auth.users`.

The portal does not create its own password table.

### 3.2 Profiles

Each Auth user receives a `profiles` record.

New profiles start:

- account status: Pending;
- role: none.

An authorised admin must activate and assign the account.

## 4. Permission Model

### 4.1 Database Permissions

Application permissions are explicit records.

Examples:

- content.edit;
- content.publish;
- collection.manage;
- needs.manage;
- needs.publish;
- projects.manage;
- projects.publish;
- supporters.manage;
- pledges.manage;
- donations.record;
- donations.verify;
- enquiries.manage;
- users.manage;
- audit.view.

### 4.2 RLS Helper

The `has_permission()` database helper checks:

- current authenticated user;
- active account state;
- assigned role;
- role-permission mapping.

UI controls remain secondary. Database policies are the real authorisation boundary.

## 5. Data Separation

### 5.1 Public Content

Some tables can expose approved/published rows directly through RLS.

Examples:

- services;
- projects;
- needs;
- books;
- pages;
- news;
- approved media.

### 5.2 Private Support Data

Private supporter contact information must not be exposed directly.

Therefore the foundation does not grant anonymous access to:

- supporters;
- pledges;
- donations;
- donation evidence.

### 5.3 Future Transparency Read Model

A later migration should expose only safe fields needed by public transparency pages.

Possible output:

- supporter public name only when consent exists;
- need/project;
- public contribution summary;
- pledged/verified quantity;
- public status;
- verified date.

Do not expose private supporter tables to solve this.

## 6. Donation Separation of Duties

### 6.1 Record Permission

`donations.record` may insert a received donation only when:

- verified quantity is zero;
- verified date is null;
- verifier is null.

### 6.2 Verify Permission

Updating verification fields requires `donations.verify`.

This supports the documented separation between recording receipt and verification.

## 7. Content Publishing

### 7.1 Editor

Content editors can create/update:

- Draft;
- Review

content.

### 7.2 Publisher

Publishing/approval permission is separate.

This applies to managed public pages, services, news, and project updates.

## 8. Enquiries

### 8.1 Anonymous Submission

Direct public contact insertion is now disabled pending a reviewed,
abuse-resistant submission path. The following describes the intended future
submission state, not a currently open anonymous write endpoint.

The submitted row must remain:

- New;
- unassigned;
- not deleted.

### 8.2 Staff Access

Only staff with enquiry-management permission can read/update messages.

## 9. Collection Rules

### 9.1 Books

Book records separate:

- physical condition;
- content review status.

Publication year alone does not trigger withdrawal.

### 9.2 Public Catalogue

Only records explicitly marked public-visible can be read anonymously.

## 10. Audit

### 10.1 Table

The foundation creates an audit-events table.

### 10.2 Client Boundary

Normal application roles receive read permission only when authorised.

No normal app role receives direct audit-event insert/update permission in this foundation.

Private database triggers now create minimal audit events for application-table
changes. Staff permissions require verified MFA. See
[Security Audit Remediation](./security-audit-remediation.md) for current controls
and limitations.

## 11. RLS Test Plan

### 11.1 Anonymous

Test:

- public published content visible;
- draft content hidden;
- private donor data hidden;
- direct contact submission denied until abuse controls are implemented;
- contact read denied.

### 11.2 Content Editor

Test:

- draft/edit allowed;
- direct publish denied.

### 11.3 Collection Manager

Test:

- book management allowed;
- donor management denied.

### 11.4 Partnership Manager

Test:

- supporter/pledge management allowed;
- donation recording allowed;
- verification update denied.

### 11.5 Approver

Test:

- publish permissions;
- donation verification;
- audit viewing.

### 11.6 Disabled User

All privileged app policies should fail when the account is disabled.

## 12. Next Backend Steps

### 12.1 Local Supabase Environment

Add Supabase CLI/local configuration and run migrations from a clean database.

### 12.2 Database Tests

Add automated RLS and workflow-transition tests.

### 12.3 Storage

Create:

- approved public media bucket;
- private evidence bucket;
- RLS storage policies.

### 12.4 Application Integration

After the database is tested:

- add Supabase browser/server clients;
- add staff login;
- protect real `/admin` routes;
- connect one vertical slice first.

Recommended first vertical slice:

**Need draft → approval → publish → public display**


## 13. Smart Library Integration Boundary

### 13.1 Supabase Role

Supabase remains the application backend for portal-owned concerns such as:

- authentication for portal staff;
- needs/projects;
- donor and partnership workflows;
- website content;
- events and future application-specific services;
- audit and integration metadata.

It is not automatically authoritative for catalogue, physical-copy, member, loan, hold, or fine data when Koha or another approved LMS owns those domains.

### 13.2 Current books Table

The current `books` table is preserved.

Do not delete, rename, or reshape it destructively until the real catalogue source and migration/integration strategy are verified.

### 13.3 Future Integration Tables

A future migration may add application-owned tables for:

- external-system connections;
- entity mappings;
- synchronization state;
- cached/enriched discovery metadata.

External credentials must stay in secure server/environment configuration rather than normal database rows exposed to application clients.

### 13.4 Public Read Safety

If catalogue information is sourced from an external LMS, public Supabase views or caches must not silently present stale availability as live status.

### 13.5 Member Data

Do not copy full member or borrowing histories into Supabase merely for convenience.

Any member-data synchronization must have a documented purpose, minimum field set, retention rule, access model, and authoritative-source definition.
