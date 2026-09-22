import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function SupportPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].support;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.warmInterior}
        imageAlt="Warm modern library interior representing partnership and learning"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto">
            {copy.ways.map(([title, description, examples]) => (
              <article className="card p-6" key={title}>
                <h2 className="text-xl font-black tracking-[-0.02em]">{title}</h2>
                <p className="muted mt-3">{description}</p>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
                    {copy.examples}
                  </p>
                  <p className="muted mt-2 text-sm">{examples}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">{copy.recognitionEyebrow}</p>
            <h2 className="text-3xl font-black tracking-[-0.03em]">
              {copy.recognitionTitle}
            </h2>
          </div>
          <div>
            <p className="lead text-base">{copy.recognitionDescription}</p>
            <Link className="button-primary mt-6" href={localePath(locale, "/transparency")}>
              {copy.recognitionAction}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
