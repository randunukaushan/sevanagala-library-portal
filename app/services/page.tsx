import { PageHero } from "@/components/page-hero";
import { publicImages } from "@/lib/public-images";
import { SectionHeading } from "@/components/section-heading";

const services = [
  {
    code: "READ",
    title: "Book lending",
    description:
      "Clear future guidance on borrowing, collection access, and reader services.",
    state: "Planned information",
  },
  {
    code: "REF",
    title: "Reference & study",
    description:
      "Reference books and study support for school students and independent learners.",
    state: "Current/future mix",
  },
  {
    code: "STUDY",
    title: "Student resources",
    description:
      "O/L, A/L, English, STEM, ICT, and future-skills entry points in one place.",
    state: "Priority area",
  },
  {
    code: "KIDS",
    title: "Children’s reading",
    description:
      "Age-appropriate books and future reading or learning activities for younger readers.",
    state: "Planned",
  },
  {
    code: "DIGI",
    title: "Digital access",
    description:
      "Future computers, internet access, research support, and digital-literacy services.",
    state: "Development roadmap",
  },
  {
    code: "COMM",
    title: "Community learning",
    description:
      "Future workshops, reading programmes, career support, and practical skills sessions.",
    state: "Development roadmap",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Library services"
        title="Help visitors understand what they can do before they arrive."
        description="The final service page will combine verified current services with clearly labelled future services. This prototype shows the intended structure."
        image={publicImages.readingRoom}
        imageAlt="Warm library reading room with bookshelves and study tables"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Service map"
            title="Simple categories instead of a long wall of text."
            description="Each service card will eventually link to practical information such as eligibility, availability, location, and what to bring."
          />

          <div className="grid-auto mt-8">
            {services.map((service) => (
              <article className="card flex min-h-64 flex-col p-6" key={service.code}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--color-brand-secondary-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-brand-secondary)]">
                    {service.code}
                  </span>
                  <span className="muted text-xs font-bold">{service.state}</span>
                </div>
                <h2 className="mt-5 text-xl font-black tracking-[-0.02em]">
                  {service.title}
                </h2>
                <p className="muted mt-3">{service.description}</p>
                <p className="mt-auto pt-5 text-sm font-bold text-[var(--color-brand-primary)]">
                  Details pending verification
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-extrabold tracking-[0.08em] text-white/70">
              SERVICE DESIGN RULE
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">
              Current and future services must never be mixed silently.
            </h2>
          </div>
          <p className="text-white/75">
            If a service is planned but not yet available, the website will say
            so clearly. That keeps expectations realistic and protects trust.
          </p>
        </div>
      </section>
    </>
  );
}
