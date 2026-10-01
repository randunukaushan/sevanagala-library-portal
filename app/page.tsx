import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { NeedCard } from "@/components/need-card";
import { SectionHeading } from "@/components/section-heading";
import { publicImages } from "@/lib/public-images";
import { sampleNeeds, sampleProjects } from "@/lib/sample-data";

const serviceCards = [
  {
    href: "/books-resources",
    title: "Books & resources",
    description:
      "A future home for collection discovery, student references, language learning, requested books and new arrivals.",
    image: publicImages.bookshelves,
    alt: "Curved wooden library bookshelves filled with books",
  },
  {
    href: "/services",
    title: "Reading, study & learning",
    description:
      "Library services designed around reading, reference, study support, children, digital access and community learning.",
    image: publicImages.readingRoom,
    alt: "Warm library reading room with bookshelves and study tables",
  },
  {
    href: "/projects",
    title: "Smart Library transformation",
    description:
      "Follow the roadmap for a safer, more comfortable, accessible and digitally enabled community learning hub.",
    image: publicImages.studyInterior,
    alt: "Modern public library with bookshelves and study areas",
  },
];

const smartLibraryPillars = [
  {
    title: "Better physical environment",
    description:
      "Comfort, ventilation, lighting, furniture, shelving, safety and accessibility are treated as part of the learning experience.",
  },
  {
    title: "Stronger collection",
    description:
      "Collection decisions will be guided by audit evidence, user demand and responsible review rather than mass disposal.",
  },
  {
    title: "Digital access",
    description:
      "The roadmap provides a foundation for connectivity, public ICT access, a digital catalogue and practical digital-learning services.",
  },
  {
    title: "Community learning",
    description:
      "The long-term model expands beyond lending into study support, skills, programmes and an inclusive community knowledge hub.",
  },
];

const evidenceSteps = [
  ["01", "Baseline evidence", "Document the current condition, service gaps and user experience."],
  ["02", "Verified need", "Confirm the problem, quantity, specification and priority before asking for support."],
  ["03", "Approved intervention", "Connect support to a defined item, project or measurable library outcome."],
  ["04", "Verified support", "Separate enquiries, pledges, received items and verified contributions."],
  ["05", "Measured outcome", "Publish approved evidence showing what changed and what remains outstanding."],
];

const projectImages = [
  publicImages.bookshelves,
  publicImages.studyInterior,
  publicImages.warmInterior,
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <div className="library-access-wrap">
        <div className="shell library-access-strip">
          <Link href="/services">
            <span>01</span>
            <strong>Use the library</strong>
            <small>Reading, study and community services</small>
          </Link>
          <Link href="/books-resources">
            <span>02</span>
            <strong>Books & resources</strong>
            <small>Collections, references and learning</small>
          </Link>
          <Link href="/projects">
            <span>03</span>
            <strong>Smart Library roadmap</strong>
            <small>See the transformation plan</small>
          </Link>
          <Link href="/support">
            <span>04</span>
            <strong>Support a verified need</strong>
            <small>Partner through an approved route</small>
          </Link>
          <Link className="library-access-action" href="/transparency">
            See transparency
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="shell editorial-intro">
          <div className="editorial-intro-copy">
            <p className="eyebrow">The transformation</p>
            <h2>From a traditional library to a Community Knowledge & Learning Hub.</h2>
            <p>
              The project connects the physical library, its collection, digital access,
              learning opportunities and public development reporting. Improvements are
              intended to be based on verified conditions and real community demand.
            </p>
            <Link className="button-primary mt-7" href="/about">
              Understand the vision
            </Link>

            <div className="editorial-points">
              <div className="editorial-point">
                <strong>Read</strong>
                <span>Relevant books, references and accessible collections</span>
              </div>
              <div className="editorial-point">
                <strong>Learn</strong>
                <span>Comfortable study, digital access and future programmes</span>
              </div>
              <div className="editorial-point">
                <strong>Connect</strong>
                <span>Community needs, partners and transparent progress</span>
              </div>
            </div>
          </div>

          <div className="image-stack" aria-label="Prototype library photography">
            <div className="image-stack-main">
              <Image
                alt="Warm library interior with floor-to-ceiling bookshelves"
                className="editorial-image"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                src={publicImages.warmInterior}
                unoptimized
              />
            </div>
            <div className="image-stack-small">
              <Image
                alt="Colorful books arranged on curved wooden shelves"
                className="editorial-image"
                fill
                sizes="(max-width: 980px) 45vw, 24vw"
                src={publicImages.bookshelves}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-editorial">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore"
            title="One platform for library use and library development."
            description="Readers should reach useful services quickly. Supporters should be able to understand the transformation without navigating through administrative complexity."
          />

          <div className="photo-grid">
            {serviceCards.map((item) => (
              <article className="photo-card" key={item.href}>
                <div className="photo-card-media">
                  <Image
                    alt={item.alt}
                    fill
                    sizes="(max-width: 980px) 100vw, 33vw"
                    src={item.image}
                    unoptimized
                  />
                </div>
                <div className="photo-card-overlay" />
                <div className="photo-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="photo-card-link" href={item.href}>
                    Explore →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Smart Library model"
            title="Smart means useful, inclusive and sustainable — not technology for its own sake."
            description="The target combines the building, collection, digital services and community learning into one practical public-library system."
            action={
              <Link className="button-secondary" href="/projects">
                View roadmap
              </Link>
            }
          />

          <div className="grid-auto">
            {smartLibraryPillars.map((pillar) => (
              <article className="card p-6" key={pillar.title}>
                <h3 className="text-xl font-black tracking-[-0.02em]">{pillar.title}</h3>
                <p className="muted mt-3">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Needs registry"
            title="Support should begin with evidence, not a vague donation request."
            description="Until verified production records are approved, the cards below remain clearly identified prototype examples. The final registry will show exact quantities, status and verification dates."
            action={
              <Link className="button-secondary" href="/needs">
                Open needs registry
              </Link>
            }
          />

          <div className="mb-6 rounded-[var(--radius-card)] bg-[var(--color-accent-soft)] px-5 py-4 text-sm">
            <strong>Prototype examples:</strong> these records are not official Sevanagala
            Public Library needs and must not be used as donor requests.
          </div>

          <div className="grid-auto">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Evidence-led support"
            title="A donor should be able to see exactly why support is needed and what it achieves."
            description="This evidence chain mirrors the donor pack and future public transparency workflow."
          />

          <ol className="grid gap-3">
            {evidenceSteps.map(([number, title, description]) => (
              <li
                className="card grid gap-4 p-5 md:grid-cols-[4rem_13rem_1fr] md:items-center"
                key={number}
              >
                <span className="text-lg font-black text-[var(--color-brand-primary)]">
                  {number}
                </span>
                <strong>{title}</strong>
                <span className="muted">{description}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="button-primary" href="/support">
              Support & partner
            </Link>
            <Link className="button-secondary" href="/transparency">
              See verification model
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Development roadmap"
            title="Projects should show the outcome, not just the shopping list."
            description="Prototype project cards establish the reporting pattern. Production projects will be published only after the related need, scope and approval are verified."
            action={
              <Link className="button-secondary" href="/projects">
                View projects
              </Link>
            }
          />

          <div className="mb-6 rounded-[var(--radius-card)] bg-[var(--color-info-soft)] px-5 py-4 text-sm text-[var(--color-info)]">
            <strong>Prototype project data:</strong> titles and progress shown here are
            demonstration content until approved project records are connected.
          </div>

          <div className="project-photo-grid">
            {sampleProjects.map((project, index) => (
              <article className="project-photo-card" key={project.title}>
                <div className="project-photo-media">
                  <Image
                    alt="Prototype library development photography"
                    fill
                    sizes="(max-width: 980px) 100vw, 33vw"
                    src={projectImages[index % projectImages.length]}
                    unoptimized
                  />
                </div>
                <div className="project-photo-copy">
                  <p className="eyebrow">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="shell">
          <blockquote>
            “A promise, a delivery, a verified contribution and a completed outcome are not the same event.”
          </blockquote>
          <p>
            The transparency model keeps those stages separate so supporters and the
            community can understand what has actually happened.
          </p>
          <Link className="button-primary mt-7" href="/transparency">
            See how transparency works
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="premium-cta">
            <Image
              alt="Modern library with study tables and bookshelves"
              className="premium-cta-image"
              fill
              sizes="(max-width: 1160px) 100vw, 1160px"
              src={publicImages.studyInterior}
              unoptimized
            />
            <div className="premium-cta-overlay" />
            <div className="premium-cta-copy">
              <p className="eyebrow eyebrow-light">Build the next chapter</p>
              <h2>Help turn a verified need into a visible library outcome.</h2>
              <p>
                The current V1 does not collect online cash. Partners are connected to
                approved needs and an authorised support route, with verification and
                progress reporting built into the process.
              </p>
              <div className="home-hero-actions">
                <Link className="button-light" href="/support">
                  Support & partner
                </Link>
                <Link className="button-ghost" href="/needs">
                  View current needs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
