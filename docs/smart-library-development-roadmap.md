# Smart Library Development Roadmap

## 1. Purpose

### 1.1 Objective

Define a phased path from the current public library environment to a practical, sustainable smart library.

## 2. Roadmap Principles

### 2.1 Service Before Technology

Technology should solve real reader and staff problems.

### 2.2 Build in Phases

Do not buy equipment before:

- need is verified;
- infrastructure is ready;
- maintenance is planned;
- staff ownership exists.

### 2.3 Keep Costs Sustainable

Prefer systems the library can continue to operate after donor support ends.

## 3. Phase One — Collection Renewal

### 3.1 Goals

- identify high-demand gaps;
- review outdated material;
- replace important outdated reference books;
- add English resources;
- add O/L and A/L resources;
- add technology and future-skills books.

### 3.2 Outputs

- collection gap report;
- requested-book list;
- donor-ready category list;
- verified new arrivals.

## 4. Phase Two — Physical Environment

### 4.1 Goals

Improve:

- shelves;
- cabinets;
- tables;
- chairs;
- lighting;
- ventilation;
- reading comfort;
- accessibility.

### 4.2 Outputs

- room layout;
- furniture needs;
- infrastructure needs;
- safety review.

## 5. Phase Three — Connectivity

### 5.1 Goals

Introduce:

- reliable internet;
- secure Wi-Fi;
- staff network;
- public network.

### 5.2 Controls

Plan:

- acceptable use;
- network separation;
- router/firewall;
- access-point coverage;
- maintenance;
- recurring internet cost.

## 6. Phase Four — Digital Learning Access

### 6.1 Equipment

Possible:

- desktop computers;
- laptops;
- printer/scanner;
- display/projector;
- charging points.

### 6.2 Services

Possible:

- research access;
- online learning;
- digital literacy;
- CV/job search;
- government e-services;
- education portals.

## 7. Phase Five — Digital Catalogue

### 7.1 Goals

Enable readers to:

- search titles;
- search authors;
- browse categories;
- view new arrivals;
- view general availability.

### 7.2 Data Readiness

Do not launch public catalogue until:

- records are cleaned;
- categories are standardised;
- duplicate handling is defined;
- availability data is reliable enough.

## 8. Phase Six — Smart Library Portal

### 8.1 Integration

Connect:

- public website;
- catalogue;
- needs tracker;
- project tracker;
- donor transparency;
- staff admin.

### 8.2 Reader Services

Possible later:

- book request form;
- reading lists;
- study resources;
- event announcements.

## 9. Phase Seven — Community Learning Hub

### 9.1 Programmes

Possible:

- basic computer skills;
- coding introduction;
- digital safety;
- media literacy;
- English learning;
- career skills;
- entrepreneurship;
- STEM activities.

### 9.2 Partnerships

Work with approved:

- education organisations;
- universities;
- technology companies;
- volunteers;
- community groups.

## 10. Infrastructure Dependencies

### 10.1 Power

Before digital expansion verify:

- safe electrical wiring;
- sockets;
- surge protection;
- UPS where needed.

### 10.2 Internet

Verify:

- speed;
- reliability;
- monthly cost;
- backup options.

### 10.3 Security

Verify:

- device security;
- physical security;
- admin access;
- backups.

## 11. Equipment Lifecycle

### 11.1 Before Acquisition

Document:

- purpose;
- minimum specification;
- warranty;
- power;
- software;
- maintenance.

### 11.2 During Use

Track:

- asset ID;
- location;
- condition;
- repair history.

### 11.3 Replacement

Plan replacement before equipment becomes unusable.

## 12. Staff Capability

### 12.1 Training

Staff training should cover:

- website admin;
- catalogue;
- device basics;
- privacy;
- cybersecurity basics;
- donor record updates.

## 13. Accessibility

### 13.1 Physical

Consider:

- accessible seating;
- clear pathways;
- readable signage.

### 13.2 Digital

Target WCAG 2.2 AA.

## 14. Success Indicators

### 14.1 Collection

- new current resources;
- high-demand gaps reduced.

### 14.2 Infrastructure

- seating;
- equipment;
- internet availability.

### 14.3 Digital

- catalogue searches;
- public-computer use;
- digital-learning activity.

### 14.4 Community

- programme participation;
- repeat learners;
- reader feedback.

## 15. Donor Packaging

### 15.1 Small Projects

Examples:

- 5 computers;
- 20 chairs;
- 100 books.

### 15.2 Medium Projects

Examples:

- digital learning corner;
- children's reading area;
- Wi-Fi upgrade.

### 15.3 Large Projects

Examples:

- full smart-library transformation;
- multi-room digital upgrade.

Package projects so donors can support realistic, measurable outcomes.

## 16. Catalogue and Circulation Decision Gate

### 16.1 Verify Before Building

The portal now has a basic bibliographic catalogue. Before adding members or checkout, confirm with the authorized library/local authority whether Koha or another LMS already owns catalogue items, membership and issue/return history. If it does, prioritize a read-only catalogue integration and avoid duplicate operational truth.

### 16.2 Standalone Option

Only if no approved LMS exists and the authority approves a standalone workflow, build member and physical-copy records additively, then a transactional checkout/return vertical slice with row-level security, audit history, duplicate-checkout protection, backups and explicit operational confirmation. Do not migrate real users or use development policy values as library rules without approval.

The project owner reports that Koha is not currently in use at Sevanagala; confirm this and the data owner with the authority. If confirmed, the proposed direction is a portal-native, limited library-operations module informed by Koha patterns, not a full ILS clone. Start with metadata/copy-inventory readiness, demo-only scan/search workflows and staff acceptance. Then implement only approved minimum member data and atomic issue/return. Defer renewals, holds, notices, offline operation and advanced acquisitions until the basic workflow is accepted. See [Koha Practices Adaptation Plan](./koha-practices-adaptation-plan.md).

## 17. Staff AI Assistant

AI is a later staff-only support layer. First stabilize the source-of-truth and permission-scoped data tools. The assistant may search approved documents, summarize authorized aggregate data and draft content; it must not autonomously issue/return books, alter due dates, publish, verify donations, suspend members, or query arbitrary SQL. See [Staff AI Assistant Architecture](./staff-ai-assistant-architecture.md).

## 18. Current-State References

- [Smart Library Current-State Gap Analysis](./smart-library-current-state-gap-analysis.md)
- [Sri Lankan Library Benchmark Research](./sri-lankan-library-benchmark-research.md)
- [Monaragala District Library Expansion Research](./monaragala-district-library-expansion-research.md)
- [Smart Library Research and Integration Review](./smart-library-research-and-integration-review.md)
