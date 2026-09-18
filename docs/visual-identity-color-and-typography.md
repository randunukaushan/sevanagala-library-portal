# Visual Identity, Color and Typography

## 1. Purpose

### 1.1 Objective

Define the canonical visual foundation for the Sevanagala Public Library Portal prototype.

The approved design direction is:

**Old-book warmth + modern public-library UI**

The interface should feel connected to books, reading, paper, leather, wood, and long-term knowledge without looking antique, dusty, or visually outdated.

### 1.2 Status

This document defines the canonical prototype palette.

The previous green-led prototype palette is retired.

Green must not be reintroduced as a primary, secondary, status, or decorative brand color unless the design system is intentionally reviewed and approved again.

Official institutional branding may later replace or extend this system after approval.

## 2. Design Intent

### 2.1 Character

The website should feel:

- warm;
- scholarly;
- trustworthy;
- calm;
- modern;
- public-service oriented;
- book-inspired rather than corporate;
- suitable for local readers and international supporters.

### 2.2 What "Old-Book Inspired" Means

The design takes inspiration from:

- warm paper;
- parchment;
- leather book covers;
- walnut wood;
- oxblood and burgundy bindings;
- faded bronze and antique-gold details;
- dark ink.

It does **not** mean:

- yellowed dirty paper effects;
- fake torn edges;
- heavy vintage ornament;
- low-contrast sepia text;
- excessive textures;
- old-fashioned navigation patterns.

### 2.3 Modern Counterbalance

The old-book palette is combined with:

- clean spacing;
- strong contrast;
- modern responsive layouts;
- accessible controls;
- simple cards;
- contemporary interaction patterns;
- restrained texture.

## 3. Research Principles

### 3.1 Role-Based Color

Colors are assigned semantic roles rather than chosen independently per page.

This follows modern public-service design-system practice.

References:

https://designsystem.digital.gov/design-tokens/color/theme-tokens/

https://design-system.service.gov.uk/styles/colour/

### 3.2 Accessibility

WCAG 2.2 Level AA is the baseline.

Normal text should meet at least 4.5:1 contrast.

Status must never be communicated only through color.

Reference:

https://www.w3.org/TR/WCAG22/

### 3.3 Typography

Body text should normally remain at least 16px with comfortable line-height and readable measure.

Reference:

https://designsystem.digital.gov/components/typography/

## 4. Canonical Color Palette

### 4.1 Base Colors

| Token | Hex | Purpose |
|---|---|---|
| Background / Parchment | #F6F0E6 | Main page background |
| Surface / Warm White | #FFFDF9 | Cards, forms, header panels |
| Surface Soft / Aged Paper | #EFE2D2 | Alternate sections and subtle highlights |
| Text / Dark Ink | #211B17 | Primary text |
| Text Muted | #66574B | Secondary text |
| Border | #D7C7B3 | Dividers and card borders |

### 4.2 Brand Colors

| Token | Hex | Purpose |
|---|---|---|
| Primary / Oxblood | #7A2E24 | Main actions, active states, brand emphasis |
| Primary Dark | #5E211B | Hover and pressed states |
| Primary Soft | #F3E2DE | Soft primary backgrounds |
| Secondary / Walnut | #4A2F24 | Strong sections, footer/admin navigation, institutional depth |
| Secondary Soft | #EDE3DB | Secondary tinted backgrounds |
| Accent / Leather | #8A4B20 | Labels, small emphasis, book-inspired detail |
| Accent Soft / Antique Paper Gold | #F2DFC6 | Warm callouts and prototype notices |

### 4.3 Semantic State Colors

The status system deliberately avoids green.

| State | Strong | Soft |
|---|---|---|
| Information | #2F4A68 | #E7ECF2 |
| Success / Completed | #6B4D1F | #F2E9D8 |
| Warning | #8A5A18 | #F8EACB |
| Danger | #A5302A | #F7E2DF |
| Focus | #5B3B91 | — |

## 5. Verified Contrast

### 5.1 Key Pairings

The following pairs were checked with the WCAG relative-luminance contrast formula:

| Pair | Contrast |
|---|---:|
| Text #211B17 on Background #F6F0E6 | 15.01:1 |
| Muted #66574B on Background #F6F0E6 | 6.11:1 |
| Primary #7A2E24 on Surface #FFFDF9 | 9.21:1 |
| White on Primary #7A2E24 | 9.36:1 |
| Primary Dark #5E211B on Surface #FFFDF9 | 12.09:1 |
| Secondary #4A2F24 on Surface #FFFDF9 | 11.99:1 |
| Accent #8A4B20 on Surface #FFFDF9 | 6.65:1 |
| Information #2F4A68 on Surface #FFFDF9 | 8.99:1 |
| Success #6B4D1F on Surface #FFFDF9 | 7.64:1 |
| Warning #8A5A18 on Surface #FFFDF9 | 5.81:1 |
| Danger #A5302A on Surface #FFFDF9 | 6.76:1 |
| Focus #5B3B91 on Surface #FFFDF9 | 8.34:1 |

### 5.2 Rule

Do not assume every tint or opacity combination is accessible.

New color combinations must be checked before becoming reusable component styles.

## 6. Color Usage

### 6.1 Primary / Oxblood

Use for:

- primary call-to-action buttons;
- active navigation;
- key links;
- progress emphasis;
- important section labels.

Do not cover large areas of the page with oxblood unless there is a clear visual reason.

### 6.2 Secondary / Walnut

Use for:

- dark editorial sections;
- footer or admin navigation;
- strong institutional panels;
- smart-library/development sections where a dark surface is useful.

### 6.3 Leather Accent

Use sparingly for:

- small labels;
- category marks;
- milestone details;
- book-inspired visual accents.

### 6.4 Parchment and Aged Paper

Use as quiet page and section surfaces.

Keep texture extremely subtle or absent in functional areas such as:

- tables;
- forms;
- admin screens;
- data-heavy cards.

### 6.5 Status

Every status must include readable text.

Examples:

- Seeking Support;
- Pledged;
- Received;
- Verified;
- Completed.

Status colors are secondary cues only.

## 7. Typography

### 7.1 Body Typeface

The long-term production font stack should support:

- Sinhala;
- English;
- Tamil.

Preferred direction:

- Noto Sans Sinhala;
- Noto Sans Tamil;
- Noto Sans or another highly legible sans-serif for English.

### 7.2 Editorial Heading Option

English display headings may later use a restrained serif face to strengthen the book/editorial identity, provided:

- Sinhala and Tamil remain visually compatible;
- performance is acceptable;
- licensing is clear;
- accessibility remains strong.

The current prototype may continue using a strong sans-serif heading system until multilingual typography is tested.

### 7.3 Body Text

Default:

- at least 16px;
- line-height around 1.6–1.7;
- dark ink on warm light surfaces.

### 7.4 Heading Scale

Recommended:

- Home display: 48–64px desktop, 36–44px mobile;
- Inner-page H1: 40–52px desktop, 34–40px mobile;
- H2: 28–36px;
- H3: 20–24px;
- small labels: 12–14px.

### 7.5 Reading Measure

Long reading text should normally stay around 60–72 characters per line.

## 8. Spacing and Shape

### 8.1 Spacing

Use a consistent rhythm based around:

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

Use modern moderate rounding:

- controls: 10–12px;
- cards: 16–20px;
- larger panels: up to 24px.

### 8.3 Shadows

Use warm, subtle shadows only when hierarchy needs them.

Most cards should rely on:

- border;
- surface;
- spacing.

## 9. Texture and Book Details

### 9.1 Allowed

Subtle visual references may include:

- faint paper grain;
- thin book-line illustrations;
- restrained leather-like color blocking;
- simple spine or page motifs.

### 9.2 Avoid

Do not use:

- heavy fake parchment;
- stained paper;
- realistic torn edges;
- excessive book ornaments;
- decorative textures behind dense text.

## 10. Photography

### 10.1 Preferred

After approval, prefer real library photography.

Suitable subjects:

- shelves;
- books;
- reading areas;
- facilities;
- approved equipment;
- project progress.

### 10.2 Color Grading

Photos may use a slight warm treatment for visual consistency, but should remain realistic.

### 10.3 Privacy

Do not publish identifiable people, especially children, without the required approval process.

## 11. Motion

### 11.1 Principle

Motion should communicate state, not imitate old-fashioned page-turning effects.

### 11.2 Reduced Motion

Respect `prefers-reduced-motion`.

## 12. Design Tokens

### 12.1 Required

Components use semantic variables such as:

- `--color-brand-primary`;
- `--color-brand-secondary`;
- `--color-bg`;
- `--color-surface`;
- `--color-text`;
- `--color-accent`;
- `--color-success`.

### 12.2 No Arbitrary Green

Do not add green hex values directly to public or admin components.

If a new color is needed, it should be added to the canonical token system first.

### 12.3 Future Official Branding

When official branding is approved, update the semantic token layer rather than rewriting each page independently.
