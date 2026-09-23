"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  localeFromPathname,
  localePath,
  publicLocales,
  stripLocalePrefix,
} from "@/lib/i18n/config";
import { languageNames, navigationCopy } from "@/lib/i18n/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = localeFromPathname(pathname);
  const basePath = stripLocalePrefix(pathname);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    detailsRef.current?.removeAttribute("open");
  }, [pathname]);

  const closeMenu = () => {
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details className="language-switcher" ref={detailsRef}>
      <summary aria-label={navigationCopy[currentLocale].language}>
        {languageNames[currentLocale]}
      </summary>
      <div className="language-switcher-menu">
        {publicLocales.map((locale) => (
          <Link
            aria-current={locale === currentLocale ? "page" : undefined}
            href={localePath(locale, basePath)}
            key={locale}
            lang={locale}
            onClick={closeMenu}
          >
            {languageNames[locale]}
          </Link>
        ))}
      </div>
    </details>
  );
}
