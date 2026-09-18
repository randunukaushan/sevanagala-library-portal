import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminDonations } from "@/lib/admin-preview-data";

export default function AdminDonationsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Support verification"
        title="Donations"
        description="Record what physically arrived, verify the actual quantity and condition, then allocate it to the correct need or project."
        action={<span className="button-primary">Record receipt — preview</span>}
      />

      <section className="mt-7 grid gap-4 xl:grid-cols-3">
        {adminDonations.map((donation) => (
          <article className="card p-5" key={donation.supporter + donation.contribution}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">{donation.supporter}</p>
                <h2 className="mt-2 text-lg font-black">{donation.contribution}</h2>
              </div>
              <AdminStatusPill
                label={donation.status}
                tone={
                  donation.status === "Verified"
                    ? "success"
                    : donation.status === "Under Verification"
                      ? "warning"
                      : "info"
                }
              />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="muted text-xs">Received</dt>
                <dd className="mt-1 text-xl font-black">{donation.received}</dd>
              </div>
              <div>
                <dt className="muted text-xs">Verified</dt>
                <dd className="mt-1 text-xl font-black">{donation.verified}</dd>
              </div>
            </dl>
            <p className="muted mt-4 text-xs">Date: {donation.date}</p>
          </article>
        ))}
      </section>

      <AdminSection eyebrow="VERIFICATION FLOW" title="Receipt → verify → allocate → publish">
        <div className="grid gap-3 p-5 md:grid-cols-4">
          {[
            ["Receipt", "Record actual arrival and condition."],
            ["Verification", "Authorised staff confirm quantity and identity."],
            ["Allocation", "Link accepted items to the need/project or collection."],
            ["Public update", "Update counters and acknowledgement after approval."],
          ].map(([title, description], index) => (
            <div className="rounded-lg border border-[var(--color-border)] p-4" key={title}>
              <span className="text-xs font-black text-[var(--color-brand-primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-black">{title}</h3>
              <p className="muted mt-2 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </AdminSection>
    </>
  );
}
