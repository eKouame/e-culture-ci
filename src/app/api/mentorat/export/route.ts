import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutMentorat } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { toCsv } from "@/lib/csv";
import { STATUT_MENTORAT_LABELS, TYPE_SPECTACLE_LABELS } from "@/lib/labels";

export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || undefined;
  const statutDemande = searchParams.get("statutDemande") || undefined;
  const q = searchParams.get("q") || undefined;

  const where: Prisma.MentoratDemandeWhereInput = {};
  if (region) where.region = region;
  if (statutDemande) where.statutDemande = statutDemande as StatutMentorat;
  if (q) {
    where.OR = [
      { nomComplet: { contains: q } },
      { telephone: { contains: q } },
      { numero: { contains: q } },
    ];
  }

  const demandes = await prisma.mentoratDemande.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const csv = toCsv(
    demandes.map((m) => ({
      numero: m.numero,
      nomComplet: m.nomComplet,
      telephone: m.telephone,
      email: m.email,
      commune: m.commune,
      region: m.region,
      profilActuel: m.profilActuel,
      typeSpectacleInteret: TYPE_SPECTACLE_LABELS[m.typeSpectacleInteret],
      disponibilite: m.disponibilite,
      statutDemande: STATUT_MENTORAT_LABELS[m.statutDemande],
      createdAt: m.createdAt,
    })),
    [
      { key: "numero", label: "Numéro" },
      { key: "nomComplet", label: "Nom complet" },
      { key: "telephone", label: "Téléphone" },
      { key: "email", label: "Email" },
      { key: "commune", label: "Commune" },
      { key: "region", label: "Région" },
      { key: "profilActuel", label: "Profil actuel" },
      { key: "typeSpectacleInteret", label: "Spectacle visé" },
      { key: "disponibilite", label: "Disponibilité" },
      { key: "statutDemande", label: "Statut" },
      { key: "createdAt", label: "Date de soumission" },
    ],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mentorat.csv"`,
    },
  });
}
