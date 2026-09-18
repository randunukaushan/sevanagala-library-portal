import Link from "next/link";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminStatusPill } from "@/components/admin/admin-status-pill";
import { adminBooks } from "@/lib/admin-preview-data";

export default function AdminBooksPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Collection management"
        title="Books"
        description="Maintain collection records, physical condition, review status, classification, language, and copy count without automatically deciding that older books should be removed."
        action={<Link className="button-primary" href="/admin-preview/books/new">Add book — preview</Link>}
      />

      <AdminSection
        eyebrow="COLLECTION"
        title="Sample catalogue records"
        action={<Link className="button-secondary text-sm" href="/admin-preview/books/import">Import CSV — preview</Link>}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-soft)]">
              <tr>
                <th className="px-5 py-3 font-extrabold">Title</th>
                <th className="px-5 py-3 font-extrabold">Author</th>
                <th className="px-5 py-3 font-extrabold">Class</th>
                <th className="px-5 py-3 font-extrabold">Language</th>
                <th className="px-5 py-3 font-extrabold">Copies</th>
                <th className="px-5 py-3 font-extrabold">Condition</th>
                <th className="px-5 py-3 font-extrabold">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {adminBooks.map((book) => (
                <tr className="bg-[var(--color-surface)]" key={book.title}>
                  <td className="px-5 py-4 font-bold">{book.title}</td>
                  <td className="px-5 py-4">{book.author}</td>
                  <td className="px-5 py-4 font-black">{book.classCode}</td>
                  <td className="px-5 py-4">{book.language}</td>
                  <td className="px-5 py-4">{book.copies}</td>
                  <td className="px-5 py-4">{book.condition}</td>
                  <td className="px-5 py-4">
                    <AdminStatusPill label={book.review} tone={book.review === "Review Needed" ? "warning" : "success"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminSection eyebrow="IMPORTANT" title="Condition is not content currency">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            A physically good book may still need content review, while an old publication may remain valuable for historical or reference use.
          </p>
        </AdminSection>
        <AdminSection eyebrow="IMPORT" title="Safe bulk workflow">
          <p className="p-5 text-sm text-[var(--color-text-muted)]">
            Upload → map fields → validate → preview warnings/duplicates → approve → import → reconcile counts.
          </p>
        </AdminSection>
      </div>
    </>
  );
}
