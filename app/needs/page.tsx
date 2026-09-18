import { NeedCard } from "@/components/need-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { sampleNeeds } from "@/lib/sample-data";

const definitions = [
  ["Seeking Support", "Approved need with no accepted support covering it yet."],
  ["Pledged", "Accepted support that has not yet been verified as received."],
  ["Received", "Items have physically arrived and are moving through verification."],
  ["Verified", "Quantity and item details have been confirmed for official reporting."],
];

export default function NeedsPage() {
  return (
    <>
      <PageHero
        eyebrow="Current needs"
        title="Show what is needed, what is covered, and what still remains."
        description="The production registry will use verified library data. The cards below remain sample data until staff complete the needs review."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Sample registry"
            title="Every need should be measurable."
            description="A strong need record explains the purpose, target quantity, status, remaining quantity, and last verification date."
          />
          <div className="grid-auto mt-8">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Status methodology"
            title="The same words must mean the same thing everywhere."
            description="This avoids accidentally presenting promises as completed support."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {definitions.map(([title, description]) => (
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
