# Public Multilingual Architecture

## 1. Purpose

### 1.1 Objective

Provide a stable public-language foundation for:

- English;
- Sinhala;
- Tamil.

The public website uses language-prefixed URLs while staff/admin routes remain unprefixed.

## 2. Public URL Model

### 2.1 Supported Prefixes

Public routes use:

- `/en`
- `/si`
- `/ta`

Examples:

- `/en/about`
- `/si/about`
- `/ta/about`

### 2.2 Default Language

Unprefixed public routes redirect to English.

Example:

`/about` → `/en/about`

### 2.3 Staff Routes

Do not localise operational staff routes in this phase.

Examples:

- `/staff-login`
- `/admin`
- `/admin-preview`

## 3. Routing Implementation

### 3.1 Proxy Rewrite

The Next.js 16 `proxy.ts`:

1. detects the public locale prefix;
2. stores the locale in the `x-public-locale` request header;
3. rewrites the request internally to the existing public route;
4. preserves the visible language-prefixed URL;
5. continues Supabase session refresh without discarding the rewrite.

This avoids duplicating the public route tree.

### 3.2 Server Locale

Server Components call:

`getRequestLocale()`

The helper reads the locale header set by the proxy.

### 3.3 Client Locale

Client navigation components derive the locale from the visible pathname.

## 4. Language Switcher

### 4.1 Labels

Use visible language names:

- English
- සිංහල
- தமிழ்

Do not use national flags as language labels.

### 4.2 Current Page Preservation

Changing language keeps the same public route.

Example:

`/en/projects` → `/si/projects` → `/ta/projects`

## 5. Content Dictionaries

### 5.1 Navigation

Global public navigation and footer copy live in:

`lib/i18n/navigation.ts`

### 5.2 Public Pages

Public page copy lives in:

`lib/i18n/public-content.ts`

### 5.3 Needs UI

Need-card labels and statuses live in:

`lib/i18n/need-card.ts`

Prototype sample needs/projects live in:

`lib/i18n/sample-content.ts`

## 6. Live Database Content

### 6.1 JSON Translation Fields

Database content that already uses multilingual JSON fields should prefer the active locale.

Fallback order:

1. current locale;
2. English;
3. Sinhala;
4. Tamil.

### 6.2 Missing Translation

Do not invent an official translation silently.

If an approved database record does not yet have the requested translation, show an available fallback until staff add/review the translation.

## 7. Typography

### 7.1 English

English editorial headings may use Playfair Display.

### 7.2 Sinhala

Sinhala content uses Noto Sans Sinhala.

### 7.3 Tamil

Tamil content uses Noto Sans Tamil.

Do not force the English serif heading face onto Sinhala or Tamil text.

## 8. Translation Governance

### 8.1 Prototype Translation

The current Sinhala and Tamil content is prototype interface/content translation.

### 8.2 Official Launch

Before official publication, institutional wording should be reviewed by competent Sinhala and Tamil readers where accuracy matters.

Machine-generated or draft translations must not be silently treated as officially approved wording.

### 8.3 Dynamic Content

When staff editing becomes multilingual, forms should support separate fields for:

- English;
- Sinhala;
- Tamil.

Publishing rules may later require reviewed translations for selected high-priority institutional pages.

## 9. Accessibility

### 9.1 Document Language

The root HTML `lang` attribute follows the active public locale.

### 9.2 Language Menu

The switcher:

- uses readable language names;
- preserves keyboard navigation;
- identifies the current language;
- remains available on desktop and mobile.

## 10. SEO Follow-up

### 10.1 Planned

Before official deployment, add:

- locale-specific metadata;
- canonical URLs;
- `hreflang` alternates for English, Sinhala, and Tamil;
- translated page titles/descriptions;
- sitemap entries for public locale routes.

## 11. Scope Boundary

The multilingual feature changes public presentation and routing only.

It does not:

- translate the staff admin workspace yet;
- change database permission rules;
- expose private data;
- change the no-online-cash V1 boundary.
