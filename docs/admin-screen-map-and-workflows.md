# Admin Screen Map and Workflows

## 1. Purpose

### 1.1 Objective

Define the implemented admin-preview screen map and the operational workflow each screen is preparing for.

The current screens are static UI/UX previews using sample data only.

## 2. Screen Map

### 2.1 Dashboard

Route:

`/admin-preview`

Purpose:

- show the most important operational status;
- surface work requiring attention;
- show recent activity;
- provide a fast overview of active library-development records.

### 2.2 Needs

Route:

`/admin-preview/needs`

Purpose:

- create measurable development needs;
- assign category and priority;
- track target and remaining quantities;
- verify public wording and recency;
- prepare records for publication.

### 2.3 Projects

Route:

`/admin-preview/projects`

Purpose:

- group related needs;
- define outcomes;
- maintain milestones;
- record ownership;
- track project lifecycle.

### 2.4 Pledges

Route:

`/admin-preview/pledges`

Purpose:

- record proposed support;
- review conditions;
- accept valid pledges;
- track expected delivery;
- expire or cancel commitments safely.

### 2.5 Donations

Route:

`/admin-preview/donations`

Purpose:

- record actual receipt;
- verify quantity and condition;
- reconcile with an existing pledge;
- allocate items;
- trigger approved public updates.

### 2.6 Partners

Route:

`/admin-preview/partners`

Purpose:

- manage supporter organisations;
- separate private relationship details from public recognition;
- track consent for name/logo/site publication.

### 2.7 Books

Route:

`/admin-preview/books`

Purpose:

- manage collection records;
- track classification;
- track language and copy count;
- separate physical condition from content review;
- support future CSV import.

### 2.8 Book Requests

Route:

`/admin-preview/book-requests`

Purpose:

- aggregate reader demand;
- track exact-title or category requests;
- record language and priority;
- match requests with donor opportunities.

### 2.9 Enquiries

Route:

`/admin-preview/enquiries`

Purpose:

- manage reader and partner messages;
- assign responsibility;
- apply retention and privacy controls;
- connect partnership enquiries to needs/projects.

### 2.10 Pages

Route:

`/admin-preview/pages`

Purpose:

- manage evergreen public pages;
- maintain approval and translation state;
- avoid requiring code edits for routine content.

### 2.11 News

Route:

`/admin-preview/news`

Purpose:

- draft;
- review;
- approve;
- publish;
- archive public updates.

### 2.12 Media

Route:

`/admin-preview/media`

Purpose:

- upload approved assets later;
- track permission;
- separate public/private visibility;
- prevent accidental publication of internal evidence.

### 2.13 Users

Route:

`/admin-preview/users`

Purpose:

- manage individual staff accounts;
- assign least-privilege roles;
- track account status;
- support MFA for privileged roles.

### 2.14 Audit Log

Route:

`/admin-preview/audit-log`

Purpose:

- show important administrative actions;
- support accountability;
- avoid logging secrets or unnecessary private content.

### 2.15 Settings

Route:

`/admin-preview/settings`

Purpose:

- manage approved institutional configuration;
- show launch-readiness settings;
- keep infrastructure secrets outside ordinary UI.

## 3. Core Operational Flows

### 3.1 Need to Public Registry

Draft Need → Staff Review → Approval → Seeking Support → Pledge → Receipt → Verification → Fulfilled / Archived

### 3.2 Donor Support

Partner / Enquiry → Proposed Pledge → Review → Accepted Pledge → Receipt → Verification → Allocation → Public Acknowledgement

### 3.3 Book Demand

Reader Requests → Aggregate Demand → Staff Review → Book/Category Need → Donor Matching → Received Books → Collection Review → Catalogue

### 3.4 Public Content

Draft → Review → Approved → Published → Archived

## 4. Safety Boundaries

### 4.1 Static Preview

Current preview:

- performs no writes;
- has no real authentication;
- has no real private data;
- contains sample records only.

### 4.2 Production Boundary

The repository now has a protected staff workspace and Supabase-backed workflows. This screen map remains a product/design reference, not proof that every mapped screen or production control is complete. Before production use, verify:

- Supabase Auth and account lifecycle;
- documented role model;
- RLS;
- server-side validation;
- audit events;
- protected private storage;
- approval rules.

## 5. Mobile Behaviour

### 5.1 Navigation

Desktop uses persistent side navigation.

Mobile uses a compact admin navigation control.

### 5.2 Data Tables

Structured operational tables may scroll horizontally on small screens when simplifying columns would hide essential information.

### 5.3 Future Improvement

High-frequency mobile tasks may later receive dedicated card/list views.

## 6. Visual System

### 6.1 Canonical Palette

Admin UI follows the approved old-book warmth + modern public-library system.

Use:

- parchment;
- warm white;
- aged-paper beige;
- oxblood;
- walnut;
- leather;
- antique-gold accents;
- dark ink.

Green remains retired from the prototype visual system.

### 6.2 Density

Admin pages may be denser than public pages but must preserve:

- readability;
- visible focus;
- semantic status text;
- accessible target sizes.

## 7. Backend Mapping

### 7.1 Planned Data Sources

The screens will later connect to:

- profiles and roles;
- needs;
- projects and milestones;
- supporters;
- pledges;
- donations;
- books;
- book requests;
- news;
- media;
- audit events.

### 7.2 No Direct Browser Privilege

Privileged database keys must never be exposed to these screens.

## 8. Implementation Status and Remaining Work

### 8.1 Preview Versus Live Admin

`/admin-preview/**` remains static and sample-only. The protected `/admin` workspace is a separate live backend implementation for the workflows listed in [Admin Operations Implementation](./admin-operations-implementation.md) and [Admin Projects Implementation](./admin-projects-implementation.md).

Static preview patterns include:

- create need;
- create project;
- record pledge;
- verify donation;
- add book;
- CSV book import;
- review public content;
- partner recognition permission;
- role/permission matrix.

Not yet fully implemented in the live backend:

- edit existing records;
- full multilingual page editor;
- enquiry assignment/detail view;
- media upload permission review.

### 8.2 Future Backend Work

Continue from the existing backend rather than recreating its foundation. Remaining work includes:

- complete authorised staff browser acceptance and role-by-role testing;
- implement remaining approved workflows incrementally;
- add public enquiry only after privacy and abuse-control review;
- keep circulation out of scope until its institutional decision gate passes.
