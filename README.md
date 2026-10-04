# Sevanagala Public Library Portal

## 1. Overview

### 1.1 Project

A planned public-library website, development-needs portal, donor transparency platform, and future smart-library system for Sevanagala Public Library.

The repository is currently in the planning/prototype stage. It must not be represented as the official library website until the responsible authority approves the website, official identity, publishing process, and public launch.

This documentation-only update includes implementation notes written against a separate development branch. It does not include that branch's application code or migrations. Until those changes are separately reviewed and merged, the admin implementation notes describe branch work and must not be treated as features available on `main`.

## 2. Goals

### 2.1 Public Information

Provide clear library information, services, resources, opening details, news, and contact information.

### 2.2 Development Needs

Publish verified needs such as:

- books;
- computers;
- Wi-Fi;
- furniture;
- shelves;
- digital-learning equipment;
- approved infrastructure improvements.

### 2.3 Donor Transparency

Track:

- needs;
- accepted pledges;
- received support;
- verification;
- completed projects;
- approved partner acknowledgements.

### 2.4 Smart Library

Create a foundation for future catalogue, digital-learning, and community technology services.

## 3. Documentation

### 3.1 Start Here

Read [Documentation Index](./docs/documentation-index.md).

### 3.2 Codex

Codex and contributors should read [AGENTS.md](./AGENTS.md) before implementation.

## 4. Technology Baseline

### 4.1 Baseline Stack

- Next.js 16.3.6
- React 19.3
- TypeScript
- Tailwind CSS 4
- Supabase PostgreSQL, Auth, Storage and RLS
- Vercel — deployment phase
- GitHub
- VS Code + Codex

Use Node.js 22 or later. Exact dependency versions are recorded in `package-lock.json`.

## 5. Current Status

### 5.1 Completed

- product foundation documentation;
- sitemap;
- role model;
- donor/transparency workflow;
- needs/project model;
- collection model;
- database design;
- initial Supabase/PostgreSQL migrations, roles, grants, and RLS foundation;
- Next.js Supabase SSR/Auth application wiring and protected staff workspace;
- Needs draft → approval → publish → public registry vertical slice;
- implementation notes for protected admin workflows (the corresponding development-branch code is not included in this documentation-only update; see the main-branch caveat above);
- MFA, audit, private media and security-hardening foundations;
- admin workflow;
- security/privacy plan;
- UI/accessibility plan;
- canonical premium editorial visual identity, typography, photography, and page-pattern system;
- professional public-page UI pass;
- multi-screen admin-dashboard UI preview, admin UX specification, and workflow map;
- technical architecture;
- content/launch plan;
- implementation/Codex roadmap;
- institutional approval and governance plan;
- donor research and outreach strategy;
- smart-library development roadmap;
- data import and record-quality plan;
- testing and acceptance plan;
- operations and staff-handover plan;
- risk register and mitigation plan.

### 5.2 Pending

- institutional website permission;
- official branding permission;
- verified library profile;
- verified needs;
- collection data;
- domain decision;
- institutional approval for official launch;
- verified production library data;
- authorised staff browser acceptance and role-by-role workflow testing;
- local development environment setup and migration-history reconciliation before connecting another project;
- production data verification and institutional launch approval.

## 6. Important Boundaries

### 6.1 No Online Cash Donations in V1

Financial functionality requires separate institutional approval and documented financial controls.

### 6.2 No Unapproved Official Branding

Use placeholder prototype identity until approval.

### 6.3 Privacy

Do not publish private member, staff, or donor information without approved purpose and permission.

## 7. Development

### 7.1 Prototype Baseline

The repository contains a public prototype and a Supabase-backed protected admin workspace. Check the current branch and its implementation notes before assuming a feature is included in `main` or deployed. Nothing in this repository status implies official institutional approval or production deployment.

Local setup is documented in `docs/local-development-and-codex-setup.md`.

### 7.2 Required Reading

Before implementing major features, review:

- `docs/product-vision-and-requirements.md`
- `docs/data-model-and-database-design.md`
- `docs/security-privacy-and-compliance.md`
- `docs/ui-ux-accessibility-and-design-system.md`
- `docs/technical-architecture-deployment-and-operations.md`
- `docs/implementation-roadmap-and-codex-workflow.md`
- `docs/institutional-approval-and-governance.md`
- `docs/donor-research-and-outreach-strategy.md`
- `docs/smart-library-development-roadmap.md`
- `docs/testing-quality-assurance-and-acceptance.md`

## 8. Research Foundations

### 8.1 Public Library Principles

IFLA-UNESCO Public Library Manifesto 2022.

### 8.2 Accessibility

WCAG 2.2 Level AA target.

### 8.3 Security

OWASP ASVS and Supabase security guidance.

### 8.4 Data Protection

Sri Lanka Personal Data Protection framework and Data Protection Authority guidance should be re-checked before production launch.
