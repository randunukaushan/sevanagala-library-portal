export const publicLocales = ["en", "si", "ta"] as const;

export type PublicLocale = (typeof publicLocales)[number];

export const defaultPublicLocale: PublicLocale = "en";

export function isPublicLocale(value: string | undefined | null): value is PublicLocale {
  return Boolean(value && publicLocales.includes(value as PublicLocale));
}

export function localePath(locale: PublicLocale, pathname: string) {
  const clean = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${clean}`;
}

export function localeFromPathname(pathname: string): PublicLocale {
  const first = pathname.split("/").filter(Boolean)[0];
  return isPublicLocale(first) ? first : defaultPublicLocale;
}

export function stripLocalePrefix(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0 || !isPublicLocale(parts[0])) {
    return pathname || "/";
  }

  const stripped = `/${parts.slice(1).join("/")}`;
  return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
}
