import { PageHero } from "@/components/page-hero";

const stages = [
  ["Enquiry", "An organisation asks about supporting a need or project."],
  ["Accepted pledge", "The library accepts a defined commitment."],
  ["Received", "Items physically arrive."],
  ["Verified", "Authorised staff confirm quantity, identity, and condition."],
  ["Deployed / catalogued", "Support is placed into service or the collection."],
  ["Completed", "The related outcome is closed and reported."],
];

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Public trust depends on accurate status, dates, and evidence."
        description="The portal is designed so a promise, a delivery, and a verified completed contribution are never shown as the same thing."
      />

      <section className="section">
        <div className="shell">
          <div className="grid gap-4">
            {stages.map(([title, description], index) => (
              <article className="card grid gap-3 p-5 md:grid-cols-[4rem_1fr]" key={title}>
                <div className="text-2xl font-black text-[var(--brand)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="muted mt-2">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
