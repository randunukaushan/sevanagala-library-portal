# Risk Register and Mitigation Plan

## 1. Purpose

### 1.1 Objective

Identify major project risks and define practical mitigations before they become problems.

## 2. Governance Risks

### 2.1 Unclear Official Approval

Risk:
Website is built but cannot be launched officially.

Mitigation:

- obtain written approval;
- identify approving authority;
- keep prototype clearly unofficial until approval.

### 2.2 Ownership Depends on One Person

Risk:
Website becomes inaccessible if the volunteer leaves.

Mitigation:

- institutional account ownership;
- multiple authorised admins;
- handover plan.

## 3. Donor Risks

### 3.1 Duplicate Support

Risk:
Two donors fulfil the same requirement.

Mitigation:

- live pledge tracker;
- accepted-pledge status;
- last-verified date.

### 3.2 Unusable Donations

Risk:
Old or incompatible equipment creates cost.

Mitigation:

- minimum specification;
- acceptance review;
- maintenance check.

### 3.3 Misleading Recognition

Risk:
Acknowledgement appears to endorse donor.

Mitigation:

- neutral recognition policy;
- consent;
- no promotional promises.

## 4. Data Risks

### 4.1 Incorrect Quantities

Mitigation:

- verification;
- audit log;
- correction workflow.

### 4.2 Poor Collection Data

Mitigation:

- staged import;
- validation;
- librarian review.

### 4.3 Personal Data Exposure

Mitigation:

- minimisation;
- RLS;
- public/private separation;
- permission review.

## 5. Security Risks

### 5.1 Compromised Admin Account

Mitigation:

- unique accounts;
- MFA;
- least privilege;
- disable departed users.

### 5.2 Secret Leakage

Mitigation:

- environment variables;
- secret scan;
- rotation.

### 5.3 Unsafe File Upload

Mitigation:

- type/size validation;
- private storage;
- publication approval.

## 6. Operational Risks

### 6.1 Staff Cannot Maintain Site

Mitigation:

- simple admin UI;
- training;
- handbook;
- limited workflows.

### 6.2 Stale Website

Mitigation:

- review schedule;
- stale-content alerts;
- named content owner.

### 6.3 Cost Growth

Mitigation:

- monitor usage;
- low-cost architecture;
- upgrade only when justified.

## 7. Infrastructure Risks

### 7.1 Poor Internet

Mitigation:

- lightweight public pages;
- caching;
- approved manual continuity procedures for essential information; do not assume the web app or circulation system supports offline transactions.

### 7.2 Power Problems

Mitigation:

- safe electrical planning;
- UPS where justified;
- equipment shutdown procedure.

## 8. Project Risks

### 8.1 Scope Creep

Risk:
Trying to build a full library system immediately.

Mitigation:

- V1 scope;
- phased roadmap;
- documented non-goals.

### 8.2 Premature Coding

Risk:
Building features before staff needs are confirmed.

Mitigation:

- requirements first;
- prototype with sample data;
- validate with staff.

## 9. Reputational Risks

### 9.1 Unverified Claims

Mitigation:

- approval workflow;
- evidence;
- corrections.

### 9.2 Donor Dispute

Mitigation:

- documented pledge;
- consent;
- clear status language.

## 10. Risk Register Fields

### 10.1 Recommended

Track:

- risk;
- category;
- likelihood;
- impact;
- owner;
- mitigation;
- status;
- review date.

## 11. Review Cycle

### 11.1 During Development

Review at major phase boundaries.

### 11.2 After Launch

Review quarterly or after a significant incident.
