import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminPledges } from "@/lib/admin-preview-data";

export default function AdminPledgesPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Support tracking"
        title="Pledges"
        description="Track proposed and accepted support separately from items that have physically arrived."
        action={<span className="button-primary">Record pledge — preview</span>}
      />

      <AdminSection eyebrow="ACTIVE PIPELINE" title="Pledge records">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Supporter</th>
                <th className="px-5 py-3 font-extrabold">Related need</th>
                <th className="px-5 py-3 font-extrabold">Quantity</th>
                <th className="px-5 py-3 font-extrabold">Status</th>
                <th className="px-5 py-3 font-extrabold">Expected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminPledges.map((pledge) => (
                <tr className="bg-[var(--color-surface)]" key={pledge.supporter + pledge.need}>
                  <td className="px-5 py-4 font-bold">{pledge.supporter}</td>
                  <td className="px-5 py-4">{pledge.need}</td>
                  <td className="px-5 py-4 font-black">{pledge.quantity}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill
                      label={pledge.status}
                      tone={
                        pledge.status === "Accepted"
                          ? "info"
                          : pledge.status === "Under Review"
                            ? "warning"
                            : "neutral"
                      }
                    />
                  </td>
                  <td className="px-5 py-4">{pledge.expected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminSection eyebrow="CONTROL" title="Accepted pledge rules">
          <ul className="grid gap-2 p-5 text-sm">
            <li>Accepted quantity may reduce the public remaining-to-source value.</li>
            <li>Cancelled or expired quantities return to the remaining need.</li>
            <li>Received quantity must be reconciled so it is not counted twice.</li>
          </ul>
        </AdminSection>
        <AdminSection eyebrow="REMINDER" title="Pledge is not donation">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            A pledge is a commitment. Public reporting must not show it as physically received or verified until the receipt workflow is completed.
          </p>
        </AdminSection>
      </div>
    </>
  );
}
