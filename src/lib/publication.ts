// Statut de publication (cahier d'intégration, principe 5) : un contenu « à valider » ou
// « brouillon » est visible en prévisualisation, jamais en production.
//
// « Production » = le déploiement Vercel de production (domaine e-culture.ci). Un aperçu
// de branche, le développement local et un build local sont des prévisualisations.
// À utiliser côté serveur : dans un composant client, la variable n'existe pas.

export const STATUTS = ["brouillon", "a-valider", "publie"] as const;
export type Statut = (typeof STATUTS)[number];

export function enProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function estVisible(statut: Statut): boolean {
  return statut === "publie" || !enProduction();
}

// Alerte de fraîcheur : la vérification date de plus de `mois` mois (6 par défaut, durée à
// confirmer). Affichée en prévisualisation seulement.
export function verificationPerimee(
  verifieLe: string | undefined,
  mois = 6,
  maintenant: Date = new Date(),
): boolean {
  if (!verifieLe) return true;
  const date = new Date(`${verifieLe}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return true;
  const limite = new Date(maintenant);
  limite.setUTCMonth(limite.getUTCMonth() - mois);
  return date < limite;
}

// Compte à rebours d'une échéance : « J-12 », « Demain », « Aujourd'hui », ou `null` une
// fois l'échéance passée (le bandeau disparaît seul, sans intervention manuelle).
// Les dates sont en UTC (Abidjan = UTC+0).
export function libelleEcheance(clotureLe: string, maintenant: Date = new Date()): string | null {
  const fin = Date.parse(`${clotureLe}T00:00:00Z`);
  if (Number.isNaN(fin)) return null;
  const aujourdhui = Date.UTC(
    maintenant.getUTCFullYear(),
    maintenant.getUTCMonth(),
    maintenant.getUTCDate(),
  );
  const jours = Math.round((fin - aujourdhui) / 86_400_000);
  if (jours < 0) return null;
  if (jours === 0) return "Aujourd'hui";
  if (jours === 1) return "Demain";
  return `J-${jours}`;
}
