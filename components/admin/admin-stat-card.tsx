type AdminStatCardProps = {
  label: string;
  value: string;
  note: string;
  tone?: "default" | "attention" | "positive";
};

export function AdminStatCard({
  label,
  value,
  note,
  tone = "default",
}: AdminStatCardProps) {
  const toneClass =
    tone === "attention"
      ? "border-[var(--color-warning)] bg-[var(--color-warning-soft)]"
      : tone === "positive"
        ? "border-[var(--color-success)] bg-[var(--color-success-soft)]"
        : "border-[var(--color-border)] bg-[var(--color-surface)]";

  return (
    <article className={`rounded-[var(--radius-card)] border p-5 ${toneClass}`}>
      <p className="text-xs font-extrabold text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-[-0.03em]">{value}</p>
      <p className="muted mt-2 text-sm">{note}</p>
    </article>
  );
}
