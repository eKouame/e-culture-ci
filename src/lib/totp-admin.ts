import "server-only";
import { prisma } from "@/lib/prisma";

// Lecture de l'état de la double vérification d'un administrateur.
//
// Avant la migration, les colonnes n'existent pas : on le détecte (erreur « colonne
// inexistante ») et la double vérification est simplement absente, la connexion reste
// possible. Toute autre erreur est relancée : on ne contourne jamais la double
// vérification d'un compte qui l'a activée.

export type EtatTotp =
  | { migree: false }
  | { migree: true; active: boolean; secret: string | null };

function colonneAbsente(e: unknown) {
  const err = e as { code?: string; message?: string } | null;
  return err?.code === "P2022" || /does not exist|n'existe pas/i.test(err?.message ?? "");
}

export async function etatTotp(adminId: string): Promise<EtatTotp> {
  try {
    const r = await prisma.adminUser.findUnique({
      where: { id: adminId },
      select: { totpSecret: true, totpEnabled: true },
    });
    return { migree: true, active: !!(r?.totpEnabled && r.totpSecret), secret: r?.totpSecret ?? null };
  } catch (e) {
    if (colonneAbsente(e)) return { migree: false };
    throw e;
  }
}
