import Link from "next/link";
import { redirect } from "next/navigation";
import { getStaffContext } from "@/lib/supabase/staff";

export const dynamic = "force-dynamic";

export default async function StaffSetupPage() {
  const staff = await getStaffContext();

  if (staff.status === "active") {
    redirect("/admin");
  }

  return (
    <main className="staff-auth-page">
      <div className="staff-auth-panel">
        <p className="eyebrow">Staff access</p>
        <h1>Administrator setup is restricted</h1>
        <p className="staff-auth-intro">
          For security, the first administrator cannot be created or activated
          through a public web form. An authorised project owner must verify the
          person and provision their individual account through the protected
          database administration process.
        </p>
        <p className="muted mt-5 text-sm">
          If you already have an approved account, sign in. If you are signed in
          but do not have access, contact the authorised project owner.
        </p>
        <Link className="button-quiet staff-auth-back" href="/staff-login">
          Go to staff sign in
        </Link>
      </div>
    </main>
  );
}

