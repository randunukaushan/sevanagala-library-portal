import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminNews } from "@/lib/admin-preview-data";

export default function AdminNewsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Content management"
        title="News"
        description="Draft, review, approve, publish, and archive library updates with clear language and media permission checks."
        action={<span className="button-primary">New article — preview</span>}
      />

      <AdminSection eyebrow="EDITORIAL QUEUE" title="News and updates">
        <div className="grid gap-4 p-5 lg:grid-cols-3">
          {adminNews.map((post) => (
            <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-5" key={post.title}>
              <AdminStatusPill
                label={post.status}
                tone={
                  post.status === "Review"
                    ? "warning"
                    : post.status === "Published Sample"
                      ? "success"
                      : "neutral"
                }
              />
              <h2 className="mt-4 text-lg font-black">{post.title}</h2>
              <dl className="mt-5 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="muted">Language</dt>
                  <dd className="font-bold">{post.language}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="muted">Author</dt>
                  <dd className="font-bold">{post.author}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="muted">Updated</dt>
                  <dd className="font-bold">{post.updated}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </AdminSection>

      <AdminSection eyebrow="WORKFLOW" title="Draft → Review → Approved → Published → Archived">
        <p className="p-5 text-sm text-[var(--color-text-muted)]">
          Official public statements should not bypass the documented approval workflow. Translations may have their own review state.
        </p>
      </AdminSection>
    </>
  );
}
