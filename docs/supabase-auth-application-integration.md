# Supabase Auth Application Integration

## 1. Purpose

### 1.1 Objective

Connect the Next.js 16 application to the migration-based Supabase backend while preserving the repository's institutional and security boundaries.

## 2. Current Status

### 2.1 Implemented in the Application

The repository now contains:

- `@supabase/supabase-js`;
- `@supabase/ssr`;
- browser and server Supabase client factories;
- Next.js 16 `proxy.ts` session refresh wiring;
- verified staff identity checks using `auth.getClaims()`;
- staff sign-in and sign-out;
- protected `/admin` routes;
- a real Needs vertical slice;
- a safe public needs RPC/read model;
- prototype fallback when Supabase is not configured.

### 2.2 Environment and Acceptance Status

The admin operations migration was applied to a connected Supabase project on 2026-10-04 (see [Admin Operations Implementation](./admin-operations-implementation.md)). A developer's local environment still requires:

- a Supabase development project;
- project URL;
- publishable key;
- any remaining migrations reconciled/applied safely to the intended project;
- approved staff Auth users;
- profile activation and role assignment;
- authenticated browser and real Storage API acceptance testing.

No remote project credentials are committed to the repository. Do not infer that the existing connected project is production-approved; confirm its ownership, purpose and migration history before using it.

## 3. Environment Variables

### 3.1 Browser-Safe Values

Local `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

These values identify the project and use the public/publishable API key.

### 3.2 Never Commit

Do not commit:

- service-role keys;
- database passwords;
- access tokens;
- refresh tokens;
- private backup credentials.

## 4. SSR Authentication

### 4.1 Client Types

`lib/supabase/client.ts` creates a browser client.

`lib/supabase/server.ts` creates a cookie-aware server client.

### 4.2 Session Refresh

Next.js 16 uses the root `proxy.ts` file.

The proxy calls the Supabase session helper to:

- read request cookies;
- validate/refresh Auth claims;
- write refreshed cookies to the response.

### 4.3 Identity Verification

Protected server routes use `supabase.auth.getClaims()`.

Do not authorize a staff route by trusting a raw session object alone.

## 5. Staff Access

### 5.1 Login

Route:

`/staff-login`

Uses email/password Auth for approved staff accounts.

Password sign-in is followed by mandatory TOTP enrollment/verification at
/staff-mfa. The staff workspace and database permission helpers require
aal2; see [Security Audit Remediation](./security-audit-remediation.md).

### 5.2 Profile Gate

Successful authentication is not enough by itself.

The linked `profiles` row must be:

- present;
- `active`;
- assigned an appropriate role for privileged actions.

### 5.3 Protected Workspace

Route:

`/admin`

The staff workspace is separate from the static `/admin-preview` UI.

## 6. Needs Vertical Slice

### 6.1 Draft

An active staff user with `needs.manage` can create a private Draft need.

### 6.2 Submit

A Draft can move to Pending Approval.

The tightened RLS policy prevents the ordinary needs-manager update policy from publishing a need.

### 6.3 Approve and Publish

A role with `needs.publish` may move Pending Approval to Seeking Support and set:

- `published_at`;
- `last_verified_at`.

### 6.4 Public Read

The public website does not receive anonymous access to private supporter, pledge, or donation tables.

Instead it calls:

`public.get_public_needs()`

The function exposes only the safe fields required for the public need registry and calculates:

- target quantity;
- outstanding accepted pledged quantity;
- verified received quantity;
- remaining quantity.

## 7. Prototype Fallback

### 7.1 Unconfigured Environment

When Supabase environment variables do not exist:

- public Needs uses clearly-labelled sample data;
- Staff Login says the backend connection is pending;
- protected admin routes redirect to Staff Login.

### 7.2 Configured Environment

When Supabase is configured:

- the public Needs page uses the safe database read model;
- sample need cards are no longer silently mixed into the live registry.

## 8. Development Project Setup

### 8.1 Apply Migrations

After a development project is created:

1. configure the project connection locally;
2. apply every migration in order;
3. run the RLS/database test suite;
4. confirm the seeded roles, permissions, and need categories;
5. create a test staff Auth user;
6. activate the user's `profiles` row;
7. assign a role.

### 8.2 Recommended First Test Roles

Use separate test accounts where possible:

- Needs Manager;
- Content and Verification Approver;
- Library Administrator.

This makes separation-of-duty testing clearer.

## 9. Acceptance Checks

### 9.1 Authentication

Verify:

- wrong password is rejected;
- signed-out user cannot open `/admin`;
- inactive profile cannot open `/admin`;
- sign out clears staff access.

### 9.2 Needs Workflow

Verify:

- Needs Manager creates Draft;
- Needs Manager submits Pending Approval;
- Needs Manager cannot publish through database policy;
- Approver can publish;
- published need appears on `/needs`;
- draft/pending needs never appear publicly.

### 9.3 Privacy

Verify:

- anonymous users cannot select supporters;
- anonymous users cannot select pledges;
- anonymous users cannot select donations;
- anonymous users can execute only the safe public needs read function.

## 10. Next Steps

### 10.1 Remote Development Connection

Connect a dedicated development Supabase project and run the acceptance checks.

### 10.2 Generated Database Types

After the remote/local Supabase schema is stable, generate TypeScript database types and replace untyped table/RPC access.

### 10.3 Next Vertical Slice

After Needs passes acceptance:

**Partner → Pledge → Receipt → Verification → Safe public progress**

Keep financial cash/payment functionality outside V1 until institutional approval exists.
