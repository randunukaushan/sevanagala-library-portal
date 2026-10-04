import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].about;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.warmInterior}
        imageAlt="Warm modern library interior with floor-to-ceiling bookshelves"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.designEyebrow}
            title={copy.designTitle}
            description={copy.designDescription}
          />
          <div className="grid-auto mt-8">
            {copy.principles.map(([label, title, description]) => (
              <article className="card p-6" key={label}>
                <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                  {label}
                </p>
                <h2 className="mt-3 text-xl font-black tracking-[-0.02em]">
                  {title}
                </h2>
                <p className="muted mt-3">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.roadmapEyebrow}
            title={copy.roadmapTitle}
            description={copy.roadmapDescription}
          />

          <ol className="mt-8 grid gap-3">
            {copy.roadmap.map(([title, description], index) => (
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
              <p className="eyebrow">{copy.boundaryEyebrow}</p>
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.03em]">
                {copy.boundaryTitle}
              </h2>
              <p className="lead mt-4 text-base">{copy.boundaryDescription}</p>
            </div>
            <Link className="button-primary" href={localePath(locale, "/contact")}>
              {copy.boundaryAction}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
