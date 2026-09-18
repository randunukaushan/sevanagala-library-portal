import type { Need } from "@/lib/sample-data";

function remaining(need: Need) {
  return Math.max(need.target - need.pledged - need.received, 0);
}

export function NeedCard({ need }: { need: Need }) {
  const left = remaining(need);

  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-bold">
          {need.category}
        </span>
        <span className="text-xs font-bold">{need.priority} priority</span>
      </div>

      <h3 className="mt-5 text-xl font-bold">{need.title}</h3>
      <p className="muted mt-2">{need.purpose}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="muted">Target</dt>
          <dd className="font-bold">
            {need.target} {need.unit}
          </dd>
        </div>
        <div>
          <dt className="muted">Still needed</dt>
          <dd className="font-bold">
            {left} {need.unit}
          </dd>
        </div>
        <div>
          <dt className="muted">Pledged</dt>
          <dd className="font-bold">{need.pledged}</dd>
        </div>
        <div>
          <dt className="muted">Status</dt>
          <dd className="font-bold">{need.status}</dd>
        </div>
      </dl>

      <p className="muted mt-auto pt-5 text-xs">
        Last verified: {need.lastVerified}
      </p>
    </article>
  );
}
