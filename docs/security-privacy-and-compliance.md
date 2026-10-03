# Security, Privacy and Compliance

## 1. Purpose

### 1.1 Objective

Define baseline security, privacy, data-protection, and operational controls for the portal.

This document is an engineering specification, not legal advice. Final public-sector compliance decisions must be confirmed by the responsible authority.

## 2. Security Goals

### 2.1 Confidentiality

Protect:

- staff accounts;
- private donor contact details;
- internal notes;
- unpublished documents;
- infrastructure secrets;
- audit information.

### 2.2 Integrity

Prevent unauthorised changes to:

- donation quantities;
- project status;
- need quantities;
- partner recognition;
- public contact information;
- user roles.

### 2.3 Availability

The public website should remain available and recoverable from ordinary failures.

### 2.4 Accountability

Sensitive administrative actions should be attributable to an authorised account.

## 3. Privacy Principles

### 3.1 Data Minimisation

Only collect personal data necessary to provide a defined service.

### 3.2 Purpose Limitation

Each form should explain why information is collected.

### 3.3 Retention

Define retention periods for:

- general enquiries;
- partnership enquiries;
- admin logs;
- audit records;
- media permissions.

Do not keep personal information indefinitely by default.

### 3.4 Public Disclosure

Do not publish personal information merely because it exists in the database.

## 4. Sri Lanka Data Protection Context

### 4.1 PDPA

The design should comply with applicable requirements of Sri Lanka's Personal Data Protection Act No. 9 of 2022, as amended.

### 4.2 Current Legal Sources

The Data Protection Authority publishes:

- the principal Act;
- the Personal Data Protection (Amendment) Act No. 22 of 2025;
- gazettes;
- public-sector guidance;
- current notices and regulations.

Because the legal framework can change, implementation should re-check the DPA website before production launch.

Reference:
https://www.dpa.gov.lk/guidelines.php

### 4.3 Public-Sector Classification

The responsible authority should confirm the legal controller/processor roles for the library website, especially if the library is administered by a local authority.

## 5. Personal Data Inventory

### 5.1 Expected V1 Personal Data

Likely fields:

- contact name;
- email;
- phone if required;
- organisation;
- staff account identity;
- donor contact details;
- message content.

### 5.2 Data Not Required in V1

Do not collect unless separately approved:

- national ID numbers;
- detailed member reading history;
- student profiles;
- precise behavioural tracking;
- payment-card data;
- unnecessary date of birth;
- unnecessary location tracking.

## 6. Contact Forms

### 6.1 Minimal Fields

Recommended:

- name;
- organisation optional;
- email;
- country optional for international partnership;
- subject;
- message;
- related need/project optional.

### 6.2 Privacy Notice

At submission, explain:

- who receives the information;
- purpose;
- retention approach;
- how to contact the responsible organisation.

### 6.3 Spam Protection

Use privacy-conscious anti-spam controls.

Avoid excessive tracking solely for spam prevention.

The prototype has no live public contact form. Direct anonymous and
authenticated inserts into `contact_messages` remain disabled until a
validated submission path, abuse controls, privacy notice, and operational
review are in place.

## 7. Authentication Security

### 7.1 Managed Authentication

Use Supabase Auth or equivalent managed authentication.

### 7.2 Passwords

Never store application passwords in custom plaintext or reversible form.

### 7.3 MFA

Enable MFA for privileged accounts when operationally practical.

### 7.4 Shared Accounts

Prohibit shared staff logins.

### 7.5 Session Security

Use secure session management and re-authentication for high-risk actions where appropriate.

### 7.6 First Administrator Provisioning

The former public first-administrator setup and `claim_first_admin` RPC are
retired. The first administrator must be provisioned by an authorised project
owner in Supabase, never by a public web form or a hash embedded in a migration.
The owner must verify the person's identity and email, confirm that no active
administrator already exists, and record who authorised the change. Create an
individual Supabase Auth user with email confirmation and MFA, then activate
only that verified user's `profiles` row and assign the `library_admin` role
through the protected database administration interface. Do not put credentials,
bootstrap hashes, or reusable activation tokens in source control or public
environment variables. If identity or approval is uncertain, leave the account
pending.

## 8. Authorisation Security

### 8.1 Least Privilege

Users receive only required permissions.

### 8.2 Database Enforcement

RLS/database grants must enforce permissions.

### 8.3 Deny by Default

Sensitive tables should not be publicly readable unless explicitly designed for public access.

### 8.4 Server-Side Secrets

Secret/service-role keys stay server-side.

### 8.5 Project Publication Boundary

Staff with `projects.manage` may edit only planned, unpublished projects.
Changes to published projects and publication itself require the separate
`projects.publish` permission. Enforce this in database RLS, not only in the
admin interface.

## 9. Application Security

### 9.1 Baseline Standard

Use OWASP ASVS 5.0 as a verification reference for important controls.

Reference:
https://owasp.org/projects/asvs/

### 9.2 Input Validation

Validate all:

- forms;
- route parameters;
- uploaded files;
- query/filter values;
- import files.

### 9.3 Output Safety

Use framework-safe rendering and avoid rendering untrusted HTML.

### 9.4 Security Headers

Production should configure suitable:

- HTTPS;
- Content-Security-Policy where practical;
- HSTS;
- X-Content-Type-Options;
- Referrer-Policy;
- frame protection;
- secure cookies.

Exact settings must be tested with the deployed application.

## 10. File Upload Security

### 10.1 Validation

Validate:

- MIME type;
- extension;
- size;
- authorisation.

### 10.2 Storage

Separate public and private files.

### 10.3 Media Permission

A file is not publishable simply because it was uploaded.

Store approval/permission status.

### 10.4 Sensitive Files

Do not expose:

- donor private letters;
- identity documents;
- internal quotations;
- private evidence;
- system exports.

## 11. Child and Community Privacy

### 11.1 Images

Do not publish identifiable images of children without the required permission process.

### 11.2 Names

Avoid unnecessarily pairing a child's name with photographs or educational details.

### 11.3 Reader Requests

Publish aggregate demand rather than requester identities.

## 12. Logging and Audit

### 12.1 Security Events

Log appropriate events such as:

- authentication failures;
- role changes;
- failed authorisation;
- critical status changes;
- unexpected security errors.

### 12.2 Do Not Log

Never log:

- passwords;
- access tokens;
- full secrets;
- unnecessary personal message content.

### 12.3 Protection

Audit/security logs should have restricted access and retention rules.

## 13. Secrets Management

### 13.1 Repository Rule

Never commit:

- database passwords;
- service-role keys;
- API secrets;
- private tokens;
- production credentials.

### 13.2 Environment Variables

Secrets belong in environment configuration.

Only values intentionally safe for browser exposure may use public frontend environment-variable prefixes.

### 13.3 Rotation

Rotate secrets after suspected exposure.

## 14. Dependency Security

### 14.1 Lockfile

Commit the package lockfile.

### 14.2 Updates

Review security updates regularly.

### 14.3 Minimal Dependencies

Avoid unnecessary packages.

### 14.4 Automated Checks

Use GitHub dependency/security tooling where available.

## 15. Backup and Recovery

### 15.1 Database Backup

Configure production backups.

### 15.2 Recovery Procedure

Document:

- who can restore;
- how to restore;
- how to verify restored data.

### 15.3 Media Backup

Critical approved evidence should not depend on one unverified storage copy.

## 16. Incident Response

### 16.1 Examples

Incident types:

- compromised admin account;
- exposed secret;
- accidental public file;
- incorrect donor data;
- website defacement;
- lost database data.

### 16.2 Immediate Actions

Depending on incident:

- disable affected account;
- revoke/rotate secret;
- remove public exposure;
- preserve logs;
- notify responsible authority;
- restore from known-good state.

### 16.3 Documentation

Maintain a small incident log with:

- event;
- date/time;
- impact;
- action;
- resolution.

## 17. Accessibility as Risk Control

### 17.1 Target

WCAG 2.2 AA.

### 17.2 Forms

Accessible labels, errors, keyboard support, focus visibility, and sufficient target sizes are mandatory quality requirements.

## 18. Third-Party Services

### 18.1 Review Before Adding

Before adding analytics, chat widgets, embedded maps, social plugins, or other third-party services, review:

- data collected;
- cookies;
- international transfer;
- security;
- performance;
- necessity.

### 18.2 Analytics

Prefer privacy-conscious, minimal analytics.

The site should not require invasive user tracking to measure basic traffic.

## 19. Production Security Checklist

### 19.1 Before Launch

Confirm:

- HTTPS active;
- RLS enabled and tested;
- secrets not in source;
- admin routes protected;
- public/private buckets separated;
- contact-form validation;
- role tests;
- backup configured;
- privacy notice approved;
- dependency scan reviewed;
- error pages do not leak secrets;
- test accounts removed or disabled.

## 20. Research Basis

### 20.1 Data Protection Authority of Sri Lanka

Official DPA:
https://www.dpa.gov.lk/

Guidelines and legal documents:
https://www.dpa.gov.lk/guidelines.php

### 20.2 Supabase Security

https://supabase.com/docs/guides/database/postgres/row-level-security

https://supabase.com/docs/guides/security/product-security

### 20.3 OWASP

https://owasp.org/projects/asvs/

### 20.4 IFLA Privacy

https://www.ifla.org/publications/ifla-statement-on-privacy-in-the-library-environment/
