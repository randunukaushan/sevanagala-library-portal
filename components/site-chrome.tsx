"use client";

import { usePathname } from "next/navigation";
import { PrototypeBanner } from "@/components/prototype-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPreview = pathname.startsWith("/admin-preview");

  if (isAdminPreview) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <PrototypeBanner />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
