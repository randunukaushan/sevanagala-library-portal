import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatCard } from "@/components/admin/admin-stat-card";

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
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Sample operational overview for the future authenticated library admin."
        action={<span className="button-secondary">Preview role: Library Admin</span>}
      />

      <section className="mt-7" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Operational summary
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="ACTIVE NEEDS" value="8" note="Sample records" />
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
        <AdminSection title="What needs action next" eyebrow="ATTENTION QUEUE">
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
        </AdminSection>

        <AdminSection title="Latest operational changes" eyebrow="RECENT ACTIVITY">
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
        </AdminSection>
      </div>

      <AdminSection
        title="Sample operational records"
        eyebrow="NEEDS OVERVIEW"
        action={<span className="button-primary text-sm">Add need — disabled preview</span>}
      >
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
            <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
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
      </AdminSection>
    </>
  );
}
