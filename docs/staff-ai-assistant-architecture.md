# Staff AI Assistant Architecture

## 1. Status

Future feature. No AI provider, assistant UI, RAG, tools, or AI audit implementation exists in the current portal. Do not begin provider integration before data ownership, circulation scope and permissions are established.

## 2. Authority Boundary

The assistant is a staff-only copilot. It can produce sourced explanations, analysis and draft text. It does not become the catalogue, member system, circulation authority, publisher or donor verifier.

Never allow the model to independently publish, verify donations, create pledges, withdraw books, suspend members, issue/return items, alter due dates, or expose patron data. Every proposed write must use the existing deterministic permission-checked workflow and require explicit staff confirmation.

## 3. Data Access

Use a protected server-side provider abstraction with narrow typed tools, such as catalogue search, aggregate overdue counts, verified needs and approved-document search. Apply the requesting staff member's permissions before retrieving data. Do not provide a generic SQL execution tool or service-role credential to the model/browser.

If Koha is authoritative, circulation questions must use an approved, least-privilege Koha integration. Do not mirror full borrowing history in embeddings or analytics. Prefer aggregate answers; member-specific data is only available to staff with a specific operational permission and a clear task need.

## 4. Retrieval and Answers

Potential sources include approved policies, project documentation, public catalogue metadata, verified needs and authorized operational summaries. Cite the source records/documents where feasible. Say unavailable or unverified when data is absent or stale. Do not invent books, item status, shelf location, statistics or policy.

## 5. Audit and Operations

Record staff actor, task type, timestamp, provider/model, source/tool identifiers, accepted/rejected outcome and resulting application action ID where relevant. Do not store hidden reasoning, credentials, unnecessary member data or full private messages. Add per-user rate limits, task/token bounds, cost monitoring, retention and provider outage behavior before release.

## 6. Delivery Order

1. Complete current-state gap analysis and validate LMS/data owners.
2. Establish permission-scoped deterministic data tools and tests.
3. Add a small staff-only documentation Q&A prototype with citations.
4. Add read-only operational insights and aggregate analytics.
5. Add draft-writing/translation with explicit staff review.
6. Consider narrowly scoped, confirmed actions only after security and operational review.

