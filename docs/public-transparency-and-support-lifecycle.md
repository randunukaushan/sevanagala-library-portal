# Public Transparency and Support Lifecycle

## 1. Purpose

### 1.1 Objective

This document defines the safe public transparency boundary for needs, pledges, verified donations, and supporter recognition.

The public website must never read private supporter contact fields directly.

## 2. Need Progress

### 2.1 Quantities

Public need progress uses three distinct quantities:

- **Verified received**: quantities physically received and verified.
- **Outstanding accepted pledge**: the unfulfilled balance of active accepted/scheduled/in-transit/partially-received pledges.
- **Remaining uncommitted**: target quantity minus verified received minus outstanding accepted pledge balance, floored at zero.

A pledge is not treated as received. A recorded receipt is not treated as verified.

### 2.2 Double-Count Prevention

When a donation is linked to a pledge, its verified quantity reduces that pledge's outstanding balance. This prevents the same support from being counted once as a pledge and again as verified received support.

The public progress function also caps display quantities at the need target so over-delivery cannot produce negative remaining quantities.

## 3. Supporter Recognition

### 3.1 Public Boundary

The public recognition function exposes only:

- public display name;
- approved public website;
- approved public logo media reference.

A supporter appears only when both recognition consent and public visibility are true and a public display name exists.

### 3.2 Private Fields

The public function does not expose internal name, contact person, email, phone, internal notes, or other operational records.

Recognition is acknowledgement of support and does not imply institutional endorsement.

## 4. Database Interfaces

### 4.1 Public Functions

- `public.get_public_need_progress()`
- `public.get_public_supporter_recognition()`

Both functions are executable by anonymous and authenticated clients but return only the deliberately restricted public fields described above.

## 5. Next Integration

### 5.1 Application

The public Needs and Transparency pages should consume these safe read interfaces after the application is connected to a real Supabase project.

### 5.2 Further Controls

Before production launch:

- test these functions in a real local Supabase environment with Auth;
- add workflow functions for controlled lifecycle transitions;
- create audit events for important approval, verification, and publication actions;
- keep financial/payment functionality disabled until separately authorized.
