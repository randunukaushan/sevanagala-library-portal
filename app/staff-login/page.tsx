import Link from "next/link";
import { redirect } from "next/navigation";
import { signInStaff } from "@/app/staff-login/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getStaffContext } from "@/lib/supabase/staff";

export const dynamic = "force-dynamic";

const messages: Record<string, string> = {
  invalid: "The email or password could not be verified.",
  inactive: "This staff account is not active. Contact the authorised library administrator.",
  config: "Supabase is not connected to this deployment yet.",
};

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const configured = isSupabaseConfigured();
  let inactive = false;

  if (configured) {
    const staff = await getStaffContext();
    if (staff.status === "mfa_required") {
      redirect("/staff-mfa");
    }
    if (staff.status === "active") {
      redirect("/admin");
    }

    if (staff.status === "inactive") {
      inactive = true;
    }
  }

  return (
    <main className="staff-auth-page">
      <div className="staff-auth-panel">
        <div className="staff-auth-brand">
          <span className="site-brand-mark">S</span>
          <div>
            <p className="eyebrow">Sevanagala Public Library</p>
            <h1>Staff workspace</h1>
          </div>
        </div>

        <p className="staff-auth-intro">
          Sign in with an approved individual staff account. Access and actions are
          controlled by database roles and Row Level Security.
        </p>

        {!configured ? (
          <div className="staff-auth-notice">
            <strong>Backend connection pending</strong>
            <p>
              The application-side Auth integration is ready, but this environment does
              not yet have a Supabase Project URL and publishable key.
            </p>
          </div>
        ) : null}

        {params.error || inactive ? (
          <div className="staff-auth-error" role="alert">
            {inactive ? messages.inactive : messages[params.error ?? ""] ?? messages.invalid}
          </div>
        ) : null}

        <form action={signInStaff} className="staff-auth-form">
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              disabled={!configured}
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              autoComplete="current-password"
              disabled={!configured}
              name="password"
              required
              type="password"
            />
          </label>
          <button className="button-primary" disabled={!configured} type="submit">
            Sign in
          </button>
        </form>

        <Link className="button-quiet staff-auth-back" href="/">
          ← Return to public site
        </Link>
      </div>
    </main>
  );
}
