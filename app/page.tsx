import Image from "next/image";
import Link from "next/link";
import { NeedCard } from "@/components/need-card";
import { SectionHeading } from "@/components/section-heading";
import { publicImages } from "@/lib/public-images";
import { sampleNeeds, sampleProjects } from "@/lib/sample-data";

const serviceCards = [
  {
    href: "/books-resources",
    title: "Books & resources",
    description:
      "Discover the future home for collections, student references, English learning, literature, and requested books.",
    image: publicImages.bookshelves,
    alt: "Curved wooden library bookshelves filled with books",
  },
  {
    href: "/services",
    title: "Reading & study",
    description:
      "A clear digital guide to reading, reference, study support, children’s services, and community learning.",
    image: publicImages.readingRoom,
    alt: "Warm library reading room with bookshelves and study tables",
  },
  {
    href: "/projects",
    title: "Digital future",
    description:
      "Follow planned improvements in computers, connectivity, learning spaces, and the smart-library roadmap.",
    image: publicImages.studyInterior,
    alt: "Modern public library with bookshelves and study areas",
  },
];

const projectImages = [
  publicImages.bookshelves,
  publicImages.studyInterior,
  publicImages.warmInterior,
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Image
          alt="Modern library interior with expansive bookshelves and study spaces"
          className="home-hero-image"
          fill
          priority
          sizes="100vw"
          src={publicImages.hero}
        />
        <div className="home-hero-overlay" />
        <div className="shell home-hero-content">
          <p className="eyebrow eyebrow-light">Reading · learning · community</p>
          <h1 className="display-title">A library worth growing with.</h1>
          <p className="home-hero-copy">
            A modern digital home for Sevanagala Public Library — bringing books,
            learning resources, future services, development projects, and transparent
            support into one calm, useful experience.
          </p>
          <div className="home-hero-actions">
            <Link className="button-light" href="/books-resources">
              Explore books & resources
            </Link>
            <Link className="button-ghost" href="/needs">
              See current needs
            </Link>
          </div>
          <p className="prototype-photo-note">
            Prototype · sample content and stock imagery until official library material is approved
          </p>
        </div>
        <div className="hero-scroll-note">Scroll to explore</div>
      </section>

      <section className="section">
        <div className="shell editorial-intro">
          <div className="editorial-intro-copy">
            <p className="eyebrow">A better digital front door</p>
            <h2>Designed to feel like a library, not a dashboard.</h2>
            <p>
              The public experience should be calm, visual, and easy to understand.
              Readers find useful services first; supporters see clear needs and verified
              progress without being pushed through a wall of administrative text.
            </p>
            <Link className="button-primary mt-7" href="/about">
              Discover the vision
            </Link>

            <div className="editorial-points">
              <div className="editorial-point">
                <strong>Read</strong>
                <span>Books, references & learning resources</span>
              </div>
              <div className="editorial-point">
                <strong>Learn</strong>
                <span>Study, digital skills & future programmes</span>
              </div>
              <div className="editorial-point">
                <strong>Grow</strong>
                <span>Projects, partners & transparent progress</span>
              </div>
            </div>
          </div>

          <div className="image-stack" aria-label="Library photography">
            <div className="image-stack-main">
              <Image
                alt="Warm library interior with floor-to-ceiling bookshelves"
                className="editorial-image"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                src={publicImages.warmInterior}
              />
            </div>
            <div className="image-stack-small">
              <Image
                alt="Colorful books arranged on curved wooden shelves"
                className="editorial-image"
                fill
                sizes="(max-width: 980px) 45vw, 24vw"
                src={publicImages.bookshelves}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-editorial">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore the library"
            title="Useful paths, beautifully presented."
            description="The final site will use real Sevanagala library photography. These high-quality prototype images establish the visual direction now."
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

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Verified needs"
            title="Support should begin with something real."
            description="Every published need will show what is required, what has already been covered, and when the information was last verified."
            action={
              <Link className="button-secondary" href="/needs">
                View all needs
              </Link>
            }
          />

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
            eyebrow="Development roadmap"
            title="Projects should show the outcome, not just the shopping list."
            description="Books, furniture, connectivity, computers, and facilities become more meaningful when they are connected to a clear library outcome."
            action={
              <Link className="button-secondary" href="/projects">
                View projects
              </Link>
            }
          />

          <div className="project-photo-grid">
            {sampleProjects.map((project, index) => (
              <article className="project-photo-card" key={project.title}>
                <div className="project-photo-media">
                  <Image
                    alt="Prototype library development photography"
                    fill
                    sizes="(max-width: 980px) 100vw, 33vw"
                    src={projectImages[index % projectImages.length]}
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
            “A public library website should make knowledge feel closer — and development easier to trust.”
          </blockquote>
          <p>
            The portal separates pledges, received items, verification, and completed
            outcomes so public progress remains understandable.
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
            />
            <div className="premium-cta-overlay" />
            <div className="premium-cta-copy">
              <p className="eyebrow eyebrow-light">Build the next chapter</p>
              <h2>From a stronger collection to a practical smart library.</h2>
              <p>
                The long-term vision connects better books, comfortable study spaces,
                digital access, transparent development, and community learning.
              </p>
              <div className="home-hero-actions">
                <Link className="button-light" href="/support">
                  Support & partner
                </Link>
                <Link className="button-ghost" href="/projects">
                  Explore the roadmap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
