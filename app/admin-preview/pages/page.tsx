import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminPages } from "@/lib/admin-preview-data";

export default function AdminPagesPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Content management"
        title="Pages"
        description="Manage approved evergreen public information such as About, Services, Support, and Contact without editing source code."
      />

      <AdminSection eyebrow="PUBLIC PAGES" title="Managed page records">
        <div className="grid gap-4 p-5 md:grid-cols-2">
          {adminPages.map((page) => (
            <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-5" key={page.route}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">{page.route}</p>
                  <h2 className="mt-2 text-lg font-black">{page.title}</h2>
                </div>
                <AdminStatusPill
                  label={page.status}
                  tone={page.status === "Pending Official Data" ? "warning" : "neutral"}
                />
              </div>
              <dl className="mt-5 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="muted">Languages</dt>
                  <dd className="font-bold">{page.languages}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="muted">Updated</dt>
                  <dd className="font-bold">{page.updated}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
