"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localeFromPathname } from "@/lib/i18n/config";
import { navigationCopy } from "@/lib/i18n/navigation";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkspace =
    pathname.startsWith("/admin-preview") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/staff-login");

  if (isWorkspace) {
    return <>{children}</>;
  }

  const locale = localeFromPathname(pathname);
  const copy = navigationCopy[locale];

  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
