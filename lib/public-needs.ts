import type { Need, NeedStatus } from "@/lib/sample-data";
import { sampleNeeds } from "@/lib/sample-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type PublicNeedsMode = "prototype" | "live" | "error";

type JsonText = Record<string, unknown> | string | null;

function textFromJson(value: JsonText, fallback: string) {
  if (typeof value === "string" && value.trim()) return value;

  if (value && typeof value === "object") {
    for (const key of ["en", "si", "ta"]) {
      const candidate = value[key];
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate;
      }
    }
  }

  return fallback;
}

function mapStatus(status: string): NeedStatus {
  switch (status) {
    case "partially_pledged":
    case "partially_received":
      return "Partially Supported";
    case "fully_pledged":
      return "Fully Pledged";
    case "fulfilled":
      return "Completed";
    default:
      return "Seeking Support";
  }
}

function mapPriority(priority: string): Need["priority"] {
  if (priority === "high" || priority === "critical") return "High";
  if (priority === "low") return "Low";
  return "Medium";
}

function formatVerified(value: string | null) {
  if (!value) return "Verification date pending";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Verification date pending";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export async function getPublicNeeds(): Promise<{
  mode: PublicNeedsMode;
  needs: Need[];
}> {
  if (!isSupabaseConfigured()) {
    return { mode: "prototype", needs: sampleNeeds };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_public_needs");

    if (error) {
      return { mode: "error", needs: [] };
    }

    const needs: Need[] = (data ?? []).map((row: Record<string, unknown>) => ({
      id: String(row.id),
      title: textFromJson(row.title as JsonText, "Untitled need"),
      category: textFromJson(row.category_title as JsonText, "Library need"),
      purpose: textFromJson(row.purpose as JsonText, "Verified library-development need."),
      target: Number(row.target_quantity ?? 0),
      pledged: Number(row.pledged_quantity ?? 0),
      received: Number(row.verified_received_quantity ?? 0),
      unit: String(row.unit ?? "items"),
      status: mapStatus(String(row.status ?? "seeking_support")),
      priority: mapPriority(String(row.priority ?? "medium")),
      lastVerified: formatVerified(
        typeof row.last_verified_at === "string" ? row.last_verified_at : null,
      ),
    }));

    return { mode: "live", needs };
  } catch {
    return { mode: "error", needs: [] };
  }
}
