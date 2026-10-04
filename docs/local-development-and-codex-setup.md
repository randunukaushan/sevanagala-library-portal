# Local Development and Codex Setup

## 1. Purpose

### 1.1 Objective

Define the local setup for developing the Sevanagala Public Library Portal with VS Code, Git, and Codex.

## 2. Current Application Baseline

### 2.1 Framework

The prototype baseline uses:

- Next.js 16.3.6
- React 19.3
- TypeScript
- Tailwind CSS 4
- App Router
- ESLint

The package lockfile pins the installed versions. Review updates before upgrading; the current package requires Node.js 22 or later because the application and Supabase dependencies declare that engine requirement.

### 2.2 Node.js

Use Node.js 22 or later for local development and CI.

## 3. Clone and Install

### 3.1 Clone

```powershell
git clone https://github.com/randunukaushan/sevanagala-library-portal.git
cd sevanagala-library-portal
```

### 3.2 Install Dependencies

```powershell
npm ci
```

Use `npm ci` to reproduce the committed lockfile. Only change dependencies intentionally, then review and commit the resulting lockfile.

## 4. Run the Prototype

### 4.1 Development Server

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

### 4.2 Production Build

```powershell
npm run build
npm run start
```

## 5. Quality Commands

### 5.1 Lint

```powershell
npm run lint
```

### 5.2 Type Check

```powershell
npm run typecheck
```

### 5.3 Build

```powershell
npm run build
```

Before merging a feature, run all three.

## 6. VS Code and Codex Workflow

### 6.1 Open the Repository

Open the repository folder in VS Code.

### 6.2 Read Instructions

Codex should read:

- `AGENTS.md`
- the relevant files under `docs/`

before editing code.

### 6.3 Feature Branch

For non-trivial work:

```powershell
git switch main
git pull
git switch -c feat/<feature-name>
```

### 6.4 Recommended Codex Prompt

```text
Read AGENTS.md and the relevant docs first.
Inspect the existing implementation before editing.
Implement only the requested feature.
Do not change unrelated architecture.
Use sample data if official library data is not approved.
Add or update tests where critical logic changes.
Run npm run lint, npm run typecheck, and npm run build.
Summarise changed files, assumptions, tests, and remaining risks.
```

## 7. Prototype Boundary

### 7.1 Sample Data

Until institutional approval:

- use clearly marked sample data;
- do not publish real private donor information;
- do not claim the site is official;
- do not use unapproved logos;
- do not add online payment functionality.

## 8. Environment Variables

### 8.1 Template

Use `.env.example` as the list of expected environment variables.

### 8.2 Secrets

Never commit:

- Supabase service-role keys;
- passwords;
- tokens;
- production secrets.

## 9. Backend Status

### 9.1 Current Application

The site includes sample-data fallback when the backend is not configured and Supabase-backed public read models and protected staff workflows when configured. `/admin-preview` remains static/sample-only; `/admin` requires the connected backend and authenticated staff.

### 9.2 Environment Setup

An approved development environment requires:

- a dedicated Supabase project and public URL/publishable key in local environment settings;
- migrations reconciled and applied in order (do not run a blind `supabase db push` against the connected project);
- approved staff account plus MFA for acceptance testing.

See [Security Audit Remediation](./security-audit-remediation.md) and [Admin Operations Implementation](./admin-operations-implementation.md) for current migration and acceptance status.

## 10. GitHub CI

### 10.1 Checks

GitHub Actions runs:

- dependency install;
- lint;
- TypeScript check;
- production build.

### 10.2 Merge Rule

Do not merge code that fails required quality checks.
