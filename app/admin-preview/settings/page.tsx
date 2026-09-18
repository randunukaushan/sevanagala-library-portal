import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";

const settings = [
  ["Official website status", "Pending approval", "warning"],
  ["Official library contact", "Not configured", "neutral"],
  ["Public donor recognition", "Policy pending", "warning"],
  ["Online financial donations", "Disabled by design", "success"],
  ["Sinhala content", "Planned", "neutral"],
  ["Tamil content", "Planned", "neutral"],
  ["English donor pages", "Prototype ready", "info"],
] as const;

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Institutional settings should expose only approved operational choices. Infrastructure secrets never belong in ordinary admin forms."
      />

      <AdminSection eyebrow="INSTITUTIONAL STATUS" title="Prototype configuration">
        <div className="divide-y divide-[var(--color-border)]">
          {settings.map(([label, value, tone]) => (
            <div className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center" key={label}>
              <p className="font-bold">{label}</p>
              <AdminStatusPill label={value} tone={tone} />
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection eyebrow="SECURITY BOUNDARY" title="Not editable here">
        <div className="grid gap-3 p-5 md:grid-cols-2">
          {[
            "Supabase service-role keys",
            "Database passwords",
            "Vercel production secrets",
            "GitHub tokens",
            "DNS credentials",
            "Private backup credentials",
          ].map((item) => (
            <div className="rounded-lg bg-[var(--color-danger-soft)] px-4 py-3 text-sm font-bold text-[var(--color-danger)]" key={item}>
              {item}
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
