import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

const sampleNews = [
  {
    type: "Development",
    title: "Prototype development started",
    summary:
      "A sample update showing how future library-development and service news may appear.",
  },
  {
    type: "Collection",
    title: "Collection needs review",
    summary:
      "Future updates can explain category gaps, new arrivals, and verified collection-renewal progress.",
  },
  {
    type: "Smart library",
    title: "Smart-library roadmap",
    summary:
      "Future project updates can document connectivity, equipment, catalogue, and learning-space milestones.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Short, verified updates instead of a cluttered notice board."
        description="Production news will move through an approval workflow. The entries below remain sample content."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Sample updates"
            title="Keep each update focused on one useful change."
            description="Future posts can cover services, collections, development projects, new resources, and public notices."
          />

          <div className="grid-auto mt-8">
            {sampleNews.map((item, index) => (
              <article className="card overflow-hidden" key={item.title}>
                <div className="bg-[var(--color-brand-primary-soft)] px-6 py-4">
                  <span className="text-xs font-extrabold text-[var(--color-brand-primary-dark)]">
                    {item.type} • SAMPLE
                  </span>
                </div>
                <div className="p-6">
                  <p className="muted text-xs">Prototype entry {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-xl font-black tracking-[-0.02em]">
                    {item.title}
                  </h2>
                  <p className="muted mt-3">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
