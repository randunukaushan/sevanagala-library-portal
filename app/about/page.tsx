import { PageHero } from "@/components/page-hero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A public-library platform built around access, trust, and long-term development."
        description="This prototype defines how the future official website can explain the library, its community role, its services, and its path toward a modern smart library."
      />

      <section className="section">
        <div className="shell grid gap-6 md:grid-cols-3">
          <article className="card p-6">
            <h2 className="text-xl font-bold">Public information</h2>
            <p className="muted mt-3">
              Opening details, services, resources, news, and verified contact
              information will be published after approval.
            </p>
          </article>
          <article className="card p-6">
            <h2 className="text-xl font-bold">Community learning</h2>
            <p className="muted mt-3">
              The platform is designed to support students, children, adults,
              lifelong learners, and future digital-literacy programmes.
            </p>
          </article>
          <article className="card p-6">
            <h2 className="text-xl font-bold">Transparent development</h2>
            <p className="muted mt-3">
              Development needs, accepted pledges, verified support, and project
              progress will be separated clearly.
            </p>
          </article>
        </div>
      </section>

      <section className="section bg-[var(--surface-soft)]">
        <div className="shell grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Prototype boundary</p>
            <h2 className="text-3xl font-extrabold">Official details are still pending.</h2>
          </div>
          <div className="muted space-y-3">
            <p>
              The final About page will use approved history, governance,
              statistics, opening hours, photographs, and contact information.
            </p>
            <p>
              Until then, this prototype intentionally avoids unverified
              institutional claims.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
