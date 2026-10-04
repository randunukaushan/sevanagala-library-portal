# Smart Library Research and Integration Review

## 1. Purpose and Evidence Date

This review combines the current Sevanagala repository, its canonical requirements, official Sri Lankan library sources, and public catalogue observations checked on 2026-10-04. It is a research snapshot, not institutional confirmation. Public pages can be stale or incomplete; absence of public evidence is recorded as UNKNOWN.

## 2. Findings Relevant to Sevanagala

### 2.1 Preserve the Portal and Existing Work

The portal already provides public information, catalogue records and requests, needs, projects, donor/partner workflows, staff authentication, MFA, RBAC, RLS, audit foundations, and a protected admin. These remain useful Smart Library services. The current Supabase books table is in use by the admin catalogue, imports, and public catalogue and must not be dropped or repurposed destructively.

### 2.2 Separate the Portal from the Integrated Library System

The National Library and Documentation Services Board describes its own OPAC as Koha based, maintains a National Union Catalogue, and publishes national cataloguing frameworks based on MARC 21. The current National Virtual Union Catalogue describes cross-library discovery and item availability. Bibile Public Library's official DLP Koha OPAC advertises search, locating and holds; its record examples expose item-level call number, location, barcode and availability. These are evidence that a separate portal can coexist with an LMS and benefit from integration rather than duplicating circulation truth.

Recommended future boundary:

| Information | Authoritative owner, pending local verification |
|---|---|
| Bibliographic record, item/copy, barcode, location | Approved LMS/Koha if Sevanagala has one; otherwise an explicitly approved local collection system |
| Members, loans, returns, renewals, holds, fines, live availability | Approved LMS/Koha if present |
| Public pages, services, events, needs, projects and donor workflows | Sevanagala portal |
| Cross-system IDs, sync state, public-safe cached catalogue | Portal integration layer, only after the LMS and exchange method are verified |

Do not import or synchronize member identities or borrowing history into Supabase merely for convenience. If an LMS is authoritative, the portal should query narrowly scoped, public-safe catalogue/availability data and clearly handle stale or unavailable integration responses.

### 2.3 Data Model Direction

Keep bibliographic records separate from physical items: one book can have many copies. Preserve legacy books.copy_count during discovery and migration; do not treat it as reliable item-level circulation data. A future book_copies model should only become operational after deciding whether it is the source of truth or a staging/mapping layer for an approved LMS.

### 2.4 Circulation and Privacy Gate

The existing product requirements explicitly defer circulation and member records until staff requirements and privacy obligations are separately documented. The new handoff supplies a proposed workflow and privacy boundaries, but not Sevanagala-approved loan periods, member categories, borrowing limits, retention, identification requirements, or the existing system of record. These must be verified before accepting real members or processing real loans.

### 2.5 AI Boundary

The proposed staff assistant belongs after the authoritative data and permission model are established. It should call narrowly scoped, staff-authorized read tools, return sourced suggestions or drafts, and route any write through the ordinary application workflow with explicit human confirmation. Do not provide model access to arbitrary SQL, service-role credentials, secrets, or unrestricted member histories.

### 2.6 Koha-Informed Portal Direction

The project owner reports that Sevanagala is not currently using Koha. Verify this with the responsible authority before treating the portal as the approved circulation system. The current proposal is to adapt a small set of Koha patterns—record/copy separation, barcode-friendly circulation, configurable policy, granular staff permissions, privacy-aware history and task-oriented workflows—without cloning advanced modules. Offline circulation is deferred because local synchronization, stale-data and reconciliation behavior must be tested. See [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md).

## 3. Benchmark Lessons

- Provide a simple mobile search first, with advanced filters progressively revealed.
- Show item-level availability and shelf/call number only when sourced from the authoritative catalogue and fresh enough to trust.
- Preserve Sinhala, Tamil, and English searching and content; do not infer translation completeness from a language selector.
- Use established cataloguing standards and seek guidance from NLDSB before inventing a local bibliographic schema.
- Treat holds, online membership forms, member logins, and renewals as distinct functions; a visible login or application form alone does not prove that a transaction can be completed online.
- Build accessibility, privacy, backup, and staff training into operations rather than as later polish.

## 4. Current Evidence Gaps

The following remain UNKNOWN for Sevanagala until the responsible authority confirms them:

- current LMS/Koha deployment and responsible operator;
- catalogue source, format, completeness, and item-level data;
- circulation rules, membership categories, forms and records-retention rules;
- availability of staff accounts/API/OPAC or approved export for integration;
- approved ownership of member data and incident response;
- whether any district-level/shared library network is operationally available.

## 5. Recommended Sequence

1. Verify Sevanagala and Thanamalvila Pradeshiya Sabha's current LMS, catalogue, member and circulation workflows with an authorized librarian/authority.
2. Complete and approve the current-state gap analysis and service/policy decisions.
3. If Koha/LMS is authoritative, prototype a read-only catalogue integration first; do not add competing loan/member state.
4. If no LMS is present and the authority approves a standalone first phase, add members, copy records, and transactional checkout/return with RLS and audit as one tested vertical slice.
5. Add renewals and policy settings only after circulation is stable.
6. Introduce AI only as a staff-only, least-privilege assistant after permissions, logging, provider cost controls, and data handling are reviewed.

## 6. Sources

- NLDSB, What We Do: https://www.natlib.lk/NLDSB/what-we-do/
- NLDSB, Discover: https://www.natlib.lk/NLSL/discover/
- National Virtual Union Catalogue: https://unioncatalogue.dlp.gov.lk/
- Bibile Public Library Koha OPAC: https://bibile.dlp.gov.lk/cgi-bin/koha/opac-main.pl
- National Library graded public-library list (Uva 2022 section): https://www.natlib.lk/pdf/List%20of%20Graded%20Public%20Libraries%20in%20Sri%20Lanka.pdf
- Koha circulation manual: https://koha-community.org/manual/latest/en/html/circulation.html
- Koha cataloguing manual: https://koha-community.org/manual/latest/en/html/cataloging.html
- Koha patron privacy settings: https://koha-community.org/manual/latest/en/html/opacpreferences.html
- Koha patron anonymization tools: https://koha-community.org/manual/latest/en/html/tools.html
- NLDSB, MARC 21 Descriptive Bibliographic Framework: https://www.natlib.lk/pdf/dbib.pdf
