import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { NeedCard } from "@/components/need-card";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { localizedSampleNeeds, localizedSampleProjects } from "@/lib/i18n/sample-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

const serviceImages = [
  {
    href: "/books-resources",
    image: publicImages.bookshelves,
    alt: "Curved wooden library bookshelves filled with books",
  },
  {
    href: "/services",
    image: publicImages.readingRoom,
    alt: "Warm library reading room with bookshelves and study tables",
  },
  {
    href: "/projects",
    image: publicImages.studyInterior,
    alt: "Modern public library with bookshelves and study areas",
  },
];

const projectImages = [
  publicImages.bookshelves,
  publicImages.studyInterior,
  publicImages.warmInterior,
];

export default async function Home() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].home;
  const sampleNeeds = localizedSampleNeeds(locale);
  const sampleProjects = localizedSampleProjects(locale);

  return (
    <>
      <HomeHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryLabel={copy.hero.primary}
        secondaryLabel={copy.hero.secondary}
        primaryHref={localePath(locale, "/books-resources")}
        secondaryHref={localePath(locale, "/needs")}
        prototypeNote={copy.hero.prototype}
        scrollLabel={copy.hero.scroll}
        slideLabel={copy.hero.slideLabel}
      />

      <div className="library-access-wrap">
        <div className="shell library-access-strip">
          {copy.access.map(([title, description], index) => {
            const href = ["/books-resources", "/services", "/needs", "/support"][index];
            return (
              <Link href={localePath(locale, href)} key={href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <small>{description}</small>
              </Link>
            );
          })}
          <Link className="library-access-action" href={localePath(locale, "/about")}>
            {copy.accessAction}
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="shell editorial-intro">
          <div className="editorial-intro-copy">
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h2>{copy.intro.title}</h2>
            <p>{copy.intro.description}</p>
            <Link className="button-primary mt-7" href={localePath(locale, "/about")}>
              {copy.intro.action}
            </Link>

            <div className="editorial-points">
              {copy.intro.points.map(([title, description]) => (
                <div className="editorial-point" key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>
              ))}
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
            eyebrow={copy.explore.eyebrow}
            title={copy.explore.title}
            description={copy.explore.description}
          />

          <div className="photo-grid">
            {copy.explore.cards.map(([title, description, action], index) => {
              const item = serviceImages[index];
              return (
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
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <Link className="photo-card-link" href={localePath(locale, item.href)}>
                      {action} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.needs.eyebrow}
            title={copy.needs.title}
            description={copy.needs.description}
            action={
              <Link className="button-secondary" href={localePath(locale, "/needs")}>
                {copy.needs.action}
              </Link>
            }
          />

          <div className="grid-auto">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.projects.eyebrow}
            title={copy.projects.title}
            description={copy.projects.description}
            action={
              <Link className="button-secondary" href={localePath(locale, "/projects")}>
                {copy.projects.action}
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
          <blockquote>“{copy.quote}”</blockquote>
          <p>{copy.quoteDescription}</p>
          <Link className="button-primary mt-7" href={localePath(locale, "/transparency")}>
            {copy.quoteAction}
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
              <p className="eyebrow eyebrow-light">{copy.cta.eyebrow}</p>
              <h2>{copy.cta.title}</h2>
              <p>{copy.cta.description}</p>
              <div className="home-hero-actions">
                <Link className="button-light" href={localePath(locale, "/support")}>
                  {copy.cta.primary}
                </Link>
                <Link className="button-ghost" href={localePath(locale, "/projects")}>
                  {copy.cta.secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
