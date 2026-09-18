import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminNeeds } from "@/lib/admin-preview-data";

export default function AdminNeedsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Development management"
        title="Needs"
        description="Create, verify, prioritise, and track measurable library needs before they appear on the public site."
        action={<Link className="button-primary" href="/admin-preview/needs/new">Add need — preview</Link>}
      />

      <section className="mt-7">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="ACTIVE" value="8" note="Sample approved needs" />
          <AdminStatCard label="HIGH PRIORITY" value="3" note="Needs close review" tone="attention" />
          <AdminStatCard label="PARTIALLY COVERED" value="2" note="Accepted support exists" />
          <AdminStatCard label="FULFILLED" value="4" note="Sample historical total" tone="positive" />
        </div>
      </section>

      <AdminSection
        eyebrow="REGISTRY"
        title="Current need records"
        action={
          <div className="flex flex-wrap gap-2">
            <span className="button-secondary text-sm">Filter: All</span>
            <span className="button-secondary text-sm">Sort: Priority</span>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Need</th>
                <th className="px-5 py-3 font-extrabold">Category</th>
                <th className="px-5 py-3 font-extrabold">Priority</th>
                <th className="px-5 py-3 font-extrabold">Status</th>
                <th className="px-5 py-3 font-extrabold">Target</th>
                <th className="px-5 py-3 font-extrabold">Remaining</th>
                <th className="px-5 py-3 font-extrabold">Last verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminNeeds.map((need) => (
                <tr key={need.title} className="bg-[var(--color-surface)]">
                  <td className="px-5 py-4 font-bold">{need.title}</td>
                  <td className="px-5 py-4">{need.category}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill
                      label={need.priority}
                      tone={need.priority === "High" ? "warning" : "neutral"}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <AdminStatusPill
                      label={need.status}
                      tone={need.status === "Partially Supported" ? "info" : "warning"}
                    />
                  </td>
                  <td className="px-5 py-4">{need.target}</td>
                  <td className="px-5 py-4 font-black">{need.remaining}</td>
                  <td className="px-5 py-4 text-[var(--color-text-muted)]">{need.verified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <AdminSection eyebrow="PUBLISHING" title="Verification checklist">
          <ul className="grid gap-3 p-5 text-sm">
            {[
              "Purpose and beneficiary group are clear",
              "Target quantity is measurable",
              "Specification or acceptable alternative is defined",
              "Priority is justified",
              "Last-verified date is current",
              "Public wording contains no private information",
            ].map((item) => (
              <li className="rounded-lg bg-[var(--color-surface-soft)] px-4 py-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </AdminSection>

        <AdminSection eyebrow="WORKFLOW" title="Need lifecycle">
          <div className="grid gap-2 p-5 sm:grid-cols-3">
            {["Draft", "Pending Approval", "Seeking Support", "Partially Pledged", "Partially Received", "Fulfilled"].map(
              (stage, index) => (
                <div className="rounded-lg border border-[var(--color-border)] p-3" key={stage}>
                  <span className="text-xs font-black text-[var(--color-brand-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-sm font-bold">{stage}</p>
                </div>
              ),
            )}
          </div>
        </AdminSection>
      </div>
    </>
  );
}
