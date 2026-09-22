import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { publicImages } from "@/lib/public-images";
import { SectionHeading } from "@/components/section-heading";

const contactTypes = [
  {
    title: "Library information",
    description:
      "Future official phone, email, opening hours, address, and service enquiries.",
  },
  {
    title: "Book & resource enquiries",
    description:
      "Questions about collection access, requested books, and future catalogue information.",
  },
  {
    title: "Partnership enquiries",
    description:
      "A dedicated route for book donors, foundations, NGOs, companies, and community partners.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Use verified institutional contacts — not personal placeholders."
        description="The production site will publish the approved library address, phone, email, opening hours, and a privacy-aware contact path."
        image={publicImages.hero}
        imageAlt="Expansive modern library interior representing the future public portal"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Planned contact routes"
            title="Different questions should reach the right person."
            description="The final routing will be confirmed with library staff before any real contact information is published."
          />

          <div className="grid-auto mt-8">
            {contactTypes.map((item) => (
              <article className="card p-6" key={item.title}>
                <h2 className="text-xl font-black tracking-[-0.02em]">
                  {item.title}
                </h2>
                <p className="muted mt-3">{item.description}</p>
                <p className="mt-5 text-sm font-bold text-[var(--color-accent)]">
                  Pending official confirmation
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialImageBand
        eyebrow="A welcoming front door"
        title="Make it obvious where a question should go."
        description="The final contact experience will combine approved institutional details with simple routes for readers, book enquiries, and potential partners — without exposing private personal information."
        image={publicImages.studyInterior}
        imageAlt="Modern library study space with bookshelves and tables"
        href="/support"
        actionLabel="View partnership options"
      />

      <section className="section section-soft">
        <div className="shell">
          <div className="card p-7 md:p-9">
            <p className="eyebrow">Privacy rule</p>
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.03em]">
              Future forms will ask only for the information needed to respond.
            </h2>
            <p className="lead mt-4 text-base">
              No unnecessary identity information, behavioural profiling, or
              private donor details will be exposed through the public contact experience.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
