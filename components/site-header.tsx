import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/books-resources", label: "Books & Resources" },
  { href: "/needs", label: "Needs" },
  { href: "/projects", label: "Projects" },
  { href: "/support", label: "Support" },
  { href: "/transparency", label: "Transparency" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:rgba(255,255,255,0.96)] backdrop-blur">
      <div className="shell flex min-h-18 items-center justify-between gap-5 py-3">
        <Link href="/" className="min-w-0 no-underline">
          <span className="block text-xs font-extrabold tracking-[0.08em] text-[var(--color-brand-primary)]">
            SEVANAGALA
          </span>
          <span className="block truncate text-base font-black tracking-[-0.01em] sm:text-lg">
            Public Library Portal
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-1 text-sm font-bold">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="mobile-menu relative md:hidden">
          <summary className="button-secondary min-w-20">Menu</summary>
          <nav
            className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-1.25rem))] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)]"
            aria-label="Mobile navigation"
          >
            <ul className="grid gap-1 text-sm font-bold">
              {links.map((link) => (
                <li key={link.href}>
                  <Link className="nav-link w-full" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
