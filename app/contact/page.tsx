import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Official contact information will appear here after verification."
        description="The production website will provide the approved library address, phone, email, opening hours, and a safe contact path for readers and potential partners."
      />

      <section className="section">
        <div className="shell grid gap-6 md:grid-cols-2">
          <article className="card p-6">
            <h2 className="text-xl font-bold">Library contact</h2>
            <p className="muted mt-3">
              Pending institutional confirmation. Personal contact information
              is intentionally not used as a placeholder.
            </p>
          </article>
          <article className="card p-6">
            <h2 className="text-xl font-bold">Partnership enquiries</h2>
            <p className="muted mt-3">
              A future form will collect only the minimum information needed to
              respond and will include an approved privacy notice.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
