"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function getBootstrapHash() {
  const secret = process.env.STAFF_BOOTSTRAP_SECRET;

  if (!secret || secret.length < 24) {
    return null;
  }

  return createHash("sha256").update(secret).digest("hex");
}

async function claimFirstAdmin() {
  const bootstrapHash = getBootstrapHash();

  if (!bootstrapHash) {
    redirect("/staff-setup?error=config");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("claim_first_admin", {
    requested_hash: bootstrapHash,
  });

  if (error || data !== true) {
    redirect("/staff-setup?error=claim");
  }

  redirect("/admin");
}

export async function createFirstStaffAccount(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/staff-setup?error=config");
  }

  const displayName = String(formData.get("display_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (
    displayName.length < 2 ||
    displayName.length > 120 ||
    !email ||
    email.length > 254 ||
    password.length < 12 ||
    password.length > 1024
  ) {
    redirect("/staff-setup?error=validation");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error || !data.user) {
    redirect("/staff-setup?error=signup");
  }

  if (!data.session) {
    redirect("/staff-setup?status=confirm");
  }

  await claimFirstAdmin();
}

export async function activateFirstAdministrator() {
  if (!isSupabaseConfigured()) {
    redirect("/staff-setup?error=config");
  }

  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    redirect("/staff-login");
  }

  await claimFirstAdmin();
}
