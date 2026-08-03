import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutDossier } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { toCsv } from "@/lib/csv";
import { STATUT_DOSSIER_LABELS, TYPE_SPECTACLE_LABELS } from "@/lib/labels";

export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || undefined;
  const statutDossier = searchParams.get("statutDossier") || undefined;
  const q = searchParams.get("q") || undefined;

  const where: Prisma.DeclarationWhereInput = {};
  if (region) where.region = region;
  if (statutDossier) where.statutDossier = statutDossier as StatutDossier;
  if (q) {
    where.OR = [
      { organisateurNom: { contains: q } },
      { organisateurTelephone: { contains: q } },
      { numero: { contains: q } },
    ];
  }

  const declarations = await prisma.declaration.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const csv = toCsv(
    declarations.map((d) => ({
      numero: d.numero,
      organisateurNom: d.organisateurNom,
      organisateurPrenom: d.organisateurPrenom,
      organisateurTelephone: d.organisateurTelephone,
      organisateurStructure: d.organisateurStructure,
      typeSpectacle: TYPE_SPECTACLE_LABELS[d.typeSpectacle],
      titreEvenement: d.titreEvenement,
      dateEvenement: d.dateEvenement,
      lieu: d.lieu,
      commune: d.commune,
      region: d.region,
      jaugeEstimee: d.jaugeEstimee,
      entreePayante: d.entreePayante ? "Oui" : "Non",
      statutDossier: STATUT_DOSSIER_LABELS[d.statutDossier],
      createdAt: d.createdAt,
    })),
    [
      { key: "numero", label: "Numéro" },
      { key: "organisateurNom", label: "Nom organisateur" },
      { key: "organisateurPrenom", label: "Prénom organisateur" },
      { key: "organisateurTelephone", label: "Téléphone" },
      { key: "organisateurStructure", label: "Structure" },
      { key: "typeSpectacle", label: "Type de spectacle" },
      { key: "titreEvenement", label: "Titre" },
      { key: "dateEvenement", label: "Date événement" },
      { key: "lieu", label: "Lieu" },
      { key: "commune", label: "Commune" },
      { key: "region", label: "Région" },
      { key: "jaugeEstimee", label: "Jauge estimée" },
      { key: "entreePayante", label: "Entrée payante" },
      { key: "statutDossier", label: "Statut" },
      { key: "createdAt", label: "Date de soumission" },
    ],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="declarations.csv"`,
    },
  });
}
