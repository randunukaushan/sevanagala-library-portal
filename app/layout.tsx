import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { defaultPublicLocale, isPublicLocale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: {
    default: "Sevanagala Public Library Portal — Prototype",
    template: "%s | Sevanagala Public Library Portal",
  },
  description:
    "Prototype for a public library website, development-needs registry, donor transparency portal, and future smart-library platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-public-locale");
  const locale = isPublicLocale(headerLocale) ? headerLocale : defaultPublicLocale;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
