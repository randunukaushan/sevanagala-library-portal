"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/supabase/staff";

const priorities = new Set(["critical", "high", "medium", "low"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60) || "library-need";
}

async function requireActiveStaff() {
  const staff = await getStaffContext();

  if (staff.status !== "active") {
    redirect("/staff-login");
  }

  return staff;
}

export async function createNeed(formData: FormData) {
  const staff = await requireActiveStaff();
  const title = String(formData.get("title") ?? "").trim();
  const purpose = String(formData.get("purpose") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const categoryKey = String(formData.get("category") ?? "").trim();
  const priority = String(formData.get("priority") ?? "medium").trim();
  const target = Number(formData.get("target"));

  if (
    title.length < 3 ||
    title.length > 160 ||
    purpose.length < 10 ||
    purpose.length > 2000 ||
    unit.length < 1 ||
    unit.length > 40 ||
    !priorities.has(priority) ||
    !Number.isFinite(target) ||
    target <= 0 ||
    target > 1000000000
  ) {
    redirect("/admin/needs/new?error=validation");
  }

  const supabase = await createClient();
  const { data: category, error: categoryError } = await supabase
    .from("need_categories")
    .select("id")
    .eq("key", categoryKey)
    .eq("active", true)
    .maybeSingle();

  if (categoryError || !category) {
    redirect("/admin/needs/new?error=category");
  }

  const slug = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;

  const { error } = await supabase.from("needs").insert({
    category_id: category.id,
    slug,
    title: { en: title },
    description: { en: purpose },
    purpose: { en: purpose },
    target_quantity: target,
    unit,
    priority,
    status: "draft",
    public_notes: {},
    created_by: staff.userId,
    updated_by: staff.userId,
  });

  if (error) {
    redirect("/admin/needs/new?error=save");
  }

  revalidatePath("/admin/needs");
  redirect("/admin/needs?created=1");
}

export async function submitNeedForApproval(formData: FormData) {
  const staff = await requireActiveStaff();
  const id = String(formData.get("id") ?? "");

  if (!id) redirect("/admin/needs?error=invalid");

  const supabase = await createClient();
  const { error } = await supabase
    .from("needs")
    .update({
      status: "pending_approval",
      updated_by: staff.userId,
    })
    .eq("id", id)
    .eq("status", "draft");

  if (error) {
    redirect("/admin/needs?error=submit");
  }

  revalidatePath("/admin/needs");
  redirect("/admin/needs?submitted=1");
}

export async function publishNeed(formData: FormData) {
  const staff = await requireActiveStaff();
  const id = String(formData.get("id") ?? "");

  if (!id) redirect("/admin/needs?error=invalid");

  const now = new Date().toISOString();
  const supabase = await createClient();
  const { error } = await supabase
    .from("needs")
    .update({
      status: "seeking_support",
      published_at: now,
      last_verified_at: now,
      updated_by: staff.userId,
    })
    .eq("id", id)
    .eq("status", "pending_approval");

  if (error) {
    redirect("/admin/needs?error=publish");
  }

  revalidatePath("/admin/needs");
  revalidatePath("/needs");
  redirect("/admin/needs?published=1");
}
