# Content Governance, SEO and Launch

## 1. Purpose

### 1.1 Objective

Define how official content is created, approved, translated, maintained, discovered, and safely launched.

## 2. Content Ownership

### 2.1 Institutional Content

The responsible library/public authority should own or control official:

- library profile;
- opening hours;
- services;
- contact information;
- needs;
- project claims;
- donor acknowledgements.

### 2.2 Technical Content

Technical maintainers may manage:

- code;
- deployment;
- metadata implementation;
- system configuration.

They should not invent official institutional claims.

## 3. Content Approval

### 3.1 Draft

Prepared by authorised staff/editor.

### 3.2 Review

Checked for:

- accuracy;
- privacy;
- permission;
- language quality;
- donor consent where relevant.

### 3.3 Approval

Approved by the designated content authority.

### 3.4 Publication

Published with:

- publication date;
- last-updated date;
- last-verified date for needs/projects where applicable.

## 4. Content Types

### 4.1 Evergreen

Examples:

- About;
- Services;
- Opening Hours;
- Contact.

Review at least when operational information changes.

### 4.2 Operational

Examples:

- Current Needs;
- Projects;
- Donation Status.

Require more frequent verification.

### 4.3 News

Time-based announcements and updates.

### 4.4 Transparency Records

Must remain historically traceable after completion.

## 5. Writing Style

### 5.1 Public Reader Style

Use:

- simple wording;
- short sections;
- descriptive headings;
- factual claims;
- concrete quantities.

### 5.2 Donor Style

Explain:

- problem;
- verified need;
- beneficiary group;
- requested support;
- remaining gap;
- verification;
- official contact.

### 5.3 Avoid

Avoid:

- emotional exaggeration;
- unverifiable statements;
- "guaranteed impact";
- political messaging;
- commercial endorsements;
- unnecessary jargon.

## 6. Multilingual Content

### 6.1 Source Language

For each content type, define an approved source language.

### 6.2 Translation

Translations should preserve meaning rather than mechanically mirror word order.

### 6.3 Status

A translation can have its own status:

- Draft;
- Reviewed;
- Published.

### 6.4 Missing Translation

Use a transparent fallback instead of publishing low-quality machine translation as official text.

## 7. Media Governance

### 7.1 Every Public Image Needs

- permission status;
- descriptive alt text when meaningful;
- owner/source note;
- caption where useful.

### 7.2 Before/After Photos

Useful for impact reporting, but must avoid exposing people unnecessarily.

### 7.3 Donor Logos

Publish only with permission and approved usage.

## 8. SEO

### 8.1 Page Titles

Use specific titles.

Example:

```text
Current Library Needs | Sevanagala Public Library
```

### 8.2 Descriptions

Write factual summaries for search engines and social sharing.

### 8.3 Sitemap

Generate sitemap.xml.

### 8.4 Robots

Use robots configuration so staging/admin/private routes are not indexed.

### 8.5 Canonical URLs

Use canonical URLs for public content.

## 9. Structured Data

### 9.1 Organisation Data

After official approval, consider appropriate schema.org structured data for the library/organisation.

### 9.2 Article Data

News content may use suitable article structured data.

### 9.3 Accuracy

Structured data must match visible public content.

## 10. Social Sharing

### 10.1 Open Graph

Provide:

- title;
- description;
- approved image;
- canonical link.

### 10.2 Sensitive Pages

Do not generate public previews for private/admin content.

## 11. Public Launch Gates

### 11.1 Institutional Approval

Confirm:

- official name;
- official branding;
- domain;
- contact;
- website ownership;
- responsible administrator.

### 11.2 Content Approval

Confirm:

- Home;
- About;
- Services;
- Opening Hours;
- Contact;
- Privacy;
- Accessibility;
- Current Needs methodology.

### 11.3 Security

Confirm the production-security checklist.

### 11.4 Accessibility

Complete:

- keyboard review;
- colour contrast review;
- zoom/text resize review;
- forms review;
- screen-reader spot checks.

### 11.5 Data Quality

Verify:

- need totals;
- pledge totals;
- received totals;
- project status;
- donor names;
- links.

## 12. Soft Launch

### 12.1 Audience

First allow:

- library staff;
- responsible authority;
- selected reviewers.

### 12.2 Purpose

Find:

- wrong content;
- confusing navigation;
- missing translations;
- broken links;
- permission issues;
- mobile problems.

## 13. Public Launch

### 13.1 Launch Checklist

- production domain;
- HTTPS;
- approved content;
- backup;
- monitoring;
- admin accounts;
- privacy notice;
- verified contact route; enable a website submission form only after privacy, validation, abuse controls and operational ownership are reviewed;
- sitemap;
- analytics if approved.

### 13.2 Announcement

Use approved library/community channels.

## 14. Post-Launch Maintenance

### 14.1 Weekly / Operational

Review:

- enquiries;
- pending pledges;
- urgent content corrections.

### 14.2 Monthly

Review:

- active needs;
- completed support;
- stale project updates;
- broken links;
- admin accounts.

### 14.3 Quarterly

Review:

- permissions;
- security dependencies;
- privacy;
- accessibility issues;
- backup recovery readiness.

## 15. Donor Outreach Integration

### 15.1 Proposal Links

International proposals should link directly to:

- relevant need;
- project;
- transparency page;
- official contact.

### 15.2 Campaign-Specific Landing Page

If useful, create a page for a defined project rather than sending donors to a generic homepage.

### 15.3 UTM / Analytics

Only use campaign tracking if privacy and analytics policy approve it.

## 16. Research Basis

### 16.1 Next.js Metadata

Next.js supports page metadata and sitemap-related patterns for discoverability.

Reference:
https://nextjs.org/docs

### 16.2 Accessibility

WCAG 2.2:
https://www.w3.org/TR/WCAG22/

### 16.3 Public Library Mission

IFLA-UNESCO Public Library Manifesto:
https://www.ifla.org/public-library-manifesto/
