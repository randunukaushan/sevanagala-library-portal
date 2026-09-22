# Codex Project Instructions

## 1. Project Context

### 1.1 Product

This repository is for the Sevanagala Public Library Portal: a public-library website, development-needs portal, donor transparency platform, and future smart-library system.

### 1.2 Source of Truth

Before implementing or changing a feature, read the relevant files in `/docs`.

If code conflicts with the approved documentation, do not silently redesign the product. Explain the conflict and update the documentation only when the change is intentionally accepted.

## 2. Safety and Institutional Boundaries

### 2.1 Official Status

Until institutional approval is confirmed:

- do not claim the prototype is the official library website;
- do not use unapproved government or library logos;
- do not publish real private donor/staff data;
- use placeholder/sample data where needed.

### 2.2 Financial Features

Do not add online cash donation, payment, bank-transfer, Stripe, PayPal, or similar payment flows unless the repository documentation is explicitly updated after official approval.

### 2.3 Privacy

Do not add detailed user tracking, borrowing-history profiling, or unnecessary personal-data collection.

### 2.4 Secrets

Never commit secrets, service-role keys, database passwords, tokens, or production credentials.

## 3. Architecture

### 3.1 Baseline

Preferred stack:

- Next.js
- TypeScript
- App Router
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security
- Vercel
- GitHub

Use current stable releases when bootstrapping and pin versions through the lockfile.

### 3.2 Data Access

Keep privileged data access server-side.

Never expose Supabase service-role or other privileged secrets to the browser.

### 3.3 Database

Use migrations for schema changes.

Apply least-privilege grants and RLS to exposed tables.

Add database tests for critical policies and state transitions.

## 4. Coding Rules

### 4.1 TypeScript

Prefer strict TypeScript.

Avoid `any` unless there is a documented reason.

### 4.2 Validation

Validate all external input:

- forms;
- route parameters;
- query parameters;
- imports;
- file uploads.

### 4.3 Components

Build reusable components where reuse is real, but do not create unnecessary abstractions.

### 4.4 UI and Visual System

Before changing public UI, read:

- `docs/ui-ux-accessibility-and-design-system.md`
- `docs/visual-identity-color-and-typography.md`
- `docs/ui-ux-page-patterns.md`
- `docs/admin-dashboard-ui-ux-specification.md` for admin work

Use the documented semantic design tokens. Do not introduce arbitrary brand hex colors inside components unless the design-system documentation is intentionally updated.

The canonical public-site direction is **premium editorial library: warm paper, dark ink, restrained bronze, high-quality photography**. Earlier green-led and burgundy-led public palettes are retired. Do not reintroduce strong green, burgundy, or competing accent colours unless the visual-identity documentation is intentionally reviewed and changed.

### 4.5 Accessibility

Target WCAG 2.2 AA.

Every interactive feature must consider:

- keyboard use;
- visible focus;
- labels;
- semantic HTML;
- contrast;
- touch target size;
- loading/empty/error states.

### 4.6 Performance

Public pages should be mobile-first and low-bandwidth friendly.

Avoid unnecessary client JavaScript and third-party scripts.

## 5. Donor and Transparency Rules

### 5.1 Status Accuracy

Never treat a pledge as a received donation.

### 5.2 Verification

Public "received" or "completed" states must be based on verified records.

### 5.3 Recognition

Donor/partner recognition must respect stored permission/consent.

Acknowledgement must not imply endorsement.

### 5.4 Quantities

Prevent double-counting when a pledge becomes a received donation.

Add tests for remaining-quantity calculations.

## 6. Library Data Rules

### 6.1 Books

Do not automatically delete or withdraw books based on age.

"Outdated" means review is required until an authorised library process decides the outcome.

### 6.2 Reader Privacy

Publicly show aggregate request demand, not individual reader identities.

### 6.3 Copyright

Do not upload copyrighted book text or unlicensed media.

## 7. Git Workflow

### 7.1 Before Work

- sync repository;
- inspect relevant docs;
- create a focused branch for non-trivial work;
- make a Git checkpoint before large edits.

### 7.2 During Work

Make the smallest coherent change needed for the task.

Do not modify unrelated architecture.

### 7.3 After Work

For the current web application baseline, run:

```bash
npm run lint
npm run typecheck
npm run build
```

Run feature-specific tests and database/RLS tests where relevant.

Do not claim a check passed unless it was actually executed.

Review the diff before committing.

## 8. Documentation

### 8.1 Heading Format

Project documents use:

- `# Title`
- `## 1. Main Section`
- `### 1.1 Subsection`
- `#### Fourth-Level Heading Without Number`

Do not number `####` headings.

### 8.2 Update With Code

When a feature changes a documented contract, update the relevant documentation as part of the same work.

## 9. Definition of Done

### 9.1 Required

A feature is not done until:

- documented requirement is met;
- permissions/security are applied;
- tests cover critical logic;
- accessibility is reviewed;
- mobile layout is usable;
- loading/empty/error states are handled;
- no secret is committed;
- relevant docs are updated.

## 10. Task Response

### 10.1 At Completion

Summarise:

- files changed;
- tests run;
- assumptions;
- known risks;
- remaining work.

Do not claim tests passed unless they were actually run.


## Public multilingual routes

The public site supports English, Sinhala, and Tamil through visible URL prefixes:

- `/en`
- `/si`
- `/ta`

When adding or changing public UI:

- use `getRequestLocale()` in Server Components;
- use `localePath()` for public internal links;
- add user-facing copy to the i18n dictionaries rather than hard-coding English;
- keep `/admin`, `/admin-preview`, and `/staff-login` unprefixed unless the multilingual admin scope is intentionally changed;
- do not publish unreviewed dynamic translations as official institutional wording.
