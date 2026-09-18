import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminProjects } from "@/lib/admin-preview-data";

export default function AdminProjectsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Development management"
        title="Projects"
        description="Group individual needs into measurable outcomes with milestones, responsible staff, and public progress updates."
        action={<span className="button-primary">Create project — preview</span>}
      />

      <section className="mt-7 grid gap-4 lg:grid-cols-3">
        {adminProjects.map((project) => (
          <article className="card overflow-hidden" key={project.title}>
            <div className="bg-[var(--color-brand-secondary-soft)] px-5 py-4">
              <AdminStatusPill
                label={project.status}
                tone={project.status === "Seeking Support" ? "warning" : "neutral"}
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-black tracking-[-0.02em]">{project.title}</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="muted text-xs">Related needs</dt>
                  <dd className="mt-1 font-black">{project.needs}</dd>
                </div>
                <div>
                  <dt className="muted text-xs">Owner</dt>
                  <dd className="mt-1 font-bold">{project.owner}</dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <p className="muted text-xs">Current milestone</p>
                <p className="mt-1 font-bold">{project.milestone}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <AdminSection eyebrow="MILESTONES" title="Project completion should follow evidence">
        <div className="grid gap-3 p-5 md:grid-cols-5">
          {["Approved", "Needs sourced", "Installation / cataloguing", "Staff handover", "Public completion update"].map(
            (stage, index) => (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4" key={stage}>
                <span className="text-xs font-black text-[var(--color-brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-bold">{stage}</p>
              </div>
            ),
          )}
        </div>
      </AdminSection>
    </>
  );
}
