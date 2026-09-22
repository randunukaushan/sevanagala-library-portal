import Image from "next/image";
import Link from "next/link";

type EditorialImageBandProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
  actionLabel?: string;
  reverse?: boolean;
};

export function EditorialImageBand({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  actionLabel,
  reverse = false,
}: EditorialImageBandProps) {
  return (
    <section className="section editorial-band-section">
      <div className={reverse ? "shell editorial-band is-reverse" : "shell editorial-band"}>
        <div className="editorial-band-media">
          <Image
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
            src={image}
            unoptimized
          />
        </div>
        <div className="editorial-band-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
          {href && actionLabel ? (
            <Link className="button-quiet editorial-band-link" href={href}>
              {actionLabel} →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
