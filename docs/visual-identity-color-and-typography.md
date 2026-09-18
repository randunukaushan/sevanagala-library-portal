# Visual Identity, Color and Typography

## 1. Purpose

### 1.1 Objective

Define the canonical visual foundation for the Sevanagala Public Library Portal prototype before detailed UI implementation.

The design must feel:

- trustworthy;
- calm;
- public-service oriented;
- educational;
- modern without looking commercial;
- appropriate for local readers and international donors;
- usable on low-cost mobile devices;
- ready for Sinhala, English, and Tamil content.

### 1.2 Status

This is the canonical prototype visual system.

Official institutional branding may replace or extend it after approval.

## 2. Research Findings

### 2.1 Public-Service Design Systems

The U.S. Web Design System recommends role-based color tokens rather than choosing colors page by page. It separates base, primary, secondary, and accent roles and treats accessibility as a core requirement.

Reference:
https://designsystem.digital.gov/design-tokens/color/theme-tokens/

GOV.UK similarly treats color as functional and requires accessible combinations rather than relying on color alone.

Reference:
https://design-system.service.gov.uk/styles/colour/

### 2.2 Accessibility

WCAG 2.2 Level AA remains the minimum accessibility target.

For normal text, color combinations should meet at least 4.5:1 contrast.

The interface must not communicate status only through color.

Reference:
https://www.w3.org/TR/WCAG22/

### 2.3 Typography

USWDS guidance recommends at least an effective 16px body size for most running text, comfortable line-height, and readable line length.

A useful target for long-form reading is around 66 characters per line, with an acceptable range around 45–90 characters.

Reference:
https://designsystem.digital.gov/components/typography/

### 2.4 Library UX Research

Modern public-library websites such as Oodi emphasise direct access to:

- services;
- facilities;
- opening information;
- learning;
- books and collections;
- clear task-based navigation.

Reference:
https://oodihelsinki.fi/en/

The Sevanagala portal should apply the same principle: visitors should first understand what they can do, not be forced to read institutional history before reaching useful services.

## 3. Brand Direction

### 3.1 Core Theme

The visual direction is:

**Knowledge + Community + Trust + Growth**

### 3.2 Color Meaning

The palette is intentionally role-based rather than decorative.

**Forest Green**
Primary public-service identity. Represents growth and community without appearing like a commercial technology brand.

**Ink Blue**
Secondary institutional color. Used for information, technical/digital sections, and visual balance.

**Warm Gold**
Small accent for emphasis, milestones, and warmth. It must not dominate the interface.

**Warm Neutral Backgrounds**
Reduce visual harshness and create a reading-friendly library atmosphere.

## 4. Canonical Color Palette

### 4.1 Base Colors

| Token | Hex | Purpose |
|---|---|---|
| Background | #F7F6F1 | Main page background |
| Surface | #FFFFFF | Cards, header, panels |
| Surface Soft | #EEF3EF | Alternating sections |
| Text | #18201C | Primary text |
| Text Muted | #526059 | Secondary text |
| Border | #D9DED8 | Dividers and card borders |

### 4.2 Brand Colors

| Token | Hex | Purpose |
|---|---|---|
| Primary | #155E4B | Main actions, brand emphasis |
| Primary Dark | #0E4537 | Hover/pressed state |
| Primary Soft | #E8F3EE | Soft branded backgrounds |
| Secondary | #1E3A5F | Institutional/digital emphasis |
| Secondary Soft | #EAF0F7 | Secondary background |
| Accent Strong | #8A5A00 | Accessible warm accent text/icon |
| Accent Soft | #F7E7C1 | Warm highlight background |

### 4.3 State Colors

| State | Strong | Soft |
|---|---|---|
| Information | #1D4ED8 | #E8EFFF |
| Success | #166534 | #E9F5EC |
| Warning | #8A5A00 | #FFF3CD |
| Danger | #B42318 | #FDECEC |
| Focus | #005EA8 | — |

## 5. Verified Contrast Targets

### 5.1 Key Pairings

The following pairs were checked using the WCAG relative-luminance contrast formula:

| Pair | Contrast |
|---|---:|
| Text #18201C on Background #F7F6F1 | 15.38:1 |
| Muted #526059 on Background #F7F6F1 | 6.11:1 |
| Primary #155E4B on White | 7.68:1 |
| White on Primary #155E4B | 7.68:1 |
| Primary Dark #0E4537 on White | 10.91:1 |
| Secondary #1E3A5F on White | 11.50:1 |
| Accent Strong #8A5A00 on White | 5.93:1 |
| Information #1D4ED8 on White | 6.70:1 |
| Success #166534 on White | 7.13:1 |
| Danger #B42318 on White | 6.57:1 |
| Focus #005EA8 on White | 6.63:1 |

### 5.2 Accent Rule

Bright gold is not used for normal text.

Warm gold is used either:

- as a soft background with dark text; or
- as the darker accessible Accent Strong token.

## 6. Color Usage Rules

### 6.1 Primary

Use Primary for:

- main call-to-action buttons;
- active navigation;
- important links;
- progress emphasis;
- brand marks in the prototype.

### 6.2 Secondary

Use Secondary for:

- information sections;
- digital/smart-library content;
- supporting calls to action;
- institutional emphasis.

### 6.3 Accent

Use Accent sparingly for:

- small labels;
- milestones;
- highlights;
- donor-impact accents.

Do not use Accent as the main action color.

### 6.4 Status

Always pair status color with visible text such as:

- Seeking Support;
- Pledged;
- Received;
- Verified;
- Completed.

Color must never be the only status signal.

## 7. Typography System

### 7.1 Typeface Direction

The long-term web-font direction should support all three planned languages cleanly:

- Sinhala;
- English;
- Tamil.

Preferred family direction:

- Noto Sans Sinhala;
- Noto Sans Tamil;
- Noto Sans / highly legible system sans for Latin text.

Until web-font integration is finalised, the prototype uses a robust system fallback stack.

### 7.2 Body Text

Default body text:

- minimum 16px;
- line-height around 1.6;
- regular weight;
- high-contrast text color.

### 7.3 Headings

Recommended hierarchy:

- Display / Home hero: 48–64px desktop, 36–44px mobile;
- H1 inner page: 40–52px desktop, 34–40px mobile;
- H2: 28–36px;
- H3: 20–24px;
- Small labels: 12–14px with limited uppercase use.

### 7.4 Reading Measure

Long paragraphs should normally stay around:

- 60–72 characters per line;
- maximum approximately 75 characters for ordinary reading content.

## 8. Spacing and Shape

### 8.1 Spacing Scale

Use an 8px-oriented rhythm:

- 4px;
- 8px;
- 12px;
- 16px;
- 24px;
- 32px;
- 48px;
- 64px;
- 96px.

### 8.2 Corners

Use moderate radii:

- controls: 10–12px;
- cards: 16–20px;
- major feature panels: up to 24px.

Avoid excessively rounded "app-like" styling.

### 8.3 Shadows

Use shadows sparingly.

Default cards should rely mainly on:

- border;
- spacing;
- background contrast.

## 9. Visual Hierarchy

### 9.1 Home Page

Order of importance:

1. Library identity and purpose
2. Key visitor actions
3. Current verified needs
4. Services/resources
5. Development projects
6. Transparency/impact
7. News
8. Contact/footer

### 9.2 Donor Pages

Priority:

1. What is needed
2. Why it matters
3. Target / pledged / received / remaining
4. Last verified
5. Evidence
6. Approved contact path

## 10. Photography and Illustration

### 10.1 Photography

When approved, prefer real library photography over generic stock imagery.

Useful photography:

- shelves and reading areas;
- facilities;
- new books;
- equipment installation;
- project progress.

### 10.2 Privacy

Do not publish identifiable children or other people without the required approval process.

### 10.3 Decorative Illustration

Use only when it supports understanding.

The site should not become dependent on decorative AI imagery for credibility.

## 11. Motion

### 11.1 Principle

Motion should clarify change, not decorate every interaction.

### 11.2 Reduced Motion

Respect `prefers-reduced-motion`.

### 11.3 Recommended Motion

Use subtle transitions for:

- button hover;
- card hover where useful;
- navigation;
- disclosure panels.

Avoid large parallax, autoplay animation, or distracting loops.

## 12. Design Token Rule

### 12.1 Canonical Tokens

Components must use semantic tokens such as:

- `--color-brand-primary`;
- `--color-text`;
- `--color-surface`;
- `--color-status-warning`.

Do not scatter arbitrary hex values through components.

### 12.2 Future Branding

If an official approved identity arrives later, update the token layer first rather than rewriting every component.
