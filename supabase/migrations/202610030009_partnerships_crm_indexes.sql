-- Cover CRM foreign keys that are expected in joins, cascades, and staff filters.

create index supporter_contacts_created_by_idx
on public.supporter_contacts(created_by)
where created_by is not null;

create index supporter_contacts_updated_by_idx
on public.supporter_contacts(updated_by)
where updated_by is not null;

create index partnership_opportunities_pledge_idx
on public.partnership_opportunities(pledge_id)
where pledge_id is not null;

create index partnership_opportunities_owner_idx
on public.partnership_opportunities(owner_id)
where owner_id is not null;

create index partnership_opportunities_created_by_idx
on public.partnership_opportunities(created_by)
where created_by is not null;

create index partnership_opportunities_updated_by_idx
on public.partnership_opportunities(updated_by)
where updated_by is not null;

create index outreach_interactions_contact_idx
on public.outreach_interactions(contact_id)
where contact_id is not null;

create index outreach_interactions_created_by_idx
on public.outreach_interactions(created_by)
where created_by is not null;

create index follow_up_tasks_contact_idx
on public.follow_up_tasks(contact_id)
where contact_id is not null;

create index follow_up_tasks_assigned_to_idx
on public.follow_up_tasks(assigned_to)
where assigned_to is not null;

create index follow_up_tasks_created_by_idx
on public.follow_up_tasks(created_by)
where created_by is not null;

create index follow_up_tasks_updated_by_idx
on public.follow_up_tasks(updated_by)
where updated_by is not null;
