-- Local replay version repaired from duplicate 202610030009; remote migration
-- history already uses independent, unique versions. Do not reapply remotely.
-- Retire the exposed bootstrap mechanism. The old hash remains in migration
-- history, so it must never be accepted by a callable function again.
revoke execute on function public.claim_first_admin(text) from public, anon, authenticated;
revoke execute on function private.claim_first_admin(text) from public, anon, authenticated;

update private.staff_bootstrap
set token_hash = null
where singleton = true;

alter table private.staff_bootstrap enable row level security;

drop function public.claim_first_admin(text);
drop function private.claim_first_admin(text);

-- Project managers may edit only unpublished planned projects. Publishing and
-- editing already-published projects require the separate publish permission.
alter policy projects_staff_update on public.projects
  using (
    public.has_permission('projects.publish')
    or (
      public.has_permission('projects.manage')
      and status = 'planned'
      and published_at is null
    )
  )
  with check (
    public.has_permission('projects.publish')
    or (
      public.has_permission('projects.manage')
      and status = 'planned'
      and published_at is null
    )
  );

-- No public contact form is live. Close direct API writes until a validated,
-- abuse-resistant submission path is implemented and reviewed.
drop policy contact_public_insert on public.contact_messages;
revoke insert on public.contact_messages from anon, authenticated;
