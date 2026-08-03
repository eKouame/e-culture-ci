import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { genererNumero } from "@/lib/numbering";
import { declarationSchema } from "@/lib/validation/declaration.schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = declarationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const declaration = await prisma.$transaction(async (tx) => {
    const numero = await genererNumero(tx, "DEC");
    return tx.declaration.create({
      data: {
        numero,
        organisateurNom: data.organisateurNom,
        organisateurPrenom: data.organisateurPrenom || null,
        organisateurTelephone: data.organisateurTelephone,
        organisateurEmail: data.organisateurEmail || null,
        organisateurStructure: data.organisateurStructure || null,
        typeSpectacle: data.typeSpectacle,
        typeSpectacleAutre: data.typeSpectacleAutre || null,
        titreEvenement: data.titreEvenement || null,
        dateEvenement: new Date(data.dateEvenement),
        lieu: data.lieu,
        commune: data.commune,
        region: data.region,
        jaugeEstimee: data.jaugeEstimee,
        entreePayante: data.entreePayante,
        statutOrientation: data.statutOrientation ?? null,
      },
    });
  });

  return NextResponse.json({ id: declaration.id, numero: declaration.numero });
}
