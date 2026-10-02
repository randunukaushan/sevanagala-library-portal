import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Protected staff workspace"
        title="Dashboard"
        description="This route uses verified Supabase Auth sessions and database-enforced permissions when the project is connected."
      />

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <AdminSection eyebrow="FIRST VERTICAL SLICE" title="Needs workflow">
          <div className="p-5">
            <p className="muted">
              Create a draft need, submit it for approval, publish it with an authorised
              role, and then expose the approved record to the public needs page.
            </p>
            <Link className="button-primary mt-5" href="/admin/needs">
              Open needs management
            </Link>
          </div>
        </AdminSection>

        <AdminSection eyebrow="FUNDING & PARTNERSHIPS" title="Partnership CRM">
          <div className="p-5">
            <p className="muted">
              Track organisations, contacts, outreach, funding opportunities and
              follow-ups, then convert confirmed support into the existing pledge and
              donation workflow.
            </p>
            <Link className="button-primary mt-5" href="/admin/partnerships">
              Open partnership CRM
            </Link>
          </div>
        </AdminSection>

        <AdminSection eyebrow="SECURITY" title="Database permissions remain authoritative">
          <div className="p-5">
            <p className="muted">
              Hiding a button is not security. Staff actions are permitted or rejected by
              Supabase Auth, application roles, and Row Level Security.
            </p>
          </div>
        </AdminSection>
      </div>
    </>
  );
}
