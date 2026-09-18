import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

export default function NewNeedPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Needs • Form preview"
        title="Create Need"
        description="Preview of the future staff form. No data is saved from this screen."
        action={<span className="button-secondary">Draft by default</span>}
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="BASIC INFORMATION" title="What is needed?">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Need title" required>
                <input className={inputClass} defaultValue="Updated English & STEM Books" readOnly />
              </AdminFormField>
              <AdminFormField label="Category" required>
                <select className={inputClass} defaultValue="Books">
                  <option>Books</option>
                  <option>Technology</option>
                  <option>Furniture</option>
                  <option>Infrastructure</option>
                </select>
              </AdminFormField>
              <div className="md:col-span-2">
                <AdminFormField
                  label="Purpose"
                  help="Explain the reader/community outcome, not only the item."
                  required
                >
                  <textarea
                    className={inputClass + " min-h-28 resize-y"}
                    defaultValue="Improve student reference access, English learning, and future-ready STEM resources."
                    readOnly
                  />
                </AdminFormField>
              </div>
            </div>
          </AdminSection>

          <AdminSection eyebrow="QUANTITY" title="Make the requirement measurable">
            <div className="grid gap-5 p-5 md:grid-cols-3">
              <AdminFormField label="Target quantity" required>
                <input className={inputClass} defaultValue="150" inputMode="numeric" readOnly />
              </AdminFormField>
              <AdminFormField label="Unit" required>
                <input className={inputClass} defaultValue="books" readOnly />
              </AdminFormField>
              <AdminFormField label="Priority" required>
                <select className={inputClass} defaultValue="High">
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </AdminFormField>
            </div>
          </AdminSection>

          <AdminSection eyebrow="PUBLICATION" title="Public wording and verification">
            <div className="grid gap-5 p-5">
              <AdminFormField
                label="Public note"
                help="Do not include private contact details or unverified claims."
              >
                <textarea
                  className={inputClass + " min-h-24 resize-y"}
                  defaultValue="Sample need for current, student-friendly English and STEM reference materials."
                  readOnly
                />
              </AdminFormField>
              <AdminFormField label="Last verified">
                <input className={inputClass} defaultValue="Pending staff verification" readOnly />
              </AdminFormField>
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="card p-5">
            <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">FORM STATUS</p>
            <h2 className="mt-2 font-black">Draft preview</h2>
            <p className="muted mt-2 text-sm">
              Real implementation will validate required fields and permissions before saving.
            </p>
          </div>
          <div className="card p-5">
            <h2 className="font-black">Before publishing</h2>
            <ul className="muted mt-3 grid gap-2 text-sm">
              <li>• Staff verifies the target quantity.</li>
              <li>• Specification/alternatives are clear.</li>
              <li>• Public wording is reviewed.</li>
              <li>• Last-verified date is recorded.</li>
            </ul>
          </div>
          <span className="button-primary opacity-70">Save draft — disabled preview</span>
        </aside>
      </div>
    </>
  );
}
