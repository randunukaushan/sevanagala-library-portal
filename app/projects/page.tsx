import { PageHero } from "@/components/page-hero";
import { publicImages } from "@/lib/public-images";
import { SectionHeading } from "@/components/section-heading";
import { sampleProjects } from "@/lib/sample-data";

const lifecycle = [
  "Planned",
  "Approved",
  "Seeking Support",
  "In Progress",
  "Completed",
  "Archived",
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Development projects"
        title="Show the outcome behind the equipment, books, or facilities."
        description="Projects group individual needs into understandable development goals so supporters can see what a contribution is helping the library achieve."
        image={publicImages.studyInterior}
        imageAlt="Modern library interior prepared as a development concept"
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Sample projects"
            title="A project should tell a complete story."
            description="Each future project page will explain the problem, objective, related needs, milestones, support received, and latest verified update."
          />

          <div className="grid-auto mt-8">
            {sampleProjects.map((project, index) => (
              <article className="card overflow-hidden" key={project.title}>
                <div className="bg-[var(--color-brand-secondary-soft)] px-6 py-4">
                  <span className="text-xs font-extrabold text-[var(--color-brand-secondary)]">
                    PROJECT {String(index + 1).padStart(2, "0")} • {project.status}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black tracking-[-0.025em]">
                    {project.title}
                  </h2>
                  <p className="muted mt-3">{project.summary}</p>
                  <p className="mt-5 text-sm font-bold text-[var(--color-brand-primary)]">
                    Sample project — milestones pending
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <p className="text-xs font-extrabold tracking-[0.08em] text-white/70">
            PROJECT LIFECYCLE
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycle.map((stage, index) => (
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
