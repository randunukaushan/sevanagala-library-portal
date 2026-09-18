import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminUsers } from "@/lib/admin-preview-data";

export default function AdminUsersPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Access control"
        title="Users"
        description="Use individual staff accounts, least-privilege roles, and clear account lifecycle controls. Shared admin passwords are not part of the design."
        action={<Link className="button-primary" href="/admin-preview/users/roles">Roles & permissions</Link>}
      />

      <AdminSection eyebrow="STAFF ACCOUNTS" title="Sample user records">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">User</th>
                <th className="px-5 py-3 font-extrabold">Role</th>
                <th className="px-5 py-3 font-extrabold">Status</th>
                <th className="px-5 py-3 font-extrabold">MFA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminUsers.map((user) => (
                <tr className="bg-[var(--color-surface)]" key={user.name}>
                  <td className="px-5 py-4 font-bold">{user.name}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill label={user.status} tone="success" />
                  </td>
                  <td className="px-5 py-4">{user.mfa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminSection eyebrow="ACCESS" title="Least privilege">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            Editors, collection managers, partnership managers, approvers, library admins, and technical admins should receive only the permissions their work requires.
          </p>
        </AdminSection>
        <AdminSection eyebrow="LIFECYCLE" title="Join, change, leave">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            Account creation, role changes, disablement, and privileged changes must be authorised and auditable.
          </p>
        </AdminSection>
      </div>
    </>
  );
}
