# Library Collection and Book Management

## 1. Purpose

### 1.1 Objective

Define a practical collection model that helps staff understand the current collection, identify outdated or damaged material, collect reader demand, and publish donor-friendly book needs without replacing professional librarian judgement.

## 2. Collection Principles

### 2.1 Keep Existing Library Classification

The portal should preserve the classification numbers and category labels already used by the library.

The website must not force a new classification scheme before staff review.

### 2.2 Separate Inventory from Need

A book can be:

- currently available;
- reference only;
- damaged;
- outdated and under review;
- replacement needed;
- requested but not owned.

These are different states and should not be mixed.

### 2.3 No Automatic Disposal

The website must never automatically decide that a physical book should be removed.

"Outdated" should mean **review required** until an authorised library process decides what to do with the item.

## 3. Book Record

### 3.1 Bibliographic Record

Recommended bibliographic concepts include:

- internal or authoritative record ID;
- title;
- subtitle;
- contributors such as author, editor, or translator;
- identifiers such as ISBN-13 where available;
- language;
- classification code;
- subjects / categories;
- publisher;
- publication year;
- edition;
- description or notes where approved.

A bibliographic title must not be treated as the same thing as a physical copy.

### 3.2 Physical Item / Copy

Copy-level concepts may include:

- authoritative item/copy ID;
- bibliographic record ID;
- owning library;
- barcode;
- future RFID identifier;
- collection;
- shelving location;
- circulation type;
- circulation status;
- physical condition;
- acquisition source;
- added date.

If Koha or another approved library-management system owns these item records, the Smart Library platform should integrate rather than maintain conflicting live copy data.

### 3.3 Optional Enrichment Fields

Possible fields:

- subject keywords;
- target age;
- education level;
- O/L relevance;
- A/L relevance;
- curriculum/future-skills relevance;
- notes;
- cover image only where lawful and permitted.

## 4. Book Condition

### 4.1 Suggested Values

- Good
- Fair
- Worn
- Damaged
- Unusable
- Missing
- Under Review

### 4.2 Condition vs Content Currency

Physical condition and information currency are separate.

A book can be physically excellent but educationally outdated.

## 5. Content Review Status

### 5.1 Suggested Values

- Current
- Review Needed
- Outdated — Review Confirmed
- Replacement Recommended
- Historical / Retain for Reference
- Withdrawn under Approved Process

### 5.2 High-Change Subjects

Subjects that may require more frequent currency review include:

- computing;
- cybersecurity;
- artificial intelligence;
- medicine and health;
- law;
- exam-specific guides;
- technology;
- current statistics.

## 6. Reader Request Record

### 6.1 Exact Book Request

Store:

- title;
- author;
- ISBN if known;
- language;
- category;
- level;
- requester-count aggregate;
- priority;
- exact-title-required flag;
- similar-book-acceptable flag;
- reason.

### 6.2 Category Request

If no exact title is known, store:

- category;
- subtopic;
- language;
- age/education level;
- desired quantity;
- preferred recency;
- reason.

### 6.3 Privacy

The public site should normally publish demand counts, not the identities of individual readers who requested a title.

## 7. Demand Aggregation

### 7.1 Duplicate Requests

When multiple readers request the same title, increment an aggregate request count rather than creating misleading separate public needs.

### 7.2 Category Demand

Examples:

- Programming — 18 requests
- Biology reference — 14 requests
- English learning — 22 requests

This can support donor proposals.

### 7.3 Staff Validation

High request count should inform priority, but staff still decide whether a resource is appropriate for the collection.

## 8. Education Resource Strategy

### 8.1 Current Curriculum

Maintain useful current resources for:

- O/L;
- A/L;
- English;
- mathematics;
- science;
- ICT;
- technology;
- commerce;
- arts and humanities.

### 8.2 Future-Ready Resources

Build durable collections around:

- digital literacy;
- programming;
- artificial intelligence fundamentals;
- data literacy;
- cybersecurity basics;
- engineering fundamentals;
- entrepreneurship;
- financial literacy;
- climate and environmental literacy;
- communication skills;
- career guidance.

### 8.3 Avoid Over-Dependence on Exam Editions

International donors may not hold exact Sri Lankan exam guides.

Where possible, request durable reference material by subject and level in addition to exact local titles.

## 9. Donor-Friendly Book Need

### 9.1 Example Category Request

```text
Category: Introductory Biology
Reader Level: Ages 16–19
Language: English
Quantity: 15
Preferred Recency: Recent editions where scientific currency matters
Exact Title Required: No
Purpose: Senior secondary reference and independent study
```

### 9.2 Example Exact Request

```text
Title: [Title]
Author: [Author]
ISBN: [ISBN if known]
Language: English
Requested Copies: 2
Reader Requests: 8
Similar Alternative Accepted: Yes
```

## 10. Collection Gap Analysis

### 10.1 Category-Level Fields

For each category:

- classification;
- current total;
- current usable total;
- review-needed total;
- replacement-needed total;
- reader demand;
- requested new quantity.

### 10.2 Gap Calculation

A simple planning metric may be:

```text
Gap = Approved Target Collection Need - Current Suitable Copies - Accepted Incoming Support
```

This is a planning aid, not a professional collection-development rule.

### 10.3 Dashboard Use

Staff dashboard may highlight:

- high-demand low-stock categories;
- high percentage of books requiring review;
- categories with active donations;
- categories with no recent updates.

## 11. Cataloguing Workflow

### 11.1 New Donation

Suggested workflow:

1. Receive donation.
2. Verify donated-book count.
3. Review relevance and condition.
4. Accept suitable books into the collection.
5. Create catalogue records.
6. Assign classification/location.
7. Mark donation allocation.
8. Publish aggregate impact.

### 11.2 Unsuitable Material

Do not automatically add every donated book.

Staff should be able to record:

- duplicate beyond need;
- unsuitable;
- damaged;
- outdated;
- requires review.

Final handling follows library policy.

## 12. Data Import

### 12.1 Spreadsheet First

If the current catalogue is on paper, a spreadsheet can be used as an intermediate import format.

Recommended columns should match the database model.

### 12.2 Validation

Before import:

- normalise author names;
- normalise languages;
- validate ISBN where possible;
- standardise classification codes;
- remove accidental duplicate rows;
- keep copy counts accurate.

### 12.3 Import Audit

Record:

- import date;
- source file;
- rows imported;
- rows rejected;
- responsible user.

## 13. Public Catalogue Scope

### 13.1 Safe Public Fields

Possible public fields:

- title;
- author / contributor;
- ISBN where appropriate;
- language;
- category / subject;
- classification;
- publication year;
- edition;
- cover image where lawful;
- public description;
- owning library;
- collection / section;
- shelf location where reliable;
- availability only when supplied or confirmed by the authoritative library system.

### 13.2 Private Fields

Do not publish:

- borrower identity;
- borrower history;
- private staff notes;
- acquisition-sensitive information not approved for publication.

## 14. Copyright and Media

### 14.1 Book Content

Do not upload copyrighted book text unless the library has permission or a lawful licence.

### 14.2 Cover Images

Do not assume every cover image may be copied freely.

Use approved publisher/metadata sources, licensed images, or no cover image.

## 15. Implementation Phases

### 15.1 Foundation

- category needs;
- exact requests;
- book-demand counts;
- collection-data assessment;
- current library-system / Koha discovery.

### 15.2 Data Readiness

- inventory or authoritative catalogue import/integration;
- duplicate and authority-name cleanup;
- bibliographic/copy separation;
- review status;
- condition status;
- shelf and collection normalization.

### 15.3 Public Discovery

- searchable public catalogue;
- book detail pages;
- new arrivals;
- multilingual search;
- advanced filters;
- authoritative availability and location where available.

### 15.4 Circulation Integration

Integrate member loans, holds, renewals, returns, or fines only after the authoritative system, staff workflow, permissions, and privacy requirements are confirmed.

Do not rebuild circulation merely to avoid integrating an existing approved LMS.

## 16. Research Basis

### 16.1 Library Mission

IFLA-UNESCO Public Library Manifesto 2022:
https://www.ifla.org/public-library-manifesto/

### 16.2 Privacy

IFLA Statement on Privacy in the Library Environment:
https://www.ifla.org/publications/ifla-statement-on-privacy-in-the-library-environment/


## 17. Koha and Integration Boundary

### 17.1 Authority Discovery

Before changing the current Supabase collection schema, verify:

- whether Sevanagala currently uses Koha or another LMS;
- the version and hosting model;
- catalogue-data quality;
- item/copy records;
- barcode practices;
- patron/member records;
- circulation workflows;
- supported APIs or export formats.

### 17.2 Current Supabase Collection Tables

Existing Supabase book tables are not automatically obsolete.

Depending on the verified library environment, they may serve as:

- temporary catalogue storage;
- import staging;
- data-cleaning workspace;
- discovery/search index;
- cache;
- enrichment metadata;
- integration mappings.

Their final role must be documented before destructive migration.

### 17.3 Metadata Interoperability

The collection architecture should remain compatible with relevant library metadata concepts and standards, including where appropriate:

- MARC21;
- Dublin Core;
- Dewey Decimal Classification;
- ISBN-13;
- authority control;
- Unicode Sinhala, Tamil, and English metadata.

### 17.4 Search Quality

Data quality directly affects search quality.

Normalize and review:

- author/contributor names;
- duplicate bibliographic records;
- Sinhala/Tamil Unicode forms;
- language codes;
- subjects;
- classification;
- edition information;
- shelving locations.
