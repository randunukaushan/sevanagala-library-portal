import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminMedia } from "@/lib/admin-preview-data";

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Content assets"
        title="Media"
        description="Separate uploaded files from publication permission. A file is not public simply because it exists in storage."
        action={<span className="button-primary">Upload media — preview</span>}
      />

      <AdminSection eyebrow="MEDIA LIBRARY" title="Sample assets">
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {adminMedia.map((asset) => (
            <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5" key={asset.name}>
              <div className="flex aspect-[16/9] items-center justify-center rounded-lg bg-[var(--color-surface-soft)] text-sm font-black text-[var(--color-text-muted)]">
                {asset.type} preview
              </div>
              <h2 className="mt-4 break-all font-black">{asset.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <AdminStatusPill
                  label={asset.permission}
                  tone={asset.permission === "Pending" ? "warning" : asset.permission === "Internal" ? "neutral" : "success"}
                />
                <AdminStatusPill
                  label={asset.visibility}
                  tone={asset.visibility === "Private" ? "neutral" : "info"}
                />
              </div>
            </article>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
