# Koha Practices Adaptation Plan

## 1. Purpose and Status

This document translates selected Koha Integrated Library System practices into a proposed, smaller Sevanagala portal workflow. Koha is a reference implementation, not a product requirement to copy wholesale. No circulation schema or staff workflow here is approved for live use until the responsible library/local authority confirms the rules, data owner and operating model.

The project owner reports that Sevanagala is not currently using Koha. Treat this as a useful project input to verify with the responsible authority, not independent institutional confirmation. Subject to approval, the portal is the proposed platform for a carefully scoped library-operations module.

## 2. What Koha Demonstrates

Koha's official feature and manual pages document:

- bibliographic records linked to separately described physical items;
- cataloguing and discovery using MARC-family formats and configurable frameworks;
- circulation by patron and item barcode, with checkout, check-in, renewals, holds and configurable rules;
- staff permissions that distinguish circulation and cataloguing capabilities;
- offline circulation options that require advance synchronization and have browser/storage constraints;
- privacy choices and tools to anonymize patron-linked checkout history while retaining non-identifying circulation statistics.

These are benchmark capabilities, not proof that each is necessary for Sevanagala. NLDSB has published a MARC 21 descriptive bibliographic framework designed with school and public libraries in mind. Consult NLDSB before fixing local metadata fields or importing records. Do not claim MARC/SLMARC compliance until the mapping and import/export process is validated.

## 3. Adopt, Adapt, Defer

| Koha practice | Portal decision | Reason / condition |
|---|---|---|
| Separate bibliographic record and physical item | Adopt in proposed model | Existing `books` remains title-level; add copies additively after approval. |
| Barcode lookup for issue/return | Adapt as scan-first, keyboard-operable workflow | Scanner should behave like keyboard input; manual lookup remains available. Hardware is not a launch prerequisite. |
| Configurable member/item circulation rules | Adopt after staff policy confirmation | Keep rules centralized and versioned; never invent live loan periods or limits. |
| Holds, renewals and self-service | Defer beyond first circulation slice | Add after basic issue/return is stable and staff confirm demand/process. |
| Granular staff capabilities | Adopt | Separate member read/manage, issue, return, renew and policy permissions; enforce server-side and in RLS/database operations. |
| Offline circulation | Defer pending a tested operational design | Offline state adds stale snapshots, duplicate/conflicting scans and reconciliation risks. Consider a controlled paper fallback first if approved. |
| Retained patron borrowing history | Minimize and time-limit | Keep only what is needed for active loans and approved audit duties; anonymize or purge identifiable history under an approved schedule. |
| Full MARC editor and authority control | Defer | Preserve local classification and an import/export mapping path; use a simpler staff form until expertise and need justify more. |
| Acquisitions, serials, fines, multi-branch and advanced reports | Defer | These expand policy, accounting, privacy and support scope beyond an initial local workflow. |

## 4. Proposed Staff Experience

Design around common tasks instead of exposing a large configuration surface:

1. Find a member by membership number/barcode or a limited name search; show only the minimum identity needed to disambiguate.
2. Scan or find a copy by barcode; show title, copy identifier, shelf/location, status and condition.
3. Review the rule-derived due date and any actionable block in plain language.
4. Confirm issue; write loan, copy state and attributable staff audit event atomically.
5. Return by scanning the copy; show minimum loan context and allow an approved exception such as damaged or missing.
6. Provide clear success, invalid scan, already-loaned, inactive-member, policy-block and network-error states, with keyboard support and no color-only warnings.

Keep uncommon overrides behind a separate permission and require a reason. Validate with staff using demo data and a short task guide; do not assume the interface is easy merely because it has few screens.

## 5. Proposed Technical Boundary

- Retain current `books` as title-level bibliographic records and preserve `copy_count` as legacy aggregate data until verified migration.
- If portal-owned operations are approved, add private one-to-many copy inventory, minimal member records, loans, policy configuration and append-only transaction/audit history through migrations.
- Implement checkout and return as atomic database transactions or narrowly scoped server operations; do not split loan and copy-state writes into independent client operations.
- Enforce active-staff MFA, least privilege, permission checks, RLS, validation, duplicate-checkout protection, concurrency handling, backups and tested recovery.
- Keep member identities and identifiable loan history out of public queries, AI prompts, public read models and analytics. Do not profile readers by borrowing history.
- Separate demo data from real records; never seed production with real names or sample credentials.

## 6. Decision Gates and Delivery Sequence

### 6.1 Before Live Member Data

Obtain authorized confirmation of service ownership; membership categories and minimum fields; borrowing periods/limits; renewal and hold rules; privacy notice and lawful basis; retention/anonymization; staff roles; device/network availability; backup/recovery owner; incident response; and acceptance authority.

### 6.2 Development Sequence

1. Improve the title-level catalogue and agree metadata/classification mapping.
2. Create a demo-only copy inventory and demonstrate scan/search, status and shelf workflow without personal data.
3. Run staff task testing and revise labels, screen order and keyboard/scanner behavior.
4. After policy approval, implement minimum member data and secure staff lookup.
5. Implement and test atomic checkout/return as the first live circulation slice.
6. Add renewals, holds, reminders and reports only from approved requirements.
7. Consider offline operation only after stale-data, threat and reconciliation testing.

## 7. Acceptance Measures

- Staff can complete a routine issue and return with a short guide, without administrator access.
- Concurrent issue attempts cannot loan one copy twice.
- Invalid member/item, blocked loan, timeout and retry preserve consistent data and explain recovery.
- Staff without relevant permission cannot access member details or perform circulation through a direct route/API call.
- Public catalogue never reveals borrower identity.
- Staff can find item location/status quickly using the actual library devices and scanner setup.
- Privacy retention/anonymization and backup-restore procedures are verified before live operation.

## 8. Research Sources

- Koha feature overview: https://koha-community.org/about/
- Koha circulation manual: https://koha-community.org/manual/latest/en/html/circulation.html
- Koha cataloguing manual: https://koha-community.org/manual/latest/en/html/cataloging.html
- Koha staff permissions manual: https://koha-community.org/manual/latest/en/html/patrons.html
- Koha OPAC privacy settings: https://koha-community.org/manual/latest/en/html/opacpreferences.html
- Koha patron anonymization tools: https://koha-community.org/manual/latest/en/html/tools.html
- NLDSB, MARC 21 Descriptive Bibliographic Framework: https://www.natlib.lk/pdf/dbib.pdf
- NLDSB, What We Do: https://www.natlib.lk/NLDSB/what-we-do/
