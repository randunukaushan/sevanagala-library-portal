import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
