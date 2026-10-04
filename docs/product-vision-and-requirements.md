# Sevanagala Public Library Portal — Product Vision and Requirements

## 1. Document Status

### 1.1 Status

Draft foundation specification.

This document defines the intended product before official public launch. The website must not be represented as the official website of Sevanagala Public Library until the responsible authority has approved the project, branding, publishing process, and official contact details.

### 1.2 Source of Truth

The GitHub repository is the canonical source of truth for product and engineering decisions. Chat discussions may help refine decisions, but approved changes must be reflected in this repository.

### 1.3 Working Product Name

**Sevanagala Public Library Portal**

A future official name may be adopted after approval.

## 2. Product Vision

### 2.1 Vision Statement

Create a trusted, accessible, transparent digital platform that helps Sevanagala Public Library serve readers, publish its development priorities, coordinate support from donors and partners, document impact, and progressively evolve toward a modern smart library.

### 2.2 Public-Library Principle

The platform should strengthen the library as a local centre for education, information, digital literacy, lifelong learning, culture, and community development.

The platform must not turn the public library into a commercial advertising site. Partner recognition should acknowledge verified support without compromising the library's public mission, neutrality, independence, or user privacy.

### 2.3 Long-Term Outcome

The portal should become the digital layer for:

- public information about the library;
- current library services and opening information;
- collection discovery;
- verified development needs;
- donor and partner coordination;
- donation transparency;
- project progress;
- smart-library development;
- digital-learning access;
- future online catalogue services.

## 3. Core Problems to Solve

### 3.1 Reader Problem

Readers may not know:

- what books and resources are available;
- what new books have arrived;
- what resources are missing;
- what services the library provides;
- how to request a useful book or resource.

### 3.2 Library Staff Problem

Staff need a simple way to:

- maintain a public information page;
- record current needs;
- collect and organise book requests;
- track donations and pledges;
- show project progress;
- publish updates without editing code.

### 3.3 Donor Problem

Potential supporters often need clear answers to:

- What does the library actually need?
- How many units are required?
- What has already been pledged?
- What has already been received?
- Who is authorised to coordinate support?
- How will the contribution be used?
- Can the contribution and its impact be verified?

### 3.4 Transparency Problem

Without a structured public tracker, the same need may be communicated repeatedly, pledges may be double-counted, and future donors may not know what remains unfunded or undelivered.

## 4. Product Goals

### 4.1 V1 Goals

V1 must provide:

- a professional public library website;
- bilingual-ready or trilingual-ready content architecture;
- a public needs registry;
- project pages;
- donor and partner acknowledgement;
- donation and pledge tracking;
- library news and updates;
- official contact channels;
- a secure staff admin area;
- an audit trail for important administrative changes.

### 4.2 Development Goals

The product should:

- work well on low-cost Android phones;
- remain usable on slower mobile connections;
- meet WCAG 2.2 AA accessibility targets;
- use a mobile-first layout;
- be easy for library staff to maintain;
- minimise recurring cost;
- allow future expansion without rebuilding the entire platform.

### 4.3 Smart-Library Goals

The architecture should allow later addition of:

- searchable book catalogue;
- new-arrivals catalogue;
- book request workflows;
- digital-resource links;
- computer-lab or Wi-Fi project pages;
- event registration;
- learning-resource collections;
- reporting dashboards;
- optional public APIs.

## 5. Non-Goals for V1

### 5.1 Financial Transactions

V1 will not process:

- online cash donations;
- card payments;
- personal bank transfers;
- PayPal or similar payment flows;
- automatic receipts for money.

Financial contributions may only be added after the responsible public authority approves the legal, accounting, procurement, receipt, and audit process.

### 5.2 Member Surveillance

V1 will not build detailed personal reading profiles, borrowing-history analytics, behavioural tracking, or advertising profiles.

### 5.3 Full Library Management System

V1 is not intended to replace a complete Integrated Library System.

A catalogue module may be added, but circulation, fines, member records, barcode workflows, and acquisitions should only be implemented after staff requirements and privacy obligations are separately documented.

The Smart Library research review now provides a proposed member/circulation design, but it does not replace confirmation of Sevanagala's current LMS or written local rules. Before real circulation records are introduced, determine whether Koha/another approved LMS is authoritative. Do not build a competing loan/member source of truth.

The project owner reports that Sevanagala is not currently using Koha. Verify this with the responsible library/local authority before treating the portal as the approved circulation system. The proposed direction is to retain the portal and selectively adapt ILS practices—copy-level inventory, scan-friendly issue/return, approved configurable rules, least-privilege staff roles, audit and privacy controls—rather than reproduce the full Koha feature set. Live circulation still requires institutional approval and staff testing. See [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md).

### 5.4 Unverified Public Claims

The system must not publish:

- unverified donation claims;
- unofficial donor promises as received items;
- personal contact information without approval;
- donor logos without permission;
- government or institutional logos without permission.

## 6. Primary Users

### 6.1 Public Readers

Readers should be able to:

- understand library services;
- browse current needs and projects;
- view new resources and updates;
- request information;
- later search the catalogue.

### 6.2 Students

Students should be able to identify:

- O/L and A/L learning resources;
- English-learning resources;
- STEM resources;
- ICT and digital-learning resources;
- future curriculum resources.

### 6.3 International Donors and Partners

Donors should be able to:

- understand the library's context;
- see specific verified needs;
- identify what remains required;
- contact an authorised person;
- review previous support and impact.

### 6.4 Library Staff

Staff should be able to manage content without code.

### 6.5 Administrators

Authorised administrators should control user roles, approvals, publication, security-sensitive settings, and audit information.

## 7. V1 Feature Scope

### 7.1 Public Website

Required pages:

- Home
- About
- Services
- Books and Resources
- Current Needs
- Development Projects
- Support the Library
- Partners and Donors
- Donations and Transparency
- News and Updates
- Contact

### 7.2 Needs Registry

Each public need should support:

- title;
- category;
- description;
- reason or purpose;
- target quantity;
- pledged quantity;
- received quantity;
- verified quantity where required;
- remaining quantity;
- priority;
- status;
- optional estimated cost;
- photos or supporting documents where approved;
- related project;
- last verified date.

### 7.3 Needs Categories

Initial categories may include:

- books;
- bookshelves and cabinets;
- tables and chairs;
- computers;
- Wi-Fi and networking;
- printers and peripherals;
- air conditioning and ventilation;
- electrical improvements;
- digital learning equipment;
- accessibility improvements;
- children's reading resources;
- STEM resources;
- other approved facilities.

### 7.4 Donation Tracking

A donation record should distinguish:

- inquiry;
- pledge;
- accepted pledge;
- in transit;
- received;
- verified;
- catalogued or deployed;
- completed.

A pledge must never be presented as a received donation.

### 7.5 Partner Recognition

With permission, a public partner record may include:

- organisation name;
- country;
- website;
- approved logo;
- type of contribution;
- related project;
- date;
- verified impact statement.

### 7.6 Admin Dashboard

The dashboard should support:

- creating and editing needs;
- recording pledges;
- recording received donations;
- publishing project updates;
- maintaining partners;
- publishing news;
- uploading approved media;
- managing book requests;
- reviewing audit history where authorised.

## 8. Public Trust Requirements

### 8.1 Verification

Public status must be based on staff-verified records.

### 8.2 Dates

Needs and project pages should display a "last verified" date.

### 8.3 Evidence

Where appropriate and approved, completed contributions may include:

- receipt confirmation;
- inventory entry;
- installation photo;
- project photo;
- short impact update.

### 8.4 Corrections

Staff must be able to correct public information while preserving an internal audit trail.

## 9. Accessibility and Language

### 9.1 Accessibility Target

The public site should target **WCAG 2.2 Level AA**.

### 9.2 Language Architecture

The content model should support:

- Sinhala;
- English;
- Tamil.

The initial public content can be released according to approved content availability, but the data model and routing should not require a redesign to add another language.

### 9.3 International Donor Access

Needs, transparency, partnership, and project pages should have high-quality English content because international organisations are a major audience.

## 10. Privacy Principles

### 10.1 Data Minimisation

Collect only information necessary for the service.

### 10.2 Public and Private Data Separation

Public content and staff-only records must be clearly separated.

### 10.3 Member Privacy

Do not publish borrowing history or personally identifiable reader activity.

### 10.4 Contact Forms

If a public contact form is enabled, it should collect the minimum fields required to respond, define retention periods, and provide a privacy notice. Public enquiry writes are currently disabled; do not describe the form as operational until a reviewed, abuse-resistant submission path is implemented and approved.

## 11. Success Measures

### 11.1 Product Success

Track:

- verified needs published;
- needs fully or partially fulfilled;
- number of verified donations;
- number of active partners;
- project completion rate;
- number of library updates published;
- contact enquiries;
- catalogue usage when launched.

### 11.2 Community Success

Possible measures include:

- new books added;
- outdated resources replaced;
- computers installed;
- Wi-Fi access established;
- seating capacity improved;
- digital-learning usage;
- number of readers benefiting from completed projects.

### 11.3 Trust Success

The project should aim for:

- no duplicate public counting of the same donation;
- no unverified "received" claims;
- clear timestamps;
- authorised publishing;
- documented correction procedures.

## 12. Approval Gates

### 12.1 Before Prototype

Prototype work may use placeholder content and sample data.

### 12.2 Before Official Branding

Obtain permission for:

- official library name;
- logo or emblem;
- government or local-authority branding;
- official photographs;
- official contact details.

### 12.3 Before Public Launch

Confirm:

- website ownership;
- domain ownership;
- responsible administrator;
- content approval contact;
- privacy notice;
- donor acknowledgement policy;
- donation acceptance workflow;
- incident contact.

### 12.4 Before Financial Features

Require separate written approval and documented financial controls.

## 13. Research Basis

### 13.1 Public Library Mission

The product vision is aligned with the IFLA-UNESCO Public Library Manifesto 2022, which emphasises equal access, lifelong learning, information and digital literacy, community development, and access to information.

Reference: https://www.ifla.org/public-library-manifesto/

### 13.2 Public Access and Privacy

IFLA's Principles on Public Access in Libraries emphasise accessibility, privacy, digital skills, open access, and local content.

Reference: https://www.ifla.org/publications/principles-on-public-access-in-libraries/

### 13.3 Accessibility

WCAG 2.2 is the accessibility baseline.

Reference: https://www.w3.org/TR/WCAG22/

### 13.4 Data Protection

The system must be designed with Sri Lanka's Personal Data Protection Act and applicable public-sector guidance in mind.

Reference: https://www.dpa.gov.lk/

## 14. Open Decisions

### 14.1 Decisions Requiring Library Approval

To be confirmed:

- official public website status;
- official domain;
- ownership of hosting accounts;
- content approval authority;
- official email;
- donor recognition rules;
- photograph policy;
- donation acceptance rules.

### 14.2 Decisions Requiring Staff Discovery

To be confirmed:

- current collection data quality;
- exact catalogue format;
- current visitor statistics;
- book-request process;
- staff who will maintain the portal;
- required training.
