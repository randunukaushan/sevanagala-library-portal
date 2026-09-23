"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { localeFromPathname, localePath } from "@/lib/i18n/config";
import { navigationCopy } from "@/lib/i18n/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const copy = navigationCopy[locale];

  const links = [
    { href: "/about", label: copy.about },
    { href: "/services", label: copy.services },
    { href: "/books-resources", label: copy.books },
    { href: "/needs", label: copy.needs },
    { href: "/projects", label: copy.projects },
    { href: "/transparency", label: copy.transparency },
    { href: "/contact", label: copy.contact },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 42);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={scrolled ? "site-nav site-nav-scrolled" : "site-nav"}>
      <div className="shell site-nav-inner">
        <Link
          href={localePath(locale, "/")}
          className="site-brand"
          aria-label={copy.homeLabel}
        >
          <span className="site-brand-mark">S</span>
          <span className="site-brand-copy">
            <strong>SEVANAGALA</strong>
            <span>{copy.libraryName}</span>
          </span>
          <span className="site-preview-pill">{copy.prototype}</span>
        </Link>

        <nav className="site-nav-links" aria-label={copy.primaryNav}>
          {links.map((link) => (
            <Link href={localePath(locale, link.href)} key={link.href}>
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link className="site-nav-cta" href={localePath(locale, "/support")}>
            {copy.partner}
          </Link>
        </nav>

        <details className="site-mobile-menu">
          <summary aria-label={copy.menu}>{copy.menu}</summary>
          <nav aria-label={copy.mobileNav}>
            {links.map((link) => (
              <Link href={localePath(locale, link.href)} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href={localePath(locale, "/support")}>{copy.supportPartner}</Link>
            <div className="site-mobile-language">
              <LanguageSwitcher />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
