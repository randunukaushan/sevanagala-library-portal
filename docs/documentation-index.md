# Documentation Index

## 1. Purpose

### 1.1 Objective

This file defines the recommended reading order for the Sevanagala Public Library Portal documentation.

The documents move from product intent and institutional governance through donor operations, library operations, system design, quality, launch, and long-term smart-library development.

## 2. Product Foundation

### 2.1 Core Product Documents

- [Product Vision and Requirements](./product-vision-and-requirements.md)
- [Information Architecture and Sitemap](./information-architecture-and-sitemap.md)
- [Users, Roles and Permissions](./users-roles-and-permissions.md)
- [Institutional Approval and Governance](./institutional-approval-and-governance.md)

## 3. Donor and Partnership Operations

### 3.1 Donor System

- [Donor, Partner and Transparency Workflow](./donor-partner-and-transparency-workflow.md)
- [Donor Research and Outreach Strategy](./donor-research-and-outreach-strategy.md)
- [Partnerships and Funding CRM](./partnerships-and-funding-crm.md)
- [Needs, Projects and Asset Management](./needs-projects-and-asset-management.md)

## 4. Library Collection and Data

### 4.1 Collection Management

- [Library Collection and Book Management](./library-collection-and-book-management.md)
- [Library Member and Circulation Design](./library-member-and-circulation-design.md)
- [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md)
- [Data Import, Migration and Record Quality](./data-import-migration-and-record-quality.md)

## 5. Smart Library Development

### 5.1 Transformation Roadmap

- [Smart Library Development Roadmap](./smart-library-development-roadmap.md)
- [Smart Library Research and Integration Review](./smart-library-research-and-integration-review.md)
- [Sri Lankan Library Benchmark Research](./sri-lankan-library-benchmark-research.md)
- [Monaragala District Library Expansion Research](./monaragala-district-library-expansion-research.md)
- [Smart Library Current-State Gap Analysis](./smart-library-current-state-gap-analysis.md)
- [Staff AI Assistant Architecture](./staff-ai-assistant-architecture.md)

## 6. System Design

### 6.1 Architecture and Administration

- [Data Model and Database Design](./data-model-and-database-design.md)
- [Supabase Backend Foundation](./supabase-backend-foundation.md)
- [Supabase Auth Application Integration](./supabase-auth-application-integration.md)
- [Admin Dashboard and Content Workflow](./admin-dashboard-and-content-workflow.md)
- [Admin Operations Implementation](./admin-operations-implementation.md)
- [Admin Projects Implementation](./admin-projects-implementation.md)
- [Admin Dashboard UI and UX Specification](./admin-dashboard-ui-ux-specification.md)
- [Admin Screen Map and Workflows](./admin-screen-map-and-workflows.md)
- [Security, Privacy and Compliance](./security-privacy-and-compliance.md)
- [Security Audit Remediation](./security-audit-remediation.md)
- [UI, UX, Accessibility and Design System](./ui-ux-accessibility-and-design-system.md)
- [Visual Identity, Color and Typography](./visual-identity-color-and-typography.md)
- [UI and UX Page Patterns](./ui-ux-page-patterns.md)
- [Technical Architecture, Deployment and Operations](./technical-architecture-deployment-and-operations.md)

## 7. Quality and Operational Readiness

### 7.1 Quality Assurance

- [Testing, Quality Assurance and Acceptance](./testing-quality-assurance-and-acceptance.md)
- [Risk Register and Mitigation Plan](./risk-register-and-mitigation-plan.md)
- [Operations, Maintenance and Staff Handover](./operations-maintenance-and-staff-handover.md)

## 8. Publishing and Execution

### 8.1 Launch and Development

- [Content Governance, SEO and Launch](./content-governance-seo-and-launch.md)
- [Implementation Roadmap and Codex Workflow](./implementation-roadmap-and-codex-workflow.md)
- [Local Development and Codex Setup](./local-development-and-codex-setup.md)

## 9. Current Project Status

### 9.1 Documentation

The product, governance, donor, library-operations, technical, quality, and long-term development foundations are documented.

Koha practices have been researched as a reference for a proposed limited portal-native circulation workflow; this does not yet represent local authority approval or a live implementation.

### 9.2 Institutional Approval

Pending confirmation from the library or responsible authority for:

- official website permission;
- official branding;
- approved contacts;
- public photographs;
- domain ownership;
- donor-recognition policy;
- donation acceptance process;
- content approval process.

### 9.3 Library Data

Pending:

- verified library profile;
- current collection data;
- outdated/review-needed book data;
- reader-request data;
- facility and equipment needs;
- project priorities.

### 9.4 Development

The repository contains a public prototype and a protected Supabase-backed staff workspace; individual branches may include work not yet present on `main`. Implementation-status documents distinguish live backend workflows from static `/admin-preview` screens and unimplemented features.

Official publication must wait for required approval and verified content.

## 10. Documentation Rules

### 10.1 Source of Truth

The repository is the canonical source of truth for product and engineering decisions.

### 10.2 Heading Style

Documents use:

- `# Document Title`
- `## 1. Main Section`
- `### 1.1 Subsection`
- `#### Fourth-Level Heading Without Number`

Fourth-level headings are not numbered.

### 10.3 Filename Style

Document filenames use descriptive names without numeric prefixes.

### 10.4 Change Rule

If implementation decisions change, update the relevant document in the same change or before implementation is merged.

## 11. Next Documentation Updates

### 11.1 After Library Follow-Up

Update the documents with:

- confirmed official library details;
- approval status;
- responsible staff roles;
- verified book and collection data;
- verified facility needs;
- donor and partnership procedures.

### 11.2 Before Major Coding

Any unresolved requirement that changes data, security, permissions, donations, or institutional workflow must be documented before implementation.

### 11.3 Smart Library Next Gate

The current-state gap analysis and research documents are a desk-review baseline. Verify Sevanagala/Thanamalvila's LMS, system of record, member-data governance and circulation rules with an authorized representative before selecting standalone circulation or Koha integration.
