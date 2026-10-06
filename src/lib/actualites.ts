import "server-only";

// Les actualités de l'accueil sont les « flash infos » actifs gérés dans l'administration
// (jusqu'à 4, les plus récemment modifiés d'abord). Ce bloc est secondaire : si la base
// n'est pas joignable, on n'affiche simplement rien, sans casser l'accueil.

export type Actualite = {
  id: string;
  titre: string;
  lien: string | null;
  type: "INTERNE" | "EXTERNE";
};

export async function lireActualites(): Promise<Actualite[]> {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.flashInfo.findMany({
      where: { actif: true },
      orderBy: { updatedAt: "desc" },
      take: 4,
      select: { id: true, titre: true, lien: true, type: true },
    });
  } catch (e) {
    console.error("actualites : lecture impossible, bloc masqué", e);
    return [];
  }
}
