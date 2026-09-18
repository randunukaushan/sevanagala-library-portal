import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";

const fields = [
  ["Organisation name", "Approved"],
  ["Country", "Approved"],
  ["Website link", "Approved"],
  ["Logo", "Pending"],
  ["Contribution summary", "Approved"],
  ["Impact photo", "Not requested"],
];

export default function PartnerRecognitionPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Partners • Recognition preview"
        title="Public Recognition Permission"
        description="Control which supporter details may be published without changing the private relationship record."
        action={<AdminStatusPill label="Partial approval" tone="warning" />}
      />

      <AdminSection eyebrow="PUBLIC FIELDS" title="Sample Education Foundation">
        <div className="divide-y divide-[var(--color-border)]">
          {fields.map(([field, status]) => (
            <div className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center" key={field}>
              <span className="font-bold">{field}</span>
              <AdminStatusPill
                label={status}
                tone={status === "Approved" ? "success" : status === "Pending" ? "warning" : "neutral"}
              />
            </div>
          ))}
        </div>
      </AdminSection>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-text-muted)]">
        Public acknowledgement is recognition of support, not endorsement of an organisation, product, service, or political position.
      </div>
    </>
  );
}
