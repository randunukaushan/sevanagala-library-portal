import type { ReactNode } from "react";

export function AdminFormField({
  label,
  help,
  required = false,
  children,
}: {
  label: string;
  help?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-extrabold">
        {label}
        {required ? <span className="text-[var(--color-danger)]"> *</span> : null}
      </span>
      {children}
      {help ? <span className="muted text-xs">{help}</span> : null}
    </label>
  );
}
