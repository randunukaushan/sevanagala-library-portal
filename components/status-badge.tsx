import type { PublicLocale } from "@/lib/i18n/config";
import { needCardCopy } from "@/lib/i18n/need-card";
import type { NeedStatus } from "@/lib/sample-data";

function statusClass(status: NeedStatus) {
  switch (status) {
    case "Seeking Support":
      return "status-seeking";
    case "Partially Supported":
    case "Fully Pledged":
    case "Received":
      return "status-progress";
    case "Completed":
      return "status-success";
    default:
      return "status-neutral";
  }
}

export function StatusBadge({
  status,
  locale = "en",
}: {
  status: NeedStatus;
  locale?: PublicLocale;
}) {
  return (
    <span className={`status-badge ${statusClass(status)}`}>
      {needCardCopy[locale].statuses[status]}
    </span>
  );
}
