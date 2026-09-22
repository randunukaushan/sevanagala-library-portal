# Visual Identity, Color and Typography

## 1. Purpose

### 1.1 Objective

Define the canonical visual foundation for the Sevanagala Public Library Portal prototype.

The approved public-site direction is:

**Premium editorial library — warm paper, dark ink, restrained bronze, high-quality photography.**

The public website should feel calm, timeless, literary, modern, and visually generous.

### 1.2 Status

This specification replaces the earlier green-led and burgundy-led prototype palettes.

Do not reintroduce strong green, burgundy, or multiple competing accent colours into the public brand unless this document is intentionally reviewed and updated.

## 2. Visual Direction

### 2.1 Character

The public website should feel:

- refined;
- warm;
- quiet;
- literary;
- trustworthy;
- contemporary;
- image-led;
- spacious;
- suitable for readers, students, community users, and international supporters.

### 2.2 Reference Style

The design language uses:

- large editorial photography;
- serif display headings;
- clean sans-serif body copy;
- warm neutral surfaces;
- near-black actions;
- restrained bronze/caramel details;
- rounded image panels;
- pill-shaped primary controls;
- subtle shadows;
- dark editorial sections.

### 2.3 Avoid

Do not use:

- loud burgundy blocks;
- bright green branding;
- highly saturated status colours as decoration;
- boxy heavy buttons;
- oversized collections of small cards;
- generic dashboard styling on the public website;
- decorative vintage textures that reduce clarity.

## 3. Canonical Public Palette

### 3.1 Base Colors

| Token | Hex | Purpose |
|---|---|---|
| Ink | #171512 | Primary text, primary actions |
| Muted | #746F68 | Secondary text |
| Paper | #F7F3ED | Main background |
| Paper 2 | #EEE6DC | Alternate sections |
| Paper 3 | #E5D8C8 | Warm supporting surface |
| White | #FFFFFF | Cards and light actions |
| Border | rgba(23,21,18,0.12) | Subtle dividers |

### 3.2 Accent Colors

| Token | Hex | Purpose |
|---|---|---|
| Bronze | #9D6F46 | Eyebrows, small highlights |
| Light Bronze | #D6B08A | Dark-section highlights |
| Dark Editorial | #1D1A17 | Dark feature sections/footer |

### 3.3 Semantic States

Operational statuses may use subdued semantic colours, but they are not part of the public brand.

Every status must include readable text and must not rely on colour alone.

## 4. Typography

### 4.1 English Display Typeface

Use:

**Playfair Display**

For:

- hero headlines;
- page titles;
- major section headings;
- editorial quotations.

### 4.2 Body Typeface

Use:

**DM Sans**

For:

- body copy;
- navigation;
- controls;
- labels;
- data;
- administrative UI.

### 4.3 Sinhala and Tamil

The production multilingual implementation must use highly legible compatible Sinhala and Tamil fonts.

Preferred direction:

- Noto Sans Sinhala;
- Noto Sans Tamil.

Do not force the English serif display style onto scripts where it harms readability.

### 4.4 Scale

Recommended:

- Home display: 56–112px depending on viewport;
- Inner-page hero: 48–88px;
- Section heading: 40–72px;
- Card heading: 22–30px;
- Body: 16–19px.

## 5. Buttons and Links

### 5.1 Primary Button

Use near-black ink on light surfaces.

Shape:

- pill radius;
- medium-weight text;
- generous horizontal padding;
- subtle lift on hover.

### 5.2 Light Button

Use white on photographic/dark surfaces.

### 5.3 Ghost Button

Use a translucent dark-photo overlay treatment with a light border.

### 5.4 Text Links

Editorial cards may use a simple underlined text action rather than another filled button.

## 6. Photography

### 6.1 Prototype Photography

The prototype may use high-quality licensed stock library photography to establish direction.

It must be clearly identified as prototype imagery and must not be presented as a photograph of Sevanagala Public Library.

### 6.2 Production Photography

Before official launch, replace prototype photography where appropriate with approved real library photography.

Preferred subjects:

- bookshelves and collection areas;
- reading/study spaces;
- library exterior/interior;
- facilities;
- approved project progress;
- new books/equipment;
- community-learning activities with required permissions.

### 6.3 Privacy

Do not publish identifiable children or private individuals without the required permission process.

### 6.4 Image Treatment

Use:

- realistic crops;
- slightly warm colour treatment;
- restrained saturation;
- natural lighting;
- strong architectural composition.

Avoid obvious AI-looking or overly staged imagery for institutional credibility.

## 7. Layout

### 7.1 Hero

Home hero:

- full-screen or near-full-screen photography;
- dark gradient for text readability;
- large serif headline;
- no more than two main actions.

Inner-page hero:

- large photography;
- strong title;
- concise lead;
- small prototype-photo notice while stock imagery remains.

### 7.2 Sections

Prefer:

- large image/text pairings;
- three-column image cards;
- editorial whitespace;
- quiet data cards;
- dark full-width feature sections.

### 7.3 Cards

Cards should feel light and editorial.

Use:

- thin borders;
- subtle shadow;
- generous padding;
- restrained rounded corners.

## 8. Motion

### 8.1 Principle

Motion supports polish, not spectacle.

Use subtle:

- hover lift;
- image zoom;
- navigation transition.

### 8.2 Reduced Motion

Respect `prefers-reduced-motion`.

## 9. Accessibility

### 9.1 Contrast

WCAG 2.2 AA remains the target.

Photo overlays must keep hero text readable.

### 9.2 Interaction

All controls require:

- keyboard access;
- visible focus;
- clear labels;
- touch-friendly target sizes.

## 10. Design Tokens

### 10.1 Rule

Use semantic design tokens.

Do not scatter one-off brand colours across components.

### 10.2 Public vs Admin

The admin interface may remain denser and more functional, but it shares the same base neutral palette and accessibility standards.

The public website receives the premium editorial treatment.
