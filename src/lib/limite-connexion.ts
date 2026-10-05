import "server-only";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { estBloque, FENETRE_MS, CONSERVATION_MS } from "@/lib/limite-connexion-regle";

// Limitation des tentatives de connexion à l'administration. On ne garde que des
// empreintes (SHA-256) de l'e-mail saisi et de l'adresse IP, uniquement pour les échecs,
// et on supprime tout ce qui a plus de 24 h.
//
// Si la table n'existe pas encore (migration pas encore appliquée), la limitation est
// simplement inactive : la connexion continue de fonctionner, l'erreur est journalisée.

function empreinte(valeur: string) {
  return createHash("sha256").update(valeur).digest("hex");
}

export function adresseIp(request: Request) {
  const transmise = request.headers.get("x-forwarded-for");
  return transmise?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnue";
}

export function cles(email: string, ip: string) {
  return { emailHash: empreinte(email.trim().toLowerCase()), ipHash: empreinte(ip) };
}

// Vrai si cette combinaison e-mail / adresse est temporairement bloquée.
export async function connexionBloquee(email: string, ip: string): Promise<boolean> {
  try {
    const { emailHash, ipHash } = cles(email, ip);
    const depuis = new Date(Date.now() - FENETRE_MS);
    const [parEmail, parIp] = await Promise.all([
      prisma.loginAttempt.count({ where: { emailHash, createdAt: { gte: depuis } } }),
      prisma.loginAttempt.count({ where: { ipHash, createdAt: { gte: depuis } } }),
    ]);
    return estBloque(parEmail, parIp);
  } catch (e) {
    console.error("limite-connexion : lecture impossible, limitation inactive", e);
    return false;
  }
}

export async function enregistrerEchec(email: string, ip: string) {
  try {
    await prisma.loginAttempt.create({ data: cles(email, ip) });
    await prisma.loginAttempt.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - CONSERVATION_MS) } },
    });
  } catch (e) {
    console.error("limite-connexion : enregistrement impossible", e);
  }
}

export async function effacerEchecs(email: string) {
  try {
    await prisma.loginAttempt.deleteMany({ where: { emailHash: cles(email, "").emailHash } });
  } catch (e) {
    console.error("limite-connexion : effacement impossible", e);
  }
}
