# Testing, Quality Assurance and Acceptance

## 1. Purpose

### 1.1 Objective

Define how the portal is tested before features are accepted and before public launch.

## 2. Quality Goals

### 2.1 Correctness

The website must display accurate:

- needs;
- donation status;
- remaining quantities;
- library information.

### 2.2 Security

Unauthorised users must not gain admin or private-data access.

### 2.3 Accessibility

Target WCAG 2.2 AA.

### 2.4 Performance

Public pages should work well on mobile and slower connections.

## 3. Test Layers

### 3.1 Unit Tests

Test:

- calculations;
- status transitions;
- validation;
- formatting;
- permission helpers.

### 3.2 Integration Tests

Test:

- database;
- RLS;
- storage;
- authentication;
- donation workflow;
- contact submission denial while public writes are disabled; validate successful form submission only after an approved anti-abuse/privacy path exists.

### 3.3 End-to-End Tests

Critical journeys:

- visitor views need;
- donor uses an approved enquiry path (currently disabled; until enabled, public direct writes remain denied);
- staff records pledge;
- verifier confirms receipt;
- public remaining quantity updates;
- editor publishes news.

## 4. Donor Workflow Tests

### 4.1 Required Cases

Test:

- pledge accepted;
- pledge cancelled;
- pledge expires;
- partial receipt;
- full receipt;
- over-delivery;
- correction;
- duplicate prevention.

## 5. Needs Calculation Tests

### 5.1 Core Formula

Ensure one contribution is not counted in both active pledge and verified receipt.

### 5.2 Boundaries

Remaining must never display a negative value.

## 6. Role Tests

### 6.1 Public User

Cannot access private admin data.

### 6.2 Editor

Cannot change privileged security settings.

### 6.3 Admin

Can perform only documented admin actions.

## 7. Accessibility Testing

### 7.1 Automated

Run automated checks in CI where practical.

### 7.2 Manual

Test:

- keyboard;
- focus;
- labels;
- error messages;
- zoom;
- screen-reader spot checks.

## 8. Responsive Testing

### 8.1 Devices

Test representative:

- small Android phone;
- larger phone;
- tablet;
- desktop.

## 9. Browser Testing

### 9.1 Minimum

Test current major versions of:

- Chrome;
- Edge;
- Firefox;
- Safari where practical.

## 10. Performance Testing

### 10.1 Public Pages

Review:

- image size;
- bundle size;
- loading;
- Core Web Vitals where useful.

## 11. Security Testing

### 11.1 Required

Check:

- admin route protection;
- RLS;
- file access;
- upload restrictions;
- secret exposure;
- dependency vulnerabilities.

## 12. Content QA

### 12.1 Verify

Before publishing:

- names;
- quantities;
- donor consent;
- links;
- contact details;
- dates;
- translations.

## 13. User Acceptance Testing

### 13.1 Library Staff

Staff should test:

- add need;
- update quantity;
- record donation;
- publish update;
- edit book request.

For an approved circulation pilot, test with synthetic members and copies before real data. Observe staff completing member lookup, issue, return and common error recovery on the actual device/scanner setup. Include missing barcode/manual lookup, inactive member, unavailable copy, blocked policy, duplicate/concurrent checkout, network interruption/retry, permission denial and returned-damaged exception. Confirm the public catalogue never reveals borrower identity and audit records attribute staff actions without unnecessary personal details.

### 13.2 Acceptance

Feature is accepted when:

- staff can complete task;
- errors are understandable;
- permissions behave correctly;
- data remains accurate.

## 14. Pre-Launch Acceptance Checklist

### 14.1 Product

- core pages complete;
- navigation complete;
- mobile usable.

### 14.2 Security

- privileged access tested;
- secrets checked;
- backups configured.

### 14.3 Accessibility

- keyboard tested;
- focus tested;
- contrast reviewed.

### 14.4 Data

- public numbers verified;
- donor names approved;
- official contacts verified.

## 15. Regression

### 15.1 Rule

Bug fixes for critical logic should add regression tests.

## 16. Definition of Done

### 16.1 Feature

A feature is done only when:

- code complete;
- tests pass;
- accessibility reviewed;
- error states handled;
- docs updated;
- staff acceptance completed where required.
