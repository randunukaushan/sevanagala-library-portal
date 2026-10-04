# Smart Library Current-State Gap Analysis

## 1. Scope and Evidence

Status checked against the repository at commit 2dbbbc3 on branch docs/smart-library-research-integration, 2026-10-04. This is a code/document audit plus a limited official-site desk review; it is not an authenticated staff acceptance test, official library-data verification, or full accessibility audit.

Classifications:

- ALREADY IMPLEMENTED: present in application/database and exercised by code/tests.
- PARTIALLY IMPLEMENTED: some operational path exists, with material gaps.
- MISSING: no implementation found.
- NEEDS REFACTORING: existing structure works for current scope but cannot safely support the intended expanded role.
- FUTURE FEATURE: deliberately deferred.
- REQUIRES INSTITUTIONAL VERIFICATION: policy, data owner, or system-of-record choice is unknown.

## 2. Technology and Current Architecture

| Area | Current state |
|---|---|
| Frontend | Next.js App Router, React, TypeScript, Tailwind-based styling. |
| Backend | Server Components, Server Actions and Supabase client calls; no dedicated general API integration service found. |
| Database/Auth/Storage | Supabase PostgreSQL, Auth, RLS and private media bucket; migrations under supabase/migrations. |
| Access | Individual staff accounts, role/permission helpers, protected routes, MFA/AAL checks, database policy enforcement. |
| Hosting | Vercel/Supabase are documented assumptions; production ownership, approved domain, backups and operational acceptance remain unverified. |
| Quality | GitHub Actions lint/typecheck/build, validation tests, SQL migration/RLS test workflow, dependency/security gates. |
| External LMS | No Koha/LMS integration, item mapping, sync job, API client or stale-data indicator found. |
| AI | No model provider, retrieval pipeline, assistant endpoint or AI audit implementation found. |

## 3. Route and Feature Inventory

### 3.1 Public Routes

| Routes | Current state |
|---|---|
| /, /about, /services, /books-resources, /needs, /projects, /support, /transparency, /contact | Public portal pages. Data-backed needs/projects/content are connected where implemented; some prototype sections remain sample/static. Contact insertion is deliberately disabled pending anti-abuse and privacy review. |
| /catalogue | Reads public-visible books from Supabase with title and language filters and pagination. It is bibliographic, not copy-level, and must not claim live circulation availability. |
| /news, /news/[slug], /pages, /pages/[slug] | Published content read models. Article text is rendered as text rather than trusted HTML. |
| /projects/[slug] | Published project summary, milestones and published updates; needs/support integration and verified donor totals remain partial. |
| /staff-login, /staff-mfa, /staff-setup | Staff authentication and setup routes. Public first-admin bootstrap is retired; real staff credentials were not exercised in this audit. |

### 3.2 Staff Routes

| Route/workspace | Current state |
|---|---|
| /admin | Permission-aware dashboard with live counts and authorized recent audit activity. |
| /admin/needs, /admin/needs/new, /admin/needs/[id] | Need draft/create/submit/publish vertical slice with DB authorization. Specifications have a data model/workspace. |
| /admin/projects, /admin/projects/new, /admin/projects/[id], /admin/project-details/[id] | Project draft/edit/publish and project-detail management. Milestones/updates can be managed in registry workspaces. |
| /admin/books, /admin/books/[id], /admin/books/import | Book bibliographic records, categories, book requests and bounded CSV import. No physical-copy ledger, member records or circulation actions. |
| /admin/media, /admin/media/upload | Private image upload, ownership/permission fields, reviewed publication controls. |
| /admin/partnerships and registry workspaces | Supporters, contacts, opportunities, outreach, follow-ups, pledges, receipts/evidence and enquiries, behind role permissions. |
| /admin/pages, /admin/news, /admin/services | Draft/review/publish workflow through generic registry routes. |
| /admin/users, /admin/roles, /admin/audit-log, /admin/settings | Existing provisioned staff account activation/role management, read-only role definitions, authorized audit view, library profile settings. Auth identity creation remains owner-controlled. |
| /admin-preview/** | Static sample UI, not a secure admin backend and not evidence of persisted functionality. |

### 3.3 Server Actions and Database Calls

Current actions include staff sign-in/sign-out; need create/submit/publish; project save/publish; generic record save/state transitions; media upload; book CSV import; and partnership supporter/contact/opportunity/outreach/follow-up operations. They use Supabase Auth/RLS and explicit permission checks. No member, loan, checkout, return, renewal, hold, AI or LMS route/action exists. No public contact POST endpoint is intentionally active.

## 4. Database Inventory

Current migration-defined public entities include:

- Identity/access: profiles, roles, permissions, role_permissions.
- Library profile/content/media: library_profile, services, media_assets, pages, news_posts.
- Collection: book_categories, books, book_requests.
- Needs/projects: need_categories, needs, need_specifications, projects, project_milestones, project_updates.
- Support: supporters, pledges, donations, donation_evidence, supporter_contacts, partnership_opportunities, outreach_interactions, follow_up_tasks.
- Operations: contact_messages, audit_events.

RLS is enabled on exposed operational tables, with permission helpers and additional security migrations. Relevant database regression suites cover foundation, project publication, security remediation, and admin operations. There are no members, physical copies, loans, renewals, reservations/holds, circulation policies, integration mappings or AI audit/tool tables.

## 5. Capability Assessment

| Capability | Classification | Evidence / gap |
|---|---|---|
| Public information and project/need pages | PARTIALLY IMPLEMENTED | Routes and safe published read models exist; official identity, contact data, content and institutional approval are still pending. |
| Trilingual public UX | PARTIALLY IMPLEMENTED | Translation-ready JSON data exists; complete route/UI language switching, translated records and language QA are not established. |
| Mobile/accessibility | PARTIALLY IMPLEMENTED | Design docs target WCAG 2.2 AA/mobile-first. No device-size, screen-reader or full keyboard acceptance evidence for the live routes in this audit. |
| Public catalogue | PARTIALLY IMPLEMENTED | Searchable title/language records and pagination exist; author/ISBN/subject facets, detailed records and copy-level holdings are missing. Source data quality is unverified. |
| Physical copy/item inventory | MISSING | Existing books.copy_count cannot identify a particular item, barcode, shelf, condition or live status. |
| LMS/Koha and VUC integration | REQUIRES INSTITUTIONAL VERIFICATION | No integration code. Bibile is in the public VUC; Sevanagala system-of-record remains unknown. |
| Member accounts/records | MISSING / REQUIRES INSTITUTIONAL VERIFICATION | No member table or UI; legal purpose, local policy, identifiers, data owner and retention are unapproved. |
| Checkout, return, renewal, overdue, holds | MISSING | No circulation transactions/policies. Must be owned by Koha if that is the approved existing LMS. |
| Needs, projects and donor records | ALREADY IMPLEMENTED / PARTIAL | Staff workflows, RBAC/RLS, verification and public projections exist; institutional data and human acceptance remain. |
| Public pages/news/services admin | ALREADY IMPLEMENTED | Protected generic editor and publish transitions; workflow still needs real staff acceptance. |
| Books/csv import | PARTIALLY IMPLEMENTED | Bibliographic workspace and preview are present; not a copy-level or MARC migration. |
| Staff roles, MFA and audit | ALREADY IMPLEMENTED / PARTIAL | Code and database checks exist; real-user/MFA end-to-end test and institutional role approval remain. |
| Events and event registration | FUTURE FEATURE | No dedicated event model/workspace found. |
| Staff AI assistant | FUTURE FEATURE | No AI endpoint/provider/tools/RAG. Should follow verified LMS and authorization foundations. |
| Recommendations, reader history, behavior analytics | FUTURE FEATURE / privacy-sensitive | Not implemented; avoid individual profiling. Any future analytics should be aggregate and purpose-approved. |
| Barcode/RFID/self-checkout/shelf map | FUTURE FEATURE / hardware-dependent | No implementation. Barcode can be considered after copy records and workflow are stable; RFID/self-checkout are not V1 requirements. |
| Multi-library holdings and inter-library loans | FUTURE FEATURE | VUC offers a potential future discovery precedent; no local governance or integration agreement verified. |
| Backups, monitoring and recovery | REQUIRES INSTITUTIONAL VERIFICATION | Operational docs describe requirements; actual plan configuration and recovery exercise not verified here. |

## 6. Conflicts and Decisions

1. Existing product and collection requirements defer member/circulation features until staff and privacy review. The new handoff proposes schemas, but local policies/system ownership are not yet verified.
2. The existing books table and public catalogue use book records. A copy model should be additive; legacy data must be preserved and mapped.
3. A DLP Koha/VUC example in Bibile makes LMS reuse plausible, not proven for Sevanagala. Do not choose standalone Supabase circulation before checking Thanamalvila PS/library.
4. Member date of birth, address, contact data and borrowing history are sensitive. Collect only fields required by approved policy; do not make optional fields defaults.
5. Bibile's displayed Grade II conflicts with the NLDSB Uva 2022 roster Grade III. Keep both attributed with dates; do not assert a current grade.

## 7. Prioritized Next Development

| Priority | Work | Dependency |
|---|---|---|
| P0 | Verify LMS/Koha, data owner, membership/circulation policy, retention, staff permissions and approved export/API with authorized library/local-authority staff. | Institutional-verification-dependent |
| P0 | Complete proposed circulation schema, transaction invariants, RLS matrix, privacy and restore plan before any real-member operation. | Institutional-verification-dependent |
| P0 | If Koha is authoritative, build a read-only, minimal catalogue integration prototype with freshness and failure behavior. | Koha/LMS-dependent |
| P0 (conditional) | If no approved LMS exists, build members + book_copies + checkout/return RPC and audit as a single additive, tested vertical slice. Use prototype-only policy until written local rules are confirmed. | Standalone + Institutional-verification-dependent |
| P1 | Renewals/overdue queue and configurable policy once checkout/return is accepted. | Circulation-data-dependent |
| P1 | Better catalogue search facets and item detail once cleaned data/copy integration exists. | Catalogue-data-dependent |
| P2 | Barcode print/scan UX, notification drafts and aggregate service reports. | Data-quality-dependent |
| P2 | Staff AI read-only provider/tool layer after permission-scoped sources are stable. | Standalone, but depends on approved data/permissions |
| P3 | VUC participation, multiple libraries, cross-library holdings and inter-library process. | Institutional/governance/integration-dependent |
| P3 | RFID/self-checkout and smart shelves. | Hardware- and operationally-dependent |

## 8. Next Human Verification

Before a live circulation development choice, obtain an authorized answer on: current LMS; responsible system owner; member-data custody; existing copy/accession format; approved rules for child/adult accounts, loan duration/limits/renewals/overdue; retention; and permitted integration/export method.

## 9. Related Research

- [Smart Library Research and Integration Review](./smart-library-research-and-integration-review.md)
- [Sri Lankan Library Benchmark Research](./sri-lankan-library-benchmark-research.md)
- [Monaragala District Library Expansion Research](./monaragala-district-library-expansion-research.md)
- [Smart Library Development Roadmap](./smart-library-development-roadmap.md)

