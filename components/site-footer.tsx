import Link from "next/link";

const explore = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/books-resources", "Books & Resources"],
  ["/news", "News"],
];

const development = [
  ["/needs", "Current Needs"],
  ["/projects", "Projects"],
  ["/support", "Support & Partner"],
  ["/transparency", "Transparency"],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer-grid">
          <div>
            <p className="site-footer-title">Sevanagala Public Library</p>
            <p className="site-footer-copy">
              A prototype digital home for reading, learning, transparent development,
              and the library&apos;s future smart-services journey.
            </p>
            <p className="site-footer-note">
              Prototype only · stock imagery and sample content are replaced by approved
              library material before an official launch.
            </p>
          </div>

          <div className="site-footer-column">
            <strong>Explore</strong>
            {explore.map(([href, label]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </div>

          <div className="site-footer-column">
            <strong>Development</strong>
            {development.map(([href, label]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </div>

          <div className="site-footer-column">
            <strong>Contact</strong>
            <Link href="/contact">Library contact</Link>
            <Link href="/contact">Partnership enquiries</Link>
            <Link href="/admin-preview">Admin UI preview</Link>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 Sevanagala Public Library Portal · Prototype.</span>
          <span>Accessible · multilingual-ready · transparency-first</span>
        </div>
      </div>
    </footer>
  );
}
