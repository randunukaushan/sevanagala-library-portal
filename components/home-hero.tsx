"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { publicImages } from "@/lib/public-images";

export function HomeHero() {
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
        <p className="eyebrow eyebrow-light">Reading · learning · community</p>
        <h1 className="display-title">A library worth growing with.</h1>
        <p className="home-hero-copy">
          A modern digital home for Sevanagala Public Library — bringing books,
          learning resources, future services, development projects, and transparent
          support into one calm, useful experience.
        </p>
        <div className="home-hero-actions">
          <Link className="button-light" href="/books-resources">
            Explore books & resources
          </Link>
          <Link className="button-ghost" href="/needs">
            See current needs
          </Link>
        </div>
        <p className="prototype-photo-note">
          Prototype · stock imagery only until approved Sevanagala Library photography is available
        </p>
      </div>

      <div className="home-hero-dots" aria-label="Hero image controls">
        {publicImages.heroSlides.map((_, index) => (
          <button
            aria-label={`Show library image ${index + 1}`}
            aria-pressed={index === active}
            className={index === active ? "home-hero-dot is-active" : "home-hero-dot"}
            key={index}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>

      <div className="hero-scroll-note">Scroll to explore</div>
    </section>
  );
}
