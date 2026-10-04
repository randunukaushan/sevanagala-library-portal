# Sri Lankan Library Benchmark Research

## 1. Scope and Method

Initial evidence review performed 2026-10-04. Sources were official National Library/Koha/Digital Libraries Project (DLP) pages where available. This is a desk review of publicly reachable pages, not a staff interview, full assistive-technology audit, load test, or authenticated account test. Record YES only for directly observed or explicitly described behavior. Lack of evidence remains UNKNOWN.

## 2. Verified Examples

| Library / system | Evidence-backed observations | Cautions |
|---|---|---|
| Bibile Public Library (Monaragala) | Official Koha OPAC; Sinhala/English descriptive content; OPAC says readers can search, locate and hold; item results expose language, call number, location, status and barcode. Library page states DLP installed in 2021. | Public wording reports Grade II; NLDSB's Uva 2022 list records Grade III with grading date 2008-12-11. Current grade needs institutional verification. Public item data does not prove live service uptime or transactional holds for every reader. |
| Ampara Public Library | Koha advanced search provides item type, available-only, publication date range, and language. Results expose facets for availability, authors, collections, item types, locations and topics. Item records expose call number, shelf/location, item barcode and copy-level availability. Sinhala and English records observed. | Search snippets/sample records are not a controlled relevance/performance study. Tamil support, account renewals, holds, mobile accessibility and response time remain UNKNOWN. |
| Pethalai Public Library | Koha OPAC has Sinhala/Tamil headings, account sign-in, and linked child/adult new-membership and renewal forms. | Forms are not proof of end-to-end online membership renewal or automated account updates. Member transaction behavior not authenticated. |
| National Library of Sri Lanka | Officially describes Koha OPAC, National Union Catalogue, MARC 21/SLMARC standards, digital library/repository, and librarian training/advisory support for Koha. | National Library reference workflows and scale should not be copied wholesale to a local authority library. |
| National Virtual Union Catalogue | Official portal describes discovery across 25 public library catalogues plus the National Library, browsing by call-number class, and availability information; Bibile is a participant listed. | Public claim does not establish a real-time API, synchronization guarantees, data freshness SLA, or Sevanagala eligibility. Contact NLDSB for integration terms. |
| Hakmana Public Library | Official DLP Koha page describes public catalogue search and states the DLP implementation was in 2021. | Current availability, filter quality, holds, accessibility and member transactions were not independently tested. |
| Monaragala District Library (Uva Provincial Library page) | Public service page describes lending, research/reference, study, children's, newspaper and information services. | Page does not establish the district library's LMS/Koha, online OPAC, membership transactions or item-level availability. |

## 3. Comparable Search Checks

| Test | Observed result | Evidence status |
|---|---|---|
| English subject search | Ampara Koha results for su:Novel returned records and refinement facets. | YES, sampled |
| Sinhala author/title search | Ampara Koha returned Sinhala-language records for a Sinhala author query. | YES, sampled |
| Item-level copy availability | Ampara record pages showed multiple physical copies and availability, location, call number and barcode. | YES, sampled |
| Availability-only filter | Ampara advanced search exposes an available-only option. | YES, UI observed |
| Search sorting | Search results present a sorting control. | YES, control observed; sort correctness not benchmarked |
| ISBN/exact title/partial title | Not run as a documented controlled test set. | UNKNOWN |
| Tamil query quality | Pethalai page includes Tamil UI/content; query relevance not measured. | PARTIAL |
| Children/age facet | Ampara offers a children's lending item type and a child-record sample. Dedicated age filter behavior not verified. | PARTIAL |
| Member loan history/renewal/hold completion | Login and help text/forms are visible on some OPACs; authenticated workflows were not tested. | UNKNOWN |
| Book covers and related books | Inconsistent snippets show image placeholders/covers; completeness and relation quality not tested. | UNKNOWN |
| Mobile behavior, WCAG, response/performance | No device-based or assistive-technology/performance audit performed. | UNKNOWN |
| Payments | No payment workflow established by this review. | UNKNOWN |

## 4. Transferable Product Decisions

- Search title, author, ISBN, subject and language; add copy-level filters only if the authoritative LMS provides reliable fields.
- Show availability temporarily unavailable when the integration is stale/down; never substitute an old status as current without a visible timestamp.
- Progressive disclosure: mobile users first see one search field and essential results; advanced facets remain optional.
- Distinguish membership application/renewal forms from account login, loans, and actual renewal transactions.
- Coordinate with NLDSB on MARC/SLMARC, Koha training, and possible National Virtual Union Catalogue participation before building custom cataloguing or cross-library exchange.

## 5. Evidence Sources

- Bibile OPAC: https://bibile.dlp.gov.lk/cgi-bin/koha/opac-main.pl
- Ampara advanced search: https://ampara.dlp.gov.lk/cgi-bin/koha/opac-search.pl
- Ampara catalogue result facets: https://ampara.dlp.gov.lk/cgi-bin/koha/opac-search.pl?q=su%3A%22Novel%22
- Ampara copy-level record: https://ampara.dlp.gov.lk/cgi-bin/koha/opac-detail.pl?biblionumber=1529
- Pethalai OPAC: https://pethalai.dlp.gov.lk/
- Hakmana OPAC: https://hakmana.dlp.gov.lk/
- National Virtual Union Catalogue: https://unioncatalogue.dlp.gov.lk/
- NLDSB cataloguing and Koha support: https://www.natlib.lk/NLDSB/what-we-do/
- Monaragala District Library: https://www.library.up.gov.lk/?page_id=643

