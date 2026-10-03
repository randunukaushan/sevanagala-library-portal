import { redirect } from "next/navigation";
import { getStaffContext } from "@/lib/supabase/staff";
import { StaffMfa } from "@/components/admin/staff-mfa";

export const dynamic = "force-dynamic";

export default async function StaffMfaPage() {
  const staff = await getStaffContext();
  if (staff.status === "active") redirect("/admin");
  if (staff.status === "signed_out") redirect("/staff-login");
  if (staff.status === "inactive") redirect("/staff-login?error=inactive");
  if (staff.status === "unconfigured") redirect("/staff-login?error=config");
  if (staff.status === "error") {
    return <main className="staff-auth-page"><p role="alert">Access check unavailable. Please try signing in again.</p></main>;
  }
  return (
    <main className="staff-auth-page">
      <div className="staff-auth-panel">
        <p className="eyebrow">Staff security</p>
        <h1>Verify your authenticator</h1>
        <p className="staff-auth-intro">
          Every approved staff account requires a second factor before accessing
          the workspace. Use an individual authenticator app, not a shared account.
        </p>
        <StaffMfa />
      </div>
    </main>
  );
}
