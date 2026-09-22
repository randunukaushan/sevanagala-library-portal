import Link from "next/link";
import { publicImages } from "@/lib/public-images";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    label: "Access",
    title: "Useful information first",
    description:
      "Services, resources, opening information, and contact details should be easier to find than institutional background.",
  },
  {
    label: "Learning",
    title: "Support every stage of learning",
    description:
      "The platform is designed for school students, children, adults, independent learners, and future digital-literacy programmes.",
  },
  {
    label: "Trust",
    title: "Make development visible",
    description:
      "Needs, pledges, received support, verification, and completed projects are deliberately kept as separate states.",
  },
];

const roadmap = [
  ["Collection", "Renew and strengthen books and reference resources."],
  ["Space", "Improve shelves, seating, lighting, comfort, and accessibility."],
  ["Connectivity", "Introduce reliable and well-managed internet access."],
  ["Digital access", "Add computers and practical digital-learning services."],
  ["Smart library", "Connect catalogue, portal, needs, projects, and staff tools."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the platform"
        title="A public-library portal designed around access, learning, and trust."
        description="The future official website should explain the library clearly, help people use it, and show how the library develops over time."
        image={publicImages.warmInterior}
        imageAlt="Warm modern library interior with floor-to-ceiling bookshelves"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Design intent"
            title="A digital front door, not just an information brochure."
            description="The portal is structured around what readers, staff, students, and supporters need to do."
          />
          <div className="grid-auto mt-8">
            {principles.map((item) => (
              <article className="card p-6" key={item.label}>
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                  {item.label}
                </p>
                <h2 className="mt-3 text-xl font-black tracking-[-0.02em]">
                  {item.title}
                </h2>
                <p className="muted mt-3">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Long-term direction"
            title="Move from collection improvement to a practical smart library."
            description="The roadmap is phased so technology follows real service needs, infrastructure readiness, and staff capacity."
          />

          <ol className="mt-8 grid gap-3">
            {roadmap.map(([title, description], index) => (
              <li
                className="card grid gap-4 p-5 md:grid-cols-[3.5rem_12rem_1fr] md:items-center"
                key={title}
              >
                <span className="text-sm font-black text-[var(--color-brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{title}</strong>
                <span className="muted">{description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <div>
              <p className="eyebrow">Prototype boundary</p>
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.03em]">
                Official history, statistics, contacts, and photographs are still pending.
              </h2>
              <p className="lead mt-4 text-base">
                Until permission and verification are complete, this prototype
                avoids presenting assumptions as official library facts.
              </p>
            </div>
            <Link className="button-primary" href="/contact">
              View contact status
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
