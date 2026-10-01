import { redirect } from "next/navigation";
import {
  activateFirstAdministrator,
  createFirstStaffAccount,
} from "@/app/staff-setup/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getStaffContext } from "@/lib/supabase/staff";

export const dynamic = "force-dynamic";

const errors: Record<string, string> = {
  config:
    "The one-time administrator setup is not configured in this environment.",
  validation:
    "Check the name, email and password. Use a password with at least 12 characters.",
  signup:
    "The staff account could not be created. The email may already be registered.",
  claim:
    "Administrator activation was not completed. The bootstrap may already have been used or another active staff account may already exist.",
};

export default async function StaffSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const params = await searchParams;
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <main className="staff-auth-page">
        <div className="staff-auth-panel">
          <p className="eyebrow">One-time setup</p>
          <h1>Backend connection required</h1>
          <p className="staff-auth-intro">
            Add the Supabase environment configuration before creating the first
            administrator.
          </p>
        </div>
      </main>
    );
  }

  const staff = await getStaffContext();

  if (staff.status === "active") {
    redirect("/admin");
  }

  const isSignedInButInactive = staff.status === "inactive";

  return (
    <main className="staff-auth-page">
      <div className="staff-auth-panel">
        <div className="staff-auth-brand">
          <span className="site-brand-mark">S</span>
          <div>
            <p className="eyebrow">Sevanagala Public Library</p>
            <h1>First administrator setup</h1>
          </div>
        </div>

        <p className="staff-auth-intro">
          This page is for the one-time creation and activation of the first
          Library Administrator. After successful activation, the database locks
          this bootstrap path.
        </p>

        {params.status === "confirm" ? (
          <div className="staff-auth-notice">
            <strong>Check your email</strong>
            <p>
              Supabase may require email confirmation. Confirm the message, then
              sign in and return to this setup page to activate the administrator.
            </p>
          </div>
        ) : null}

        {params.error ? (
          <div className="staff-auth-error" role="alert">
            {errors[params.error] ?? errors.claim}
          </div>
        ) : null}

        {isSignedInButInactive ? (
          <form action={activateFirstAdministrator} className="staff-auth-form">
            <div className="staff-auth-notice">
              <strong>Account authenticated</strong>
              <p>
                This account is signed in but is not active yet. Activate it as
                the one-time first Library Administrator.
              </p>
            </div>
            <button className="button-primary" type="submit">
              Activate first administrator
            </button>
          </form>
        ) : (
          <form action={createFirstStaffAccount} className="staff-auth-form">
            <label>
              <span>Display name</span>
              <input
                autoComplete="name"
                maxLength={120}
                minLength={2}
                name="display_name"
                required
                type="text"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                autoComplete="email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                autoComplete="new-password"
                minLength={12}
                name="password"
                required
                type="password"
              />
            </label>

            <button className="button-primary" type="submit">
              Create first administrator account
            </button>
          </form>
        )}

        <p className="muted mt-5 text-sm">
          Do not share the administrator account. Additional staff should receive
          individual accounts and only the roles they need.
        </p>
      </div>
    </main>
  );
}
