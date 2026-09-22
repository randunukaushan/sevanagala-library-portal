"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/books-resources", label: "Books" },
  { href: "/needs", label: "Needs" },
  { href: "/projects", label: "Projects" },
  { href: "/transparency", label: "Transparency" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 42);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={scrolled ? "site-nav site-nav-scrolled" : "site-nav"}>
      <div className="shell site-nav-inner">
        <Link href="/" className="site-brand" aria-label="Sevanagala Public Library home">
          <span className="site-brand-mark">S</span>
          <span className="site-brand-copy">
            <strong>SEVANAGALA</strong>
            <span>Public Library</span>
          </span>
          <span className="site-preview-pill">Prototype</span>
        </Link>

        <nav className="site-nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="site-nav-cta" href="/support">
            Partner
          </Link>
        </nav>

        <details className="site-mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/support">Support & Partner</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
