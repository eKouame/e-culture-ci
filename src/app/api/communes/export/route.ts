import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutDemandeCommune } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { toCsv } from "@/lib/csv";
import { STATUT_DEMANDE_COMMUNE_LABELS } from "@/lib/labels";

export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statut = searchParams.get("statut") || undefined;
  const q = searchParams.get("q") || undefined;

  const where: Prisma.DemandeCommuneWhereInput = {};
  if (statut) where.statut = statut as StatutDemandeCommune;
  if (q) {
    where.OR = [
      { nom: { contains: q } },
      { email: { contains: q } },
      { commune: { contains: q } },
      { numero: { contains: q } },
    ];
  }

  const demandes = await prisma.demandeCommune.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const csv = toCsv(
    demandes.map((d) => ({
      numero: d.numero,
      nom: d.nom,
      fonction: d.fonction,
      commune: d.commune,
      email: d.email,
      telephone: d.telephone,
      message: d.message,
      statut: STATUT_DEMANDE_COMMUNE_LABELS[d.statut],
      createdAt: d.createdAt,
    })),
    [
      { key: "numero", label: "Numéro" },
      { key: "nom", label: "Nom" },
      { key: "fonction", label: "Fonction" },
      { key: "commune", label: "Commune" },
      { key: "email", label: "Email" },
      { key: "telephone", label: "Téléphone" },
      { key: "message", label: "Message" },
      { key: "statut", label: "Statut" },
      { key: "createdAt", label: "Date de soumission" },
    ],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="communes.csv"`,
    },
  });
}
