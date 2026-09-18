import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminPartners } from "@/lib/admin-preview-data";

export default function AdminPartnersPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Relationship management"
        title="Partners"
        description="Keep private contact data separate from the public recognition record and track whether name, logo, and website publication are approved."
        action={<span className="button-primary">Add partner — preview</span>}
      />

      <AdminSection eyebrow="SUPPORTERS" title="Partner records">
        <div className="grid gap-4 p-5 lg:grid-cols-3">
          {adminPartners.map((partner) => (
            <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-5" key={partner.name}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">{partner.type}</p>
                  <h2 className="mt-2 text-lg font-black">{partner.name}</h2>
                </div>
                <AdminStatusPill label={partner.status} tone={partner.status === "Active" ? "info" : "neutral"} />
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <div>
                  <dt className="muted text-xs">Country</dt>
                  <dd className="mt-1 font-bold">{partner.country}</dd>
                </div>
                <div>
                  <dt className="muted text-xs">Recognition</dt>
                  <dd className="mt-1 font-bold">{partner.recognition}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </AdminSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminSection eyebrow="PUBLIC" title="Recognition fields">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            Organisation name, country, approved logo, website, contribution summary, related project, and verified impact may be public only when the recognition policy allows it.
          </p>
        </AdminSection>
        <AdminSection eyebrow="PRIVATE" title="Internal relationship fields">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            Contact person, private email/phone, negotiations, conditions, and internal notes remain staff-only.
          </p>
        </AdminSection>
      </div>
    </>
  );
}
