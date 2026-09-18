# Users, Roles and Permissions

## 1. Purpose

### 1.1 Objective

Define who can view, create, edit, approve, publish, or administer content.

The model follows least privilege: every user receives only the access required for their role.

## 2. User Groups

### 2.1 Public Visitor

No login required.

Can:

- view public pages;
- view public needs;
- view public project progress;
- view public partner acknowledgements;
- use approved public search;
- submit approved enquiry forms.

Cannot:

- edit data;
- view private donor negotiations;
- view staff-only documents;
- access personal member data.

### 2.2 Library Content Editor

Can:

- draft news;
- edit approved informational pages;
- upload approved media;
- prepare book/resource updates.

Cannot:

- manage users;
- change security settings;
- mark donations as verified unless granted a separate permission;
- publish sensitive changes without approval if approval workflow is enabled.

### 2.3 Collection Manager

Can:

- maintain book categories;
- add catalogue records;
- update book condition;
- manage requested-book data;
- mark books for review.

Cannot:

- permanently delete collection records without an authorised review process;
- change donor or system administration data.

### 2.4 Development / Needs Manager

Can:

- create needs;
- edit quantities;
- connect needs to projects;
- record supporting notes;
- submit needs for publication.

Cannot:

- verify receipt of a donation unless separately authorised;
- manage system security.

### 2.5 Donation / Partnership Manager

Can:

- record donor enquiries;
- record pledges;
- maintain partner records;
- attach permission for public recognition;
- prepare acknowledgement content.

Cannot:

- mark an item received without evidence and authorised verification;
- publish a donor logo without consent.

### 2.6 Content Approver

Can:

- review draft changes;
- approve or reject publication;
- verify public wording;
- check whether permissions and evidence exist.

### 2.7 Library Administrator

Can:

- manage most operational content;
- assign approved operational roles;
- verify records where policy permits;
- manage site settings that do not expose infrastructure secrets;
- review audit logs.

### 2.8 Technical Administrator

Can:

- manage deployment;
- manage environment configuration;
- manage database migrations;
- respond to incidents;
- manage technical integrations.

Technical administrators should not automatically receive authority to approve public institutional statements.

## 3. Separation of Duties

### 3.1 Principle

Where practical, the person who records a donation should not be the only person who verifies and publishes it as received.

### 3.2 Donation Example

Recommended flow:

1. Donation Manager records pledge.
2. Staff receive item.
3. Authorised verifier confirms quantity and condition.
4. System changes status to Received or Verified.
5. Public acknowledgement is published if approved.

### 3.3 Project Completion

A project should only become Completed after:

- required work is complete;
- final evidence is recorded;
- an authorised user confirms completion.

## 4. Permission Matrix

### 4.1 Core Matrix

| Action | Public | Editor | Collection Manager | Needs Manager | Partnership Manager | Approver | Admin | Technical Admin |
|---|---|---|---|---|---|---|---|---|
| View public content | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Draft news | No | Yes | No | Optional | Optional | Yes | Yes | No |
| Publish news | No | Limited | No | No | No | Yes | Yes | No |
| Add books | No | No | Yes | No | No | No | Yes | No |
| Edit needs | No | No | No | Yes | No | Yes | Yes | No |
| Record pledge | No | No | No | Optional | Yes | Yes | Yes | No |
| Verify receipt | No | No | No | Limited | Limited | Yes | Yes | No |
| Manage partner recognition | No | No | No | No | Yes | Yes | Yes | No |
| Manage users | No | No | No | No | No | No | Yes | Limited |
| Database migration | No | No | No | No | No | No | No | Yes |
| View audit logs | No | No | No | Limited | Limited | Yes | Yes | Technical |

Final permissions must be approved by the library's responsible authority.

## 5. Authentication

### 5.1 Staff Login

Use managed authentication.

Requirements:

- unique staff account per person;
- no shared passwords;
- strong passwords;
- email verification where appropriate;
- MFA for administrators when supported;
- session expiry;
- account disable workflow.

### 5.2 Service Accounts

Service accounts must:

- be documented;
- have minimum required access;
- use server-side secrets;
- never be exposed in browser code.

## 6. Authorisation

### 6.1 Database Enforcement

Authorisation must not rely only on hiding buttons in the interface.

Database rules must enforce access.

### 6.2 Row Level Security

If Supabase is used, exposed tables must use Row Level Security and least-privilege grants.

### 6.3 Public Data

Unauthenticated access should only expose fields intentionally designed for public publication.

### 6.4 Private Data

Examples of staff-only data:

- internal notes;
- personal contact details not approved for publication;
- unpublished donor discussions;
- audit records;
- security events;
- draft content.

## 7. Publishing Workflow

### 7.1 Draft

Content is being prepared and is not publicly visible.

### 7.2 Review

Content is ready for an authorised reviewer.

### 7.3 Approved

Content has institutional approval but may still be scheduled.

### 7.4 Published

Content is publicly visible.

### 7.5 Archived

Content remains part of history but is not an active current item.

## 8. High-Risk Actions

### 8.1 Actions Requiring Stronger Controls

Examples:

- deleting records;
- changing user roles;
- publishing bank/payment information;
- changing donation quantities after verification;
- replacing official contact details;
- exporting personal data;
- altering audit retention;
- changing infrastructure secrets.

### 8.2 Confirmation

High-risk actions should require:

- explicit confirmation;
- authorisation check;
- audit event;
- reason where relevant.

## 9. Audit Requirements

### 9.1 Events to Record

Record:

- login and failed login events where available;
- role changes;
- publication actions;
- donation status changes;
- project status changes;
- deletion or archival;
- security-sensitive configuration changes.

### 9.2 Audit Fields

Recommended:

- actor;
- action;
- entity type;
- entity ID;
- timestamp;
- old status;
- new status;
- reason where applicable.

Avoid logging secrets or unnecessary personal data.

## 10. Account Lifecycle

### 10.1 Create

Account creation requires an authorised request.

### 10.2 Change Role

Role changes must be recorded.

### 10.3 Staff Departure

Access should be disabled promptly when a user no longer requires it.

### 10.4 Dormant Accounts

Dormant privileged accounts should be reviewed periodically.

## 11. Research Basis

### 11.1 OWASP

OWASP ASVS 5.0 emphasises documented authorisation rules, least privilege, and security logging.

References:
https://owasp.org/projects/asvs/
https://github.com/OWASP/ASVS/blob/master/5.0/en/0x17-V8-Authorization.md

### 11.2 Supabase

Supabase recommends combining grants and Row Level Security, with policies tested for unauthenticated and authenticated roles.

Reference:
https://supabase.com/docs/guides/database/postgres/row-level-security
