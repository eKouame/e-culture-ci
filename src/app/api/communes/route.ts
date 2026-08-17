import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { genererNumero } from "@/lib/numbering";
import { communeSchema } from "@/lib/validation/commune.schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = communeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    // Honeypot rempli : probablement un bot. On répond succès sans rien enregistrer.
    return NextResponse.json({ ok: true, numero: "N/A" });
  }

  const demande = await prisma.$transaction(async (tx) => {
    const numero = await genererNumero(tx, "COM");
    return tx.demandeCommune.create({
      data: {
        numero,
        nom: data.nom,
        fonction: data.fonction,
        commune: data.commune,
        email: data.email,
        telephone: data.telephone || null,
        message: data.message || null,
        consentement: data.consentement,
      },
    });
  });

  return NextResponse.json({ id: demande.id, numero: demande.numero });
}
