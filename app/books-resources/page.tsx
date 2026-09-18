import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

const categories = [
  ["O/L", "O/L learning resources", "Exam support and durable subject references."],
  ["A/L", "A/L learning resources", "Senior-secondary subject references and study support."],
  ["ENG", "English language learning", "Grammar, vocabulary, reading, writing, and communication."],
  ["MATH", "Mathematics", "Foundational and advanced mathematical learning resources."],
  ["SCI", "Science", "Biology, physics, chemistry, and general science references."],
  ["ICT", "ICT & digital literacy", "Computing, programming, AI basics, data literacy, and digital safety."],
  ["KIDS", "Children’s books", "Reading, stories, knowledge, and age-appropriate learning."],
  ["LIT", "Literature", "Sinhala, English, Tamil, and translated literary works."],
  ["CAREER", "Career & entrepreneurship", "Career guidance, business basics, finance, and employability skills."],
];

export default function BooksResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Books & resources"
        title="Make the collection easier to discover — after the data is ready."
        description="The first phase focuses on verified category gaps, exact reader requests, new arrivals, and collection review. A full searchable catalogue comes later."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Resource areas"
            title="Give students and readers clear entry points."
            description="These categories are designed to work before a full catalogue exists and can later become catalogue filters."
          />

          <div className="grid-auto mt-8">
            {categories.map(([code, title, description]) => (
              <article className="card p-6" key={code}>
                <span className="inline-flex rounded-full bg-[var(--color-brand-primary-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-brand-primary-dark)]">
                  {code}
                </span>
                <h2 className="mt-4 text-xl font-black tracking-[-0.02em]">
                  {title}
                </h2>
                <p className="muted mt-3">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Collection review</p>
            <h2 className="text-3xl font-black tracking-[-0.03em]">
              Condition and content currency are different questions.
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              ["Good condition", "The physical book is usable."],
              ["Review needed", "Its information may need librarian review."],
              ["Replacement recommended", "A newer or more suitable resource may be needed."],
              ["Historical/reference", "An older book may still deserve to remain in the collection."],
            ].map(([title, description]) => (
              <div className="card p-5" key={title}>
                <h3 className="font-black">{title}</h3>
                <p className="muted mt-2 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
