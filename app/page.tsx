import { NeedCard } from "@/components/need-card";
import { sampleNeeds, sampleProjects } from "@/lib/sample-data";

export default function Home() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1.25fr_0.75fr] md:items-center">
          <div>
            <p className="eyebrow">Development prototype</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
              A clearer path from community needs to a modern public library.
            </h1>
            <p className="muted mt-5 max-w-2xl text-lg">
              This prototype explores a public website, verified needs registry,
              donor and partner transparency, collection development, and a
              future smart-library platform.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="button-primary" href="#needs">
                View sample needs
              </a>
              <a className="button-secondary" href="#projects">
                Explore roadmap
              </a>
            </div>
          </div>

          <aside className="card p-6" aria-label="Prototype status">
            <p className="eyebrow">Current status</p>
            <h2 className="text-2xl font-bold">Planning & prototype</h2>
            <p className="muted mt-3">
              Official permission, verified library details, real needs, public
              branding, and donor records are still pending.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>✓ Product documentation prepared</li>
              <li>✓ Donor transparency model prepared</li>
              <li>✓ Smart-library roadmap prepared</li>
              <li>• Institutional approval pending</li>
              <li>• Real library data pending</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <p className="eyebrow">About the platform</p>
          <div className="grid gap-8 md:grid-cols-2">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              One public place for readers, staff, supporters, and project
              progress.
            </h2>
            <p className="muted text-lg">
              The planned portal will help readers discover services and
              resources while giving verified supporters a transparent view of
              what the library needs, what has been pledged, what has arrived,
              and what remains.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]" id="needs">
        <div className="shell">
          <p className="eyebrow">Sample data</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold">Current needs registry</h2>
              <p className="muted mt-2 max-w-2xl">
                These cards are demonstration data only. Real quantities will
                appear after staff verification and approval.
              </p>
            </div>
          </div>
          <div className="grid-auto mt-8">
            {sampleNeeds.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="shell">
          <p className="eyebrow">Development roadmap</p>
          <h2 className="text-3xl font-extrabold">Sample library projects</h2>
          <div className="grid-auto mt-8">
            {sampleProjects.map((project) => (
              <article className="card p-5" key={project.title}>
                <span className="text-xs font-bold text-[var(--brand)]">
                  {project.status}
                </span>
                <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
                <p className="muted mt-2">{project.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface)]" id="transparency">
        <div className="shell grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Transparency by design</p>
            <h2 className="text-3xl font-extrabold">
              Pledged is not the same as received.
            </h2>
          </div>
          <div className="muted space-y-3">
            <p>
              The planned system will separate enquiries, accepted pledges,
              received items, verification, and completed deployment.
            </p>
            <p>
              Donor names or logos will only be displayed under an approved
              recognition process.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="shell">
          <div className="card p-7 md:p-9">
            <p className="eyebrow">Contact</p>
            <h2 className="text-3xl font-extrabold">
              Official contact details will be added after approval.
            </h2>
            <p className="muted mt-3 max-w-2xl">
              The production site will use verified institutional contact
              information. No personal contact details are published in this
              prototype.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
