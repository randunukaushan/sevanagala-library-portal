type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-brand-primary-soft)]">
      <div className="shell py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="lead mt-5">{description}</p>
      </div>
    </section>
  );
}
