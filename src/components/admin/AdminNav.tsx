"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/declarations", label: "Déclarations" },
  { href: "/admin/immatriculations", label: "Immatriculations" },
  { href: "/admin/mentorat", label: "Mentorat" },
  { href: "/admin/communes", label: "Communes" },
];

export function AdminNav({ adminNom }: { adminNom: string | null }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Espace admin
          </p>
          {adminNom && (
            <p className="text-sm font-medium text-foreground">{adminNom}</p>
          )}
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === item.href
                  ? "bg-primary-light text-primary"
                  : "text-foreground hover:bg-black/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={logout}
            className="rounded-lg px-3 py-2 text-sm font-medium text-danger hover:bg-red-50"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </div>
  );
}
