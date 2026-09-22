import type { PublicLocale } from "@/lib/i18n/config";
import { localizedSampleNeeds } from "@/lib/i18n/sample-content";
import type { Need, NeedStatus } from "@/lib/sample-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type PublicNeedsMode = "prototype" | "live" | "error";
type JsonText = Record<string, unknown> | string | null;

function textFromJson(value: JsonText, locale: PublicLocale, fallback: string) {
  if (typeof value === "string" && value.trim()) return value;

  if (value && typeof value === "object") {
    for (const key of [locale, "en", "si", "ta"]) {
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

function formatVerified(value: string | null, locale: PublicLocale) {
  const pending = {
    en: "Verification date pending",
    si: "තහවුරු කිරීමේ දිනය බලාපොරොත්තුවෙන්",
    ta: "சரிபார்ப்பு தேதி நிலுவையில்",
  }[locale];

  if (!value) return pending;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return pending;

  const localeMap: Record<PublicLocale, string> = {
    en: "en-LK",
    si: "si-LK",
    ta: "ta-LK",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export async function getPublicNeeds(locale: PublicLocale): Promise<{
  mode: PublicNeedsMode;
  needs: Need[];
}> {
  if (!isSupabaseConfigured()) {
    return { mode: "prototype", needs: localizedSampleNeeds(locale) };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_public_needs");

    if (error) {
      return { mode: "error", needs: [] };
    }

    const fallbacks = {
      en: {
        title: "Untitled need",
        category: "Library need",
        purpose: "Verified library-development need.",
      },
      si: {
        title: "මාතෘකාවක් නොමැති අවශ්‍යතාවයක්",
        category: "පුස්තකාල අවශ්‍යතාවයක්",
        purpose: "තහවුරු කරන ලද පුස්තකාල සංවර්ධන අවශ්‍යතාවයක්.",
      },
      ta: {
        title: "தலைப்பிடப்படாத தேவை",
        category: "நூலகத் தேவை",
        purpose: "சரிபார்க்கப்பட்ட நூலக மேம்பாட்டு தேவை.",
      },
    }[locale];

    const needs: Need[] = (data ?? []).map((row: Record<string, unknown>) => ({
      id: String(row.id),
      title: textFromJson(row.title as JsonText, locale, fallbacks.title),
      category: textFromJson(row.category_title as JsonText, locale, fallbacks.category),
      purpose: textFromJson(row.purpose as JsonText, locale, fallbacks.purpose),
      target: Number(row.target_quantity ?? 0),
      pledged: Number(row.pledged_quantity ?? 0),
      received: Number(row.verified_received_quantity ?? 0),
      unit: String(row.unit ?? "items"),
      status: mapStatus(String(row.status ?? "seeking_support")),
      priority: mapPriority(String(row.priority ?? "medium")),
      lastVerified: formatVerified(
        typeof row.last_verified_at === "string" ? row.last_verified_at : null,
        locale,
      ),
    }));

    return { mode: "live", needs };
  } catch {
    return { mode: "error", needs: [] };
  }
}
