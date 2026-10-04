# Donor, Partner and Transparency Workflow

## 1. Purpose

### 1.1 Objective

Create a reliable process for recording needs, donor interest, pledges, received contributions, verified outcomes, partner recognition, and public transparency.

### 1.2 Core Principle

The portal should make support easier without overstating promises or turning recognition into commercial endorsement.

## 2. Support Types

### 2.1 Books

Examples:

- new reference books;
- English books;
- children's books;
- STEM books;
- ICT and programming books;
- current O/L and A/L support resources;
- future-curriculum resources.

### 2.2 Equipment

Examples:

- computers;
- networking equipment;
- printers;
- display equipment;
- accessibility equipment.

### 2.3 Furniture and Infrastructure

Examples:

- shelves;
- cabinets;
- tables;
- chairs;
- lighting;
- ventilation or approved air-conditioning requirements.

### 2.4 Services and Expertise

Possible support:

- approved training;
- technical installation;
- digital literacy sessions;
- catalogue support;
- website or systems support.

## 3. Donor Journey

### 3.1 Discovery

Donor finds:

- Current Needs;
- Project page;
- Partner page;
- outreach link from a proposal.

### 3.2 Evaluation

Donor can review:

- purpose;
- quantities;
- current status;
- remaining requirement;
- verification date;
- previous project evidence;
- authorised contact route.

### 3.3 Enquiry

This describes the intended workflow if a public submission path is approved. Direct anonymous contact-message inserts are currently disabled pending privacy, validation and abuse-control review. Until then, published contact details are informational routes only.

Donor submits:

- organisation name;
- contact person;
- email;
- country;
- need/project of interest;
- proposed support;
- message.

Only necessary personal information should be collected.

### 3.4 Internal Review

Library staff review:

- relevance;
- conditions attached to support;
- compatibility with public-library mission;
- item suitability;
- required approval;
- transport/customs implications;
- maintenance cost;
- donor recognition request.

### 3.5 Pledge

If accepted:

- create pledge record;
- quantity;
- item;
- expected delivery date;
- public recognition preference;
- expiry date if appropriate;
- internal notes.

### 3.6 Receipt

On delivery:

- record actual quantity;
- date;
- condition;
- evidence;
- responsible receiver.

### 3.7 Verification

Authorised staff verify:

- quantity;
- item identity;
- condition;
- project allocation.

### 3.8 Public Update

Only after verification:

- increment received quantity;
- update remaining requirement;
- acknowledge donor if permission exists;
- publish evidence if approved.

## 4. Status Models

### 4.1 Need Status

Recommended values:

- Draft
- Pending Approval
- Seeking Support
- Partially Pledged
- Fully Pledged
- Partially Received
- Fulfilled
- Paused
- Archived

### 4.2 Pledge Status

Recommended values:

- Proposed
- Under Review
- Accepted
- Scheduled
- In Transit
- Partially Received
- Received
- Cancelled
- Expired

### 4.3 Donation Status

Recommended values:

- Recorded
- Received
- Under Verification
- Verified
- Allocated
- Deployed / Catalogued
- Closed

### 4.4 Project Status

Recommended values:

- Planned
- Approved
- Seeking Support
- In Progress
- Completed
- Archived

## 5. Quantity Rules

### 5.1 Target Quantity

The total approved requirement.

### 5.2 Pledged Quantity

Accepted but not yet received.

### 5.3 Received Quantity

Physically received but not necessarily fully verified.

### 5.4 Verified Quantity

Confirmed for official reporting.

### 5.5 Remaining Quantity

Public remaining quantity should be defined consistently.

Recommended V1 display:

```text
Remaining to source = Target - Accepted Active Pledges - Verified Received
```

If a pledge expires or is cancelled, the amount returns to remaining need.

### 5.6 Avoid Double Counting

The database must link each pledge and donation to a specific need or project allocation so one contribution is not counted twice.

## 6. Donor Recognition

### 6.1 Consent

Public recognition should be opt-in or otherwise explicitly approved.

### 6.2 Recognition Fields

Possible public fields:

- organisation name;
- country;
- website;
- logo;
- contribution summary;
- project;
- date;
- impact.

### 6.3 Anonymous Support

Supporters may choose to remain anonymous publicly.

### 6.4 No Implied Endorsement

The site should state that acknowledgement of support does not imply endorsement by the library or responsible public authority.

### 6.5 No Pay-for-Promotion Model in V1

The portal should not promise advertising placement in exchange for support.

Use neutral supporter acknowledgement, not commercial sponsorship advertising, unless a separate approved institutional policy permits it.

## 7. Need Publication Standard

### 7.1 Every Public Need Should Answer

- What is needed?
- Why is it needed?
- Who benefits?
- How much is required?
- How much is already pledged?
- How much is verified as received?
- What remains?
- When was the information last checked?
- How can an organisation contact the library?

### 7.2 Evidence

Where suitable:

- current-condition photo;
- inventory count;
- staff statement;
- user demand summary;
- technical specification.

## 8. Book Support Workflow

### 8.1 Exact Title Requests

Store:

- title;
- author;
- ISBN if known;
- language;
- reader level;
- requested copies;
- number of reader requests;
- exact-title-required flag;
- reason.

### 8.2 Category Requests

Store:

- subject;
- age/education level;
- language;
- quantity;
- preferred publication recency where relevant;
- acceptable alternatives.

### 8.3 Donor Matching

The public website may show category needs even when an exact title is unavailable.

## 9. Equipment Support Workflow

### 9.1 Specification

Equipment needs should define:

- functional requirement;
- minimum specification;
- quantity;
- warranty preference;
- compatibility constraints;
- power/network requirements;
- maintenance responsibility.

### 9.2 Total Cost of Ownership

Do not accept equipment only because it is free.

Consider:

- electricity;
- consumables;
- repair;
- licensing;
- networking;
- spare parts;
- staff capacity.

## 10. Transparency Page

### 10.1 Public Summary

Show:

- active needs;
- active accepted pledges;
- verified received donations;
- completed projects;
- last update date.

### 10.2 Donation Table

Recommended public columns:

| Date | Supporter | Contribution | Project | Quantity | Status |
|---|---|---|---|---:|---|

Only verified and approved public information should appear.

### 10.3 Methodology

Publish a short explanation of:

- what "pledged" means;
- what "received" means;
- what "verified" means;
- how remaining quantities are calculated.

## 11. Corrections and Disputes

### 11.1 Correction

If a quantity or name is wrong:

- correct the public value promptly;
- retain an internal audit record;
- explain material corrections when necessary.

### 11.2 Donor Recognition Removal

If a supporter asks to remove public recognition, follow the approved privacy and institutional policy while preserving required internal accounting/audit records.

## 12. Financial Support Boundary

### 12.1 V1 Rule

No online money collection.

### 12.2 Future Financial Module

Only after official approval should a future version consider:

- approved institutional account;
- official receipts;
- accounting integration;
- refund policy;
- procurement rules;
- audit;
- financial transparency;
- legal review.

## 13. Public-Library Independence

### 13.1 Acceptance Policy

The responsible authority should define conditions under which support may be declined.

Possible reasons:

- conflict with public mission;
- unsafe or unusable items;
- inappropriate conditions;
- excessive maintenance burden;
- unlawful content or arrangement;
- misleading promotional requirements.

### 13.2 Editorial Independence

A donor should not gain control over unrelated library content by providing support.

## 14. Research Basis

### 14.1 Public Library Independence

The IFLA-UNESCO Public Library Manifesto describes the public library as a publicly supported institution serving access, education, information, and community needs, and states that its collections and services should not be subject to commercial pressures.

Reference:
https://www.ifla.org/public-library-manifesto/

### 14.2 Transparency

Nonprofit transparency guidance commonly emphasises current contact information, clear organisational identity, and accessible public information for supporters.

Reference:
https://blog.candid.org/post/5-tips-to-make-your-nonprofits-candid-profile-stand-out-to-donors/

### 14.3 Privacy

IFLA privacy principles support minimising unnecessary user surveillance and protecting information-seeking privacy.

Reference:
https://www.ifla.org/publications/ifla-statement-on-privacy-in-the-library-environment/
