import Link from "next/link";
import { AdminStatCard } from "@/components/admin/admin-stat-card";

const nav = [
  "Dashboard",
  "Needs",
  "Projects",
  "Pledges",
  "Donations",
  "Partners",
  "Books",
  "Book Requests",
  "News",
  "Media",
  "Users",
  "Audit Log",
];

const attention = [
  {
    title: "Donation awaiting verification",
    meta: "Sample: Digital Learning Computers • received quantity pending review",
    action: "Review receipt",
  },
  {
    title: "Need requires re-verification",
    meta: "Sample: Updated English & STEM Books • verification date due",
    action: "Review need",
  },
  {
    title: "Content waiting for approval",
    meta: "Sample: Smart-library roadmap update • draft by content editor",
    action: "Open review",
  },
];

const activity = [
  ["Need updated", "Digital Learning Computers", "12 min ago"],
  ["Project draft edited", "Book Collection Renewal", "42 min ago"],
  ["Book request added", "ICT & programming category", "2 hr ago"],
  ["Sample news saved", "Collection needs review", "Yesterday"],
];

export default function AdminPreviewPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f2]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-accent-soft)]">
        <div className="shell py-3 text-sm">
          <strong>Admin UI preview only.</strong> No authentication, private data,
          or real write actions are connected on this page.
        </div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1440px] md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-[var(--color-border)] bg-[var(--color-brand-secondary)] p-5 text-white md:block">
          <Link className="no-underline" href="/">
            <span className="text-xs font-extrabold tracking-[0.08em] text-white/60">
              SEVANAGALA
            </span>
            <span className="mt-1 block font-black">Library Admin</span>
          </Link>

          <nav className="mt-8" aria-label="Admin preview navigation">
            <ul className="grid gap-1 text-sm">
              {nav.map((item, index) => (
                <li key={item}>
                  <span
                    className={
                      index === 0
                        ? "block rounded-lg bg-white/12 px-3 py-2.5 font-extrabold"
                        : "block rounded-lg px-3 py-2.5 font-bold text-white/75"
                    }
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Staff workspace</p>
              <h1 className="text-3xl font-black tracking-[-0.03em]">
                Dashboard
              </h1>
              <p className="muted mt-2">
                Sample operational overview for the future authenticated admin.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="button-secondary">Preview role: Library Admin</span>
            </div>
          </header>

          <section className="mt-7" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="sr-only">
              Operational summary
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <AdminStatCard
                label="ACTIVE NEEDS"
                value="8"
                note="Sample records"
              />
              <AdminStatCard
                label="AWAITING VERIFICATION"
                value="3"
                note="Needs staff attention"
                tone="attention"
              />
              <AdminStatCard
                label="ACTIVE PROJECTS"
                value="3"
                note="Planning or in progress"
              />
              <AdminStatCard
                label="COMPLETED THIS PERIOD"
                value="2"
                note="Sample verified outcomes"
                tone="positive"
              />
            </div>
          </section>

          <div className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="card overflow-hidden" aria-labelledby="attention-heading">
              <div className="border-b border-[var(--color-border)] px-5 py-4">
                <p className="text-xs font-extrabold text-[var(--color-warning)]">
                  ATTENTION QUEUE
                </p>
                <h2 id="attention-heading" className="mt-1 text-xl font-black">
                  What needs action next
                </h2>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {attention.map((item) => (
                  <article
                    className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
                    key={item.title}
                  >
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="muted mt-1 text-sm">{item.meta}</p>
                    </div>
                    <span className="button-secondary text-sm">{item.action}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="card overflow-hidden" aria-labelledby="activity-heading">
              <div className="border-b border-[var(--color-border)] px-5 py-4">
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                  RECENT ACTIVITY
                </p>
                <h2 id="activity-heading" className="mt-1 text-xl font-black">
                  Latest operational changes
                </h2>
              </div>
              <ul className="divide-y divide-[var(--color-border)]">
                {activity.map(([type, item, time]) => (
                  <li className="p-5" key={`${type}-${item}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black">{type}</p>
                        <p className="muted mt-1 text-sm">{item}</p>
                      </div>
                      <span className="muted whitespace-nowrap text-xs">{time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="card mt-6 overflow-hidden" aria-labelledby="needs-table-heading">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
              <div>
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                  NEEDS OVERVIEW
                </p>
                <h2 id="needs-table-heading" className="mt-1 text-xl font-black">
                  Sample operational records
                </h2>
              </div>
              <span className="button-primary text-sm">Add need — disabled preview</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-[var(--color-surface-soft)]">
                  <tr>
                    <th className="px-5 py-3 font-extrabold">Need</th>
                    <th className="px-5 py-3 font-extrabold">Category</th>
                    <th className="px-5 py-3 font-extrabold">Status</th>
                    <th className="px-5 py-3 font-extrabold">Remaining</th>
                    <th className="px-5 py-3 font-extrabold">Last verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] bg-white">
                  <tr>
                    <td className="px-5 py-4 font-bold">Updated English & STEM Books</td>
                    <td className="px-5 py-4">Books</td>
                    <td className="px-5 py-4">Seeking Support</td>
                    <td className="px-5 py-4">150 books</td>
                    <td className="px-5 py-4">Prototype sample</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-bold">Digital Learning Computers</td>
                    <td className="px-5 py-4">Technology</td>
                    <td className="px-5 py-4">Partially Supported</td>
                    <td className="px-5 py-4">7 computers</td>
                    <td className="px-5 py-4">Prototype sample</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-bold">Study Tables & Chairs</td>
                    <td className="px-5 py-4">Furniture</td>
                    <td className="px-5 py-4">Seeking Support</td>
                    <td className="px-5 py-4">24 seats</td>
                    <td className="px-5 py-4">Prototype sample</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
