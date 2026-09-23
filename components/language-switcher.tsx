"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <details className="language-switcher">
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
          >
            {languageNames[locale]}
          </Link>
        ))}
      </div>
    </details>
  );
}
