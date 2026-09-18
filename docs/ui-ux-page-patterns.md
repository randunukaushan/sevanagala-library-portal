# UI and UX Page Patterns

## 1. Purpose

### 1.1 Objective

Define the reusable page structure and interaction patterns for the public prototype.

## 2. UX Principles

### 2.1 Task First

A visitor should quickly find:

- opening/service information;
- books and resources;
- current needs;
- project progress;
- contact information.

### 2.2 Progressive Detail

Show the most useful summary first.

Detailed methodology, evidence, and technical information should remain available without overwhelming first-time visitors.

### 2.3 Mobile First

All core tasks must work on a narrow Android phone before desktop enhancements are added.

### 2.4 Trust Through Clarity

Use:

- explicit labels;
- last-verified dates;
- clear statuses;
- realistic quantities;
- visible prototype/official status.

Avoid vague fundraising language.

## 3. Global Layout

### 3.1 Prototype Banner

Until official launch, every page must clearly indicate that the site is a prototype.

### 3.2 Header

Header should contain:

- prototype/library identity;
- primary navigation;
- future language selector;
- mobile navigation control.

### 3.3 Main Container

Use a maximum content width around 1180px with comfortable mobile gutters.

### 3.4 Footer

Footer should contain:

- prototype status;
- important navigation;
- future official contact area;
- privacy/accessibility/transparency links.

## 4. Home Page Pattern

### 4.1 Hero

Must answer:

- What is this?
- Who is it for?
- What can I do next?

Primary actions:

- Explore Library Services
- View Current Needs

Secondary action:

- See Development Projects

### 4.2 Quick Information

Future official version should surface:

- open/closed status;
- opening hours;
- location;
- contact.

Do not fabricate these during prototype stage.

### 4.3 Services

Show high-value service categories in a simple grid.

### 4.4 Needs Preview

Show three to six highest-priority verified needs.

Each card should include:

- title;
- category;
- purpose;
- target;
- pledged;
- received;
- remaining;
- status;
- last verified.

### 4.5 Development Roadmap

Show a small number of active projects.

### 4.6 Transparency

Explain the distinction between:

- pledge;
- received;
- verified;
- completed.

### 4.7 News

Show only recent approved updates.

## 5. Inner Page Hero

### 5.1 Structure

Each inner page begins with:

- eyebrow/category;
- H1;
- concise lead paragraph;
- optional relevant action.

### 5.2 Length

Lead paragraph should usually stay below approximately 2–3 lines on desktop.

## 6. Card Pattern

### 6.1 Default Card

Default card includes:

- small contextual label;
- heading;
- concise description;
- optional metadata;
- optional action.

### 6.2 Interaction

Do not make the whole card clickable unless it has one clear destination.

### 6.3 Hover

Hover effects must not be required to understand the card.

## 7. Need Card Pattern

### 7.1 Priority

Need cards must emphasise:

1. Need title
2. Remaining quantity
3. Status
4. Purpose
5. Progress
6. Last verification

### 7.2 Progress

Progress bars are supplementary.

Always provide the actual numbers in text.

### 7.3 Status

Status badge includes text and semantic color.

## 8. Project Card Pattern

### 8.1 Content

Show:

- project title;
- outcome;
- status;
- related need count;
- latest update if available.

## 9. Transparency Pattern

### 9.1 Timeline

Use a clear sequence:

Enquiry → Accepted Pledge → Received → Verified → Deployed/Catalogued → Completed

### 9.2 Methodology

A public methodology section should explain how quantities are calculated.

## 10. Books and Resources Pattern

### 10.1 First Phase

Prioritise:

- resource categories;
- exact book requests;
- new arrivals;
- student-resource entry points.

### 10.2 Catalogue

Do not expose a full public catalogue until data quality is sufficient.

## 11. Forms

### 11.1 Labels

Every field has a persistent visible label.

### 11.2 Errors

Errors must be:

- specific;
- visible;
- associated with the field;
- not color-only.

### 11.3 Submission

Show clear:

- loading;
- success;
- error

states.

## 12. Navigation

### 12.1 Desktop

Primary navigation should remain short enough to scan.

Recommended grouping:

- Library
- Books & Resources
- Needs & Projects
- Support
- Transparency
- News
- Contact

### 12.2 Mobile

Use a single clear menu control.

Targets should be comfortably larger than WCAG minimums.

## 13. Accessibility

### 13.1 Target Size

WCAG 2.2 AA introduces a 24×24 CSS-pixel minimum target-size requirement with exceptions.

For this project, the design goal is generally 44px or more for primary buttons and major touch controls.

Reference:
https://www.w3.org/TR/WCAG22/

### 13.2 Focus

Use a visible, high-contrast focus outline.

### 13.3 Heading Structure

Use one page H1 and logical heading levels.

### 13.4 Language

The future multilingual implementation must mark language changes correctly in HTML.

## 14. Empty and Unknown States

### 14.1 Unknown Data

Never replace unknown information with invented values.

Use labels such as:

- Pending verification;
- Not yet available;
- Prototype sample.

### 14.2 Empty Collections

Explain what the user can do next rather than showing a blank screen.

## 15. Responsive Behaviour

### 15.1 Mobile

- one-column reading flow;
- stacked cards;
- large touch controls;
- minimal horizontal scrolling.

### 15.2 Tablet

- two-column grids where helpful.

### 15.3 Desktop

- wider editorial layouts;
- maximum three or four content cards per row depending on density.

## 16. UI Acceptance Criteria

### 16.1 Every Public Page

Must have:

- prototype indicator until approval;
- clear H1;
- readable lead;
- keyboard-accessible navigation;
- mobile layout;
- visible focus;
- no unverified real-world claims.

### 16.2 Every New Component

Must define:

- default state;
- hover where relevant;
- focus;
- disabled if applicable;
- loading if applicable;
- empty/error if data-driven.
