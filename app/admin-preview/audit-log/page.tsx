import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { adminAudit } from "@/lib/admin-preview-data";

export default function AdminAuditLogPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Accountability"
        title="Audit Log"
        description="Record important administrative changes without logging secrets or unnecessary personal data."
      />

      <AdminSection
        eyebrow="EVENTS"
        title="Sample audit events"
        action={<span className="button-secondary text-sm">Filter events</span>}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Actor</th>
                <th className="px-5 py-3 font-extrabold">Action</th>
                <th className="px-5 py-3 font-extrabold">Entity</th>
                <th className="px-5 py-3 font-extrabold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminAudit.map((event) => (
                <tr className="bg-[var(--color-surface)]" key={event.actor + event.action + event.entity}>
                  <td className="px-5 py-4 font-bold">{event.actor}</td>
                  <td className="px-5 py-4">{event.action}</td>
                  <td className="px-5 py-4">{event.entity}</td>
                  <td className="px-5 py-4 text-[var(--color-text-muted)]">{event.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>
    </>
  );
}
