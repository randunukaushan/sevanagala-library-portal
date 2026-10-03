-- Supabase default privileges also left anonymous SELECT grants in the live
-- project. RLS denied the rows, but private CRM tables need no anonymous access.
revoke all privileges on public.supporter_contacts, public.partnership_opportunities,
  public.outreach_interactions, public.follow_up_tasks from anon;
