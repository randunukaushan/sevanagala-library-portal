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

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="language-switcher-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 12h17M12 3c2.2 2.3 3.3 5.3 3.3 9S14.2 18.7 12 21M12 3C9.8 5.3 8.7 8.3 8.7 12S9.8 18.7 12 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = localeFromPathname(pathname);
  const basePath = stripLocalePrefix(pathname);
  const copy = navigationCopy[currentLocale];

  return (
    <details className="language-switcher">
      <summary aria-label={copy.language}>
        <GlobeIcon />
        <span>{languageNames[currentLocale]}</span>
      </summary>
      <div className="language-switcher-menu" role="list">
        {publicLocales.map((locale) => (
          <Link
            aria-current={locale === currentLocale ? "page" : undefined}
            href={localePath(locale, basePath)}
            key={locale}
            lang={locale}
            role="listitem"
          >
            <span>{languageNames[locale]}</span>
            {locale === currentLocale ? (
              <span aria-hidden="true" className="language-switcher-check">✓</span>
            ) : null}
          </Link>
        ))}
      </div>
    </details>
  );
}
