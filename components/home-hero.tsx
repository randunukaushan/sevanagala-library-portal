"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { publicImages } from "@/lib/public-images";

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref: string;
  secondaryHref: string;
  prototypeNote: string;
  scrollLabel: string;
  slideLabel: string;
};

export function HomeHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  primaryHref,
  secondaryHref,
  prototypeNote,
  scrollLabel,
  slideLabel,
}: HomeHeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % publicImages.heroSlides.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="home-hero">
      <div className="home-hero-slides" aria-hidden="true">
        {publicImages.heroSlides.map((src, index) => (
          <Image
            alt=""
            className={index === active ? "home-hero-slide is-active" : "home-hero-slide"}
            fill
            key={src}
            priority={index === 0}
            sizes="100vw"
            src={src}
            unoptimized
          />
        ))}
      </div>

      <div className="home-hero-overlay" />

      <div className="shell home-hero-content">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="display-title">{title}</h1>
        <p className="home-hero-copy">{description}</p>
        <div className="home-hero-actions">
          <Link className="button-light" href={primaryHref}>
            {primaryLabel}
          </Link>
          <Link className="button-ghost" href={secondaryHref}>
            {secondaryLabel}
          </Link>
        </div>
        <p className="prototype-photo-note">{prototypeNote}</p>
      </div>

      <div className="home-hero-dots" aria-label={slideLabel}>
        {publicImages.heroSlides.map((_, index) => (
          <button
            aria-label={`${slideLabel} ${index + 1}`}
            aria-pressed={index === active}
            className={index === active ? "home-hero-dot is-active" : "home-hero-dot"}
            key={index}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>

      <div className="hero-scroll-note">{scrollLabel}</div>
    </section>
  );
}
