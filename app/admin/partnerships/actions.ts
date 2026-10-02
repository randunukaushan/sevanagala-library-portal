"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/supabase/staff";

const supporterTypes = new Set(["organisation", "individual", "community_group"]);
const supportTypes = new Set([
  "funding",
  "books",
  "technology",
  "furniture",
  "facilities",
  "services",
  "training",
  "connectivity",
  "other",
]);
const stages = new Set([
  "research",
  "ready_to_contact",
  "contacted",
  "replied",
  "interested",
  "proposal_sent",
  "reviewing",
  "not_now",
  "closed",
]);
const directions = new Set(["outbound", "inbound"]);
const channels = new Set(["email", "phone", "whatsapp", "meeting", "website", "other"]);
const priorities = new Set(["high", "medium", "low"]);

async function requireStaff() {
  const staff = await getStaffContext();
  if (staff.status !== "active") redirect("/staff-login");
  return staff;
}

function text(formData: FormData, key: string, max = 4000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function optionalUuid(formData: FormData, key: string) {
  const value = text(formData, key, 80);
  return value || null;
}

function isoDateTime(value: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/admin/partnerships");
}

export async function createSupporter(formData: FormData) {
  await requireStaff();

  const supporterType = text(formData, "supporter_type", 40);
  const internalName = text(formData, "internal_name", 180);
  const country = text(formData, "country", 120);
  const website = text(formData, "public_website", 500);
  const contactName = text(formData, "contact_name", 160);
  const contactTitle = text(formData, "contact_title", 160);
  const contactEmail = text(formData, "contact_email", 254).toLowerCase();
  const contactPhone = text(formData, "contact_phone", 80);

  if (!supporterTypes.has(supporterType) || internalName.length < 2) {
    redirect("/admin/partnerships?error=supporter");
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("create_partnership_supporter", {
    p_supporter_type: supporterType,
    p_internal_name: internalName,
    p_country: country || null,
    p_public_website: website || null,
    p_contact_name: contactName || null,
    p_contact_title: contactTitle || null,
    p_contact_email: contactEmail || null,
    p_contact_phone: contactPhone || null,
  });

  if (error) redirect("/admin/partnerships?error=supporter");

  refresh();
  redirect("/admin/partnerships?created=supporter");
}

export async function addContact(formData: FormData) {
  const staff = await requireStaff();

  const supporterId = text(formData, "supporter_id", 80);
  const fullName = text(formData, "full_name", 160);
  const jobTitle = text(formData, "job_title", 160);
  const email = text(formData, "email", 254).toLowerCase();
  const phone = text(formData, "phone", 80);
  const preferred = text(formData, "preferred_contact_method", 20) || "email";

  if (
    !supporterId ||
    fullName.length < 1 ||
    (!email && !phone) ||
    !new Set(["email", "phone", "whatsapp", "other"]).has(preferred)
  ) {
    redirect("/admin/partnerships?error=contact");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("supporter_contacts").insert({
    supporter_id: supporterId,
    full_name: fullName,
    job_title: jobTitle || null,
    email: email || null,
    phone: phone || null,
    preferred_contact_method: preferred,
    is_primary: false,
    created_by: staff.userId,
    updated_by: staff.userId,
  });

  if (error) redirect("/admin/partnerships?error=contact");

  refresh();
  redirect("/admin/partnerships?created=contact");
}

export async function createOpportunity(formData: FormData) {
  const staff = await requireStaff();

  const supporterId = text(formData, "supporter_id", 80);
  const title = text(formData, "title", 200);
  const supportType = text(formData, "support_type", 40);
  const source = text(formData, "source", 20) || "manual";
  const summary = text(formData, "expected_support_summary", 2000);
  const nextStep = text(formData, "next_step", 1000);
  const nextFollowUpAt = isoDateTime(text(formData, "next_follow_up_at", 80));
  const needId = optionalUuid(formData, "need_id");
  const projectId = optionalUuid(formData, "project_id");
  const valueRaw = text(formData, "estimated_value", 40);
  const estimatedValue = valueRaw ? Number(valueRaw) : null;
  const currency = text(formData, "estimated_currency", 3).toUpperCase();

  if (
    !supporterId ||
    title.length < 3 ||
    !supportTypes.has(supportType) ||
    !new Set(["manual", "gmail", "website", "referral", "other"]).has(source) ||
    (estimatedValue !== null && (!Number.isFinite(estimatedValue) || estimatedValue < 0 || currency.length !== 3))
  ) {
    redirect("/admin/partnerships?error=opportunity");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("partnership_opportunities").insert({
    supporter_id: supporterId,
    need_id: needId,
    project_id: projectId,
    title,
    support_type: supportType,
    stage: "research",
    source,
    expected_support_summary: summary || null,
    estimated_value: estimatedValue,
    estimated_currency: estimatedValue === null ? null : currency,
    next_step: nextStep || null,
    next_follow_up_at: nextFollowUpAt,
    owner_id: staff.userId,
    created_by: staff.userId,
    updated_by: staff.userId,
  });

  if (error) redirect("/admin/partnerships?error=opportunity");

  refresh();
  redirect("/admin/partnerships?created=opportunity");
}

export async function logOutreach(formData: FormData) {
  const staff = await requireStaff();

  const supporterId = text(formData, "supporter_id", 80);
  const opportunityId = optionalUuid(formData, "opportunity_id");
  const contactId = optionalUuid(formData, "contact_id");
  const direction = text(formData, "direction", 20);
  const channel = text(formData, "channel", 20);
  const subject = text(formData, "subject", 300);
  const summary = text(formData, "summary", 3000);
  const occurredAt = isoDateTime(text(formData, "occurred_at", 80)) ?? new Date().toISOString();

  if (!supporterId || !directions.has(direction) || !channels.has(channel) || !summary) {
    redirect("/admin/partnerships?error=outreach");
  }

  const supabase = await createClient();

  if (contactId) {
    const { data: contact, error: contactError } = await supabase
      .from("supporter_contacts")
      .select("supporter_id")
      .eq("id", contactId)
      .maybeSingle();

    if (contactError || !contact || contact.supporter_id !== supporterId) {
      redirect("/admin/partnerships?error=outreach");
    }
  }

  if (opportunityId) {
    const { data: opportunity, error: opportunityError } = await supabase
      .from("partnership_opportunities")
      .select("supporter_id")
      .eq("id", opportunityId)
      .maybeSingle();

    if (opportunityError || !opportunity || opportunity.supporter_id !== supporterId) {
      redirect("/admin/partnerships?error=outreach");
    }
  }

  const { error } = await supabase.from("outreach_interactions").insert({
    supporter_id: supporterId,
    opportunity_id: opportunityId,
    contact_id: contactId,
    direction,
    channel,
    subject: subject || null,
    summary,
    occurred_at: occurredAt,
    created_by: staff.userId,
  });

  if (error) redirect("/admin/partnerships?error=outreach");

  refresh();
  redirect("/admin/partnerships?created=outreach");
}

export async function createFollowUp(formData: FormData) {
  const staff = await requireStaff();

  const supporterId = text(formData, "supporter_id", 80);
  const opportunityId = optionalUuid(formData, "opportunity_id");
  const contactId = optionalUuid(formData, "contact_id");
  const title = text(formData, "title", 200);
  const dueAt = isoDateTime(text(formData, "due_at", 80));
  const priority = text(formData, "priority", 20) || "medium";
  const notes = text(formData, "notes", 2000);

  if (!supporterId || title.length < 3 || !dueAt || !priorities.has(priority)) {
    redirect("/admin/partnerships?error=followup");
  }

  const supabase = await createClient();

  if (contactId) {
    const { data: contact, error: contactError } = await supabase
      .from("supporter_contacts")
      .select("supporter_id")
      .eq("id", contactId)
      .maybeSingle();

    if (contactError || !contact || contact.supporter_id !== supporterId) {
      redirect("/admin/partnerships?error=followup");
    }
  }

  if (opportunityId) {
    const { data: opportunity, error: opportunityError } = await supabase
      .from("partnership_opportunities")
      .select("supporter_id")
      .eq("id", opportunityId)
      .maybeSingle();

    if (opportunityError || !opportunity || opportunity.supporter_id !== supporterId) {
      redirect("/admin/partnerships?error=followup");
    }
  }

  const { error } = await supabase.from("follow_up_tasks").insert({
    supporter_id: supporterId,
    opportunity_id: opportunityId,
    contact_id: contactId,
    title,
    due_at: dueAt,
    priority,
    status: "open",
    assigned_to: staff.userId,
    notes: notes || null,
    created_by: staff.userId,
    updated_by: staff.userId,
  });

  if (error) redirect("/admin/partnerships?error=followup");

  refresh();
  redirect("/admin/partnerships?created=followup");
}

export async function updateOpportunityStage(formData: FormData) {
  const staff = await requireStaff();

  const id = text(formData, "id", 80);
  const stage = text(formData, "stage", 40);

  if (!id || !stages.has(stage)) redirect("/admin/partnerships?error=stage");

  const supabase = await createClient();
  const { error } = await supabase
    .from("partnership_opportunities")
    .update({ stage, updated_by: staff.userId })
    .eq("id", id);

  if (error) redirect("/admin/partnerships?error=stage");

  refresh();
  redirect("/admin/partnerships?updated=stage");
}

export async function completeFollowUp(formData: FormData) {
  const staff = await requireStaff();
  const id = text(formData, "id", 80);

  if (!id) redirect("/admin/partnerships?error=followup");

  const supabase = await createClient();
  const { error } = await supabase
    .from("follow_up_tasks")
    .update({
      status: "done",
      completed_at: new Date().toISOString(),
      updated_by: staff.userId,
    })
    .eq("id", id)
    .eq("status", "open");

  if (error) redirect("/admin/partnerships?error=followup");

  refresh();
  redirect("/admin/partnerships?updated=followup");
}
