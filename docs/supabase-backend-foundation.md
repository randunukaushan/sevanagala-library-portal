# Supabase Backend Foundation

> Historical foundation-phase specification. Sections describing what was “not yet included” record the state when this foundation was designed, not the current application status. For implemented Auth/admin workflows and verification, see [Supabase Auth Application Integration](./supabase-auth-application-integration.md), [Admin Operations Implementation](./admin-operations-implementation.md), and [Security Audit Remediation](./security-audit-remediation.md).

## 1. Purpose

### 1.1 Objective

Translate the documented product/data/security model into the first migration-based Supabase/PostgreSQL foundation.

## 2. Original Foundation Scope

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

### 2.2 Excluded at Foundation Stage

This phase does not yet include:

- remote Supabase project connection;
- real staff accounts;
- production data;
- storage buckets;
- frontend Supabase client libraries;
- real admin writes;
- public donor-transparency view/function;
- database transition functions for every workflow;
- RLS automated test suite.

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

### 5.3 Public Transparency Read Model

The current implementation exposes a bounded public-safe support projection. Keep exposing only approved fields needed by public transparency pages.

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

## 12. Remaining Backend Work

### 12.1 Local Supabase Environment

Establish a reproducible local Supabase CLI environment and reconcile local/remote migration histories before using it with the connected project. Do not blindly apply the full local migration chain to a project already managed through a separate migration API.

### 12.2 Database Tests

Maintain automated RLS and workflow-transition tests; the repository now includes database assertions and CI replay coverage. Add focused tests alongside every new policy/transition.

### 12.3 Storage

Current storage policies and staff upload workflows exist; before expanding storage, verify:

- approved public media bucket;
- private evidence bucket;
- RLS storage policies.

### 12.4 Application Acceptance

Complete authenticated browser acceptance with approved staff accounts, verify actual Storage APIs and each role's capabilities, and generate typed database bindings once the schema is stable. Current application scope is documented in [Supabase Auth Application Integration](./supabase-auth-application-integration.md) and [Admin Operations Implementation](./admin-operations-implementation.md).
