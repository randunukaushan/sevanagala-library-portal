"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin-preview", label: "Dashboard" },
  { href: "/admin-preview/needs", label: "Needs" },
  { href: "/admin-preview/projects", label: "Projects" },
  { href: "/admin-preview/pledges", label: "Pledges" },
  { href: "/admin-preview/donations", label: "Donations" },
  { href: "/admin-preview/partners", label: "Partners" },
  { href: "/admin-preview/books", label: "Books" },
  { href: "/admin-preview/book-requests", label: "Book Requests" },
  { href: "/admin-preview/enquiries", label: "Enquiries" },
  { href: "/admin-preview/pages", label: "Pages" },
  { href: "/admin-preview/news", label: "News" },
  { href: "/admin-preview/media", label: "Media" },
  { href: "/admin-preview/users", label: "Users" },
  { href: "/admin-preview/audit-log", label: "Audit Log" },
  { href: "/admin-preview/settings", label: "Settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin-preview") return pathname === href;
  return pathname.startsWith(href);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-accent-soft)]">
        <div className="mx-auto flex min-h-11 max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-sm sm:px-6">
          <p>
            <strong>Admin UI preview only.</strong> Sample data; no real writes or
            authentication.
          </p>
          <Link className="font-extrabold text-[var(--color-brand-primary)]" href="/">
            Public site
          </Link>
        </div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-2.75rem)] max-w-[1440px] md:grid-cols-[250px_1fr]">
        <aside className="hidden border-r border-[var(--color-border)] bg-[var(--color-brand-secondary)] px-4 py-6 text-white md:block">
          <Link className="block px-2 no-underline" href="/admin-preview">
            <span className="text-xs font-extrabold tracking-[0.08em] text-white/60">
              SEVANAGALA
            </span>
            <span className="mt-1 block text-lg font-black">Library Admin</span>
            <span className="mt-1 block text-xs text-white/55">Prototype workspace</span>
          </Link>

          <nav className="mt-8" aria-label="Admin preview navigation">
            <ul className="grid gap-1 text-sm">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      className={
                        active
                          ? "block rounded-lg bg-white/12 px-3 py-2.5 font-extrabold text-white no-underline"
                          : "block rounded-lg px-3 py-2.5 font-bold text-white/72 no-underline hover:bg-white/7 hover:text-white"
                      }
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:hidden">
            <details className="mobile-menu">
              <summary className="button-secondary w-full justify-between">
                Admin navigation
              </summary>
              <nav className="mt-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
                <ul className="grid gap-1 text-sm">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        className={
                          isActive(pathname, item.href)
                            ? "block rounded-lg bg-[var(--color-brand-primary-soft)] px-3 py-2.5 font-extrabold text-[var(--color-brand-primary)] no-underline"
                            : "block rounded-lg px-3 py-2.5 font-bold no-underline"
                        }
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>

          <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
