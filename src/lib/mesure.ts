import { track } from "@vercel/analytics";

// Événements anonymes (aucune donnée personnelle) envoyés à l'outil de mesure existant.
export function mesure(
  evenement: string,
  donnees?: Record<string, string | number>,
) {
  try {
    track(evenement, donnees);
  } catch {
    // la mesure ne doit jamais gêner la lecture
  }
}
