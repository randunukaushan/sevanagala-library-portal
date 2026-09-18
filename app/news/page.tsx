import { PageHero } from "@/components/page-hero";

const sampleNews = [
  {
    title: "Prototype development started",
    summary:
      "A sample update showing how future library-development and service news may appear.",
    label: "Prototype",
  },
  {
    title: "Collection needs review",
    summary:
      "Future updates can explain category gaps, new arrivals, and verified collection-renewal progress.",
    label: "Sample",
  },
  {
    title: "Smart-library roadmap",
    summary:
      "Future project updates can document connectivity, equipment, digital catalogue, and learning-space milestones.",
    label: "Sample",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="Keep readers and supporters informed with short, verified updates."
        description="Production news will be published through an approval workflow. The cards below are sample content only."
      />
      <section className="section">
        <div className="shell grid-auto">
          {sampleNews.map((item) => (
            <article className="card p-6" key={item.title}>
              <span className="text-xs font-bold text-[var(--brand)]">{item.label}</span>
              <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
              <p className="muted mt-3">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
