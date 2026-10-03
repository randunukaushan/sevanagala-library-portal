import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type StaffContext =
  | { status: "unconfigured" }
  | { status: "signed_out" }
  | { status: "inactive" }
  | { status: "mfa_required"; userId: string }
  | { status: "error"; message: string }
  | {
      status: "active";
      userId: string;
      displayName: string;
      roleKey: string | null;
      roleName: string | null;
    };

export async function getStaffContext(): Promise<StaffContext> {
  if (!isSupabaseConfigured()) {
    return { status: "unconfigured" };
  }

  try {
    const supabase = await createClient();
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;

    if (claimsError || !userId) {
      return { status: "signed_out" };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, display_name, account_status, role_id")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      return { status: "error", message: "Unable to read the staff profile." };
    }

    if (!profile || profile.account_status !== "active") {
      return { status: "inactive" };
    }

    if (claimsData?.claims?.aal !== "aal2") {
      return { status: "mfa_required", userId };
    }

    let roleKey: string | null = null;
    let roleName: string | null = null;

    if (profile.role_id) {
      const { data: role } = await supabase
        .from("roles")
        .select("key, name")
        .eq("id", profile.role_id)
        .maybeSingle();

      roleKey = role?.key ?? null;
      roleName = role?.name ?? null;
    }

    return {
      status: "active",
      userId,
      displayName: profile.display_name,
      roleKey,
      roleName,
    };
  } catch {
    return {
      status: "error",
      message: "The authentication service is currently unavailable.",
    };
  }
}
