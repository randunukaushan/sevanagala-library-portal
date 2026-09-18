type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="shell py-14 md:py-18">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="muted mt-5 max-w-3xl text-lg">{description}</p>
      </div>
    </section>
  );
}
