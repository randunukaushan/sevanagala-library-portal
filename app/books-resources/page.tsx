import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function BooksResourcesPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].books;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.bookshelves}
        imageAlt="Curved wooden bookshelves filled with colorful books"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto">
            {copy.categories.map(([code, title, description]) => (
              <article className="card p-6" key={code}>
                <span className="inline-flex rounded-full bg-[var(--color-brand-primary-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-brand-primary-dark)]">
                  {code}
                </span>
                <h2 className="mt-4 text-xl font-black tracking-[-0.02em]">
                  {title}
                </h2>
                <p className="muted mt-3">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialImageBand
        eyebrow={copy.bandEyebrow}
        title={copy.bandTitle}
        description={copy.bandDescription}
        image={publicImages.readingRoom}
        imageAlt="Library reading room with shelves and study tables"
        href={localePath(locale, "/needs")}
        actionLabel={copy.bandAction}
        reverse
      />

      <section className="section section-soft">
        <div className="shell grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{copy.reviewEyebrow}</p>
            <h2 className="text-3xl font-black tracking-[-0.03em]">
              {copy.reviewTitle}
            </h2>
          </div>
          <div className="grid gap-3">
            {copy.review.map(([title, description]) => (
              <div className="card p-5" key={title}>
                <h3 className="font-black">{title}</h3>
                <p className="muted mt-2 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
