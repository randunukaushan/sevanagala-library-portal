import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

const stages = [
  ["Enquiry", "An organisation asks about supporting a need or project."],
  ["Accepted pledge", "The library accepts a defined commitment."],
  ["Received", "Items physically arrive at the library."],
  ["Verified", "Authorised staff confirm identity, quantity, and condition."],
  ["Deployed / catalogued", "Support is placed into service or the collection."],
  ["Completed", "The related outcome is closed and reported."],
];

const rules = [
  ["No double counting", "A received item must not remain counted as an active pledge."],
  ["Visible dates", "Active needs and projects show when they were last verified."],
  ["Evidence where useful", "Approved photos or records can support completed project claims."],
  ["Correction history", "Material corrections are fixed publicly and preserved in internal audit history."],
];

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Trust comes from accurate states, dates, and evidence."
        description="A promise, a delivery, a verified donation, and a completed outcome are deliberately treated as different events."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Support lifecycle"
            title="Follow support from first contact to completed impact."
            description="The public site will show only the level of certainty that the library has actually verified."
          />

          <ol className="mt-8 grid gap-3">
            {stages.map(([title, description], index) => (
              <li
                className="card grid gap-4 p-5 md:grid-cols-[4rem_13rem_1fr] md:items-center"
                key={title}
              >
                <span className="text-lg font-black text-[var(--color-brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{title}</strong>
                <span className="muted">{description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Public reporting rules"
            title="Simple rules make the numbers believable."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {rules.map(([title, description]) => (
              <article className="card p-5" key={title}>
                <h2 className="font-black">{title}</h2>
                <p className="muted mt-2">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
