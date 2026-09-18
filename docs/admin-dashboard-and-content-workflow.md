# Admin Dashboard and Content Workflow

## 1. Purpose

### 1.1 Objective

Design a staff interface that makes the portal maintainable without requiring staff to edit source code.

## 2. Dashboard Principles

### 2.1 Simple First

Staff should see only actions relevant to their role.

### 2.2 Safe Defaults

New public-facing records should default to Draft.

### 2.3 Clear Status

Every item should show:

- current status;
- last updated;
- last verified where relevant;
- who is responsible.

### 2.4 Mobile Usability

Basic staff actions should work on a phone, although bulk inventory work is better suited to a computer.

## 3. Dashboard Home

### 3.1 Summary Cards

Recommended:

- Active Needs
- Needs Requiring Verification
- Accepted Pledges
- Donations Awaiting Verification
- Active Projects
- Book Requests
- Draft News
- Unread Enquiries

### 3.2 Alerts

Examples:

- need not verified recently;
- pledge expired;
- project update overdue;
- contact message awaiting response;
- media permission missing;
- book import error.

## 4. Need Management

### 4.1 List View

Columns:

- title;
- category;
- target;
- pledged;
- verified received;
- remaining;
- priority;
- status;
- last verified.

### 4.2 Create Need

Form sections:

- identity;
- purpose;
- quantity;
- specification;
- priority;
- project;
- public content;
- supporting media;
- approval.

### 4.3 Update Quantity

Quantity changes should:

- validate values;
- require authorisation;
- generate audit event;
- prevent negative remaining values.

## 5. Project Management

### 5.1 Project Editor

Staff can manage:

- title;
- problem;
- objective;
- beneficiaries;
- needs;
- milestones;
- updates;
- status;
- media.

### 5.2 Project Completion

Completion action should show a checklist:

- milestones complete;
- outstanding pledges reviewed;
- received items verified;
- final update prepared;
- public impact evidence approved.

## 6. Donor and Pledge Management

### 6.1 Enquiry Inbox

Allow staff to:

- view;
- assign;
- respond outside system or via future integration;
- link enquiry to need/project;
- mark resolved;
- apply retention rules.

### 6.2 Supporter Record

Separate:

- private contact details;
- public recognition details.

### 6.3 Pledge Entry

Fields:

- supporter;
- related need;
- quantity;
- description;
- expected date;
- expiry;
- status;
- internal notes.

### 6.4 Receipt Workflow

When goods arrive:

1. Select pledge or create direct donation.
2. Record received quantity.
3. Upload approved evidence.
4. Send to verification.
5. Verifier confirms.
6. Public counters update.

## 7. Partner Recognition

### 7.1 Recognition Consent

Before publication, store whether the supporter has approved:

- public name;
- logo;
- website link;
- contribution description;
- photograph.

### 7.2 Preview

Approver should preview the public acknowledgement before publishing.

## 8. Book Management

### 8.1 Book Requests

Dashboard features:

- exact-title requests;
- category requests;
- request counts;
- priority;
- donor-match status.

### 8.2 Inventory

Later phase:

- add/edit record;
- bulk import;
- condition;
- review status;
- category;
- language;
- copy count.

### 8.3 Review Queue

Allow staff to filter:

- damaged;
- outdated-review;
- replacement recommended;
- missing metadata.

## 9. News and Content

### 9.1 Editor

Support:

- title;
- body;
- language versions;
- featured image;
- alt text;
- publish date;
- draft/review/published status.

### 9.2 Content Review

Workflow:

Draft → Review → Approved → Published → Archived.

### 9.3 Content Preview

Staff should be able to preview:

- desktop;
- mobile;
- language version.

## 10. Media Library

### 10.1 Media Fields

Each media asset should include:

- file;
- description;
- alt text;
- permission status;
- copyright/owner note;
- visibility.

### 10.2 Child and Person Images

Images of identifiable people, especially children, require an approved permission process before publication.

### 10.3 Sensitive Documents

Do not put internal letters or donor evidence into a public bucket by default.

## 11. Users and Roles

### 11.1 User List

Admins can:

- invite authorised user;
- disable account;
- assign role;
- review status.

### 11.2 Role Changes

Require:

- confirmation;
- audit record.

### 11.3 No Shared Accounts

Each staff user should have an individual account.

## 12. Audit Log

### 12.1 Filters

Filter by:

- user;
- entity type;
- action;
- date.

### 12.2 Important Events

Highlight:

- role changes;
- donation verification;
- quantity corrections;
- deletions/archives;
- publish actions.

## 13. Import Tools

### 13.1 CSV Import

Useful for:

- book inventory;
- book requests;
- category stats.

### 13.2 Import Preview

Before committing:

- show valid rows;
- show invalid rows;
- show duplicates;
- allow download of error report.

### 13.3 Transaction Safety

Bulk import should fail safely or clearly report partial success.

## 14. Form Design

### 14.1 Validation

Forms should:

- show clear required fields;
- use human-readable errors;
- preserve user input after validation error;
- avoid only-colour error indicators.

### 14.2 Accessibility

Keyboard navigation, focus order, labels, status messages, and target sizes must meet the accessibility plan.

## 15. Admin Security

### 15.1 Route Protection

Admin pages require authenticated and authorised sessions.

### 15.2 Server Checks

Every sensitive action requires server/database authorisation, not only frontend checks.

### 15.3 CSRF and Input Safety

Use framework-appropriate protections and validate all inputs.

### 15.4 File Upload Safety

Limit type and size and keep public/private storage separate.

## 16. Reporting

### 16.1 Operational Reports

Possible reports:

- active needs;
- fulfilled needs;
- donations by period;
- project status;
- book request demand;
- inventory review queue.

### 16.2 Public Report Export

A later feature may generate approved public impact summaries.

## 17. Definition of Done for Admin Features

### 17.1 Feature Checklist

An admin feature is not complete until:

- permission rules work;
- validation works;
- mobile layout is usable;
- audit event is recorded where required;
- error states are handled;
- accessibility is tested;
- tests cover critical state changes.
