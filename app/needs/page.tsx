import { NeedCard } from "@/components/need-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getPublicNeeds } from "@/lib/public-needs";
import { publicImages } from "@/lib/public-images";

export const dynamic = "force-dynamic";

const definitions = [
  ["Seeking Support", "Approved need with no accepted support covering it yet."],
  ["Pledged", "Accepted support that has not yet been verified as received."],
  ["Received", "Items have physically arrived and are moving through verification."],
  ["Verified", "Quantity and item details have been confirmed for official reporting."],
];

export default async function NeedsPage() {
  const registry = await getPublicNeeds();
  const isPrototype = registry.mode === "prototype";
  const isLive = registry.mode === "live";

  return (
    <>
      <PageHero
        eyebrow="Current needs"
        title="Show what is needed, what is covered, and what still remains."
        description={
          isLive
            ? "This registry is reading approved public need records from the connected library database."
            : "Until the backend is connected and approved records exist, this page remains a clearly labelled prototype registry."
        }
        image={publicImages.studyInterior}
        imageAlt="Modern library study interior with bookshelves"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={isLive ? "Verified registry" : "Prototype registry"}
            title="Every need should be measurable."
            description="A strong need record explains the purpose, target quantity, accepted support, verified received quantity, remaining quantity, and last verification date."
          />

          {registry.mode === "error" ? (
            <div className="card p-7">
              <h2 className="text-2xl font-black">Registry temporarily unavailable</h2>
              <p className="muted mt-3">
                The connected public read model could not be loaded. No private donor or
                staff data is exposed as a fallback.
              </p>
            </div>
          ) : registry.needs.length > 0 ? (
            <>
              {isPrototype ? (
                <div className="mb-6 rounded-[var(--radius-card)] bg-[var(--color-accent-soft)] px-5 py-4 text-sm">
                  <strong>Prototype data:</strong> these cards are examples only and are
                  not official Sevanagala Public Library needs.
                </div>
              ) : null}

              <div className="grid-auto">
                {registry.needs.map((need) => (
                  <NeedCard key={need.id} need={need} />
                ))}
              </div>
            </>
          ) : (
            <div className="card p-7">
              <h2 className="text-2xl font-black">No published needs right now</h2>
              <p className="muted mt-3">
                The database is connected, but there are currently no approved need
                records available to the public registry.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Status methodology"
            title="The same words must mean the same thing everywhere."
            description="This avoids accidentally presenting promises as completed support."
          />
          <div className="grid gap-3 md:grid-cols-2">
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
