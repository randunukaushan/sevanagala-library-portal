# Smart Library Management System Architecture

## 1. Purpose

### 1.1 Objective

Define the target architecture for evolving the Sevanagala Public Library Portal from its current public-portal, collection-foundation, needs, project, donor, and transparency system into a standards-aware smart library management platform without breaking the parts that already work.

This document is the design gate before any circulation-schema migration. It does not itself authorise production migration, member-data collection, circulation deployment, fines, payments, RFID, or self-checkout.

### 1.2 Design Rule

The migration strategy is **preserve, extend, normalise, then migrate**.

Do not replace an existing working subsystem merely because a new library-management feature overlaps with it.

### 1.3 Current Foundation to Preserve

The following existing capabilities remain part of the target platform:

- public library website;
- needs registry;
- projects and project updates;
- donor/supporter, pledge, donation and evidence workflows;
- transparency lifecycle;
- multilingual-ready content architecture;
- staff roles, permissions and least-privilege access;
- audit events;
- media permission controls;
- public/private data separation;
- book requests and aggregate demand;
- collection review and no-automatic-withdrawal rules;
- WCAG 2.2 AA target;
- Supabase/PostgreSQL, Auth, Storage and RLS foundation.

## 2. Scope

### 2.1 In Scope

The target architecture may support, in phases:

- bibliographic catalogue records;
- multiple physical copies/items per bibliographic record;
- ISBN-13-assisted metadata intake;
- authors and many-to-many authorship;
- subjects and classification;
- Dewey Decimal Classification fields where the library is authorised to use them;
- physical copy barcodes;
- shelf/location tracking;
- collection condition and review workflows;
- member records;
- circulation/loans;
- renewals;
- reservations later;
- overdue notifications later;
- fines only after separate policy approval;
- MARC 21 import/export compatibility;
- Dublin Core export compatibility;
- barcode/QR workflows;
- semantic catalogue search;
- privacy-safe recommendation features;
- SIP2/NCIP adapter readiness;
- RFID/self-checkout integration later.

### 2.2 Out of Scope for Immediate Implementation

Do not implement yet:

- public member reading-history analytics;
- automatic behavioural profiling;
- online cash fine payment;
- RFID hardware integration;
- self-checkout hardware integration;
- SIP2 server/client;
- NCIP endpoint;
- automatic book withdrawal;
- automatic DDC assignment without librarian review;
- automatic acceptance of external metadata as authoritative;
- a full DDC schedule database copied into the project;
- AI recommendations based on retained personal borrowing history without a separately approved privacy model.

## 3. Architecture Principles

### 3.1 Bibliographic Record vs Physical Item

A title/edition record and a physical copy are different entities.

Target relationship:

```text
books 1 ──────── N copies
```

A single edition can therefore have many physical copies, each with its own:

- barcode;
- shelf location;
- item status;
- physical condition;
- acquisition/inventory information;
- circulation state.

### 3.2 Canonical Internal Model

The relational database remains the canonical operational model.

External standards and services are adapters around that model:

```text
ISBN metadata providers
        ↓
metadata intake adapter
        ↓
canonical catalogue model
        ├── MARC 21 mapper/export
        ├── Dublin Core mapper/export
        ├── public catalogue
        ├── circulation
        ├── AI/search index
        └── SIP2/NCIP adapters later
```

Do not make a raw MARC record, Google Books response, or Open Library response the operational source of truth.

### 3.3 Librarian Verification

External metadata is a suggestion.

Required intake pattern:

1. scan/type ISBN;
2. query approved provider(s);
3. normalise candidate metadata;
4. display source and differences;
5. librarian verifies/corrects;
6. save canonical record;
7. preserve provenance where useful.

### 3.4 Privacy by Design

Circulation data is private operational data.

Public catalogue data and private reader activity must remain structurally separate.

### 3.5 Protocol Independence

Circulation rules belong in the application/domain layer, not inside SIP2 or NCIP-specific logic.

Future protocol adapters call the same circulation operations used by the staff UI.

## 4. Existing-to-Target Data Model Mapping

### 4.1 books

Current fields include:

- title;
- subtitle;
- author;
- isbn;
- language;
- classification_code;
- category_id;
- publisher;
- publication_year;
- edition;
- copy_count;
- circulation_type;
- condition;
- review_status;
- location;
- public_visible;
- audit fields.

Target direction:

**Keep on books**

- id;
- title;
- subtitle;
- language;
- publisher;
- publication/publish year;
- edition;
- public visibility;
- bibliographic review fields;
- created/updated audit fields.

**Extend books with**

- isbn_13;
- isbn_10 nullable;
- description;
- subjects;
- dewey_decimal nullable;
- call_number_base nullable;
- classification_scheme;
- cover_url nullable;
- metadata_source/provenance fields as needed;
- marc_json nullable;
- external identifiers where useful.

**Move operational item state out of books**

- copy_count;
- physical condition;
- physical shelf/location.

These become derived or copy-level data after migration.

### 4.2 copies

Add a new physical-item table.

Recommended target fields:

- id;
- book_id;
- barcode;
- shelf_location;
- status;
- condition;
- circulation_type;
- acquisition_source nullable;
- acquisition_date nullable;
- inventory_verified_at nullable;
- notes restricted/internal where required;
- created_by;
- updated_by;
- created_at;
- updated_at.

Recommended status values initially:

- available;
- on_loan;
- reserved later;
- missing;
- lost;
- damaged;
- repair;
- withdrawn_approved.

Do not use copy status to replace the existing bibliographic content-review status.

### 4.3 authors

Replace the single `books.author` field gradually with normalised authorship.

Target:

```text
authors
book_authors
```

Recommended authors fields:

- id;
- display_name;
- sort_name nullable;
- authority_identifier nullable;
- created_at;
- updated_at.

Recommended book_authors fields:

- book_id;
- author_id;
- role;
- display_order.

Keep the legacy author text during migration until all imported rows are reconciled.

### 4.4 subjects

Do not require a fully normalised authority system in the first migration.

Phase-one acceptable model:

- `books.subjects text[]` or equivalent structured field.

Later:

- subjects;
- book_subjects;
- authority/source fields.

### 4.5 library_members

Do not collapse the current staff RBAC model into a simple `member | librarian` enum.

Keep:

- profiles;
- roles;
- permissions;
- role_permissions.

Add a separate member domain:

- id;
- auth_user_id nullable;
- membership_no unique;
- full_name;
- email nullable;
- phone nullable;
- status;
- joined_at;
- expires_at nullable;
- preferred_language nullable;
- created_at;
- updated_at.

A library member does not automatically become a staff profile.

An offline/paper member may exist without an online Auth account, subject to approved policy.

### 4.6 loans

Add circulation only after member requirements and privacy rules are approved.

Recommended fields:

- id;
- copy_id;
- member_id;
- borrowed_at;
- due_at;
- returned_at nullable;
- renewals_count;
- loan_status;
- borrowed_by_staff_id nullable;
- returned_to_staff_id nullable;
- created_at;
- updated_at.

Avoid treating `fine_amount` as the core source of truth until a fines policy is approved.

If fines are introduced later, prefer a separate charge/fine ledger rather than only a mutable number on the loan.

### 4.7 reservations and fines

Later-phase tables.

Do not block the base catalogue/circulation architecture on these features.

## 5. Classification and Call Numbers

### 5.1 Existing Classification

The current system already stores classification/category information.

Preserve existing staff-assigned codes during migration.

### 5.2 Dewey Fields

Add explicit fields only after confirming library practice:

- classification_scheme;
- dewey_decimal;
- call_number or call-number components.

Do not assume that a DDC number and a shelf call number are the same field.

### 5.3 Licensing Boundary

The database may store classification values legitimately assigned to library items.

Do not copy or redistribute the full proprietary DDC schedules, tables, descriptions, or WebDewey dataset into the repository without appropriate permission/licensing.

## 6. ISBN Metadata Intake

### 6.1 ISBN Validation

Prefer normalised ISBN-13 storage.

Validate:

- length;
- allowed characters;
- checksum;
- uniqueness rules at the edition level.

ISBN is not guaranteed for every library material, so it remains nullable.

### 6.2 Provider Strategy

Use an abstraction such as:

```text
BookMetadataProvider
  ├── OpenLibraryProvider
  └── GoogleBooksProvider
```

The application should be able to change provider priority without schema changes.

### 6.3 Source Precedence

Recommended initial behaviour:

1. exact ISBN match;
2. show candidate source;
3. compare existing local data;
4. require librarian confirmation for create/update.

Never silently overwrite librarian-reviewed metadata from a third-party API.

### 6.4 Provenance

Where practical retain:

- provider;
- provider record ID;
- fetched_at;
- selected fields/source;
- manual-review timestamp.

Do not retain unnecessary full third-party payloads indefinitely by default.

## 7. MARC 21 Compatibility

### 7.1 Goal

Support standards-aware import/export without turning MARC into the operational database schema.

### 7.2 marc_json

A `marc_json` field may be retained for:

- imported source records;
- export staging;
- preserving fields not yet mapped into the canonical schema.

It is not sufficient by itself to claim full MARC 21 compatibility.

### 7.3 Mapping Layer

Implement later as a tested mapper:

```text
canonical book record
    ↕
MARC 21 bibliographic mapping
```

The mapper must define:

- leader/control fields where required;
- ISBN identifiers;
- title and statement of responsibility;
- edition;
- publication;
- physical description where available;
- language;
- subjects;
- classification;
- contributors;
- local fields only under documented conventions.

### 7.4 Holdings/Item Separation

Do not put physical-copy circulation state into a bibliographic MARC export by accident.

If holdings/item interoperability is required later, design it separately.

## 8. Dublin Core Compatibility

### 8.1 Goal

Provide a lightweight metadata export/profile for digital-resource and interoperability use cases.

### 8.2 Mapping

Define an application profile from canonical fields to DCMI terms such as:

- title;
- creator;
- contributor;
- subject;
- description;
- publisher;
- date;
- language;
- identifier;
- type;
- rights where applicable.

Do not store a second duplicated Dublin Core version of every book unless a concrete integration requires it.

## 9. Member Privacy and Circulation History

### 9.1 Access Model

Public:

- no member records;
- no loan records;
- no borrower identity.

Member:

- own approved profile fields;
- own active/current loan information;
- own reservations later.

Authorised circulation staff:

- operational member and loan information needed to provide service.

Technical/admin access:

- least privilege only;
- no broad reading-history access merely because a user is a technical administrator.

### 9.2 RLS Target

Examples of policy intent:

```text
library_members:
  member -> own row
  authorised staff -> operational rows

loans:
  member -> own loans
  authorised circulation staff -> operational loans
  anon -> no access
```

### 9.3 Reading-History Retention

Returned-loan retention must be a policy decision, not a default assumption.

Before production circulation, document:

- operational need;
- legal basis;
- retention period;
- whether returned history is deleted, anonymised or retained;
- member access/correction process;
- backup implications.

### 9.4 Recommendations

Initial recommendations should prefer privacy-safe signals:

- same subject;
- similar metadata;
- same author;
- new arrivals;
- aggregate popularity/demand.

Personalised reading-history recommendations require separate consent, retention and privacy design.

## 10. Circulation Service Boundary

### 10.1 Domain Operations

Define circulation operations independent of UI/protocol:

- checkoutCopy;
- checkinCopy;
- renewLoan;
- getMemberStatus;
- getCopyStatus;
- placeReservation later;
- cancelReservation later.

### 10.2 Transaction Integrity

Checkout/checkin must be transactional.

A copy must not be simultaneously available and actively on loan.

Add database constraints and/or transaction-safe functions to enforce this.

### 10.3 Audit

Record high-value circulation events without copying unnecessary personal data into audit summaries.

## 11. Barcode and QR Strategy

### 11.1 ISBN vs Library Barcode

These are different identifiers.

ISBN identifies a publication/edition.

Library barcode identifies one physical copy.

### 11.2 Barcode Requirement

Each active physical copy should receive a unique local barcode.

The barcode format should be stable and independent of ISBN.

### 11.3 Phone Scanning

Future staff UI can use camera scanning for:

- ISBN intake;
- local-copy lookup;
- stock verification;
- checkout/checkin after circulation approval.

QR codes may be used for local item identifiers if operationally useful, but QR is not required for standards compatibility.

## 12. AI and Semantic Search

### 12.1 Search Strategy

Do not replace keyword/filter search.

Use hybrid discovery later:

- title/author/ISBN exact search;
- filters;
- full-text search;
- semantic search.

### 12.2 Embedding Storage

Prefer a separate embedding table unless implementation evidence shows a book-column is simpler and stable.

Example:

- id;
- book_id;
- embedding;
- embedding_model;
- content_hash;
- generated_at.

This makes model upgrades and re-indexing safer.

### 12.3 Embedding Content

Generate embeddings only from approved non-sensitive catalogue metadata.

Do not embed member records, private loan histories, donor private notes, or restricted staff data.

## 13. SIP2 and NCIP Readiness

### 13.1 Readiness Goal

No SIP2/NCIP implementation is required now.

Prepare by maintaining stable identifiers and protocol-independent circulation operations.

### 13.2 Future Adapter Boundary

```text
self-check/RFID device
        ↓
SIP2 or NCIP adapter
        ↓
circulation service
        ↓
members / copies / loans
```

### 13.3 Security

Future self-service integration must use authenticated and encrypted transport appropriate to the chosen protocol/vendor architecture.

Do not expose database credentials or direct table access to self-check hardware.

## 14. Accessibility

### 14.1 Target

Continue the existing WCAG 2.2 AA target.

### 14.2 Catalogue and Circulation UI

Include:

- keyboard-operable search and filters;
- visible focus;
- correctly labelled scan/manual-entry controls;
- non-colour-only availability states;
- accessible error messages;
- sufficient touch targets;
- screen-reader-friendly tables or alternative layouts;
- reduced-motion support where applicable;
- multilingual language tagging.

## 15. Migration Strategy

### 15.1 Rule

Do not destructively rewrite the existing `books` table in one migration.

### 15.2 Stage 0 — Documentation and Discovery

Before schema migration confirm:

- current register/import format;
- real classification practice;
- barcode practice, if any;
- how duplicate editions are recorded;
- whether individual copy condition/location is available;
- membership process;
- current circulation process;
- loan periods;
- renewal rules;
- overdue policy;
- existing fines policy, if any;
- staff permissions;
- retention/privacy approval.

### 15.3 Stage 1 — Additive Catalogue Upgrade

Add new nullable/compatible fields and tables:

- authors;
- book_authors;
- copies;
- metadata provenance if approved.

Do not delete legacy fields yet.

### 15.4 Stage 2 — Backfill

Transform existing data into the new model.

For a legacy book row with `copy_count = N`:

- do not invent N copy barcodes automatically as if physically verified;
- create provisional inventory tasks or provisional copy records only under a documented import method;
- verify physical copies during collection audit.

### 15.5 Stage 3 — Dual Read/Validation

Compare:

- legacy copy_count;
- derived copy count;
- locations;
- conditions;
- ISBNs;
- public catalogue results.

Resolve discrepancies before switching write paths.

### 15.6 Stage 4 — New Write Path

New catalogue intake uses books + copies.

Legacy fields remain read-only/deprecated temporarily.

### 15.7 Stage 5 — Circulation

Only after member/privacy approval:

- library_members;
- loans;
- circulation permissions;
- member RLS;
- transactional checkout/checkin;
- overdue calculations.

### 15.8 Stage 6 — Deprecation

Remove or retire legacy columns only after:

- data reconciliation;
- application migration;
- backup/export;
- rollback plan;
- tests;
- staff acceptance.

## 16. RLS and Permission Evolution

### 16.1 Keep Existing Staff RBAC

Do not replace the current permission system.

Extend it with permissions such as:

- members.manage;
- circulation.checkout;
- circulation.checkin;
- circulation.renew;
- circulation.view_all;
- catalogue.import;
- catalogue.export.

### 16.2 Separation of Duties

Collection management and circulation access need not be identical.

A user who can edit bibliographic metadata should not automatically gain access to every member's circulation activity.

### 16.3 Public Views

Prefer intentionally shaped public catalogue views/functions rather than exposing internal member/circulation tables.

## 17. Data Quality Rules

### 17.1 Never Invent Missing Metadata

Unknown stays unknown.

### 17.2 External Metadata Conflicts

Flag conflicts for review.

### 17.3 Duplicates

Define duplicate rules using combinations of:

- ISBN;
- edition;
- title;
- publisher;
- publication year;
- language.

Do not merge records solely because titles match.

### 17.4 Imports

All bulk imports require:

- preview;
- validation;
- rejected-row report;
- source record;
- import audit.

## 18. Donor and Collection Integration

### 18.1 Preserve Existing Support Workflow

Donated books move through the existing support/donation evidence lifecycle.

Catalogue acceptance is a separate library decision.

### 18.2 Donated Book Flow

Recommended:

1. donation received;
2. quantity verified;
3. suitability/condition reviewed;
4. accepted items catalogued;
5. physical copies barcoded;
6. donation allocation linked;
7. aggregate public impact published.

Do not imply every received donated book automatically becomes part of the collection.

## 19. Phased Delivery Plan

### 19.1 Phase A — Architecture and Discovery

- approve this target architecture;
- collect staff workflow facts;
- define migration dataset;
- define privacy decisions.

### 19.2 Phase B — Catalogue Normalisation

- books upgrade;
- authors/book_authors;
- copies;
- barcode model;
- inventory migration tooling.

### 19.3 Phase C — ISBN-Assisted Intake

- provider adapter;
- ISBN validation;
- metadata preview;
- librarian confirmation;
- provenance.

### 19.4 Phase D — Public Catalogue

- cleaned search;
- filters;
- availability derived from copies;
- new arrivals;
- accessibility testing.

### 19.5 Phase E — Members and Circulation

- library_members;
- loans;
- operational RLS;
- checkout/checkin;
- renewals;
- privacy retention.

### 19.6 Phase F — Smart Operations

- phone scanning;
- stock verification;
- reminders;
- reservations.

### 19.7 Phase G — Metadata Interoperability

- MARC 21 import/export mapping;
- Dublin Core export profile;
- validation tests.

### 19.8 Phase H — AI Discovery

- pgvector;
- semantic/hybrid search;
- similar books;
- privacy-safe recommendations.

### 19.9 Phase I — Self Service and RFID

- SIP2/NCIP adapter assessment;
- RFID requirements;
- self-checkout pilot;
- security and offline-mode review.

## 20. Non-Negotiable Invariants

### 20.1 Data

- one bibliographic record may have many physical copies;
- a physical copy has one stable local identifier;
- active-loan state and copy availability must not contradict each other;
- no automatic mass withdrawal;
- no invented inventory during migration.

### 20.2 Privacy

- member borrowing data is never public;
- RLS/database rules enforce access;
- technical roles do not automatically receive circulation-history access;
- personal reading-history retention requires an approved policy.

### 20.3 Standards

- external metadata requires librarian review;
- MARC/DC are interoperability mappings around the canonical model;
- DDC content licensing boundaries are respected;
- SIP2/NCIP remain adapters, not domain models.

### 20.4 Existing Platform

- donor/needs/project/transparency workflows remain intact;
- multilingual architecture remains intact;
- staff RBAC remains intact;
- auditability remains intact;
- WCAG 2.2 AA remains the public UI target.

## 21. Testing Requirements

### 21.1 Catalogue Tests

Test:

- ISBN normalisation/checksum;
- duplicate detection;
- author relationships;
- book-to-copy relationship;
- barcode uniqueness;
- public visibility;
- copy-count derivation.

### 21.2 Circulation Tests

Before circulation launch test:

- checkout transaction;
- double-checkout prevention;
- checkin;
- renewals;
- due-date rules;
- member block/status rules;
- lost/damaged transitions;
- concurrent requests.

### 21.3 RLS Tests

Test at minimum:

- anon;
- member A;
- member B;
- collection manager;
- circulation staff;
- approver/admin;
- technical role.

Confirm a member cannot read another member's loan records.

### 21.4 Migration Tests

Use a copy of representative catalogue data.

Verify counts before and after migration and produce a reconciliation report.

## 22. Rollback and Safety

### 22.1 Migration Safety

Every schema migration must be:

- versioned;
- additive first where possible;
- tested locally/staging;
- backed up before destructive cleanup.

### 22.2 Feature Flags

Use staged rollout/feature flags where useful for:

- new catalogue write path;
- member portal;
- circulation;
- AI search.

### 22.3 No Premature Deletion

Legacy fields are removed only after their replacement has been verified in production-like testing.

## 23. Standards and External Services Reference

### 23.1 MARC 21

Use Library of Congress MARC 21 bibliographic documentation as the authoritative implementation reference at implementation time.

### 23.2 Dublin Core

Use current DCMI Metadata Terms and define a project-specific application profile.

### 23.3 DDC

Use staff-approved DDC practice and appropriately licensed OCLC/Dewey resources where required.

### 23.4 NCIP

Treat ANSI/NISO Z39.83 NCIP as a future circulation-interoperability option.

### 23.5 SIP2

Treat SIP2 as a future self-service adapter option where required by selected hardware/vendor.

### 23.6 ISBN Metadata Providers

Open Library and Google Books may be used as metadata-assistance providers after reviewing API terms, availability, field quality and operational limits.

### 23.7 Semantic Search

Supabase PostgreSQL with pgvector can support semantic/hybrid catalogue discovery in a later phase.

## 24. Decision Gate Before Coding

### 24.1 Required Before Catalogue Migration

Confirm:

- current data source;
- field mapping;
- physical copy verification strategy;
- barcode format;
- classification practice;
- ISBN handling;
- author migration rules.

### 24.2 Required Before Member/Circulation Migration

Confirm:

- authority approval;
- membership fields;
- circulation rules;
- privacy notice;
- retention;
- RLS roles;
- loan periods;
- renewals;
- overdue policy;
- fines decision.

### 24.3 Required Before Standards/AI Integration

Confirm:

- exact interoperability requirement;
- export/import consumers;
- licensing;
- provider terms;
- embedding model;
- re-index strategy;
- privacy scope.

## 25. Current Decision

### 25.1 Approved Direction for Planning

The project should evolve toward a standards-aware Smart Library Management & Community Knowledge Platform while preserving the existing portal, donor/transparency, governance, accessibility, privacy and RBAC foundations.

### 25.2 Implementation Status

Architecture planning only.

No production circulation, member-history, RFID, self-checkout, or destructive catalogue migration is authorised by this document alone.
