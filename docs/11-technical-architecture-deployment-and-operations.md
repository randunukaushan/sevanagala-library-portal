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

### 2.2 Backend

Recommended:

- Supabase PostgreSQL;
- Supabase Auth;
- Supabase Storage.

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
Public Browser
     |
     v
Next.js Application
     |
     +--> Public server-rendered content
     |
     +--> Authenticated Admin
               |
               v
          Supabase Auth
               |
               v
       PostgreSQL + RLS
               |
               +--> Storage
               +--> Audit Data
```

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
- books;
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

Critical flows:

- visitor views current need;
- donor submits enquiry;
- staff records pledge;
- verifier records received support;
- public remaining value updates correctly;
- admin role restriction works.

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
