import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminBookRequests } from "@/lib/admin-preview-data";

export default function AdminBookRequestsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Reader demand"
        title="Book Requests"
        description="Aggregate reader demand into exact-title and category-based requests without publishing individual requester identities."
        action={<span className="button-primary">Add request — preview</span>}
      />

      <AdminSection eyebrow="DEMAND" title="Aggregated request queue">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Request</th>
                <th className="px-5 py-3 font-extrabold">Category</th>
                <th className="px-5 py-3 font-extrabold">Language</th>
                <th className="px-5 py-3 font-extrabold">Requests</th>
                <th className="px-5 py-3 font-extrabold">Priority</th>
                <th className="px-5 py-3 font-extrabold">Alternative OK</th>
                <th className="px-5 py-3 font-extrabold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminBookRequests.map((item) => (
                <tr className="bg-[var(--color-surface)]" key={item.request}>
                  <td className="px-5 py-4 font-bold">{item.request}</td>
                  <td className="px-5 py-4">{item.category}</td>
                  <td className="px-5 py-4">{item.language}</td>
                  <td className="px-5 py-4 text-lg font-black">{item.count}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill label={item.priority} tone={item.priority === "High" ? "warning" : "neutral"} />
                  </td>
                  <td className="px-5 py-4">{item.alternative}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill label={item.status} tone={item.status === "Matching" ? "info" : "neutral"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>
    </>
  );
}
