import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].contact;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.hero}
        imageAlt="Expansive modern library interior representing the future public portal"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto">
            {copy.types.map(([title, description]) => (
              <article className="card p-6" key={title}>
                <h2 className="text-xl font-black tracking-[-0.02em]">{title}</h2>
                <p className="muted mt-3">{description}</p>
                <p className="mt-5 text-sm font-bold text-[var(--color-accent)]">
                  {copy.pending}
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
        image={publicImages.studyInterior}
        imageAlt="Modern library study space with bookshelves and tables"
        href={localePath(locale, "/support")}
        actionLabel={copy.bandAction}
      />

      <section className="section section-soft">
        <div className="shell">
          <div className="card p-7 md:p-9">
            <p className="eyebrow">{copy.privacyEyebrow}</p>
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.03em]">
              {copy.privacyTitle}
            </h2>
            <p className="lead mt-4 text-base">{copy.privacyDescription}</p>
          </div>
        </div>
      </section>
    </>
  );
}
