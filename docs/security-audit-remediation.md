# Security Audit Remediation

## 1. Scope

### 1.1 October 2026 Hardening

The independent audit remediation adds:

- publisher-only edits to milestones/specifications beneath published parents;
- old/new parent checks and parent locks against concurrent publication;
- MFA-enforced staff permissions at application and database boundaries;
- append-only audit triggers with minimal, privacy-safe summaries;
- database-assigned staff attribution;
- removal of all anonymous CRM access and anonymous default table grants;
- affected-row checks for workflow updates;
- patched Next.js 16.3.6, npm lockfile and production audit gate;
- unique migration version checks and browser security headers.

## 2. Staff MFA

### 2.1 Enrollment and Sign-In

After password sign-in, approved active staff are directed to /staff-mfa.
First-time staff explicitly enroll an individual TOTP authenticator and verify
its six-digit code. Returning staff verify their existing authenticator.
The enrollment QR exists only in component memory; do not log or share it.

All privileged database permissions require an aal2 JWT. A password-only
session retains profile self-read for the enrollment account-status check.
Hiding UI alone does not enforce this boundary.

### 2.2 Recovery

Lost-factor recovery is an authorised project-owner operation after identity
verification. Do not restore the retired public first-admin claim flow, share
accounts, or weaken MFA policies to solve onboarding problems.
The application does not expose a public recovery bypass.

## 3. Audit Logging

### 3.1 Privacy and Integrity

Application tables record insert/update/delete events using private trigger-only
functions. The actor is derived from auth.uid(), not a submitted actor field.
Trusted database maintenance has a null actor and is labelled accordingly.
Original creation attribution is preserved on staff updates.

Audit summaries whitelist status, publication, account-role, consent and
verification fields. They do not copy contact details, bodies, notes, tokens,
passwords or evidence URLs. They are not full before/after backups.
Application roles cannot insert, update, delete or truncate audit events.
Authorised database owners can still administer the database; this is not an
external tamper-proof logging service.

## 4. Migration History

### 4.1 Local Duplicate Repair

The local close_unsafe_bootstrap_and_public_writes replay file changed from
duplicate version 202610030009 to 202610030010.
The connected project's remote history already has distinct versions:
20261002202810_partnerships_crm_indexes and
20261003175850_close_unsafe_bootstrap_and_public_writes.
Neither existing remote migration is reapplied or renamed.

MCP-applied remote versions differ from early repository replay versions.
Do not run a blind supabase db push against this project. Reconcile the entire
local/remote history with migration list and a reviewed history mapping first.
CI rejects duplicate local prefixes and replays the complete SQL sequence.

## 5. Verification

### 5.1 Checks

Run npm ci, npm run security:check, npm run security:audit,
npm run lint, npm run typecheck and npm run build.
Database CI replays all migrations with Supabase Auth stubs and runs foundation,
publication and remediation regression assertions in rollback transactions.
Those stubs are not a substitute for real Supabase Auth integration testing.

### 5.2 Regression Coverage

The remediation SQL tests check password-only denial, AAL2 access, profile
self-read before enrollment, draft child edits, published child denial,
parent reassignment denial, publisher edits, provenance, audit insertion
and absence of anonymous CRM write grants.

## 6. Remaining Release Conditions

### 6.1 Unpatched Build Dependency

As of the audit, braces <=3.0.3 has no upstream patched release for
GHSA-vfj7-8cjw-p6xm. It is reachable through the dev-only Next ESLint glob chain,
not the installed production dependency tree. Full npm audit remains nonzero;
the production-only audit is a blocking CI gate. A separate full-dependency gate
permits only this exact advisory and its dev-only parent chain until 2026-10-18.
New high/critical advisories, production exposure, audit failures or expiry block
CI. The exception is visible in logs; it does not label braces as patched.

Do not downgrade Next ESLint to an incompatible major to hide the warning.
Keep build glob patterns repository-controlled, do not run untrusted projects
in privileged CI, and review the recorded full audit until upstream remediation
is available. This is an outstanding dev-tooling risk, not a closed finding.

### 6.2 Operational Checks

Before real staff/data launch, test enrollment and repeat sign-in on a dedicated
approved test account. Confirm Auth TOTP is enabled, rate limits/CAPTCHA and
password policy in the dashboard, hosting TLS, backups and authorised recovery.
No buckets or storage policies are added by this patch.

The CSP here protects framing, object embedding, base URLs and form actions.
It is not a complete nonce-based script CSP. Do not claim full XSS protection.
