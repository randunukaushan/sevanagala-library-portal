# Data Import, Migration and Record Quality

## 1. Purpose

### 1.1 Objective

Define how existing paper, spreadsheet, and future digital records are cleaned, validated, imported, reviewed, and maintained.

## 2. Data Sources

### 2.1 Likely Sources

- paper registers;
- category counts;
- existing spreadsheets;
- book request lists;
- donor records;
- facility needs lists.

## 3. Import Principle

### 3.1 Never Import Blindly

Every import should have:

- source;
- owner;
- date;
- field mapping;
- validation;
- preview;
- error report.

## 4. Book Import Template

### 4.1 Recommended Columns

- title;
- subtitle;
- author;
- ISBN;
- language;
- classification;
- category;
- publisher;
- publication year;
- edition;
- copy count;
- location;
- condition;
- review status.

## 5. Data Cleaning

### 5.1 Standardise

Standardise:

- author naming;
- languages;
- classification values;
- categories;
- condition values;
- dates.

### 5.2 Duplicates

Identify:

- exact duplicates;
- same title/different edition;
- duplicate copy rows.

Do not merge automatically where uncertain.

## 6. ISBN Validation

### 6.1 Rule

If ISBN exists:

- preserve original;
- validate format;
- do not invent missing ISBNs.

## 7. Missing Data

### 7.1 Allowed

Records may be imported with missing fields if:

- record is still useful;
- missing data is marked;
- future cleanup is possible.

### 7.2 Not Allowed

Do not fabricate:

- author;
- year;
- ISBN;
- donor;
- quantity.

## 8. Import Workflow

### 8.1 Prepare

Export or enter source data into a template.

### 8.2 Validate

Check:

- required fields;
- value types;
- duplicates;
- invalid categories.

### 8.3 Preview

Show:

- valid rows;
- warning rows;
- rejected rows.

### 8.4 Approve

Authorised staff approve import.

### 8.5 Import

Run transaction-safe import.

### 8.6 Reconcile

Compare:

- source row count;
- imported count;
- rejected count.

## 9. Audit

### 9.1 Import Record

Store:

- source file;
- import date;
- user;
- total rows;
- accepted;
- rejected;
- warnings.

## 10. Collection Review

### 10.1 Outdated Books

Use review statuses.

Do not equate old publication year with automatic removal.

### 10.2 Damaged Books

Record separately from content currency.

## 11. Donor Data Migration

### 11.1 Public and Private Fields

Separate:

- public supporter name;
- private contact;
- consent;
- contribution;
- evidence.

## 12. Backup Before Import

### 12.1 Rule

Create a recoverable backup before large production imports.

## 13. Testing

### 13.1 Test Import

Run representative sample before full import.

### 13.2 Edge Cases

Test:

- Unicode Sinhala/Tamil;
- long titles;
- duplicate ISBN;
- missing ISBN;
- multiple copies;
- mixed languages.

## 14. Data Quality Metrics

### 14.1 Track

- percentage with classification;
- percentage with language;
- duplicate rate;
- unresolved review count;
- import error rate.

## 15. Ownership

### 15.1 Library Staff

Staff remain the authority for:

- classification;
- condition;
- collection decision.

### 15.2 Technical Team

Technical team manages:

- validation;
- import tools;
- database consistency.

It does not override librarian judgement.
