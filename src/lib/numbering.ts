import { Prisma } from "@/generated/prisma/client";

type Prefix = "DEC" | "IMM" | "MEN" | "COM";

/**
 * Génère un numéro lisible et unique (ex: DEC-2026-000123) en incrémentant
 * un compteur par préfixe+année dans la même transaction que la création
 * de l'enregistrement, pour éviter les collisions entre soumissions concurrentes.
 */
export async function genererNumero(
  tx: Prisma.TransactionClient,
  prefix: Prefix,
): Promise<string> {
  const year = new Date().getFullYear();
  const key = `${prefix}-${year}`;

  const counter = await tx.counter.upsert({
    where: { key },
    create: { key, value: 1 },
    update: { value: { increment: 1 } },
  });

  return `${prefix}-${year}-${String(counter.value).padStart(6, "0")}`;
}
