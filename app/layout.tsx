import type { Metadata } from "next";
import "./globals.css";
import { PrototypeBanner } from "@/components/prototype-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Sevanagala Public Library Portal — Prototype",
    template: "%s | Sevanagala Public Library Portal",
  },
  description:
    "Prototype for a public library website, development-needs registry, donor transparency portal, and future smart-library platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <PrototypeBanner />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
