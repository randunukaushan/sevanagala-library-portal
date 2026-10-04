# Technical Architecture, Deployment and Operations

## 1. Purpose

### 1.1 Objective

Define a maintainable technical stack and deployment model for a small public-library team while preserving room for future growth.

## 2. Recommended Stack

### 2.1 Frontend and Application

Recommended:

- Next.js;
- TypeScript;
- App Router;
- React;
- Tailwind CSS or an equivalent utility-first styling approach.

Use stable releases at implementation time and pin exact versions in the lockfile.

### 2.2 Backend and Integration

Recommended application-owned backend:

- Supabase PostgreSQL;
- Supabase Auth;
- Supabase Storage.

The Smart Library platform must also support integration with an approved library-management system such as Koha where that system is authoritative for catalogue, item, patron, or circulation data.

Supabase is not automatically the system of record for every library-management domain.

### 2.3 Hosting

Recommended baseline:

- Vercel for the Next.js application;
- Supabase for database/auth/storage;
- GitHub for source control.

### 2.4 Development

Recommended:

- VS Code;
- Codex IDE extension;
- Git;
- local Supabase tooling where practical.

## 3. Architecture Overview

### 3.1 High-Level Flow

```text
Public / Member Browser
          |
          v
   Next.js Application
          |
     +----+-------------------------------+
     |                                    |
     v                                    v
Application-owned content          Library discovery/member services
     |                                    |
     v                                    v
Supabase Auth / PostgreSQL      Integration / Service Layer
     |                                    |
     +--> RLS / Storage / Audit           v
                                  Koha or approved LMS
                                  (authoritative where applicable)
```

### 3.2 Data Ownership Boundary

The application must know whether each data domain is:

- Smart Library owned;
- externally authoritative;
- cached;
- indexed;
- enriched;
- or staged for migration/import.

Avoid hidden dual-write behavior across Supabase and Koha.

### 3.3 Integration Layer

External library-system calls should pass through a defined server-side integration layer.

Responsibilities include:

- authentication to the external system;
- request validation;
- response normalization;
- timeout handling;
- retries where safe;
- caching where appropriate;
- error translation;
- audit/diagnostic metadata;
- protection of external credentials.

Client components must not receive privileged Koha/LMS credentials.

## 4. Next.js Architecture

### 4.1 App Router

Use App Router for new application structure.

### 4.2 Server Components

Prefer server-rendered/server-component approaches for public data pages where appropriate.

### 4.3 Client Components

Use only where interactive browser behaviour is required.

### 4.4 Server Actions / Route Handlers

Sensitive writes must execute with validated server-side logic and database authorisation.

### 4.5 Data Access Layer

Keep database access in a defined server-side layer instead of scattering privileged queries across UI components.

## 5. Repository Structure

### 5.1 Proposed Structure

```text
sevanagala-library-portal/
├── app/
├── components/
├── features/
├── lib/
│   ├── server/
│   ├── validation/
│   └── utils/
├── public/
├── supabase/
│   ├── migrations/
│   └── tests/
├── tests/
├── docs/
├── AGENTS.md
├── README.md
└── package.json
```

### 5.2 Feature Organisation

Feature modules may include:

- needs;
- projects;
- donations;
- partners;
- catalogue/discovery;
- member-library services;
- integrations;
- events;
- children/resources;
- news;
- admin;
- contact.

## 6. Environment Strategy

### 6.1 Local

For development with sample data.

### 6.2 Preview / Staging

For:

- UI review;
- staff review;
- permission review;
- accessibility testing;
- donor-flow testing.

Must be clearly labelled as non-official until approval.

### 6.3 Production

Only after launch approval.

## 7. Environment Variables

### 7.1 Rules

- no production secret in source control;
- no service-role secret in browser code;
- environment-specific values stay in platform settings;
- commit an example file with names but no secrets.

### 7.2 Public Variables

Only deliberately public configuration may use browser-exposed prefixes.

## 8. Database Change Management

### 8.1 Migrations

All schema changes should be reproducible migrations.

### 8.2 RLS Tests

Maintain tests that prove expected allow/deny behaviour.

### 8.3 Seed Data

Use sample or approved public data.

## 9. CI Quality Gates

### 9.1 Pull Request / Pre-Merge Checks

Recommended:

- type check;
- lint;
- unit tests;
- database tests;
- build;
- accessibility checks where automatable;
- dependency/security checks.

### 9.2 Main Branch

Main should remain deployable.

## 10. Testing Strategy

### 10.1 Unit Tests

Test:

- quantity calculations;
- status transitions;
- validation;
- permission helpers.

### 10.2 Integration Tests

Test:

- RLS;
- pledge → receipt workflow;
- donor consent visibility;
- contact submission;
- content publication.

### 10.3 End-to-End Tests

Critical flows include:

- visitor views current need;
- donor submits enquiry;
- staff records pledge;
- verifier records received support;
- public remaining value updates correctly;
- admin role restriction works;
- reader searches catalogue;
- book detail displays correct holding/location data;
- live availability is never guessed when the authoritative system is unavailable;
- member-only library data remains private;
- integration failure degrades safely.

### 10.4 Accessibility Tests

Automated tests do not replace manual keyboard and screen-reader checks.

## 11. Performance

### 11.1 Targets

Prioritise:

- fast first render;
- small JavaScript bundles;
- optimised images;
- low third-party overhead.

### 11.2 Caching

Use appropriate caching for public, slow-changing content.

Do not cache private admin data into public responses.

## 12. Deployment

### 12.1 Preview

Every significant change should be reviewable before production.

### 12.2 Production Release

Release only after:

- tests pass;
- migration reviewed;
- content approval complete;
- backup status known;
- rollback plan available.

### 12.3 Rollback

Document:

- how to roll back application deployment;
- how to handle database migration rollback or forward-fix.

## 13. Domain and DNS

### 13.1 Ownership

The domain should ultimately be controlled by the appropriate institution or an approved account, not depend permanently on one volunteer's personal account.

### 13.2 Naming

Final domain requires institutional approval.

### 13.3 DNS Access

Limit access to authorised technical administrators.

## 14. Email

### 14.1 Official Contact

Prefer an approved institutional email.

### 14.2 Transactional Email

If the system sends automated mail, use a dedicated transactional provider/configuration and avoid exposing personal credentials.

## 15. Monitoring

### 15.1 Minimum Monitoring

Monitor:

- uptime;
- failed deployments;
- server errors;
- database/storage quota;
- suspicious authentication activity.

### 15.2 Privacy

Monitoring should avoid collecting unnecessary personal information.

## 16. Backup

### 16.1 Database

Use managed backup capabilities appropriate to the production plan.

### 16.2 Content Export

Maintain a documented method to export:

- needs;
- projects;
- donations;
- partners;
- book records.

### 16.3 Repository

GitHub provides code history but is not a database backup.

## 17. Cost Management

### 17.1 Initial Goal

Keep V1 within free or low-cost tiers while usage is small.

### 17.2 Upgrade Triggers

Upgrade based on:

- traffic;
- storage;
- database size;
- backups;
- security requirements;
- staff needs.

Do not depend on a free tier as a permanent institutional guarantee.

## 18. Research Basis

### 18.1 Next.js

Official documentation:
https://nextjs.org/docs

### 18.2 Supabase

Security guidance:
https://supabase.com/docs/guides/security/product-security

### 18.3 Vercel

Environment variables:
https://vercel.com/docs/environment-variables

### 18.4 Server-Side Secret Boundary

Vercel/Next.js security training explains that browser-exposed environment variables are visible in client bundles and recommends a server-only data-access boundary.

Reference:
https://vercel.com/academy/nextjs-foundations/env-and-security


## 19. Koha / LMS Integration Architecture

### 19.1 Supported Interface First

Prefer supported APIs or export/import interfaces over scraping OPAC HTML.

For Koha deployments, evaluate the installed version and enabled REST API capabilities before implementation.

### 19.2 Authentication

Keep Koha/LMS credentials server-side.

Use the minimum scopes/permissions required for the integration.

Do not reuse staff personal credentials for machine-to-machine integration where a dedicated integration credential is available.

### 19.3 Read and Write Separation

Start with read-oriented discovery integration where practical.

Introduce write actions such as holds or renewals only after:

- staff workflow is understood;
- permission mapping is defined;
- error/retry behavior is tested;
- duplicate-action protection is designed;
- audit requirements are documented.

### 19.4 Caching

Cache only data appropriate for temporary reuse.

Examples:

- bibliographic metadata may tolerate short-lived caching;
- live checkout/hold/member status requires stricter freshness;
- stale availability must not be presented as live fact.

### 19.5 Resilience

The public website should remain useful when the LMS is unavailable.

Expected behavior:

- Home/About/Services/Events/Needs/Projects/News remain available;
- catalogue pages may show cached descriptive metadata if appropriate;
- live availability is marked temporarily unavailable;
- hold/renew/member actions are disabled with a clear error;
- failures are logged without exposing secrets.

## 20. Search Architecture

### 20.1 Separation of Discovery and Authority

A search index may improve speed, multilingual matching, typo tolerance, or ranking, but it does not become the source of truth for live circulation status.

### 20.2 Search Options to Evaluate

Evaluate using evidence from the real collection size and language needs:

- Koha-native search;
- PostgreSQL search;
- trigram matching;
- dedicated search index;
- hybrid search;
- later natural-language query translation.

Avoid adding a heavy search service before simpler approaches are measured.

### 20.3 Multilingual Search

Search architecture must preserve Unicode and support Sinhala, Tamil, and English data without lossy transliteration.

## 21. Multi-Library Architecture

### 21.1 Sevanagala First

The deployed product should optimize for Sevanagala while avoiding hard-coded assumptions that make later expansion expensive.

### 21.2 Configurable Library Context

Future multi-library support should use library entities/configuration for:

- identity;
- contact;
- opening hours;
- collections;
- holdings;
- integrations;
- staff scope;
- public URLs or routing where needed.

### 21.3 Network Services

Potential later network services include:

- cross-library discovery;
- shared bibliographic indexing;
- per-library holdings;
- inter-library requests;
- aggregate analytics;
- network administration.

These should be introduced only after the single-library operational model is proven.
