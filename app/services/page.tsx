import { PageHero } from "@/components/page-hero";

const services = [
  ["Book lending", "Planned public information about lending and collection access."],
  ["Reference reading", "Reference and study resources for readers and students."],
  ["Student support", "O/L, A/L, English, STEM, ICT, and future-skills resources."],
  ["Children's reading", "Age-appropriate reading and future learning activities."],
  ["Digital access", "Future computers, internet access, research, and digital literacy."],
  ["Community learning", "Future workshops, reading programmes, and skills sessions."],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Library services should be easy to understand before a visitor arrives."
        description="This prototype shows the service structure. Final service availability and operating details will be confirmed by library staff."
      />
      <section className="section">
        <div className="shell grid-auto">
          {services.map(([title, description]) => (
            <article className="card p-6" key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="muted mt-3">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
