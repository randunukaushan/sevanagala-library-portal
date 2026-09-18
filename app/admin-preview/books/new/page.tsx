import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

export default function NewBookPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Books • Form preview"
        title="Add Book Record"
        description="Capture the collection metadata needed for discovery and review without adding borrower information."
      />

      <AdminSection eyebrow="CATALOGUE RECORD" title="Bibliographic and collection information">
        <div className="grid gap-5 p-5 md:grid-cols-2">
          <AdminFormField label="Title" required>
            <input className={inputClass} defaultValue="Sample Biology Reference" readOnly />
          </AdminFormField>
          <AdminFormField label="Author">
            <input className={inputClass} defaultValue="Sample Author" readOnly />
          </AdminFormField>
          <AdminFormField label="ISBN">
            <input className={inputClass} defaultValue="Sample / optional" readOnly />
          </AdminFormField>
          <AdminFormField label="Language" required>
            <select className={inputClass} defaultValue="English">
              <option>English</option>
              <option>Sinhala</option>
              <option>Tamil</option>
            </select>
          </AdminFormField>
          <AdminFormField label="Classification code" required>
            <input className={inputClass} defaultValue="570" readOnly />
          </AdminFormField>
          <AdminFormField label="Copy count" required>
            <input className={inputClass} defaultValue="2" inputMode="numeric" readOnly />
          </AdminFormField>
          <AdminFormField label="Physical condition">
            <select className={inputClass} defaultValue="Good">
              <option>Good</option>
              <option>Fair</option>
              <option>Worn</option>
              <option>Damaged</option>
              <option>Unusable</option>
            </select>
          </AdminFormField>
          <AdminFormField label="Content review status">
            <select className={inputClass} defaultValue="Current">
              <option>Current</option>
              <option>Review Needed</option>
              <option>Replacement Recommended</option>
              <option>Historical / Retain for Reference</option>
            </select>
          </AdminFormField>
        </div>
      </AdminSection>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] p-5 text-sm">
        Publication year alone must not automatically trigger withdrawal. Collection decisions remain an authorised library process.
      </div>
    </>
  );
}
