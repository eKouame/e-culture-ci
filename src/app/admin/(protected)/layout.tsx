import { requireAdminOrRedirect } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdminOrRedirect();

  return (
    <div>
      <AdminNav adminNom={admin.nom} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
