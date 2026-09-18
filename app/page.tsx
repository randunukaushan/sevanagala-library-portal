import Link from "next/link";
import { NeedCard } from "@/components/need-card";
import { SectionHeading } from "@/components/section-heading";
import { sampleNeeds, sampleProjects } from "@/lib/sample-data";

const quickLinks = [
  {
    href: "/services",
    label: "Library services",
    title: "See what the library can offer",
    description:
      "A clear future home for lending, reference, student support, children’s services, and digital access.",
  },
  {
    href: "/books-resources",
    label: "Books & resources",
    title: "Find learning and reading resources",
    description:
      "Browse future O/L, A/L, English, STEM, ICT, children’s, literature, and career resource areas.",
  },
  {
    href: "/support",
    label: "Support & partner",
    title: "Understand how organisations can help",
    description:
      "Connect verified library needs with book donors, education partners, technology support, and CSR programmes.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-20">
          <div>
            <p className="eyebrow">Community • Learning • Transparency</p>
            <h1 className="display-title">
              A modern digital front door for Sevanagala Public Library.
            </h1>
            <p className="lead mt-5">
              This prototype brings library information, books and learning
              resources, verified development needs, project progress, and
              future smart-library services into one clear public platform.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="button-primary" href="/services">
                Explore library services
              </Link>
              <Link className="button-secondary" href="/needs">
                View sample needs
              </Link>
            </div>
          </div>

          <aside
            className="card card-raised overflow-hidden"
            aria-label="Prototype portal priorities"
          >
            <div className="bg-[var(--color-brand-secondary)] p-6 text-white">
              <p className="text-xs font-extrabold tracking-[0.08em] text-white/75">
                DESIGNED AROUND REAL TASKS
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.02em]">
                Useful first. Transparent by design.
              </h2>
            </div>
            <div className="grid gap-0">
              {[
                ["01", "Find services and resources without searching through long pages."],
                ["02", "See what the library needs and what support is already covered."],
                ["03", "Track projects from planning to verified completion."],
              ].map(([number, text]) => (
                <div
                  className="grid grid-cols-[3rem_1fr] gap-3 border-t border-[var(--color-border)] p-5 first:border-t-0"
                  key={number}
                >
                  <span className="font-black text-[var(--color-brand-primary)]">
                    {number}
                  </span>
                  <p className="muted text-sm">{text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Start here"
            title="Built for readers, students, staff, and supporters."
            description="The public experience is organised around the things people are most likely to come here to do."
          />
          <div className="grid-auto mt-8">
            {quickLinks.map((item) => (
              <article className="card p-6" key={item.href}>
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-xl font-black tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="muted mt-3 text-sm">{item.description}</p>
                <Link className="button-quiet mt-4 px-0" href={item.href}>
                  Explore →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="needs">
        <div className="shell">
          <SectionHeading
            eyebrow="Verified-needs model"
            title="Make every library need specific and trackable."
            description="These cards contain sample data only. Real quantities will be published after library staff verify them."
            action={
              <Link className="button-secondary" href="/needs">
                View all needs
              </Link>
            }
          />

          <div className="grid-auto mt-8">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="shell">
          <SectionHeading
            eyebrow="Development roadmap"
            title="Package improvements as outcomes, not a shopping list."
            description="Projects connect books, facilities, technology, and learning goals into understandable development steps."
            action={
              <Link className="button-secondary" href="/projects">
                View projects
              </Link>
            }
          />

          <div className="grid-auto mt-8">
            {sampleProjects.map((project) => (
              <article className="card p-6" key={project.title}>
                <span className="status-badge status-neutral">
                  {project.status}
                </span>
                <h3 className="mt-4 text-xl font-black tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="muted mt-3">{project.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="transparency">
        <div className="shell grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text-xs font-extrabold tracking-[0.08em] text-white/70">
              TRANSPARENCY
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-[-0.03em] md:text-4xl">
              A promise is not the same as a verified donation.
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              The portal separates each step so future supporters can see what
              is genuinely outstanding and what has already been completed.
            </p>
            <Link
              className="mt-6 inline-flex min-h-46 items-center rounded-[var(--radius-control)] bg-white px-4 py-3 font-extrabold text-[var(--color-brand-secondary)] no-underline"
              href="/transparency"
            >
              See how tracking works
            </Link>
          </div>

          <ol className="grid gap-3">
            {[
              "Enquiry",
              "Accepted pledge",
              "Received",
              "Verified",
              "Deployed or catalogued",
              "Completed",
            ].map((stage, index) => (
              <li
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-[var(--radius-control)] border border-white/15 bg-white/5 px-4 py-3"
                key={stage}
              >
                <span className="text-sm font-black text-white/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-bold">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card grid gap-6 overflow-hidden md:grid-cols-[1fr_auto] md:items-center">
            <div className="p-7 md:p-9">
              <p className="eyebrow">Official details pending</p>
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.03em]">
                Real library contacts and approved content will replace
                placeholders after permission is confirmed.
              </h2>
              <p className="lead mt-4 text-base">
                The prototype deliberately avoids publishing personal contact
                details or unverified institutional claims.
              </p>
            </div>
            <div className="p-7 pt-0 md:p-9">
              <Link className="button-primary" href="/contact">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
