import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { genererNumero } from "@/lib/numbering";
import { mentoratSchema } from "@/lib/validation/mentorat.schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = mentoratSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const demande = await prisma.$transaction(async (tx) => {
    const numero = await genererNumero(tx, "MEN");
    return tx.mentoratDemande.create({
      data: {
        numero,
        nomComplet: data.nomComplet,
        telephone: data.telephone,
        email: data.email || null,
        commune: data.commune,
        region: data.region,
        profilActuel: data.profilActuel,
        typeSpectacleInteret: data.typeSpectacleInteret,
        disponibilite: data.disponibilite || null,
      },
    });
  });

  return NextResponse.json({ id: demande.id, numero: demande.numero });
}
