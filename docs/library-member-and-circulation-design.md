# Library Member and Circulation Design

## 1. Status and Boundary

Proposed design only. No member or loan data is stored in the portal today. Do not create or migrate real member records until Sevanagala's authorized library/local authority confirms the data owner, purpose, retention, membership rules and system of record.

If Koha or another approved LMS already owns circulation, keep members, copies, loans, returns, renewals, holds and live availability there. Integrate read-only or through an approved supported interface. Do not create competing Supabase circulation records.

## 2. Proposed Standalone Model, Only If Approved

### 2.1 Members

Use a private members table with stable internal UUID, membership number, minimum approved identity/contact fields, member category/status, membership dates, audit actor/timestamps and archival rather than deletion. Make Auth linkage optional; readers should not be forced to create online accounts to borrow in person. Date of birth, full address, phone, email and notes are not mandatory defaults; collect only if approved and necessary. Never expose member details or borrowing history publicly.

### 2.2 Bibliographic Records and Copies

Preserve existing books as bibliographic records. Add a one-to-many physical-copy table only if this portal is approved as the inventory system. Each copy may carry a stable accession number, optional barcode, book ID, shelf/location, circulation type, physical condition, acquisition date and operational status. Do not make a barcode printer/RFID a V1 prerequisite. Never automatically withdraw by age.

### 2.3 Loans and History

A loan refers to one member and one physical copy. Preserve completed loans. Derive overdue from an unreturned loan whose due time passed; avoid an independently mutable overdue flag. Record issuer, return actor, checkout/due/return timestamps and renewal history. Use a separate renewal event/table if renewals are introduced.

## 3. Transaction Invariants

Checkout must be a single database transaction/RPC: lock and validate the member, copy and policy; verify active member, eligible available copy, member limit and due-date policy; create the loan; mark the copy on loan; record the authenticated staff actor and audit entry. Concurrent checkouts must not issue one copy twice.

Return must lock the active loan/copy, close the loan, set the return actor/time, and set copy availability or an explicit staff-selected exception such as repair/damaged/lost in one transaction. Preserve all prior loan history.

The interface should call a narrow permission-checked RPC/server action, not make two independent table updates. A failure must leave both loan and copy unchanged.

## 4. Policy and RBAC

Potential permissions: circulation.view, members.manage, circulation.issue, circulation.return, circulation.renew, circulation.policy.manage. Exact role grants require approval. Reuse current active-staff, AAL2/MFA, permission helpers and RLS patterns. UI hiding is not authorization.

Keep policies centralized and data-driven: loan length, member-type eligibility, active-loan limit, renewal maximum/period, grace period and hold rules. Development defaults must be labelled prototype values and must not be treated as library rules.

## 5. User Experience

The staff flow should support member lookup/scan → confirm authorized account → copy lookup/scan → display title/copy/location/due date → explicit checkout confirmation → success. Return should support copy lookup → display current loan without exposing extra member data → optional condition choice → explicit confirmation → success.

The workflow should be keyboard accessible and usable on narrow phones/tablets; provide clear loading, empty, validation and conflict states. Do not expose member names in a public catalogue.

Use the Koha benchmark selectively: make common issue/return tasks scan-first, preserve manual search for missing or damaged barcodes, and show the rule-derived due date before confirmation. Keep rare overrides out of the normal path, require a separate permission and reason, and use plain-language blocks instead of unexplained system codes. Validate with staff using demo data before enabling live records. See [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md).

## 6. Deferred Scope

Defer renewals/holds, overdue notices, member self-service, online membership, fines/payments, barcode hardware, RFID, analytics, AI, offline circulation and multi-library circulation until the basic vertical slice is accepted and local rules/data owners are confirmed. A USB scanner can be evaluated later as keyboard input; it is not a launch dependency. Offline work needs explicit stale-data, conflict and reconciliation design. No payments are included.
