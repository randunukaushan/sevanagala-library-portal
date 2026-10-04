# Admin Projects Implementation

> **Branch/status note (2026-10-04):** This is an implementation record from the development branch. The documentation-only update does not include the corresponding application code. Do not assume this workflow is available on `main` until the separate code change is reviewed and merged.

## 1. Scope

The protected `/admin/projects` workspace supports creating planned drafts, editing
unpublished planned drafts, reviewing saved content, and approving publication.
The public `/projects` registry reads published projects using an anonymous client,
even when the visitor has a staff session. An unavailable connected database shows
an error, never sample records. Samples appear only without database configuration.

## 2. Review and Permissions

The existing schema uses `planned` for private drafts and has no pending-review
state. Every saved planned draft is visible to authorised reviewers; there is no
separate submission state or notification in this first implementation.
Creation requires `projects.manage`. Draft editing allows `projects.manage` or
`projects.publish`. Publication requires `projects.publish`, a complete saved
record and explicit confirmation. It changes the project to `approved` and sets
publication and verification timestamps. Staff MFA, database RLS and audit triggers
remain authoritative. No service-role client or schema change is introduced.

Updates and publication compare `updated_at`, the planned state and null
publication timestamp, and verify that exactly one row changed. A concurrent edit
requires reloading and reviewing the latest content before publication. English
field edits preserve existing translations.

## 3. Validation and Boundaries

Names, summaries, problem statements, outcomes and beneficiaries have bounded
required text. Optional dates must exist and completion cannot precede start.
Errors keep submitted values and associate validation messages with controls.
The project list and public registry currently show at most 100 records.

Published-record editing, progress transitions, milestones, related-need editing,
responsible-contact assignment, pagination and publication withdrawal are not yet
exposed in this UI. The static `/admin-preview` remains a separate sample interface.

## 4. Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, and
`node --experimental-strip-types --test tests/project-validation.test.mjs` with Node 22+.
The existing `supabase/tests/assert_project_publication_rls.sql` verifies that a
manager can edit drafts but cannot publish or edit published records, while an
approver can publish. A browser acceptance run needs an approved staff account
with MFA; do not bypass authentication to demonstrate the workspace.
