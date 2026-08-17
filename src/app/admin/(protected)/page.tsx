import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Tableau de bord — Espace admin | e-Culture CI",
};

export default async function AdminDashboardPage() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalDeclarations,
    declarationsCeMois,
    totalImmatriculations,
    mentoratEnAttente,
    communesNouvelles,
  ] = await Promise.all([
    prisma.declaration.count(),
    prisma.declaration.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.immatriculation.count(),
    prisma.mentoratDemande.count({ where: { statutDemande: "EN_ATTENTE" } }),
    prisma.demandeCommune.count({ where: { statut: "NOUVELLE" } }),
  ]);

  const stats = [
    {
      label: "Déclarations (ce mois)",
      value: declarationsCeMois,
      href: "/admin/declarations",
    },
    {
      label: "Déclarations (total)",
      value: totalDeclarations,
      href: "/admin/declarations",
    },
    {
      label: "Immatriculations (total)",
      value: totalImmatriculations,
      href: "/admin/immatriculations",
    },
    {
      label: "Demandes de mentorat en attente",
      value: mentoratEnAttente,
      href: "/admin/mentorat",
    },
    {
      label: "Demandes de communes (nouvelles)",
      value: communesNouvelles,
      href: "/admin/communes",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">Tableau de bord</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-shadow hover:shadow-md">
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
