import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].services;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.readingRoom}
        imageAlt="Warm library reading room with bookshelves and study tables"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto">
            {copy.services.map(([code, title, description, state]) => (
              <article className="card flex min-h-64 flex-col p-6" key={code}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--color-brand-secondary-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-brand-secondary)]">
                    {code}
                  </span>
                  <span className="muted text-xs font-bold">{state}</span>
                </div>
                <h2 className="mt-5 text-xl font-black tracking-[-0.02em]">
                  {title}
                </h2>
                <p className="muted mt-3">{description}</p>
                <p className="mt-auto pt-5 text-sm font-bold text-[var(--color-brand-primary)]">
                  {copy.detailsPending}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialImageBand
        eyebrow={copy.bandEyebrow}
        title={copy.bandTitle}
        description={copy.bandDescription}
        image={publicImages.warmInterior}
        imageAlt="Warm library interior with shelves, tables, and quiet reading areas"
        href={localePath(locale, "/books-resources")}
        actionLabel={copy.bandAction}
      />

      <section className="section section-dark">
        <div className="shell grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-extrabold tracking-[0.08em] text-white/70">
              {copy.ruleLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">
              {copy.ruleTitle}
            </h2>
          </div>
          <p className="text-white/75">{copy.ruleDescription}</p>
        </div>
      </section>
    </>
  );
}
