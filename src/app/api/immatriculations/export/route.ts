import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { toCsv } from "@/lib/csv";

export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || undefined;
  const typeDemandeur = searchParams.get("typeDemandeur") || undefined;
  const q = searchParams.get("q") || undefined;

  const where: Prisma.ImmatriculationWhereInput = {};
  if (region) where.region = region;
  if (typeDemandeur) where.typeDemandeur = typeDemandeur;
  if (q) {
    where.OR = [
      { nomComplet: { contains: q } },
      { telephone: { contains: q } },
      { numero: { contains: q } },
      { raisonSociale: { contains: q } },
    ];
  }

  const immatriculations = await prisma.immatriculation.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const csv = toCsv(
    immatriculations.map((i) => ({
      numero: i.numero,
      typeDemandeur: i.typeDemandeur,
      nomComplet: i.nomComplet,
      raisonSociale: i.raisonSociale,
      telephone: i.telephone,
      email: i.email,
      adresse: i.adresse,
      commune: i.commune,
      region: i.region,
      typeActivite: i.typeActivite,
      domainesActivite: i.domainesActivite,
      anneeDebutActivite: i.anneeDebutActivite,
      createdAt: i.createdAt,
    })),
    [
      { key: "numero", label: "Numéro" },
      { key: "typeDemandeur", label: "Type de demandeur" },
      { key: "nomComplet", label: "Nom complet" },
      { key: "raisonSociale", label: "Structure / association" },
      { key: "telephone", label: "Téléphone" },
      { key: "email", label: "Email" },
      { key: "adresse", label: "Adresse" },
      { key: "commune", label: "Commune" },
      { key: "region", label: "Région" },
      { key: "typeActivite", label: "Fréquence d'activité" },
      { key: "domainesActivite", label: "Domaines d'activité" },
      { key: "anneeDebutActivite", label: "Année de début" },
      { key: "createdAt", label: "Date de soumission" },
    ],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="immatriculations.csv"`,
    },
  });
}
