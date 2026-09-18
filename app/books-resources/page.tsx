import { PageHero } from "@/components/page-hero";

const categories = [
  "O/L learning resources",
  "A/L learning resources",
  "English language learning",
  "Mathematics",
  "Science",
  "ICT, programming & digital literacy",
  "Children's books",
  "Literature",
  "Career & entrepreneurship",
];

export default function BooksResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Books & resources"
        title="A future catalogue and resource-discovery space for readers."
        description="The first data phase will focus on category gaps, exact reader requests, new arrivals, and collection review before a full public catalogue is launched."
      />

      <section className="section">
        <div className="shell">
          <h2 className="text-3xl font-extrabold">Planned resource areas</h2>
          <div className="grid-auto mt-8">
            {categories.map((category) => (
              <article className="card p-5" key={category}>
                <h3 className="font-bold">{category}</h3>
                <p className="muted mt-2 text-sm">
                  Verified catalogue and availability data will be added after
                  collection records are prepared and reviewed.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]">
        <div className="shell">
          <p className="eyebrow">Collection quality</p>
          <h2 className="max-w-3xl text-3xl font-extrabold">
            Old, damaged, and outdated are not the same thing.
          </h2>
          <p className="muted mt-4 max-w-3xl">
            The planned collection workflow keeps physical condition separate
            from content currency. Any removal or withdrawal decision remains
            an authorised library process.
          </p>
        </div>
      </section>
    </>
  );
}
