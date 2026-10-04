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

### 3.1 Core Fields

Recommended fields:

- internal record ID;
- title;
- subtitle;
- author;
- ISBN where available;
- language;
- classification code;
- category;
- publisher;
- publication year;
- edition;
- copy count;
- location/section;
- circulation type;
- condition;
- review status;
- acquisition source;
- added date.

### 3.2 Optional Fields

Possible fields:

- subject keywords;
- target age;
- education level;
- O/L relevance;
- A/L relevance;
- curriculum/future-skills relevance;
- notes;
- cover image only where lawful and permitted.

The title-level record is distinct from each physical copy. Keep a metadata mapping path for a future reviewed MARC 21 import/export rather than making the staff-facing form a raw MARC editor. Preserve the library's existing classification until an authorized librarian approves a mapping. NLDSB's MARC 21 framework is a reference for consultation, not evidence that the local catalogue already follows it.

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
- author;
- language;
- category;
- classification;
- publication year;
- general availability state.

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

### 15.1 Phase One

- category needs;
- exact requests;
- book-demand counts.

### 15.2 Phase Two

- current collection inventory;
- review status;
- condition status.

### 15.3 Phase Three

- searchable public catalogue;
- new arrivals;
- advanced filters.

### 15.4 Phase Four

Consider circulation integration only after separate requirements and privacy review.

The current portal's books table remains the bibliographic catalogue during discovery. A future physical-copy model is additive and one-to-many; copy-level accession, barcode, shelf, condition and live status must not be inferred from copy_count. If an approved LMS owns the collection, its records remain authoritative and the portal uses a reviewed integration/mapping layer. See [Library Member and Circulation Design](./library-member-and-circulation-design.md) and [Smart Library Research and Integration Review](./smart-library-research-and-integration-review.md).

Koha-informed local improvements should be introduced incrementally: title/copy separation, scan-friendly item lookup, explicit item status/location and cataloguing import validation before advanced authority control, full MARC editing, acquisitions or serials. See [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md).

## 16. Research Basis

### 16.1 Library Mission

IFLA-UNESCO Public Library Manifesto 2022:
https://www.ifla.org/public-library-manifesto/

### 16.2 Privacy

IFLA Statement on Privacy in the Library Environment:
https://www.ifla.org/publications/ifla-statement-on-privacy-in-the-library-environment/
