import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";

const rows = [
  ["Sample Biology Reference", "Valid", "Ready"],
  ["Sample Computer Fundamentals", "Warning", "Possible duplicate"],
  ["Sample Book Missing Language", "Error", "Required field missing"],
];

export default function BookImportPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Books • Import preview"
        title="Import Collection Data"
        description="Preview and validate spreadsheet data before any records are written to the collection database."
        action={<span className="button-secondary">CSV workflow preview</span>}
      />

      <section className="mt-7 grid gap-3 md:grid-cols-5">
        {["Upload", "Map Fields", "Validate", "Preview", "Import & Reconcile"].map((stage, index) => (
          <div
            className={
              index === 3
                ? "rounded-[var(--radius-card)] border border-[var(--color-brand-primary)] bg-[var(--color-brand-primary-soft)] p-4"
                : "rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            }
            key={stage}
          >
            <span className="text-xs font-black text-[var(--color-brand-primary)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-black">{stage}</p>
          </div>
        ))}
      </section>

      <AdminSection eyebrow="IMPORT PREVIEW" title="Sample validation results">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Title</th>
                <th className="px-5 py-3 font-extrabold">Validation</th>
                <th className="px-5 py-3 font-extrabold">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {rows.map(([title, state, message]) => (
                <tr className="bg-[var(--color-surface)]" key={title}>
                  <td className="px-5 py-4 font-bold">{title}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill
                      label={state}
                      tone={state === "Valid" ? "success" : state === "Warning" ? "warning" : "danger"}
                    />
                  </td>
                  <td className="px-5 py-4">{message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] p-5 text-sm">
        <strong>No silent merge:</strong> uncertain duplicates must remain visible for librarian review before import.
      </div>
    </>
  );
}
