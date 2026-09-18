import type { ReactNode } from "react";

export function AdminSection({
  title,
  eyebrow,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
        <div>
          {eyebrow ? (
            <p className="text-xs font-extrabold text-[var(--color-brand-primary)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className={eyebrow ? "mt-1 text-xl font-black" : "text-xl font-black"}>
            {title}
          </h2>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
