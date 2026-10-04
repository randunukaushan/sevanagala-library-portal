# Smart Library Research and Integration Review

## 1. Purpose

### 1.1 Objective

Record the current implementation state, new Smart Library research findings, architecture implications, and documentation gaps without prematurely rewriting working code or discarding existing project decisions.

This document is additive. It does not replace the existing product, governance, donor, security, UI/UX, or implementation documents. It exists to help reconcile the current project with the expanding Smart Library direction.

## 2. Current Repository Baseline

### 2.1 Technology Stack

Current repository baseline:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase PostgreSQL
- Supabase Auth
- Supabase SSR integration
- Row Level Security
- migration-based database changes
- GitHub Actions CI
- Vercel-oriented deployment architecture

### 2.2 Existing Public Product

The current application already contains a substantial public-library portal layer, including:

- Home
- About
- Books & Resources
- Current Needs
- Projects
- Support / partnership content
- Transparency-oriented content
- News
- Contact
- responsive public UI
- premium editorial visual system
- accessibility guidance
- low-bandwidth design principles

### 2.3 Existing Staff and Admin Work

The repository already contains:

- protected admin routes
- staff authentication integration
- role and permission foundations
- Needs workflow
- Partnerships / funding CRM work
- admin preview screens
- audit-log concepts
- security-hardening migrations
- Row Level Security tests
- content-management foundations

### 2.4 Existing Collection Data

The Supabase schema currently contains:

- book categories
- books
- book requests
- collection-management fields
- condition and review-status fields
- multilingual-ready supporting structures

The current `books` table is an application collection model created before the Koha-integration direction became explicit.

It must not be deleted or replaced automatically.

## 3. Current Documentation Position

### 3.1 Existing Product Direction

Current canonical documentation describes the portal as:

- a public-library website;
- a development-needs portal;
- a donor-transparency platform;
- a future Smart Library system.

The documentation already treats WCAG 2.2 AA, multilingual support, mobile-first design, privacy, security, collection quality, donor transparency, and incremental development as core requirements.

### 3.2 Existing Catalogue Position

Several current documents treat a full searchable catalogue as a later phase.

Examples include:

- the Smart Library roadmap placing the digital catalogue after collection and infrastructure preparation;
- the Books & Resources page stating that a full searchable catalogue comes later;
- the product vision treating full library-management functions as outside the original V1 scope.

### 3.3 New Direction Requiring Reconciliation

The new Smart Library master context raises catalogue discovery, book details, search, Koha integration, live availability, member services, and future multi-library discovery to a more central position.

This is an evolution of scope, not a reason to discard the current donor, development, public-information, or governance work.

## 4. Architecture Research Findings

### 4.1 Koha Role

Koha should be treated as a potential authoritative Integrated Library System for core library operations where it is deployed and approved.

Typical Koha responsibilities include:

- bibliographic records
- item / copy records
- patrons
- circulation
- checkouts
- returns
- renewals
- holds
- fines
- staff circulation rules
- OPAC functions

### 4.2 Smart Library Platform Role

The Sevanagala Smart Library platform can provide a modern digital experience around the library-management system.

Potential responsibilities include:

- modern public website
- improved search/discovery UX
- multilingual presentation
- events
- announcements
- children’s discovery experiences
- library development transparency
- donor and partner workflows
- reviews and reading lists
- notifications
- analytics aggregates
- AI-assisted discovery
- application-specific preferences
- integration mappings
- future multi-library discovery

### 4.3 Integration Capability

Current Koha documentation supports versioned RESTful APIs under an `/api/v1/` model and supports authenticated integration using OAuth2 client credentials where configured.

Therefore, an integration-first architecture is technically realistic and should be researched before rebuilding circulation or member-management functionality in the Smart Library application.

## 5. Source-of-Truth Principle

### 5.1 General Rule

Each business domain should have one clearly defined authoritative source.

Do not allow two systems to independently own live operational truth for the same entity.

### 5.2 Candidate Ownership Model

When Koha is deployed and confirmed as authoritative:

| Domain | Preferred authority |
| --- | --- |
| Bibliographic records | Koha |
| Physical item / copy records | Koha |
| Live availability | Koha |
| Holds / reservations | Koha |
| Loans / returns / renewals | Koha |
| Patron circulation status | Koha |
| Website pages | Smart Library Platform |
| Events | Smart Library Platform |
| Announcements | Smart Library Platform |
| Development needs | Smart Library Platform |
| Projects | Smart Library Platform |
| Partnerships / donor workflows | Smart Library Platform |
| Reviews / saved lists | Smart Library Platform where approved |
| AI preferences | Smart Library Platform where approved |
| Notification orchestration | Smart Library Platform |
| Analytics aggregates | Smart Library Platform |
| Integration mappings | Smart Library Platform |

This table is provisional until the actual Sevanagala library-management environment is verified.

## 6. Existing Supabase Book Data

### 6.1 Do Not Delete Existing Work

The current Supabase `books` and `book_categories` structures must not be removed simply because Koha integration is now being researched.

### 6.2 Possible Future Roles

After the real library environment is verified, the current collection tables may evolve into one or more of these roles:

- temporary pre-Koha catalogue
- import staging
- migration-cleaning workspace
- local discovery index
- search cache
- enrichment metadata
- integration mapping layer
- application-only metadata not stored in Koha

The final role must be selected only after the real catalogue, Koha status, data quality, staff workflow, and integration options are verified.

### 6.3 Copy-Level Data Gap

The current `books.copy_count` approach is not sufficient for full circulation-quality item tracking.

Future architecture must distinguish:

- bibliographic record
- physical item / copy
- barcode
- home library
- shelving location
- circulation status
- condition

Do not migrate destructively until the authoritative source of these fields is known.

## 7. Search and OPAC Research Direction

### 7.1 Search Capabilities to Benchmark

Research should compare:

- title search
- author search
- ISBN search
- keyword search
- subject search
- partial-title search
- Sinhala search
- Tamil search
- English search
- language filters
- category filters
- item-type filters
- audience filters
- collection filters
- availability filters
- publication-year filters
- shelving-location information

### 7.2 Search UX Principle

The Smart Library public search does not need to copy the Koha OPAC interface.

The platform should preserve authoritative catalogue and availability data while presenting a cleaner, faster, mobile-first discovery experience.

### 7.3 Availability Rule

Never invent availability.

If live availability cannot be verified from the authoritative library-management source, clearly show that live status is unavailable rather than guessing.

## 8. Sri Lankan Benchmark Research

### 8.1 Public Library References

Continue structured research of:

- Hakmana Public Library
- Pethalai Public Library
- Bibile Public Library
- Kurunegala Public Library
- Galewela Public Library
- Ampara Public Library
- Point Pedro Public Library
- Vaddakachchi Public Library
- Opanayake Public Library
- Chankanai Public Library

### 8.2 Broader Library References

Also research:

- National Digital Library and Repository
- Open University of Sri Lanka Library
- Institution of Engineers Sri Lanka Library
- IBSL Library
- National Library of Sri Lanka

### 8.3 Confirmed Useful Patterns

Early review confirms that Sri Lankan Koha-based public-library OPACs already demonstrate combinations of:

- catalogue search
- book location
- availability
- holds
- user login
- membership-related information
- multilingual catalogue data
- advanced filtering
- collection and shelving structures

The goal is to learn from these patterns, not reproduce their UI.

## 9. Documentation Conflicts to Reconcile

### 9.1 Catalogue Timing

Current documentation places a full catalogue later.

New Smart Library direction makes catalogue discovery a stronger near-term priority.

Required action:

- do not silently overwrite the old roadmap;
- document the changed priority;
- preserve collection-data-readiness gates;
- distinguish catalogue discovery from full circulation replacement.

### 9.2 Supabase Versus Koha Ownership

Current schema contains collection tables.

New architecture prefers Koha as the system of record where available.

Required action:

- retain current schema;
- classify each table as authoritative, staging, cache, enrichment, or application-owned after integration discovery;
- avoid parallel operational truth.

### 9.3 Admin Scope

Existing admin design contains collection-management concepts.

New direction must clarify whether a future admin screen:

- edits Smart Library-owned data;
- calls Koha APIs;
- deep-links staff into Koha;
- or provides an integration facade.

Do not duplicate Koha circulation rules without a documented reason.

### 9.4 Navigation

Current navigation is strongly shaped around library development, needs, transparency, and donors.

New research introduces stronger reader-facing areas:

- Catalogue
- Search
- Membership
- My Library
- Children’s Section
- Events

The correct final information architecture should be decided after benchmark comparison and current-user journey review rather than by immediately replacing the existing navigation.

## 10. Non-Destructive Change Rules

### 10.1 Preserve Working Features

Do not remove working donor, transparency, needs, projects, security, authentication, or admin functionality simply to align with a new Smart Library concept.

### 10.2 Prefer Additive Evolution

Preferred sequence:

1. inspect current implementation;
2. inspect canonical documentation;
3. research external references;
4. identify contradictions and gaps;
5. update documentation intentionally;
6. design integration boundaries;
7. implement the smallest safe changes;
8. migrate data only when authority and rollback are clear.

### 10.3 Keep the System Runnable

Every significant change should preserve a runnable application and a reversible migration path where practical.

## 11. Research Topics Still Open

### 11.1 Koha Integration

Research:

- exact REST API resources
- authentication
- rate limits and security
- patron access
- holds
- renewals
- item availability
- bibliographic search
- webhooks or synchronization options
- offline / failure behavior
- caching strategy
- version compatibility

### 11.2 Metadata and Interoperability

Continue research on:

- MARC21
- Dublin Core
- ISBN-13
- Dewey Decimal Classification
- authority control
- Z39.50 / SRU where relevant
- SIP2
- NCIP
- Unicode normalization
- multilingual indexing
- transliteration

### 11.3 Search Technology

Evaluate whether Sevanagala requires:

- PostgreSQL full-text search
- trigram / typo-tolerant search
- external search index
- Koha-native search
- hybrid search
- later natural-language query translation

### 11.4 Member Experience

Research:

- account login
- current loans
- due dates
- renewals
- holds
- saved lists
- notifications
- privacy controls
- digital membership card

### 11.5 Hardware

Continue research on:

- barcode workflows
- RFID
- self-checkout
- kiosks
- digital signage
- smart shelves

Hardware should not drive software design prematurely.

## 12. Immediate Next Work

### 12.1 Continue Audit

Complete a route-by-route and schema-by-schema current-state audit.

### 12.2 Complete Benchmark Matrix

Produce a structured Sri Lankan library feature comparison using:

- YES
- PARTIAL
- NO
- UNKNOWN

### 12.3 Produce Gap Analysis

Compare:

- current implementation
- current canonical documentation
- benchmark findings
- new Smart Library master context

Classify each item as:

- already implemented
- partially implemented
- missing
- needs refactoring
- future feature
- requires institutional verification

### 12.4 Reconcile Canonical Documents

Only after the above analysis, update the affected canonical documents individually so that no valid previous requirement is lost accidentally.

## 13. Current Working Conclusion

### 13.1 Direction

The current project is not a failed starting point and should not be restarted.

It already contains strong foundations in:

- public website design
- multilingual readiness
- accessibility
- privacy
- security
- staff authentication
- donor transparency
- needs and project workflows
- collection data
- auditability
- documentation discipline

The Smart Library research should extend these foundations.

### 13.2 Target

The target remains:

Build Sevanagala Public Library into a high-quality, production-oriented Smart Public Library implementation first, while keeping the architecture capable of later supporting additional libraries without requiring a complete rewrite.
