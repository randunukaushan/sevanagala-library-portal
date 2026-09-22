"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localePath } from "@/lib/i18n/config";
import { navigationCopy } from "@/lib/i18n/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const copy = navigationCopy[locale].footer;

  const explore = [
    ["/about", copy.about],
    ["/services", copy.services],
    ["/books-resources", copy.books],
    ["/news", copy.news],
  ];

  const development = [
    ["/needs", copy.currentNeeds],
    ["/projects", copy.projects],
    ["/support", copy.support],
    ["/transparency", copy.transparency],
  ];

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer-grid">
          <div>
            <p className="site-footer-title">Sevanagala Public Library</p>
            <p className="site-footer-copy">{copy.description}</p>
            <p className="site-footer-note">{copy.note}</p>
          </div>

          <div className="site-footer-column">
            <strong>{copy.explore}</strong>
            {explore.map(([href, label]) => (
              <Link href={localePath(locale, href)} key={href}>{label}</Link>
            ))}
          </div>

          <div className="site-footer-column">
            <strong>{copy.development}</strong>
            {development.map(([href, label]) => (
              <Link href={localePath(locale, href)} key={href}>{label}</Link>
            ))}
          </div>

          <div className="site-footer-column">
            <strong>{copy.contact}</strong>
            <Link href={localePath(locale, "/contact")}>{copy.libraryContact}</Link>
            <Link href={localePath(locale, "/contact")}>{copy.partnership}</Link>
            <Link href="/admin-preview">{copy.adminPreview}</Link>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>{copy.copyright}</span>
          <span>{copy.values}</span>
        </div>
      </div>
    </footer>
  );
}
