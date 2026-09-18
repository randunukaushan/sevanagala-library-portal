import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminEnquiries } from "@/lib/admin-preview-data";

export default function AdminEnquiriesPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Communication"
        title="Enquiries"
        description="Route reader, donor, and partnership messages to the right staff member while collecting only the information needed to respond."
      />

      <AdminSection
        eyebrow="INBOX"
        title="Sample enquiry queue"
        action={<span className="button-secondary text-sm">Filter: All</span>}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">From</th>
                <th className="px-5 py-3 font-extrabold">Type</th>
                <th className="px-5 py-3 font-extrabold">Subject</th>
                <th className="px-5 py-3 font-extrabold">Related</th>
                <th className="px-5 py-3 font-extrabold">Status</th>
                <th className="px-5 py-3 font-extrabold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminEnquiries.map((item) => (
                <tr className="bg-[var(--color-surface)]" key={item.from + item.subject}>
                  <td className="px-5 py-4 font-bold">{item.from}</td>
                  <td className="px-5 py-4">{item.type}</td>
                  <td className="px-5 py-4">{item.subject}</td>
                  <td className="px-5 py-4">{item.related}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill
                      label={item.status}
                      tone={item.status === "New" ? "warning" : item.status === "In Progress" ? "info" : "neutral"}
                    />
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-muted)]">{item.received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm">
        <strong>Privacy:</strong> contact messages should have a defined purpose, retention period, restricted staff access, and a deletion process.
      </div>
    </>
  );
}
