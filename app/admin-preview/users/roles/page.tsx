import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

const permissions = [
  ["Edit public pages", "Yes", "No", "No", "Yes"],
  ["Manage books", "No", "Yes", "No", "Yes"],
  ["Manage needs", "No", "No", "Yes", "Yes"],
  ["Record pledges", "No", "No", "Yes", "Yes"],
  ["Verify donations", "No", "No", "Limited", "Yes"],
  ["Manage users", "No", "No", "No", "Yes"],
];

export default function AdminRolesPreviewPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Users • Permissions preview"
        title="Roles & Permissions"
        description="Design permissions around staff responsibilities instead of giving every account full administrative access."
      />

      <AdminSection eyebrow="PERMISSION MATRIX" title="Sample role comparison">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Permission</th>
                <th className="px-5 py-3 font-extrabold">Content Editor</th>
                <th className="px-5 py-3 font-extrabold">Collection Manager</th>
                <th className="px-5 py-3 font-extrabold">Needs / Partnership</th>
                <th className="px-5 py-3 font-extrabold">Library Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {permissions.map((row) => (
                <tr className="bg-[var(--color-surface)]" key={row[0]}>
                  {row.map((cell, index) => (
                    <td className={index === 0 ? "px-5 py-4 font-bold" : "px-5 py-4"} key={index}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-danger)] bg-[var(--color-danger-soft)] p-5 text-sm text-[var(--color-danger)]">
        UI visibility alone is not security. Production permissions must also be enforced by server/database authorisation and Row Level Security.
      </div>
    </>
  );
}
