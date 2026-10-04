import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { publicContent } from "@/lib/i18n/public-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function TransparencyPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].transparency;

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.readingRoom}
        imageAlt="Library reading room representing trustworthy public reporting"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.lifecycleEyebrow}
            title={copy.lifecycleTitle}
            description={copy.lifecycleDescription}
          />

          <ol className="mt-8 grid gap-3">
            {copy.stages.map(([title, description], index) => (
              <li
                className="card grid gap-4 p-5 md:grid-cols-[4rem_13rem_1fr] md:items-center"
                key={title}
              >
                <span className="text-lg font-black text-[var(--color-brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{title}</strong>
                <span className="muted">{description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.rulesEyebrow}
            title={copy.rulesTitle}
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {copy.rules.map(([title, description]) => (
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
