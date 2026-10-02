import Link from "next/link";
import {
  addContact,
  completeFollowUp,
  createFollowUp,
  createOpportunity,
  createSupporter,
  logOutreach,
  updateOpportunityStage,
} from "@/app/admin/partnerships/actions";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const inputClass =
  "min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

const stages = [
  ["research", "Research"],
  ["ready_to_contact", "Ready to contact"],
  ["contacted", "Contacted"],
  ["replied", "Replied"],
  ["interested", "Interested"],
  ["proposal_sent", "Proposal sent"],
  ["reviewing", "Reviewing"],
  ["not_now", "Not now"],
  ["closed", "Closed"],
] as const;

const supportTypes = [
  ["funding", "Funding"],
  ["books", "Books"],
  ["technology", "Technology"],
  ["furniture", "Furniture"],
  ["facilities", "Facilities"],
  ["services", "Services"],
  ["training", "Training"],
  ["connectivity", "Connectivity"],
  ["other", "Other"],
] as const;

function titleFromJson(value: unknown, fallback: string) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "en" in value) {
    const candidate = (value as Record<string, unknown>).en;
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return fallback;
}

function stageTone(stage: string) {
  if (stage === "converted_to_pledge") return "success" as const;
  if (stage === "interested" || stage === "proposal_sent" || stage === "reviewing") {
    return "info" as const;
  }
  if (stage === "not_now" || stage === "closed") return "neutral" as const;
  if (stage === "replied") return "warning" as const;
  return "neutral" as const;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatMoney(value: number | null, currency: string | null) {
  if (value === null || !currency) return "—";
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

export default async function PartnershipsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const [
    supportersResult,
    contactsResult,
    opportunitiesResult,
    followUpsResult,
    outreachResult,
    needsResult,
    projectsResult,
  ] = await Promise.all([
    supabase
      .from("supporters")
      .select(
        "id, internal_name, supporter_type, country, public_website, contact_person, contact_email, updated_at",
      )
      .order("updated_at", { ascending: false }),
    supabase
      .from("supporter_contacts")
      .select("id, supporter_id, full_name, job_title, email, phone, is_primary")
      .order("is_primary", { ascending: false })
      .order("full_name"),
    supabase
      .from("partnership_opportunities")
      .select(
        "id, supporter_id, need_id, project_id, pledge_id, title, support_type, stage, source, expected_support_summary, estimated_value, estimated_currency, next_step, next_follow_up_at, updated_at",
      )
      .order("updated_at", { ascending: false }),
    supabase
      .from("follow_up_tasks")
      .select(
        "id, supporter_id, contact_id, opportunity_id, title, due_at, priority, status, notes",
      )
      .eq("status", "open")
      .order("due_at", { ascending: true }),
    supabase
      .from("outreach_interactions")
      .select(
        "id, supporter_id, contact_id, opportunity_id, direction, channel, subject, summary, occurred_at",
      )
      .order("occurred_at", { ascending: false })
      .limit(20),
    supabase
      .from("needs")
      .select("id, title, status")
      .order("updated_at", { ascending: false })
      .limit(100),
    supabase
      .from("projects")
      .select("id, title, status")
      .order("updated_at", { ascending: false })
      .limit(100),
  ]);

  const supporters = supportersResult.data ?? [];
  const contacts = contactsResult.data ?? [];
  const opportunities = opportunitiesResult.data ?? [];
  const followUps = followUpsResult.data ?? [];
  const outreach = outreachResult.data ?? [];
  const needs = needsResult.data ?? [];
  const projects = projectsResult.data ?? [];

  const supporterNames = new Map(
    supporters.map((supporter) => [supporter.id, supporter.internal_name]),
  );
  const contactNames = new Map(
    contacts.map((contact) => [contact.id, contact.full_name]),
  );
  const opportunityNames = new Map(
    opportunities.map((opportunity) => [opportunity.id, opportunity.title]),
  );

  const now = Date.now();
  const activeOpportunityCount = opportunities.filter(
    (item) => !["converted_to_pledge", "not_now", "closed"].includes(item.stage),
  ).length;
  const overdueFollowUpCount = followUps.filter(
    (item) => new Date(item.due_at).getTime() < now,
  ).length;

  const queryError =
    supportersResult.error ||
    contactsResult.error ||
    opportunitiesResult.error ||
    followUpsResult.error ||
    outreachResult.error;

  const createdLabel =
    params.created === "supporter"
      ? "Organization/supporter saved."
      : params.created === "contact"
        ? "Contact saved."
        : params.created === "opportunity"
          ? "Opportunity saved."
          : params.created === "outreach"
            ? "Outreach record saved."
            : params.created === "followup"
              ? "Follow-up scheduled."
              : null;

  const updatedLabel =
    params.updated === "stage"
      ? "Opportunity stage updated."
      : params.updated === "followup"
        ? "Follow-up completed."
        : null;

  return (
    <>
      <AdminPageHeader
        eyebrow="Funding & partnerships"
        title="Partnership CRM"
        description="Track organisations, contacts, funding opportunities, outreach and follow-ups without mixing early interest with verified pledges or received support."
        action={
          <Link className="button-secondary" href="/admin">
            Back to dashboard
          </Link>
        }
      />

      {createdLabel || updatedLabel ? (
        <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-success-soft)] px-5 py-4 text-sm font-bold text-[var(--color-success)]">
          {createdLabel ?? updatedLabel}
        </div>
      ) : null}

      {params.error || queryError ? (
        <div
          className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-danger-soft)] px-5 py-4 text-sm font-bold text-[var(--color-danger)]"
          role="alert"
        >
          The requested CRM action could not be completed. Check the fields and your
          partnership permissions, then try again.
        </div>
      ) : null}

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Partnership summary">
        {[
          ["Supporters", supporters.length, "Organisations and other supporter records"],
          ["Active opportunities", activeOpportunityCount, "Research through active review"],
          ["Open follow-ups", followUps.length, "Tasks still waiting for action"],
          ["Overdue follow-ups", overdueFollowUpCount, "Follow-ups past their due time"],
        ].map(([label, value, help]) => (
          <article className="card p-5" key={String(label)}>
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand-primary)]">
              {label}
            </p>
            <p className="mt-2 text-3xl font-black">{value}</p>
            <p className="muted mt-2 text-sm">{help}</p>
          </article>
        ))}
      </section>

      <div className="mt-7 grid gap-6">
        <AdminSection
          eyebrow="PIPELINE"
          title="Funding & partnership opportunities"
        >
          {opportunities.length === 0 ? (
            <div className="p-6">
              <p className="font-bold">No opportunities yet.</p>
              <p className="muted mt-2 text-sm">
                Add an organisation below, then create the first funding or in-kind
                opportunity.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                <thead className="bg-[var(--color-surface-soft)]">
                  <tr>
                    <th className="px-5 py-3 font-extrabold">Opportunity</th>
                    <th className="px-5 py-3 font-extrabold">Supporter</th>
                    <th className="px-5 py-3 font-extrabold">Type</th>
                    <th className="px-5 py-3 font-extrabold">Value</th>
                    <th className="px-5 py-3 font-extrabold">Next follow-up</th>
                    <th className="px-5 py-3 font-extrabold">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {opportunities.map((item) => (
                    <tr key={item.id} className="bg-[var(--color-surface)] align-top">
                      <td className="px-5 py-4">
                        <p className="font-bold">{item.title}</p>
                        {item.next_step ? (
                          <p className="muted mt-1 max-w-sm text-xs">{item.next_step}</p>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 font-medium">
                        {supporterNames.get(item.supporter_id) ?? "Unknown supporter"}
                      </td>
                      <td className="px-5 py-4 capitalize">
                        {item.support_type.replaceAll("_", " ")}
                      </td>
                      <td className="px-5 py-4">
                        {formatMoney(item.estimated_value, item.estimated_currency)}
                      </td>
                      <td className="px-5 py-4">{formatDate(item.next_follow_up_at)}</td>
                      <td className="px-5 py-4">
                        <div className="grid gap-2">
                          <AdminStatusPill
                            label={item.stage.replaceAll("_", " ")}
                            tone={stageTone(item.stage)}
                          />
                          <form action={updateOpportunityStage} className="flex gap-2">
                            <input name="id" type="hidden" value={item.id} />
                            <select
                              className={inputClass + " min-h-9 py-1"}
                              defaultValue={item.stage}
                              name="stage"
                              aria-label={`Update stage for ${item.title}`}
                            >
                              {stages.map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </select>
                            <button className="button-secondary text-xs" type="submit">
                              Save
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminSection>

        <AdminSection eyebrow="ATTENTION QUEUE" title="Open follow-ups">
          {followUps.length === 0 ? (
            <p className="muted p-6">No open follow-ups.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                <thead className="bg-[var(--color-surface-soft)]">
                  <tr>
                    <th className="px-5 py-3 font-extrabold">Task</th>
                    <th className="px-5 py-3 font-extrabold">Supporter</th>
                    <th className="px-5 py-3 font-extrabold">Opportunity</th>
                    <th className="px-5 py-3 font-extrabold">Due</th>
                    <th className="px-5 py-3 font-extrabold">Priority</th>
                    <th className="px-5 py-3 font-extrabold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {followUps.map((task) => {
                    const overdue = new Date(task.due_at).getTime() < now;
                    return (
                      <tr key={task.id} className="bg-[var(--color-surface)]">
                        <td className="px-5 py-4 font-bold">{task.title}</td>
                        <td className="px-5 py-4">
                          {supporterNames.get(task.supporter_id) ?? "Unknown supporter"}
                        </td>
                        <td className="px-5 py-4">
                          {task.opportunity_id
                            ? opportunityNames.get(task.opportunity_id) ?? "Linked opportunity"
                            : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className={overdue ? "font-bold text-[var(--color-danger)]" : ""}>
                            {formatDate(task.due_at)}
                          </span>
                        </td>
                        <td className="px-5 py-4 capitalize">{task.priority}</td>
                        <td className="px-5 py-4">
                          <form action={completeFollowUp}>
                            <input name="id" type="hidden" value={task.id} />
                            <button className="button-secondary text-xs" type="submit">
                              Mark done
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </AdminSection>

        <AdminSection eyebrow="RELATIONSHIPS" title="Supporters & contacts">
          {supporters.length === 0 ? (
            <p className="muted p-6">No supporters or partner organisations recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="bg-[var(--color-surface-soft)]">
                  <tr>
                    <th className="px-5 py-3 font-extrabold">Name</th>
                    <th className="px-5 py-3 font-extrabold">Type</th>
                    <th className="px-5 py-3 font-extrabold">Country</th>
                    <th className="px-5 py-3 font-extrabold">Primary contact</th>
                    <th className="px-5 py-3 font-extrabold">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {supporters.map((supporter) => {
                    const primary = contacts.find(
                      (contact) => contact.supporter_id === supporter.id && contact.is_primary,
                    );
                    return (
                      <tr key={supporter.id} className="bg-[var(--color-surface)]">
                        <td className="px-5 py-4 font-bold">{supporter.internal_name}</td>
                        <td className="px-5 py-4 capitalize">
                          {supporter.supporter_type.replaceAll("_", " ")}
                        </td>
                        <td className="px-5 py-4">{supporter.country ?? "—"}</td>
                        <td className="px-5 py-4">
                          {primary?.full_name ?? supporter.contact_person ?? "—"}
                        </td>
                        <td className="px-5 py-4">
                          {primary?.email ?? supporter.contact_email ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </AdminSection>

        <AdminSection eyebrow="RECENT ACTIVITY" title="Outreach log">
          {outreach.length === 0 ? (
            <p className="muted p-6">No outreach interactions logged yet.</p>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {outreach.map((item) => (
                <article className="p-5" key={item.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminStatusPill
                      label={item.direction === "inbound" ? "Inbound" : "Outbound"}
                      tone={item.direction === "inbound" ? "info" : "neutral"}
                    />
                    <span className="text-sm font-bold capitalize">{item.channel}</span>
                    <span className="muted text-xs">{formatDate(item.occurred_at)}</span>
                  </div>
                  <h3 className="mt-2 font-black">
                    {item.subject || supporterNames.get(item.supporter_id) || "Outreach"}
                  </h3>
                  <p className="muted mt-1 text-sm">{item.summary}</p>
                  <p className="muted mt-2 text-xs">
                    {supporterNames.get(item.supporter_id) ?? "Unknown supporter"}
                    {item.contact_id
                      ? ` · ${contactNames.get(item.contact_id) ?? "Contact"}`
                      : ""}
                  </p>
                </article>
              ))}
            </div>
          )}
        </AdminSection>
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <form action={createSupporter}>
          <AdminSection eyebrow="ADD RELATIONSHIP" title="New organisation or supporter">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Supporter type" required>
                <select className={inputClass} defaultValue="organisation" name="supporter_type">
                  <option value="organisation">Organisation</option>
                  <option value="community_group">Community group</option>
                  <option value="individual">Individual</option>
                </select>
              </AdminFormField>
              <AdminFormField label="Name" required>
                <input className={inputClass} maxLength={180} name="internal_name" required />
              </AdminFormField>
              <AdminFormField label="Country">
                <input className={inputClass} maxLength={120} name="country" />
              </AdminFormField>
              <AdminFormField label="Website">
                <input className={inputClass} maxLength={500} name="public_website" type="url" />
              </AdminFormField>
              <AdminFormField label="Primary contact name">
                <input className={inputClass} maxLength={160} name="contact_name" />
              </AdminFormField>
              <AdminFormField label="Job title">
                <input className={inputClass} maxLength={160} name="contact_title" />
              </AdminFormField>
              <AdminFormField label="Contact email">
                <input className={inputClass} maxLength={254} name="contact_email" type="email" />
              </AdminFormField>
              <AdminFormField label="Contact phone">
                <input className={inputClass} maxLength={80} name="contact_phone" />
              </AdminFormField>
              <div className="md:col-span-2">
                <button className="button-primary" type="submit">
                  Save supporter
                </button>
              </div>
            </div>
          </AdminSection>
        </form>

        <form action={addContact}>
          <AdminSection eyebrow="CONTACTS" title="Add another contact">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <AdminFormField label="Supporter" required>
                  <select className={inputClass} name="supporter_id" required>
                    <option value="">Select supporter</option>
                    {supporters.map((supporter) => (
                      <option key={supporter.id} value={supporter.id}>
                        {supporter.internal_name}
                      </option>
                    ))}
                  </select>
                </AdminFormField>
              </div>
              <AdminFormField label="Full name" required>
                <input className={inputClass} maxLength={160} name="full_name" required />
              </AdminFormField>
              <AdminFormField label="Job title">
                <input className={inputClass} maxLength={160} name="job_title" />
              </AdminFormField>
              <AdminFormField label="Email">
                <input className={inputClass} maxLength={254} name="email" type="email" />
              </AdminFormField>
              <AdminFormField label="Phone">
                <input className={inputClass} maxLength={80} name="phone" />
              </AdminFormField>
              <AdminFormField label="Preferred contact">
                <select className={inputClass} defaultValue="email" name="preferred_contact_method">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="other">Other</option>
                </select>
              </AdminFormField>
              <div className="flex items-end">
                <button className="button-primary w-full" type="submit">
                  Add contact
                </button>
              </div>
            </div>
          </AdminSection>
        </form>

        <form action={createOpportunity}>
          <AdminSection eyebrow="PIPELINE" title="Create opportunity">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Supporter" required>
                <select className={inputClass} name="supporter_id" required>
                  <option value="">Select supporter</option>
                  {supporters.map((supporter) => (
                    <option key={supporter.id} value={supporter.id}>
                      {supporter.internal_name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Support type" required>
                <select className={inputClass} defaultValue="funding" name="support_type">
                  {supportTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField label="Opportunity title" required>
                  <input className={inputClass} maxLength={200} name="title" required />
                </AdminFormField>
              </div>
              <AdminFormField label="Related need">
                <select className={inputClass} name="need_id">
                  <option value="">None</option>
                  {needs.map((need) => (
                    <option key={need.id} value={need.id}>
                      {titleFromJson(need.title, "Untitled need")} · {need.status}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Related project">
                <select className={inputClass} name="project_id">
                  <option value="">None</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {titleFromJson(project.title, "Untitled project")} · {project.status}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Estimated value">
                <input className={inputClass} min="0" name="estimated_value" step="0.01" type="number" />
              </AdminFormField>
              <AdminFormField label="Currency">
                <input
                  className={inputClass}
                  maxLength={3}
                  name="estimated_currency"
                  placeholder="LKR"
                />
              </AdminFormField>
              <AdminFormField label="Source">
                <select className={inputClass} defaultValue="manual" name="source">
                  <option value="manual">Manual research</option>
                  <option value="gmail">Gmail</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </AdminFormField>
              <AdminFormField label="Next follow-up">
                <input className={inputClass} name="next_follow_up_at" type="datetime-local" />
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField
                  label="Expected support / fit"
                  help="Describe the possible support without treating interest as a pledge."
                >
                  <textarea className={inputClass + " min-h-24 resize-y"} maxLength={2000} name="expected_support_summary" />
                </AdminFormField>
              </div>
              <div className="md:col-span-2">
                <AdminFormField label="Next step">
                  <textarea className={inputClass + " min-h-20 resize-y"} maxLength={1000} name="next_step" />
                </AdminFormField>
              </div>
              <div className="md:col-span-2">
                <button className="button-primary" type="submit">
                  Save opportunity
                </button>
              </div>
            </div>
          </AdminSection>
        </form>

        <form action={logOutreach}>
          <AdminSection eyebrow="EMAIL / CONTACT" title="Log outreach or reply">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Supporter" required>
                <select className={inputClass} name="supporter_id" required>
                  <option value="">Select supporter</option>
                  {supporters.map((supporter) => (
                    <option key={supporter.id} value={supporter.id}>
                      {supporter.internal_name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Contact">
                <select className={inputClass} name="contact_id">
                  <option value="">None</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.full_name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Opportunity">
                <select className={inputClass} name="opportunity_id">
                  <option value="">None</option>
                  {opportunities.map((opportunity) => (
                    <option key={opportunity.id} value={opportunity.id}>
                      {opportunity.title}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Direction" required>
                <select className={inputClass} defaultValue="outbound" name="direction">
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound reply</option>
                </select>
              </AdminFormField>
              <AdminFormField label="Channel" required>
                <select className={inputClass} defaultValue="email" name="channel">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="meeting">Meeting</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </AdminFormField>
              <AdminFormField label="When">
                <input className={inputClass} name="occurred_at" type="datetime-local" />
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField label="Subject">
                  <input className={inputClass} maxLength={300} name="subject" />
                </AdminFormField>
              </div>
              <div className="md:col-span-2">
                <AdminFormField
                  label="Short summary"
                  help="Store only what staff need for follow-up. Do not paste passwords, tokens or unnecessary full email bodies."
                  required
                >
                  <textarea className={inputClass + " min-h-28 resize-y"} maxLength={3000} name="summary" required />
                </AdminFormField>
              </div>
              <div className="md:col-span-2">
                <button className="button-primary" type="submit">
                  Save interaction
                </button>
              </div>
            </div>
          </AdminSection>
        </form>

        <form action={createFollowUp} className="xl:col-span-2">
          <AdminSection eyebrow="FOLLOW-UP" title="Schedule next action">
            <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-4">
              <AdminFormField label="Supporter" required>
                <select className={inputClass} name="supporter_id" required>
                  <option value="">Select supporter</option>
                  {supporters.map((supporter) => (
                    <option key={supporter.id} value={supporter.id}>
                      {supporter.internal_name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Opportunity">
                <select className={inputClass} name="opportunity_id">
                  <option value="">None</option>
                  {opportunities.map((opportunity) => (
                    <option key={opportunity.id} value={opportunity.id}>
                      {opportunity.title}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Contact">
                <select className={inputClass} name="contact_id">
                  <option value="">None</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.full_name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Priority">
                <select className={inputClass} defaultValue="medium" name="priority">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField label="Task" required>
                  <input className={inputClass} maxLength={200} name="title" required />
                </AdminFormField>
              </div>
              <AdminFormField label="Due" required>
                <input className={inputClass} name="due_at" required type="datetime-local" />
              </AdminFormField>
              <div className="flex items-end">
                <button className="button-primary w-full" type="submit">
                  Schedule follow-up
                </button>
              </div>
              <div className="md:col-span-2 xl:col-span-4">
                <AdminFormField label="Notes">
                  <textarea className={inputClass + " min-h-20 resize-y"} maxLength={2000} name="notes" />
                </AdminFormField>
              </div>
            </div>
          </AdminSection>
        </form>
      </div>

      <div className="mt-7 card p-5">
        <p className="eyebrow">Gmail integration boundary</p>
        <h2 className="font-black">CRM first, mailbox sync next</h2>
        <p className="muted mt-2 text-sm">
          This version records outreach safely without storing Gmail passwords or access
          tokens. Future Gmail sync can attach provider thread/message IDs to these
          records while keeping authentication in the approved connector/OAuth layer.
        </p>
      </div>
    </>
  );
}
