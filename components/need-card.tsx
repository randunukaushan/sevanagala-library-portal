import { StatusBadge } from "@/components/status-badge";
import type { Need } from "@/lib/sample-data";

function remaining(need: Need) {
  return Math.max(need.target - need.pledged - need.received, 0);
}

function progress(need: Need) {
  if (need.target <= 0) return 0;
  const covered = Math.min(need.pledged + need.received, need.target);
  return Math.round((covered / need.target) * 100);
}

export function NeedCard({ need }: { need: Need }) {
  const left = remaining(need);
  const percent = progress(need);

  return (
    <article className="card need-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="need-category">{need.category}</span>
        <StatusBadge status={need.status} />
      </div>

      <h3 className="need-title">{need.title}</h3>
      <p className="need-purpose muted">{need.purpose}</p>

      <div className="need-remaining">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="muted text-xs font-semibold">Still needed</p>
            <p>
              <strong>{left}</strong>{" "}
              <span className="muted text-sm font-semibold">{need.unit}</span>
            </p>
          </div>
          <p className="muted text-sm">{percent}% covered</p>
        </div>

        <div
          className="progress-track mt-3"
          role="progressbar"
          aria-label={`Support progress for ${need.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="progress-value" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-4 text-sm">
        <div>
          <dt className="muted text-xs">Target</dt>
          <dd className="mt-1 font-semibold">{need.target}</dd>
        </div>
        <div>
          <dt className="muted text-xs">Pledged</dt>
          <dd className="mt-1 font-semibold">{need.pledged}</dd>
        </div>
        <div>
          <dt className="muted text-xs">Received</dt>
          <dd className="mt-1 font-semibold">{need.received}</dd>
        </div>
      </dl>

      <p className="muted mt-auto pt-5 text-xs">
        Last verified: {need.lastVerified}
      </p>
    </article>
  );
}
