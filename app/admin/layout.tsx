import { redirect } from "next/navigation";
import { StaffAdminShell } from "@/components/admin/staff-admin-shell";
import { getStaffContext } from "@/lib/supabase/staff";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await getStaffContext();

  if (staff.status === "unconfigured") {
    redirect("/staff-login?error=config");
  }

  if (staff.status === "signed_out") {
    redirect("/staff-login");
  }

  if (staff.status === "inactive") {
    redirect("/staff-login?error=inactive");
  }

  if (staff.status === "error") {
    return (
      <main className="staff-auth-page">
        <div className="staff-auth-panel">
          <p className="eyebrow">Staff workspace</p>
          <h1>Access check unavailable</h1>
          <p className="staff-auth-intro">{staff.message}</p>
          <a className="button-secondary" href="/staff-login">Return to sign in</a>
        </div>
      </main>
    );
  }

  return (
    <StaffAdminShell displayName={staff.displayName} roleName={staff.roleName}>
      {children}
    </StaffAdminShell>
  );
}
