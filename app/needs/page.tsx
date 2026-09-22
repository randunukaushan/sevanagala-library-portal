import { NeedCard } from "@/components/need-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { getPublicNeeds } from "@/lib/public-needs";
import { publicImages } from "@/lib/public-images";

export const dynamic = "force-dynamic";

export default async function NeedsPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].needs;
  const registry = await getPublicNeeds(locale);
  const isPrototype = registry.mode === "prototype";
  const isLive = registry.mode === "live";

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={isLive ? copy.heroLive : copy.heroPrototype}
        image={publicImages.studyInterior}
        imageAlt="Modern library study interior with bookshelves"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={isLive ? copy.registryLive : copy.registryPrototype}
            title={copy.registryTitle}
            description={copy.registryDescription}
          />

          {registry.mode === "error" ? (
            <div className="card p-7">
              <h2 className="text-2xl font-black">{copy.errorTitle}</h2>
              <p className="muted mt-3">{copy.errorDescription}</p>
            </div>
          ) : registry.needs.length > 0 ? (
            <>
              {isPrototype ? (
                <div className="mb-6 rounded-[var(--radius-card)] bg-[var(--color-accent-soft)] px-5 py-4 text-sm">
                  <strong>{copy.prototypeNoticeTitle}</strong> {copy.prototypeNotice}
                </div>
              ) : null}

              <div className="grid-auto">
                {registry.needs.map((need) => (
                  <NeedCard key={need.id} need={need} locale={locale} />
                ))}
              </div>
            </>
          ) : (
            <div className="card p-7">
              <h2 className="text-2xl font-black">{copy.emptyTitle}</h2>
              <p className="muted mt-3">{copy.emptyDescription}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.methodologyEyebrow}
            title={copy.methodologyTitle}
            description={copy.methodologyDescription}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {copy.definitions.map(([title, description]) => (
              <article className="card p-5" key={title}>
                <h2 className="font-black">{title}</h2>
                <p className="muted mt-2">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
