"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkspace =
    pathname.startsWith("/admin-preview") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/staff-login");

  if (isWorkspace) {
    return <>{children}</>;
  }

  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
