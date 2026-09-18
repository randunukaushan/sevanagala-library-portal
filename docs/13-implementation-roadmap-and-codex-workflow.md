# Implementation Roadmap and Codex Workflow

## 1. Purpose

### 1.1 Objective

Define how the project moves from documentation to a reviewed prototype, secure backend, official content, and public launch using VS Code, GitHub, and Codex.

## 2. Development Principle

### 2.1 Documentation First

Before implementing a feature, Codex should read the relevant documents in /docs.

### 2.2 Small Reviewed Changes

Prefer small, testable tasks over asking an agent to build the entire platform in one uncontrolled change.

### 2.3 Git Checkpoints

Create Git checkpoints before and after significant agent work.

### 2.4 Main Branch

Keep main stable.

Use feature branches for non-trivial implementation work.

## 3. Phase 0 — Institutional Discovery

### 3.1 Required Inputs

Collect:

- official library name;
- approved English name;
- administration authority;
- approved contact;
- official address;
- opening hours;
- permission for website;
- branding permission;
- photo permission;
- donor-recognition permission;
- content approver;
- domain decision.

### 3.2 Output

Update documents with confirmed information.

## 4. Phase 1 — Repository Bootstrap

### 4.1 Application

Create:

- Next.js app;
- TypeScript;
- styling system;
- lint;
- formatting;
- test baseline.

### 4.2 Repository Files

Add:

- AGENTS.md;
- .gitignore;
- .env.example;
- README.md;
- contribution/development notes if needed.

### 4.3 First Quality Gate

Confirm:

- clean install;
- dev server starts;
- lint passes;
- type check passes;
- production build passes.

## 5. Phase 2 — Design Foundation

### 5.1 Components

Build:

- header;
- footer;
- navigation;
- language selector;
- button;
- card;
- badge/status;
- form controls;
- layout containers.

### 5.2 Accessibility

Test keyboard and focus behaviour from the beginning.

### 5.3 Sample Data

Use clearly fake/sample project, donor, and need records.

## 6. Phase 3 — Public Prototype

### 6.1 Pages

Implement:

- Home;
- About;
- Services;
- Books & Resources;
- Current Needs;
- Projects;
- Support & Partner;
- Transparency;
- News;
- Contact.

### 6.2 Prototype Boundary

Do not present prototype as official.

## 7. Phase 4 — Supabase Foundation

### 7.1 Project Setup

Create approved development project.

### 7.2 Database

Add migrations for:

- profiles/roles;
- needs;
- projects;
- supporters;
- pledges;
- donations;
- books;
- book requests;
- content;
- audit.

### 7.3 Security

Enable and test RLS.

### 7.4 Storage

Create public/private storage strategy.

## 8. Phase 5 — Admin Authentication

### 8.1 Login

Add staff login.

### 8.2 Roles

Implement documented role model.

### 8.3 Admin Shell

Create dashboard navigation and permission-aware pages.

## 9. Phase 6 — Needs and Projects

### 9.1 Needs

Implement:

- create;
- edit;
- approval;
- public display;
- status;
- quantity calculation.

### 9.2 Projects

Implement:

- project details;
- milestones;
- related needs;
- updates.

### 9.3 Tests

Add state-transition and remaining-quantity tests.

## 10. Phase 7 — Donor and Transparency Module

### 10.1 Enquiry

Implement support enquiry form.

### 10.2 Pledge

Implement pledge record and acceptance.

### 10.3 Receipt

Implement received/verified workflow.

### 10.4 Recognition

Implement consent-controlled public acknowledgement.

### 10.5 Transparency

Implement public tracker and methodology.

## 11. Phase 8 — Books and Collection Module

### 11.1 Requests First

Implement:

- exact requests;
- category requests;
- aggregate demand.

### 11.2 Inventory

Add collection records when staff data is ready.

### 11.3 Import

Add CSV import with preview and validation.

### 11.4 Public Catalogue

Launch only when data quality is sufficient.

## 12. Phase 9 — Official Content

### 12.1 Replace Placeholder Data

Only with approved content.

### 12.2 Media

Upload approved photos.

### 12.3 Branding

Apply approved identity.

## 13. Phase 10 — Pre-Launch Review

### 13.1 Security

Run:

- auth tests;
- RLS tests;
- dependency checks;
- secret scan;
- file-access checks.

### 13.2 Accessibility

Run:

- automated checks;
- keyboard test;
- focus test;
- zoom test;
- mobile test.

### 13.3 Data Accuracy

Verify every public number.

## 14. Phase 11 — Launch

### 14.1 Domain

Connect approved institutional domain.

### 14.2 Production

Deploy reviewed release.

### 14.3 Monitoring

Enable approved monitoring.

### 14.4 Staff Handover

Provide:

- admin guide;
- account list;
- update process;
- incident contact.

## 15. Phase 12 — Donor Outreach

### 15.1 Targeted Outreach

Use relevant project URLs in:

- international book-support applications;
- CSR outreach;
- education foundation enquiries;
- technology partnership proposals.

### 15.2 Evidence Loop

As support arrives:

1. verify;
2. publish;
3. show impact;
4. update remaining needs;
5. use verified history in future proposals.

## 16. Codex Workflow

### 16.1 Start of Task

Before each task:

1. open repository;
2. sync main;
3. create feature branch;
4. open relevant docs;
5. ask Codex to inspect before editing.

### 16.2 Prompt Pattern

A useful task prompt should include:

```text
Read AGENTS.md and the relevant docs first.
Implement only [feature].
Do not change unrelated architecture.
List assumptions before coding if the docs are ambiguous.
Add/update tests.
Run lint, typecheck, tests, and build.
Summarise changed files and remaining risks.
```

### 16.3 Review

After Codex edits:

- inspect diff;
- run tests;
- verify UI manually;
- check against requirements;
- commit only accepted changes.

### 16.4 Large Tasks

Break into:

- schema;
- backend rules;
- UI;
- tests;
- documentation.

Do not ask one agent task to silently redesign everything.

## 17. AGENTS.md

### 17.1 Purpose

Codex reads AGENTS.md as persistent repository instructions.

The root file should define:

- source-of-truth docs;
- architecture;
- safety rules;
- test commands;
- coding conventions;
- privacy boundaries;
- no-secret rule.

### 17.2 Nested Instructions

Add nested AGENTS.md files later only if a subdirectory requires special rules.

## 18. Git Workflow

### 18.1 Branch Names

Examples:

- feat/needs-registry
- feat/admin-auth
- feat/donation-tracking
- fix/remaining-quantity
- docs/update-privacy

### 18.2 Commit Style

Examples:

- feat: add public needs registry
- fix: prevent duplicate pledge counting
- docs: update donor workflow
- test: add RLS policy coverage

### 18.3 Merge Rule

Do not merge a feature if required tests fail.

## 19. Definition of Done

### 19.1 Feature Done

A feature is complete when:

- requirements satisfied;
- security rules applied;
- tests pass;
- accessibility reviewed;
- loading/empty/error states handled;
- documentation updated;
- no secrets committed.

## 20. Research Basis

### 20.1 Codex IDE

OpenAI's Codex IDE documentation describes using editor context, reviewing changes, delegating longer work, and making Git checkpoints before and after work.

Reference:
https://developers.openai.com/docs/codex/ide

### 20.2 AGENTS.md

OpenAI documents AGENTS.md as persistent project instructions read by Codex.

Reference:
https://developers.openai.com/docs/agent-configuration/agents-md

### 20.3 Next.js

https://nextjs.org/docs

### 20.4 Supabase

https://supabase.com/docs/guides/database/postgres/row-level-security
