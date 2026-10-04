# Sri Lankan Library Website and Smart Library Benchmark Research

## 1. Purpose

### 1.1 Objective

Maintain an evidence-based comparison of Sri Lankan public-library OPACs, digital libraries, and broader library portals to guide the Sevanagala Smart Library project.

This document is a research record, not a design to copy.

## 2. Research Rules

### 2.1 Do Not Copy

Do not copy:

- HTML;
- CSS;
- branding;
- logos;
- photographs;
- proprietary content;
- page layouts pixel-for-pixel.

Extract useful service patterns, workflows, information architecture, search concepts, accessibility lessons, and technical ideas.

### 2.2 Evidence States

Use:

- **YES** — clearly verified;
- **PARTIAL** — capability exists but is limited, indirect, or incomplete;
- **NO** — clearly absent or unavailable in the reviewed public experience;
- **UNKNOWN** — not confirmed by the research reviewed so far.

Do not convert UNKNOWN into NO.

## 3. Preliminary Comparison Matrix

| Library / System | Koha / OPAC | Login | Holds / Reservation | Membership | Advanced Search / Filters | Shelf / Location | Multilingual Evidence | Digital Resources / Repository | Accessibility / Special Services | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hakmana Public Library | YES | YES | YES | PARTIAL | PARTIAL | YES | PARTIAL | PARTIAL | UNKNOWN | Relevant ICTA/NLDSB Digital Libraries Project public-library benchmark; search/find/locate/hold model |
| Pethalai Public Library | YES | YES | PARTIAL | YES | PARTIAL | PARTIAL | YES | UNKNOWN | UNKNOWN | Public membership application and renewal forms; historically important Koha public-library reference |
| Bibile Public Library | YES | YES | YES | YES | PARTIAL | YES | YES | PARTIAL | UNKNOWN | Highly relevant Monaragala District benchmark; opening/contact/service information integrated into OPAC |
| Kurunegala Public Library | YES | PARTIAL | UNKNOWN | UNKNOWN | YES | PARTIAL | PARTIAL | PARTIAL | UNKNOWN | Strong advanced-search reference |
| Galewela Public Library | YES | PARTIAL | UNKNOWN | UNKNOWN | YES | YES | YES | YES | UNKNOWN | Strong collection, item-type, shelving-location, and multilingual filter reference |
| Ampara Public Library | YES | PARTIAL | UNKNOWN | UNKNOWN | YES | PARTIAL | PARTIAL | YES | UNKNOWN | Advanced-search and e-resource filtering reference |
| Point Pedro Public Library | YES | PARTIAL | YES | UNKNOWN | PARTIAL | YES | YES | PARTIAL | UNKNOWN | Digital Libraries Project reference with multilingual collection context |
| Vaddakachchi Public Library | YES | PARTIAL | YES | UNKNOWN | PARTIAL | YES | YES | PARTIAL | UNKNOWN | Public-library digital implementation and section/location reference |
| Opanayake Public Library | YES | PARTIAL | UNKNOWN | PARTIAL | PARTIAL | PARTIAL | YES | UNKNOWN | UNKNOWN | Sinhala-facing public OPAC and account reference |
| Chankanai Public Library | YES | YES | UNKNOWN | UNKNOWN | PARTIAL | PARTIAL | PARTIAL | UNKNOWN | UNKNOWN | Koha and public account-management reference |
| Open University of Sri Lanka Library | YES | YES | PARTIAL | YES | YES | PARTIAL | PARTIAL | YES | PARTIAL | Broader portal: OPAC, past papers, institutional repository, remote access, information services, AI-assisted services |
| National Digital Library and Repository | NO / Repository | UNKNOWN | NO | UNKNOWN | YES | N/A | PARTIAL | YES | UNKNOWN | Digital preservation/discovery, copyright and repository benchmark |
| IESL Library | YES | YES | YES | YES | PARTIAL | PARTIAL | PARTIAL | YES | UNKNOWN | Technical papers, journals, past papers, reservations, remote borrowing extensions |
| IBSL Library | PARTIAL / OPAC | PARTIAL | UNKNOWN | YES | PARTIAL | UNKNOWN | PARTIAL | YES | UNKNOWN | Specialized member, study-material, e-library and research-service reference; requires deeper verification |
| National Library of Sri Lanka | YES | PARTIAL | N/A | PARTIAL | YES | YES | YES | YES | YES | OPAC, reference/research services, Digital Library, visually impaired reader services, National Union Catalogue |

This matrix is preliminary. UNKNOWN cells require further direct verification before design decisions rely on them.

## 4. Confirmed Search Patterns

### 4.1 Kurunegala

The reviewed advanced-search interface demonstrates filters for:

- item type;
- current availability;
- publication-date range;
- language;
- audience;
- content;
- format;
- additional content types.

#### Sevanagala Lesson

Powerful catalogue metadata is useful, but the default mobile experience should expose only the most useful filters first and progressively reveal advanced options.

### 4.2 Galewela

The reviewed advanced-search interface demonstrates:

Item types:

- CD/DVD;
- children's lending books;
- general lending books;
- magazines/journals;
- maps;
- mixed materials;
- reference books;
- e-resources.

Collections include separate Sinhala, Tamil, and English adult/children fiction and non-fiction groupings.

Shelving locations include:

- Children Section;
- Lending Section;
- New Materials Shelf;
- Newspaper Section;
- Periodical Section;
- Reference Section;
- Staff Office.

It also exposes:

- availability;
- publication-date range;
- language.

#### Sevanagala Lesson

The underlying data model should support richer collection and shelf metadata than the public UI initially needs.

A simple search can coexist with detailed filters.

## 5. Member and Account Patterns

### 5.1 Pethalai

Confirmed public-facing patterns include:

- Koha OPAC;
- member login;
- children's new-membership form;
- children's renewal form;
- adult new-membership form;
- adult renewal form;
- Tamil/English public content.

#### Sevanagala Lesson

Membership should be treated as a service journey, not merely an authentication screen.

Future design should distinguish:

- becoming a member;
- renewing membership;
- signing into an existing member account.

### 5.2 Hakmana

The reviewed OPAC exposes authenticated paths related to holds/reservations.

#### Sevanagala Lesson

A modern public interface can simplify the hold flow while preserving the authoritative LMS workflow and permissions.

### 5.3 IESL

The reviewed library site states that users can:

- reserve library materials;
- request borrowing extensions remotely;
- access technical papers and other professional resources.

#### Sevanagala Lesson

The future My Library area can become a real service surface rather than a profile/settings page.

## 6. Regional Benchmark

### 6.1 Bibile Public Library

Bibile is especially relevant because it is in Monaragala District.

The reviewed public OPAC includes:

- Koha catalogue;
- membership application link;
- rules and regulations;
- opening hours;
- contact information;
- bilingual Sinhala/English library profile;
- member login;
- search/find/locate/hold capability described by the library;
- multiple reader-service sections.

#### Sevanagala Lesson

The regional comparison should examine not only software capability but also how effectively local library information and catalogue services are combined for ordinary users.

## 7. Comprehensive Portal Benchmark

### 7.1 Open University of Sri Lanka Library

The reviewed OUSL library portal includes:

- Koha OPAC;
- book catalogue discovery;
- past examination papers;
- institutional repository;
- publications search;
- remote access information;
- regional-library network;
- information/request services;
- AI-based library assistant.

#### Sevanagala Lesson

A useful library website can grow beyond catalogue search into a broader knowledge-service platform.

For Sevanagala, equivalent community-oriented future services could include:

- school-learning resource discovery;
- digital literacy resources;
- government/service information;
- research guidance;
- local-history resources;
- community programmes.

Do not reproduce university-specific services merely because they exist.

## 8. National Digital Library Benchmark

### 8.1 Repository Model

The National Digital Library and Repository demonstrates a different model from an OPAC.

Its purpose is to collect, preserve, manage, and provide access to digital resources for education, research, teaching, and scholarship.

#### Sevanagala Lesson

The project should clearly separate:

- physical-library catalogue;
- licensed/open digital resources;
- locally created digital content;
- archival/community heritage material.

Copyright and access-level metadata must be first-class requirements.

## 9. National Library Benchmark

### 9.1 Service Breadth

The reviewed National Library services include:

- reading/reference services;
- Koha OPAC guidance;
- research assistance;
- bibliographic searches;
- specialised collections;
- co-working/reading spaces;
- services for visually impaired readers;
- digital-library services.

### 9.2 National Union Catalogue

The National Library describes a National Union Catalogue that compiles bibliographic records from automated libraries so users can identify which library holds a publication.

#### Sevanagala Lesson

The future Smart Library network concept has a relevant Sri Lankan precedent:

```text
Bibliographic Record
        |
        v
Participating Libraries
  |       |       |
  v       v       v
Holding  Holding  Holding
```

The Sevanagala architecture should therefore avoid a design that assumes one title can belong to only one library.

## 10. Strong Patterns Identified So Far

### 10.1 Catalogue

Strong recurring capabilities include:

- title/author/keyword search;
- availability;
- item types;
- language;
- collection;
- shelf/location;
- member login;
- hold/reservation workflows.

### 10.2 Library Information

Useful public-library patterns include combining:

- opening hours;
- contact;
- membership;
- rules;
- library profile;
- catalogue.

### 10.3 Digital Services

More advanced portals demonstrate:

- repositories;
- past papers;
- digital publications;
- remote information services;
- AI-assisted discovery/help.

## 11. Common Weaknesses to Investigate Further

### 11.1 UX

Research should continue testing for:

- dense legacy Koha interfaces;
- weak mobile hierarchy;
- too many advanced controls shown at once;
- unclear distinction between search and account actions;
- inconsistent visual treatment;
- inaccessible or small controls;
- difficult multilingual switching.

### 11.2 Data Quality

Research should inspect:

- duplicate authors;
- inconsistent spelling;
- incomplete ISBNs;
- missing covers;
- inconsistent collections;
- inconsistent shelves;
- stale availability;
- duplicate bibliographic records.

### 11.3 Service Discovery

A technically capable OPAC can still make it difficult for ordinary users to discover:

- membership;
- events;
- children's services;
- opening hours;
- digital resources;
- help.

## 12. Sevanagala Design Implications

### 12.1 Public Search

Target a clean search entry point:

```text
Search books, authors, ISBN, subjects...
```

Primary filters:

- Language
- Category
- Availability
- Audience

Advanced filters:

- Author
- Format
- Collection
- Shelf
- Publication Year

### 12.2 Book Detail

Target a modern detail view combining:

- cover;
- title;
- contributors;
- ISBN;
- language;
- subjects;
- description;
- holdings;
- availability;
- library;
- section/shelf;
- member actions only when authoritative integration supports them.

### 12.3 Mobile

The 360–412 px experience should prioritise:

- search;
- availability;
- location;
- opening information;
- simple navigation;
- large touch controls.

### 12.4 Accessibility

Accessibility should be designed into the Sevanagala experience rather than treated as a later visual adjustment.

The National Library's visually impaired reader services also reinforce that accessibility is part of library service, not only website compliance.

## 13. Research Still Required

### 13.1 Per-Site Verification

Continue direct review of:

- exact mobile behaviour;
- sorting;
- result relevance;
- book-cover usage;
- related-books functionality;
- renewal controls;
- reading history;
- lists;
- notifications;
- online payments where applicable;
- accessibility implementation;
- response speed.

### 13.2 Search Test Set

Where suitable, test:

- exact title;
- partial title;
- author;
- ISBN;
- Sinhala title;
- Tamil title;
- English title;
- children's category;
- available-only;
- subject/category.

### 13.3 Expansion Research

Separately map:

- current public-library counts;
- Monaragala District libraries;
- grades;
- local authorities;
- Koha/automation status;
- Digital Libraries Project participation;
- online presence;
- likely integration/readiness gaps.

## 14. Sources Reviewed

Primary sources currently include:

- https://hakmana.dlp.gov.lk/
- https://pethalai.dlp.gov.lk/
- https://bibile.dlp.gov.lk/cgi-bin/koha/opac-main.pl
- https://kurunegala.dlp.gov.lk/cgi-bin/koha/opac-search.pl?expanded_options=1
- https://galewela.dlp.gov.lk/cgi-bin/koha/opac-search.pl
- https://ampara.dlp.gov.lk/cgi-bin/koha/opac-search.pl
- https://pointpedro.dlp.gov.lk/cgi-bin/koha/opac-main.pl
- https://vaddakachchi.dlp.gov.lk/
- https://opanayake.dlp.gov.lk/cgi-bin/koha/opac-main.pl
- https://chankanai.dlp.gov.lk/
- https://diglib.natlib.lk/
- https://lib.ou.ac.lk/
- https://library.iesl.lk/
- https://library.ibsl.lk/
- https://www.natlib.lk/

Research status should be updated as deeper verification continues.
