import { EditorialImageBand } from "@/components/editorial-image-band";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { localePath } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { localizedSampleProjects } from "@/lib/i18n/sample-content";
import { getRequestLocale } from "@/lib/i18n/server";
import { publicImages } from "@/lib/public-images";

export default async function ProjectsPage() {
  const locale = await getRequestLocale();
  const copy = publicContent[locale].projects;
  const sampleProjects = localizedSampleProjects(locale);

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={publicImages.studyInterior}
        imageAlt="Modern library interior prepared as a development concept"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={copy.sectionEyebrow}
            title={copy.sectionTitle}
            description={copy.sectionDescription}
          />

          <div className="grid-auto mt-8">
            {sampleProjects.map((project, index) => (
              <article className="card overflow-hidden" key={project.title}>
                <div className="bg-[var(--color-brand-secondary-soft)] px-6 py-4">
                  <span className="text-xs font-extrabold text-[var(--color-brand-secondary)]">
                    {String(index + 1).padStart(2, "0")} · {project.status}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black tracking-[-0.025em]">
                    {project.title}
                  </h2>
                  <p className="muted mt-3">{project.summary}</p>
                  <p className="mt-5 text-sm font-bold text-[var(--color-brand-primary)]">
                    {copy.sampleLabel}
                  </p>
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
        image={publicImages.bookshelves}
        imageAlt="Modern bookshelves in a contemporary library interior"
        href={localePath(locale, "/transparency")}
        actionLabel={copy.bandAction}
      />

      <section className="section section-dark">
        <div className="shell">
          <p className="text-xs font-extrabold tracking-[0.08em] text-white/70">
            {copy.lifecycleLabel}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.lifecycle.map((stage, index) => (
              <div
                className="rounded-[var(--radius-control)] border border-white/15 bg-white/5 p-4"
                key={stage}
              >
                <span className="text-sm font-black text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-black">{stage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
