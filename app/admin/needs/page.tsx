import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import {
  publishNeed,
  submitNeedForApproval,
} from "@/app/admin/needs/actions";
import { createClient } from "@/lib/supabase/server";

function jsonText(value: unknown, fallback: string) {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && "en" in value) {
    const candidate = (value as Record<string, unknown>).en;
    if (typeof candidate === "string") return candidate;
  }

  return fallback;
}

function statusTone(status: string) {
  if (status === "pending_approval") return "warning" as const;
  if (status === "seeking_support") return "info" as const;
  if (status === "fulfilled") return "success" as const;
  return "neutral" as const;
}

export default async function AdminNeedsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const { data: needs, error } = await supabase
    .from("needs")
    .select("id, title, status, priority, target_quantity, unit, updated_at")
    .order("updated_at", { ascending: false });

  const notice = params.created
    ? "Draft need created."
    : params.submitted
      ? "Need submitted for approval."
      : params.published
        ? "Need published to the public registry."
        : null;

  return (
    <>
      <AdminPageHeader
        eyebrow="Protected workflow"
        title="Needs"
        description="Create draft records, submit them for approval, and publish only through a role allowed by database policy."
        action={
          <Link className="button-primary" href="/admin/needs/new">
            Create need
          </Link>
        }
      />

      {notice ? (
        <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-success-soft)] px-5 py-4 text-sm font-bold text-[var(--color-success)]">
          {notice}
        </div>
      ) : null}

      {params.error ? (
        <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-danger-soft)] px-5 py-4 text-sm font-bold text-[var(--color-danger)]">
          The requested action could not be completed. Your role or the current record state may not permit it.
        </div>
      ) : null}

      <div className="mt-7">
        <AdminSection eyebrow="LIVE DATABASE" title="Needs workflow">
          {error ? (
            <p className="p-5 text-sm text-[var(--color-danger)]">
              Unable to read needs from the connected database.
            </p>
          ) : needs && needs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <thead className="bg-[var(--color-surface-soft)]">
                  <tr>
                    <th className="px-5 py-3 font-extrabold">Need</th>
                    <th className="px-5 py-3 font-extrabold">Priority</th>
                    <th className="px-5 py-3 font-extrabold">Status</th>
                    <th className="px-5 py-3 font-extrabold">Target</th>
                    <th className="px-5 py-3 font-extrabold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {needs.map((need) => (
                    <tr className="bg-[var(--color-surface)]" key={need.id}>
                      <td className="px-5 py-4 font-bold">
                        {jsonText(need.title, "Untitled need")}
                      </td>
                      <td className="px-5 py-4 capitalize">{need.priority}</td>
                      <td className="px-5 py-4">
                        <AdminStatusPill
                          label={String(need.status).replaceAll("_", " ")}
                          tone={statusTone(String(need.status))}
                        />
                      </td>
                      <td className="px-5 py-4">
                        {Number(need.target_quantity)} {need.unit}
                      </td>
                      <td className="px-5 py-4">
                        {need.status === "draft" ? (
                          <form action={submitNeedForApproval}>
                            <input name="id" type="hidden" value={need.id} />
                            <button className="button-secondary text-sm" type="submit">
                              Submit for approval
                            </button>
                          </form>
                        ) : need.status === "pending_approval" ? (
                          <form action={publishNeed}>
                            <input name="id" type="hidden" value={need.id} />
                            <button className="button-primary text-sm" type="submit">
                              Approve & publish
                            </button>
                          </form>
                        ) : (
                          <span className="muted text-sm">No action in this slice</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <h2 className="text-xl font-black">No needs yet</h2>
              <p className="muted mt-2">
                Create the first draft need to test the protected workflow.
              </p>
              <Link className="button-primary mt-5" href="/admin/needs/new">
                Create first need
              </Link>
            </div>
          )}
        </AdminSection>
      </div>
    </>
  );
}
