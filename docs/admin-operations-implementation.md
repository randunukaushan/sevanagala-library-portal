# Admin Operations Implementation

> **Branch/status note (2026-10-04):** This is an implementation record from the development branch. The documentation-only update does not include the corresponding application code or migration. Do not assume these operations are available on `main` until the separate code change is reviewed and merged.

## 1. Implemented V1 Surface

The protected `/admin` workspace uses active individual staff accounts, AAL2 MFA and database permissions. `/admin-preview` remains a separate sample interface and is not a privileged backend.

- Role-aware navigation, live dashboard counts, paginated records, search and optimistic version checks.
- Books, classification categories and aggregated reader requests; bounded CSV preview and atomic batch insertion. Imports default to private, reject bulk withdrawal, duplicate ISBNs and apparent duplicate titles.
- Needs editing, specifications, projects, milestones and publisher-approved progress updates.
- Supporters with consent-based recognition, pledges, receipt evidence and verification. Verified receipt totals reconcile pledge status; verified accounting fields are immutable through normal staff workflows.
- Pages, news and services with draft/review/publish/archive transitions; plain-text multilingual content avoids HTML execution.
- Enquiry assignment, approved user-role/status changes, read-only role and audit records, library settings.
- Private image uploads, decode/re-encode with metadata removal, bounded size, permission review and short-lived staff preview URLs. Storage paths belong to the uploader; referenced evidence cannot be removed by the orphan-cleanup policy.
- Anonymous public read models for catalogue, approved articles, library details, consented recognition, verified support and project milestone/update detail pages. Staff session cookies are never attached to these reads.

## 2. Database Deployment

`20261003233855_admin_operations_workflows.sql` was applied to the connected Supabase project on 2026-10-04 through its migration API. That API records its own deployment timestamp; reconcile by migration name when comparing local and remote history, rather than applying the same SQL again.

The migration adds controlled-change reasons, import provenance, receipt verification findings, safe relationship pickers, a bounded public support projection, private Storage policies and workflow guards. It does not create permanent staff accounts or publish institutional content.

## 3. Verification Performed

- TypeScript no-emit check: passed.
- ESLint: no errors; existing custom-font warning in `app/layout.tsx` remains.
- Node validation tests: 14 passed, including CSV, ISBN, multilingual payloads and workflow allowlists.
- Production build: passed using `next build --webpack`; this is not a claim that the Windows Turbopack build passed.
- Security source/lockfile checks: passed.
- Production dependency audit: zero reported vulnerabilities.
- Full dependency gate: passed with the pre-existing, explicitly time-limited development-only `braces` advisory exception, expiring 2026-10-18. This remains an open risk, not a fixed vulnerability.
- All 14 migrations and four SQL assertion suites replayed in isolated PGlite. Only the `pgcrypto` extension declaration was omitted there because built-in `gen_random_uuid` provides the used functionality. CI retains PostgreSQL 17 and the unmodified migration files.
- New workflow assertions exercise self-access denial, recognition consent, upload ownership, evidence-gated verification, immutable verifier identity, pledge reconciliation, private storage, content-editor publication restrictions and AAL1 denial.
- Live Supabase rollback test passed. The live Storage service forbids direct SQL deletes, so that part was replaced with an orphan-predicate assertion; no Storage service restriction was disabled. Fixture accounts and object rows were confirmed absent after rollback.
- Supabase security advisor: no warning/error; one existing informational deny-all-policy notice for retired `private.staff_bootstrap` remains intentionally closed.
- Production HTTP smoke test: seven public/login pages returned 200, five protected admin routes redirected to staff login, unknown project returned 404. Test server was stopped afterward.

## 4. Acceptance Still Required

These checks are not a substitute for an authenticated browser acceptance test. This checkout has no `.env.local`, and no real staff password or MFA code was requested, read or bypassed. Configure the deployment's approved public Supabase URL/publishable key, then have an authorised staff member sign in and test each role's workflows, keyboard/mobile layout and actual Storage upload/download APIs before release.

CSV imports without ISBN use a conservative preflight title/language check, not a global uniqueness constraint. Concurrent non-ISBN imports need staff coordination; this release does not implement an import job ledger or automatic merging.

Relationship pickers show at most 500 permitted entries; public support shows at most 100 approved records and project updates the latest 30. Larger installations need server-side picker search and public pagination.

No circulation/loan engine, cash payments, automatic email sending, public unauthenticated submission endpoints, or bulk staff invitation system is introduced. First-admin provisioning remains an owner-controlled process; public bootstrap stays retired. Institutional approval and staff content review are still necessary before presenting the prototype as an official website.

## 5. Handover Routes

Start at `/staff-login`, complete MFA, then `/admin`. Permissions determine which workspaces appear. The main public entry points are `/catalogue`, `/news`, `/pages`, `/projects`, `/needs` and `/transparency`.

Use Node 22 or later. Run validation with `node --experimental-strip-types --test tests/*.test.mjs`; after a production build, `node scripts/smoke-public.mjs` runs an isolated server on loopback port 3107 and stops it when finished.
