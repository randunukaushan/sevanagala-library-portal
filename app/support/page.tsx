import Link from "next/link";
import { publicImages } from "@/lib/public-images";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

const ways = [
  {
    title: "Books",
    description:
      "Support verified exact-title requests or category-based collection needs.",
    examples: "Reference, English, STEM, children’s, O/L and A/L resources",
  },
  {
    title: "Technology",
    description:
      "Support approved digital-access and smart-library equipment.",
    examples: "Computers, networking, printing, display and learning equipment",
  },
  {
    title: "Furniture & facilities",
    description:
      "Support practical improvements that make the library easier to use.",
    examples: "Shelves, tables, chairs, lighting and approved facility upgrades",
  },
  {
    title: "Long-term partnership",
    description:
      "Work with the library on a broader education or community-development outcome.",
    examples: "Literacy, digital skills, STEM, career or learning programmes",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support & partner"
        title="Make it easy for a suitable organisation to understand the next step."
        description="The production site will connect verified needs to an authorised library contact. Online cash collection remains outside the current V1 scope."
        image={publicImages.warmInterior}
        imageAlt="Warm modern library interior representing partnership and learning"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Ways to support"
            title="Start with a real, approved need."
            description="Support is organised around practical outcomes instead of a generic donation request."
          />

          <div className="grid-auto mt-8">
            {ways.map((item) => (
              <article className="card p-6" key={item.title}>
                <h2 className="text-xl font-black tracking-[-0.02em]">
                  {item.title}
                </h2>
                <p className="muted mt-3">{item.description}</p>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                    EXAMPLES
                  </p>
                  <p className="muted mt-2 text-sm">{item.examples}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Recognition policy</p>
            <h2 className="text-3xl font-black tracking-[-0.03em]">
              Acknowledge support without turning the library into an advertising space.
            </h2>
          </div>
          <div>
            <p className="lead text-base">
              With approval and consent, the site may show an organisation name,
              approved logo, website, contribution summary, and verified impact.
              Acknowledgement will not imply endorsement.
            </p>
            <Link className="button-primary mt-6" href="/transparency">
              See transparency model
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
