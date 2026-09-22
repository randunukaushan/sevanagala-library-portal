import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <Image
        alt={imageAlt}
        className="page-hero-image"
        fill
        priority
        sizes="100vw"
        src={image}
      />
      <div className="page-hero-overlay" />
      <div className="shell page-hero-content">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-hero-lead">{description}</p>
        <p className="prototype-photo-note">Prototype imagery · final site will use approved library photography</p>
      </div>
    </section>
  );
}
