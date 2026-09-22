import Link from "next/link";
import { createNeed } from "@/app/admin/needs/actions";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { createClient } from "@/lib/supabase/server";

const inputClass =
  "min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm";

function jsonText(value: unknown, fallback: string) {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && "en" in value) {
    const candidate = (value as Record<string, unknown>).en;
    if (typeof candidate === "string") return candidate;
  }

  return fallback;
}

export default async function NewNeedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("need_categories")
    .select("key, title")
    .eq("active", true)
    .order("display_order");

  return (
    <>
      <AdminPageHeader
        eyebrow="Needs"
        title="Create draft need"
        description="Drafts are private. They must be submitted and approved before the public registry can read them."
        action={
          <Link className="button-secondary" href="/admin/needs">
            Back to needs
          </Link>
        }
      />

      {params.error ? (
        <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-danger-soft)] px-5 py-4 text-sm font-bold text-[var(--color-danger)]">
          Check the fields and your permissions, then try again.
        </div>
      ) : null}

      <form action={createNeed} className="mt-7 grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <AdminSection eyebrow="BASIC INFORMATION" title="What does the library need?">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <AdminFormField label="Need title" required>
                  <input
                    className={inputClass}
                    maxLength={160}
                    name="title"
                    placeholder="e.g. Updated English & STEM Books"
                    required
                  />
                </AdminFormField>
              </div>

              <AdminFormField label="Category" required>
                <select className={inputClass} name="category" required>
                  <option value="">Select category</option>
                  {(categories ?? []).map((category) => (
                    <option key={category.key} value={category.key}>
                      {jsonText(category.title, category.key)}
                    </option>
                  ))}
                </select>
              </AdminFormField>

              <AdminFormField label="Priority" required>
                <select className={inputClass} defaultValue="medium" name="priority">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </AdminFormField>

              <div className="md:col-span-2">
                <AdminFormField
                  label="Purpose"
                  help="Explain the reader or community outcome, not only the item."
                  required
                >
                  <textarea
                    className={inputClass + " min-h-32 resize-y"}
                    maxLength={2000}
                    name="purpose"
                    required
                  />
                </AdminFormField>
              </div>
            </div>
          </AdminSection>

          <AdminSection eyebrow="MEASURABLE TARGET" title="How much is needed?">
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <AdminFormField label="Target quantity" required>
                <input
                  className={inputClass}
                  min="0.01"
                  name="target"
                  required
                  step="0.01"
                  type="number"
                />
              </AdminFormField>
              <AdminFormField label="Unit" required>
                <input
                  className={inputClass}
                  maxLength={40}
                  name="unit"
                  placeholder="books, computers, seats..."
                  required
                />
              </AdminFormField>
            </div>
          </AdminSection>
        </div>

        <aside className="grid content-start gap-4">
          <div className="card p-5">
            <p className="eyebrow">Workflow</p>
            <h2 className="font-black">Draft first</h2>
            <p className="muted mt-2 text-sm">
              Saving this form does not publish anything. A separate approval action is
              required before the public registry can see the record.
            </p>
          </div>
          <button className="button-primary" type="submit">
            Save draft
          </button>
        </aside>
      </form>
    </>
  );
}
