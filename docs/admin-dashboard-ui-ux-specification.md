# Admin Dashboard UI and UX Specification

## 1. Purpose

### 1.1 Objective

Define the visual structure, task hierarchy, interaction patterns, and safety rules for the future staff administration interface.

The admin dashboard is an operational tool, not a public marketing page.

## 2. Design Principles

### 2.1 Task First

The first screen should answer:

- What needs attention?
- What changed recently?
- What is waiting for approval?
- What can this staff member do next?

### 2.2 Role Aware

Navigation and actions should reflect the signed-in user's permissions.

Do not show controls that a user cannot use unless there is a clear explanatory reason.

### 2.3 Safe by Default

New public-facing records should start as Draft.

High-impact actions require:

- clear labels;
- confirmation;
- permission checks;
- audit logging.

### 2.4 Dense but Readable

Admin pages may be denser than the public site, but should still preserve:

- readable typography;
- adequate spacing;
- clear grouping;
- large enough touch targets;
- strong focus states.

## 3. Admin Information Architecture

### 3.1 Primary Navigation

Recommended sections:

- Dashboard
- Needs
- Projects
- Pledges
- Donations
- Partners
- Books
- Book Requests
- News
- Media
- Users
- Audit Log
- Settings

### 3.2 Role-Based Reduction

A content editor may see only:

- Dashboard
- News
- Media

A collection manager may see:

- Dashboard
- Books
- Book Requests

A library administrator may see most operational sections.

## 4. Dashboard Home

### 4.1 Priority Summary

Recommended cards:

- Active Needs
- Needs Requiring Review
- Accepted Pledges
- Donations Awaiting Verification
- Active Projects
- Book Requests
- Draft Content
- Unread Enquiries

### 4.2 Attention Queue

The most important dashboard section is an attention queue.

Examples:

- donation awaiting verification;
- need not verified recently;
- pledge close to expiry;
- draft waiting for approval;
- failed book import.

### 4.3 Recent Activity

Show recent operational events such as:

- need updated;
- donation verified;
- project status changed;
- article published.

Do not expose sensitive personal details unnecessarily in activity summaries.

## 5. Navigation Pattern

### 5.1 Desktop

Use a persistent side navigation when space allows.

### 5.2 Mobile

Use a compact menu/drawer pattern.

### 5.3 Current Location

The current admin section should always be visually obvious.

## 6. Table Pattern

### 6.1 When to Use Tables

Use tables for structured operational records such as:

- needs;
- pledges;
- donations;
- books;
- users.

### 6.2 Table Columns

Only show fields useful for scanning and decisions.

Move secondary details to the record page.

### 6.3 Mobile

On small screens:

- prioritise important columns;
- allow controlled horizontal scrolling when necessary;
- consider stacked record cards for complex datasets.

## 7. Status Pattern

### 7.1 Text First

Every status includes visible text.

### 7.2 Semantic Colors

Use the canonical status colors from the visual system.

### 7.3 Consistency

The same status name must have the same meaning in:

- lists;
- detail pages;
- public pages;
- reports.

## 8. Record Detail Pattern

### 8.1 Header

Show:

- record name;
- ID/reference;
- status;
- last updated;
- main permitted action.

### 8.2 Main Content

Group information into:

- public information;
- operational data;
- internal notes;
- evidence;
- activity history.

### 8.3 Public Preview

Where relevant, staff should be able to preview how approved content will appear publicly.

## 9. Form Pattern

### 9.1 Structure

Long forms should use logical sections.

### 9.2 Labels

Use persistent visible labels.

### 9.3 Help Text

Explain unusual fields before the user makes an error.

### 9.4 Validation

Show field-level errors and a top summary for long forms when appropriate.

### 9.5 Save State

Clearly show:

- Unsaved
- Saving
- Saved
- Failed to save

if autosave is introduced.

## 10. Approval Workflow

### 10.1 States

Recommended content states:

Draft → Review → Approved → Published → Archived

### 10.2 Reviewer View

Reviewer should see:

- what changed;
- who changed it;
- public preview;
- permission/evidence flags;
- Approve;
- Request Changes.

## 11. Donation Verification UX

### 11.1 Receipt Screen

Show:

- supporter;
- pledge reference;
- expected quantity;
- received quantity;
- condition;
- evidence;
- date received.

### 11.2 Verification

Verifier should confirm the actual received quantity explicitly.

### 11.3 Mismatch

If actual quantity differs from pledge, require a clear reconciliation step.

## 12. Book Import UX

### 12.1 Import Flow

Upload → Map Fields → Validate → Preview → Approve → Import → Reconcile

### 12.2 Preview

Show:

- valid records;
- warnings;
- rejected records;
- likely duplicates.

### 12.3 No Silent Merge

Uncertain duplicate records must not be merged automatically.

## 13. Destructive Actions

### 13.1 Examples

- archive need;
- disable user;
- remove public media;
- cancel pledge.

### 13.2 Confirmation

Confirmation should state:

- what will happen;
- whether it can be reversed;
- what public data changes.

## 14. Accessibility

### 14.1 Keyboard

All admin tasks should be keyboard operable.

### 14.2 Focus

Focus must remain visible through menus, dialogs, tables, and forms.

### 14.3 Target Size

Major actions should generally use targets around 44px or larger.

### 14.4 Errors

Do not use color alone.

## 15. Admin Visual Language

### 15.1 Relationship to Public Site

Use the same:

- typography;
- semantic colors;
- spacing system;
- status colors;
- focus treatment.

### 15.2 Difference

Admin UI can use:

- denser layouts;
- more tables;
- more metadata;
- side navigation;
- compact controls.

## 16. Prototype Boundary

### 16.1 Static Preview

Before authentication is implemented, any admin preview must:

- use sample data only;
- contain no real private information;
- perform no real writes;
- be clearly labelled as a UI preview.

### 16.2 Production Admin

The real `/admin` route must be protected by authentication and server/database authorisation.

## 17. Acceptance Criteria

### 17.1 Dashboard

A staff user should understand within a few seconds:

- what requires attention;
- where to manage each record type;
- which actions are available.

### 17.2 Record Pages

Important status and verification information must be visible without scrolling through unrelated content.

### 17.3 Safety

No destructive or publication-sensitive action should look like an ordinary low-risk navigation action.
