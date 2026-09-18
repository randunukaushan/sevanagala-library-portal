import { PageHero } from "@/components/page-hero";
import { sampleProjects } from "@/lib/sample-data";

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Development projects"
        title="Turn individual needs into clear, measurable library-development projects."
        description="Projects help supporters understand the outcome they are enabling rather than seeing a disconnected shopping list."
      />

      <section className="section">
        <div className="shell grid-auto">
          {sampleProjects.map((project) => (
            <article className="card p-6" key={project.title}>
              <span className="text-xs font-extrabold uppercase tracking-wide text-[var(--brand)]">
                {project.status}
              </span>
              <h2 className="mt-3 text-2xl font-bold">{project.title}</h2>
              <p className="muted mt-3">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]">
        <div className="shell">
          <p className="eyebrow">Project lifecycle</p>
          <p className="max-w-4xl text-xl font-bold">
            Planned → Approved → Seeking Support → In Progress → Completed → Archived
          </p>
          <p className="muted mt-3 max-w-3xl">
            Public status will be based on verified milestones and approved
            records rather than arbitrary progress percentages.
          </p>
        </div>
      </section>
    </>
  );
}
