import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/books-resources", label: "Books" },
  { href: "/needs", label: "Needs" },
  { href: "/projects", label: "Projects" },
  { href: "/support", label: "Support" },
  { href: "/transparency", label: "Transparency" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="shell flex min-h-18 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="max-w-[22rem] no-underline">
          <span className="block text-sm font-extrabold tracking-wide text-[var(--brand)]">
            PROTOTYPE
          </span>
          <span className="font-bold">Sevanagala Public Library Portal</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
