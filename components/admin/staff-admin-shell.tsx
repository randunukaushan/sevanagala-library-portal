import Link from "next/link";
import { signOutStaff } from "@/app/admin/actions";

const navigation = [
  ["/admin", "Dashboard"],
  ["/admin/needs", "Needs"],
];

export function StaffAdminShell({
  displayName,
  roleName,
  children,
}: {
  displayName: string;
  roleName: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] md:grid-cols-[250px_1fr]">
        <aside className="hidden bg-[var(--color-brand-secondary)] px-4 py-6 text-white md:flex md:flex-col">
          <Link className="block px-2 no-underline" href="/admin">
            <span className="text-xs font-extrabold tracking-[0.08em] text-white/60">
              SEVANAGALA
            </span>
            <span className="mt-1 block text-lg font-black">Library Admin</span>
            <span className="mt-1 block text-xs text-white/55">Protected workspace</span>
          </Link>

          <nav className="mt-8" aria-label="Staff administration">
            <ul className="grid gap-1 text-sm">
              {navigation.map(([href, label]) => (
                <li key={href}>
                  <Link
                    className="block rounded-lg px-3 py-2.5 font-bold text-white/75 no-underline hover:bg-white/10 hover:text-white"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-white/10 px-2 pt-5">
            <p className="text-sm font-bold text-white">{displayName}</p>
            <p className="mt-1 text-xs text-white/55">{roleName ?? "Staff account"}</p>
            <form action={signOutStaff} className="mt-4">
              <button className="text-sm font-bold text-white/75 hover:text-white" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:hidden">
            <div>
              <p className="text-sm font-black">Library Admin</p>
              <p className="muted text-xs">{displayName}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link className="text-sm font-bold" href="/admin/needs">Needs</Link>
              <form action={signOutStaff}>
                <button className="text-sm font-bold" type="submit">Sign out</button>
              </form>
            </div>
          </header>

          <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
