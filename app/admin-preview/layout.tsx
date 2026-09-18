import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
