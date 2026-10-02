# Partnerships and Funding CRM

## 1. Purpose

### 1.1 Objective

Define the internal staff workflow for managing organisations, donor/partner contacts, funding opportunities, outreach, replies, and follow-up tasks.

The CRM extends the existing supporter, pledge, donation, need, project, and transparency model. It does not create a second donor system.

## 2. Core Principle

### 2.1 Relationship Before Commitment

An organisation being researched, contacted, or interested is not a pledge.

The system therefore keeps these stages separate:

```text
Supporter / Organisation
        ↓
Contact
        ↓
Opportunity
        ↓
Outreach / Reply
        ↓
Follow-up
        ↓
Confirmed commitment
        ↓
Existing Pledge
        ↓
Received Donation
        ↓
Verification
        ↓
Public Transparency
```

### 2.2 No Double Counting

CRM opportunity values are planning data only.

They must never contribute to public funded/received totals.

Only the existing approved pledge and verified donation records affect public support calculations.

## 3. Existing Tables Reused

### 3.1 supporters

The existing `supporters` table remains the canonical organisation/individual supporter record.

Do not create a duplicate organisations table.

### 3.2 pledges and donations

Confirmed commitments continue through:

- `pledges`;
- `donations`;
- `donation_evidence`.

### 3.3 needs and projects

Opportunities may link to a verified need or project.

This allows staff to answer:

- which organisation is being approached;
- for which library need/project;
- what the next action is;
- whether support later became a pledge.

## 4. CRM Tables

### 4.1 supporter_contacts

Purpose:

Store multiple operational contacts for one supporter.

Fields include:

- supporter;
- full name;
- job title;
- email;
- phone;
- preferred contact method;
- primary-contact flag;
- internal notes;
- audit fields.

Only authorised partnership staff may read these personal contact details.

### 4.2 partnership_opportunities

Purpose:

Track a possible funding or in-kind partnership before it becomes a confirmed pledge.

Fields include:

- supporter;
- related need/project;
- optional later pledge link;
- title;
- support type;
- stage;
- source;
- expected support summary;
- optional estimated value/currency;
- next step;
- next follow-up date;
- owner;
- internal notes;
- audit fields.

### 4.3 outreach_interactions

Purpose:

Record a minimal operational history of contacts and replies.

Fields include:

- supporter;
- optional contact;
- optional opportunity;
- inbound/outbound direction;
- channel;
- subject;
- short summary;
- occurrence time;
- optional Gmail thread/message IDs;
- creator and timestamp.

Do not copy full mailbox history into the CRM by default.

### 4.4 follow_up_tasks

Purpose:

Provide a staff attention queue.

Fields include:

- supporter;
- optional contact/opportunity;
- task;
- due date;
- priority;
- status;
- assignee;
- notes;
- completion date;
- audit fields.

## 5. Opportunity Stages

### 5.1 Stages

Supported stages:

- Research
- Ready to Contact
- Contacted
- Replied
- Interested
- Proposal Sent
- Reviewing
- Converted to Pledge
- Not Now
- Closed

### 5.2 Converted to Pledge

The UI must not allow staff to manually mark an opportunity as Converted to Pledge without a real pledge workflow.

The stage is reserved for a future controlled conversion action that creates/links an actual `pledges` record.

## 6. Support Types

### 6.1 Supported Categories

Examples:

- funding;
- books;
- technology;
- furniture;
- facilities;
- services;
- training;
- connectivity;
- other.

Cash/payment collection is not implemented by this CRM.

## 7. Gmail Integration Boundary

### 7.1 Current V1

V1 supports manual outreach logging.

It may store optional Gmail identifiers such as:

- thread ID;
- message ID.

It does not store:

- Gmail passwords;
- OAuth access tokens;
- refresh tokens;
- mailbox passwords;
- service-account secrets.

### 7.2 Future Gmail Sync

A future Gmail integration may:

1. connect through an approved OAuth/connector flow;
2. match sender/recipient addresses to supporter contacts;
3. attach Gmail thread/message IDs to CRM interactions;
4. create a draft CRM interaction from a relevant email;
5. require staff review before linking ambiguous records;
6. surface reply/follow-up reminders.

The mailbox remains the source for full email content unless a separately approved retention requirement exists.

## 8. Privacy

### 8.1 Data Minimisation

Store only information required to manage the partnership.

Avoid copying:

- unrelated personal details;
- full email bodies when a short summary is sufficient;
- attachments without a defined evidence purpose;
- passwords or authentication secrets.

### 8.2 Public Boundary

All CRM tables are staff-only.

Public donor/partner recognition continues through the approved public-support/transparency model and stored consent.

### 8.3 Retention

Before production use, the responsible authority should approve retention for:

- inactive opportunities;
- old outreach summaries;
- contact details;
- completed follow-up tasks.

## 9. Permissions

### 9.1 partnerships.manage

The CRM uses the `partnerships.manage` permission.

Initially granted to:

- Partnership Manager;
- Library Administrator.

### 9.2 Need and Project Visibility

Partnership staff may read need/project records needed for matching opportunities.

This does not give them edit or publish permission for those records.

## 10. Admin UX

### 10.1 Partnerships Dashboard

The staff dashboard should show:

- supporter count;
- active opportunities;
- open follow-ups;
- overdue follow-ups;
- opportunity pipeline;
- recent outreach;
- supporter/contact list.

### 10.2 Core Actions

Staff can:

- add supporter/organisation;
- add additional contact;
- create opportunity;
- log outreach/reply;
- schedule follow-up;
- complete follow-up;
- update ordinary opportunity stage.

## 11. Gmail-to-CRM Workflow

### 11.1 Future Example

```text
Incoming Gmail reply
      ↓
Match email address / thread
      ↓
Suggested supporter + opportunity
      ↓
Staff reviews
      ↓
Log inbound interaction
      ↓
Update opportunity stage if appropriate
      ↓
Create follow-up task
```

### 11.2 Safety Rule

An email saying "we are interested" is not a pledge.

A pledge is recorded only when the commitment meets the approved pledge workflow.

## 12. Acceptance Criteria

### 12.1 Data

- one supporter can have multiple contacts;
- one supporter can have multiple opportunities;
- interactions can link to supporter/contact/opportunity;
- follow-ups can be completed without deleting history;
- opportunity values do not change public support totals.

### 12.2 Security

- anonymous users cannot read CRM tables;
- only authorised partnership staff can manage CRM records;
- no Gmail password/token is stored;
- RLS is enabled on every CRM table.

### 12.3 Usability

A partnership staff member should be able to answer quickly:

- who was contacted;
- what was discussed;
- what support is being explored;
- which library need/project it relates to;
- when the next follow-up is due;
- whether the relationship later became a confirmed pledge.
