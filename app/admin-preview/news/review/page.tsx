import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";

export default function NewsReviewPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="News • Review preview"
        title="Review Content"
        description="Give an approver the draft, public preview, permission checks, and decision controls in one place."
        action={<AdminStatusPill label="Review" tone="warning" />}
      />

      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="DRAFT" title="Smart-library roadmap update">
            <article className="p-5">
              <p className="muted text-sm">English • Sample content editor • Prototype draft</p>
              <h2 className="mt-4 text-2xl font-black">Planning the next stages of library development</h2>
              <p className="muted mt-4">
                Sample article text explaining future collection, connectivity, digital-learning, catalogue, and community-learning phases.
              </p>
            </article>
          </AdminSection>

          <AdminSection eyebrow="PUBLIC PREVIEW" title="How the approved update will appear">
            <div className="p-5">
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">SMART LIBRARY</p>
                <h3 className="mt-3 text-xl font-black">Planning the next stages of library development</h3>
                <p className="muted mt-3 text-sm">
                  Sample preview only. Final public text is published after approval.
                </p>
              </div>
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="card p-5">
            <h2 className="font-black">Review checks</h2>
            <ul className="muted mt-3 grid gap-2 text-sm">
              <li>• Facts are verified.</li>
              <li>• No private data is exposed.</li>
              <li>• Media permission exists.</li>
              <li>• Translation status is clear.</li>
              <li>• Claims match project records.</li>
            </ul>
          </div>
          <span className="button-primary opacity-70">Approve — disabled preview</span>
          <span className="button-secondary opacity-70">Request changes — disabled preview</span>
        </aside>
      </div>
    </>
  );
}
