import Link from "next/link";

const libraryLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/books-resources", label: "Books & Resources" },
  { href: "/news", label: "News" },
];

const developmentLinks = [
  { href: "/needs", label: "Current Needs" },
  { href: "/projects", label: "Projects" },
  { href: "/support", label: "Support & Partner" },
  { href: "/transparency", label: "Transparency" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.35fr_0.65fr_0.65fr]">
        <div>
          <p className="text-lg font-black">Sevanagala Public Library Portal</p>
          <p className="muted mt-3 max-w-xl text-sm">
            Development prototype for a public-library website, verified needs
            registry, donor transparency portal, and future smart-library
            platform.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-accent)]">
            Prototype — not yet an official public website
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black">Library</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {libraryLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black">Development</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {developmentLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
