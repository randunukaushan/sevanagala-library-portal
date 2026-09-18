import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

export default function DonationVerificationPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Donations • Verification preview"
        title="Verify Received Support"
        description="Confirm what actually arrived before public counters or impact statements are updated."
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="RECEIPT" title="Expected vs received">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Supporter">
                <input className={inputClass} defaultValue="Sample Technology Partner" readOnly />
              </AdminFormField>
              <AdminFormField label="Related pledge">
                <input className={inputClass} defaultValue="3 Digital Learning Computers" readOnly />
              </AdminFormField>
              <AdminFormField label="Expected quantity">
                <input className={inputClass} defaultValue="3" readOnly />
              </AdminFormField>
              <AdminFormField label="Actual received quantity" required>
                <input className={inputClass} defaultValue="3" inputMode="numeric" readOnly />
              </AdminFormField>
              <AdminFormField label="Condition" required>
                <select className={inputClass} defaultValue="Good">
                  <option>Good</option>
                  <option>Acceptable</option>
                  <option>Requires Review</option>
                  <option>Rejected / Unusable</option>
                </select>
              </AdminFormField>
              <AdminFormField label="Verification result" required>
                <select className={inputClass} defaultValue="Ready to verify">
                  <option>Ready to verify</option>
                  <option>Mismatch — review needed</option>
                  <option>Rejected</option>
                </select>
              </AdminFormField>
            </div>
          </AdminSection>

          <AdminSection eyebrow="EVIDENCE" title="Evidence and allocation">
            <div className="grid gap-5 p-5">
              <AdminFormField label="Evidence">
                <input className={inputClass} defaultValue="No real file attached in prototype" readOnly />
              </AdminFormField>
              <AdminFormField label="Allocation">
                <input className={inputClass} defaultValue="Digital Learning Corner — sample" readOnly />
              </AdminFormField>
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="card p-5">
            <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">CHECK BEFORE VERIFYING</p>
            <ul className="muted mt-3 grid gap-2 text-sm">
              <li>• Quantity matches evidence.</li>
              <li>• Item identity/spec is acceptable.</li>
              <li>• Condition is usable.</li>
              <li>• Pledge balance will be reconciled.</li>
              <li>• Public acknowledgement permission is separate.</li>
            </ul>
          </div>
          <span className="button-primary opacity-70">Verify donation — disabled preview</span>
        </aside>
      </div>
    </>
  );
}
