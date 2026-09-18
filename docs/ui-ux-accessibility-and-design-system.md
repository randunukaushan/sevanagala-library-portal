# UI, UX, Accessibility and Design System

## 1. Purpose

### 1.1 Objective

Define a calm, trustworthy, accessible visual and interaction system for local readers, staff, and international donors.

## 2. Design Principles

### 2.1 Trust Before Decoration

The interface should feel:

- official;
- calm;
- clear;
- modern;
- community-focused.

Avoid flashy fundraising patterns, exaggerated animations, or commercial-advertising aesthetics.

### 2.2 Mobile First

Design first for:

- Android phones;
- narrow screens;
- touch input;
- slower connections.

Then enhance for tablets and desktop.

### 2.3 Accessible by Default

Target WCAG 2.2 AA from the first component.

### 2.4 Content First

Important text and quantities should not be hidden behind carousels or decorative interactions.

## 3. Visual Identity

### 3.1 Canonical Prototype System

The canonical prototype palette, typography direction, spacing, and visual hierarchy are defined in:

- [Visual Identity, Color and Typography](./visual-identity-color-and-typography.md)
- [UI and UX Page Patterns](./ui-ux-page-patterns.md)

These documents take precedence over older placeholder visual values.

### 3.2 Branding Status

Until official approval:

- use a neutral prototype identity;
- do not use unapproved institutional emblems;
- clearly label staging/demo environments.

### 3.3 Colour

Final colours should:

- meet contrast requirements;
- support clear status distinctions;
- not rely on colour alone.

### 3.4 Typography

Use highly readable fonts with good Sinhala, Tamil, and Latin-script support.

Font selection should consider:

- legibility;
- web loading cost;
- script coverage;
- licensing.

### 3.5 Spacing

Use a consistent spacing scale.

Avoid crowded cards and small touch targets.

## 4. Layout System

### 4.1 Content Width

Use readable content widths for long text.

### 4.2 Grid

Recommended:

- single column on small screens;
- two-column sections when useful on tablets;
- limited multi-column dashboards on desktop.

### 4.3 Header

Header should include:

- library identity;
- primary navigation;
- language selector;
- accessible menu control.

### 4.4 Footer

Footer should provide:

- contact;
- opening information;
- quick links;
- privacy;
- accessibility;
- transparency methodology.

## 5. Core Components

### 5.1 Need Card

Display:

- need title;
- category;
- status;
- target;
- pledged;
- verified received;
- remaining;
- last verified;
- action.

### 5.2 Project Card

Display:

- project title;
- outcome;
- status;
- short progress information;
- latest update.

### 5.3 Partner Card

With permission:

- name;
- country;
- contribution summary;
- optional approved logo.

### 5.4 Book Card

Possible fields:

- title;
- author;
- language;
- category;
- publication year;
- availability summary.

### 5.5 Stat Card

Use only for meaningful verified values.

Examples:

- Books Added
- Active Needs
- Completed Projects
- Computers Installed

## 6. Status Design

### 6.1 Status Must Use Text

Do not communicate status only by colour.

Example:

**Partially Supported**

with icon/colour as additional cues.

### 6.2 Status Consistency

The same status should look and mean the same across pages.

## 7. Accessibility Requirements

### 7.1 WCAG Target

WCAG 2.2 Level AA.

Reference:
https://www.w3.org/TR/WCAG22/

### 7.2 Keyboard

All interactive controls must be keyboard operable.

### 7.3 Focus

Visible keyboard focus must not be obscured.

### 7.4 Target Size

Design touch targets generously; WCAG 2.2 AA includes a minimum target-size criterion with defined exceptions.

### 7.5 Contrast

Text and interactive components must meet applicable contrast requirements.

### 7.6 Text Resize

Content should remain usable when text is enlarged.

### 7.7 Reduced Motion

Respect reduced-motion preferences.

### 7.8 Images

Meaningful images need appropriate alt text.

Decorative images should not create unnecessary screen-reader noise.

## 8. Forms

### 8.1 Labels

Every input needs a persistent programmatic label.

### 8.2 Instructions

Explain complex fields before errors occur.

### 8.3 Error Handling

Errors should:

- describe the problem;
- identify the field;
- explain how to fix it where possible;
- not rely only on colour.

### 8.4 Success Feedback

After submission, show a clear success state.

## 9. Language UX

### 9.1 Language Selector

Use visible language names, not flags.

Suggested labels:

- සිංහල
- English
- தமிழ்

### 9.2 Direction and Script

All planned languages use left-to-right layout, but components should still avoid assumptions that make localisation difficult.

### 9.3 Translation Quality

Machine translation must not be silently published as official institutional wording without review.

## 10. Donor UX

### 10.1 Fast Understanding

Within a few seconds a donor should understand:

- what is needed;
- why;
- how much remains;
- whether the information is current;
- how to contact the library.

### 10.2 Evidence

Make supporting evidence easy to see without overwhelming the main page.

### 10.3 No Manipulative Patterns

Avoid:

- fake countdowns;
- misleading urgency;
- pre-checked consent;
- hidden conditions;
- confusing "donate" actions that actually do something else.

## 11. Reader UX

### 11.1 Quick Information

Readers should quickly find:

- hours;
- location;
- contact;
- services;
- books/resources;
- new arrivals.

### 11.2 Student Entry Points

Provide direct paths to:

- O/L;
- A/L;
- English;
- STEM;
- ICT;
- career resources.

## 12. Staff UX

### 12.1 Forms Over Raw Data

Staff should use understandable forms, not database terms.

### 12.2 Safe Actions

Destructive actions should be difficult to trigger accidentally.

### 12.3 Autosave

Consider autosave for long drafts, but clearly indicate save state.

## 13. Performance

### 13.1 Images

Use responsive, compressed images.

### 13.2 JavaScript

Keep client-side JavaScript minimal for public information pages.

### 13.3 Fonts

Avoid loading many heavy font variants.

### 13.4 Third Parties

Minimise third-party scripts.

## 14. Design Tokens

### 14.1 Token Categories

Use tokens for:

- colour;
- spacing;
- typography;
- radius;
- shadows;
- breakpoints;
- motion;
- z-index.

### 14.2 Semantic Tokens

Prefer names such as:

- background;
- surface;
- text-primary;
- text-muted;
- border;
- status-success;
- status-warning;
- status-danger;
- focus-ring.

Do not encode meaning only in literal colour names.

## 15. Component Testing

### 15.1 Required States

Every reusable component should test:

- default;
- hover where relevant;
- focus;
- active;
- disabled;
- loading;
- empty;
- error.

### 15.2 Responsive Testing

Test common phone, tablet, and desktop widths.

### 15.3 Accessibility Testing

Use:

- keyboard testing;
- automated accessibility checks;
- manual heading/label checks;
- screen-reader spot checks when possible.

## 16. Research Basis

### 16.1 W3C

WCAG 2.2:
https://www.w3.org/TR/WCAG22/

What's New in WCAG 2.2:
https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

### 16.2 Public Library Mission

IFLA-UNESCO Public Library Manifesto:
https://www.ifla.org/public-library-manifesto/
