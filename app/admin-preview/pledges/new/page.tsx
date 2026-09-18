import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

export default function NewPledgePreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Pledges • Form preview"
        title="Record Pledge"
        description="Capture a proposed commitment without presenting it as received support."
        action={<span className="button-secondary">Proposed by default</span>}
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="SUPPORTER" title="Who is proposing support?">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Supporter" required>
                <input className={inputClass} defaultValue="Sample Education Foundation" readOnly />
              </AdminFormField>
              <AdminFormField label="Country">
                <input className={inputClass} defaultValue="International sample" readOnly />
              </AdminFormField>
            </div>
          </AdminSection>

          <AdminSection eyebrow="COMMITMENT" title="What are they pledging?">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Related need" required>
                <select className={inputClass} defaultValue="Digital Learning Computers">
                  <option>Digital Learning Computers</option>
                  <option>Updated English & STEM Books</option>
                  <option>Study Tables & Chairs</option>
                </select>
              </AdminFormField>
              <AdminFormField label="Quantity" required>
                <input className={inputClass} defaultValue="3" inputMode="numeric" readOnly />
              </AdminFormField>
              <AdminFormField label="Expected date">
                <input className={inputClass} defaultValue="October 2026" readOnly />
              </AdminFormField>
              <AdminFormField label="Expiry / review date">
                <input className={inputClass} defaultValue="Pending" readOnly />
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField label="Internal note">
                  <textarea
                    className={inputClass + " min-h-24 resize-y"}
                    defaultValue="Sample internal note. Not public."
                    readOnly
                  />
                </AdminFormField>
              </div>
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] p-5">
            <p className="text-xs font-extrabold text-[var(--color-warning)]">IMPORTANT</p>
            <h2 className="mt-2 font-black">Pledge ≠ received</h2>
            <p className="mt-2 text-sm">
              The public site can identify accepted pledged support separately, but receipt and verification require their own workflow.
            </p>
          </div>
          <span className="button-primary opacity-70">Save proposed pledge — disabled preview</span>
        </aside>
      </div>
    </>
  );
}
