import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function NewsPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].news;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.bookshelves}
        imageAlt="Library bookshelves representing news and collection updates"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto mt-8">
            {copy.entries.map(([type, title, summary], index) => (
              <article className="card overflow-hidden" key={title}>
                <div className="bg-[var(--color-brand-primary-soft)] px-6 py-4">
                  <span className="text-xs font-extrabold text-[var(--color-brand-primary-dark)]">
                    {type} · {copy.sample}
                  </span>
                </div>
                <div className="p-6">
                  <p className="muted text-xs">
                    {copy.prototypeEntry} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-xl font-black tracking-[-0.02em]">
                    {title}
                  </h2>
                  <p className="muted mt-3">{summary}</p>
                </div>
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
        imageAlt="Warm modern library interior with shelves and reading areas"
        href={localePath(locale, "/projects")}
        actionLabel={copy.bandAction}
        reverse
      />
    </>
  );
}
