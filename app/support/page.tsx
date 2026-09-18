import { PageHero } from "@/components/page-hero";

const ways = [
  ["Books", "Support verified exact-title or category-based collection needs."],
  ["Technology", "Support approved computers, networking, printing, or digital-learning equipment."],
  ["Furniture & facilities", "Support approved shelves, tables, chairs, lighting, or other practical improvements."],
  ["Partnership", "Explore a longer-term education, literacy, technology, or community-development partnership."],
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support & partner"
        title="A clear route for organisations that want to help."
        description="The future production page will connect verified needs with an authorised library contact. Online cash collection is intentionally outside the current V1 scope."
      />

      <section className="section">
        <div className="shell grid-auto">
          {ways.map(([title, description]) => (
            <article className="card p-6" key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="muted mt-3">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]">
        <div className="shell">
          <p className="eyebrow">Recognition</p>
          <h2 className="text-3xl font-extrabold">Support can be acknowledged without becoming advertising.</h2>
          <p className="muted mt-4 max-w-3xl">
            With approval and consent, the future site may show an organisation
            name, approved logo, website, contribution summary, and verified
            impact. Acknowledgement will not imply endorsement.
          </p>
        </div>
      </section>
    </>
  );
}
