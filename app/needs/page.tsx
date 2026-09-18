import { NeedCard } from "@/components/need-card";
import { PageHero } from "@/components/page-hero";
import { sampleNeeds } from "@/lib/sample-data";

export default function NeedsPage() {
  return (
    <>
      <PageHero
        eyebrow="Current needs"
        title="Show exactly what is needed, what is already covered, and what remains."
        description="This prototype uses sample quantities only. Production needs will be published only after staff verification and institutional approval."
      />

      <section className="section">
        <div className="shell">
          <div className="grid-auto">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]">
        <div className="shell grid gap-6 md:grid-cols-3">
          <article className="card p-5">
            <h2 className="font-bold">Pledged</h2>
            <p className="muted mt-2">
              Accepted support that has not yet been verified as received.
            </p>
          </article>
          <article className="card p-5">
            <h2 className="font-bold">Received</h2>
            <p className="muted mt-2">
              Items physically received and moving through verification.
            </p>
          </article>
          <article className="card p-5">
            <h2 className="font-bold">Verified</h2>
            <p className="muted mt-2">
              Confirmed support that can be used in official public reporting.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
