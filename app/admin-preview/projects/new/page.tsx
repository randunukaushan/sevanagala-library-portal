import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const inputClass =
  "min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

export default function NewProjectPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Projects • Form preview"
        title="Create Project"
        description="Define a measurable development outcome before attaching individual needs and milestones."
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_330px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="PROJECT" title="Outcome and scope">
            <div className="grid gap-5 p-5">
              <AdminFormField label="Project title" required>
                <input className={inputClass} defaultValue="Digital Learning Corner" readOnly />
              </AdminFormField>
              <AdminFormField label="Problem statement" required>
                <textarea
                  className={inputClass + " min-h-24 resize-y"}
                  defaultValue="Students and readers need reliable access to digital research and learning tools."
                  readOnly
                />
              </AdminFormField>
              <AdminFormField label="Objective" required>
                <textarea
                  className={inputClass + " min-h-24 resize-y"}
                  defaultValue="Create a managed digital-learning space with computers, connectivity, furniture, and staff-ready operations."
                  readOnly
                />
              </AdminFormField>
            </div>
          </AdminSection>

          <AdminSection eyebrow="MILESTONES" title="Plan evidence-based stages">
            <div className="grid gap-3 p-5">
              {["Approve technical scope", "Source equipment", "Install and test", "Staff handover", "Public service launch"].map(
                (item, index) => (
                  <div className="grid grid-cols-[2rem_1fr] items-center gap-3 rounded-lg border border-[var(--color-border)] px-4 py-3" key={item}>
                    <span className="text-xs font-black text-[var(--color-brand-primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-bold">{item}</span>
                  </div>
                ),
              )}
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="card p-5">
            <h2 className="font-black">Related needs</h2>
            <p className="muted mt-2 text-sm">
              Future implementation will attach approved needs rather than duplicating quantities inside project text.
            </p>
          </div>
          <span className="button-primary opacity-70">Save project draft — disabled preview</span>
        </aside>
      </div>
    </>
  );
}
