import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { genererNumero } from "@/lib/numbering";
import { immatriculationSchema } from "@/lib/validation/immatriculation.schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = immatriculationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const immatriculation = await prisma.$transaction(async (tx) => {
    const numero = await genererNumero(tx, "IMM");
    return tx.immatriculation.create({
      data: {
        numero,
        typeDemandeur: data.typeDemandeur,
        nomComplet: data.nomComplet,
        raisonSociale: data.raisonSociale || null,
        numeroCNI: data.numeroCNI || null,
        dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
        telephone: data.telephone,
        email: data.email || null,
        adresse: data.adresse,
        commune: data.commune,
        region: data.region,
        typeActivite: data.typeActivite,
        domainesActivite: data.domainesActivite.join(", "),
        anneeDebutActivite: data.anneeDebutActivite || null,
        descriptionActivite: data.descriptionActivite || null,
        piecesFournies: data.piecesFournies || null,
      },
    });
  });

  return NextResponse.json({
    id: immatriculation.id,
    numero: immatriculation.numero,
  });
}
