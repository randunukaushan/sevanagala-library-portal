import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { defaultPublicLocale, isPublicLocale } from "@/lib/i18n/config";
import { getLocalizedPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-public-locale");
  const locale = isPublicLocale(headerLocale) ? headerLocale : defaultPublicLocale;
  const publicPath = headerStore.get("x-public-path");

  if (!publicPath) {
    return {
      title: "Sevanagala Public Library Portal — Prototype",
      description:
        "Prototype public library portal and protected staff workspace for Sevanagala Public Library.",
    };
  }

  const page = getLocalizedPageMetadata(locale, publicPath);

  return {
    title: `${page.title} | Sevanagala Public Library`,
    description: page.description,
  };
}

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
