import Image from "next/image";
import { navigationCopy } from "@/lib/i18n/navigation";
import { getRequestLocale } from "@/lib/i18n/server";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export async function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: PageHeroProps) {
  const locale = await getRequestLocale();

  return (
    <section className="page-hero">
      <Image
        alt={imageAlt}
        className="page-hero-image"
        fill
        priority
        sizes="100vw"
        src={image}
        unoptimized
      />
      <div className="page-hero-overlay" />
      <div className="shell page-hero-content">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-hero-lead">{description}</p>
        <p className="prototype-photo-note">
          {navigationCopy[locale].prototypeImagery}
        </p>
      </div>
    </section>
  );
}
