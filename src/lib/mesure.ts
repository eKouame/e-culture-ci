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

// « mobile » ou « ordinateur », d'après la largeur d'écran (même point de bascule que
// l'accueil : 768 px), jamais d'après l'appareil. À appeler au moment du clic.
export function appareil(): "mobile" | "ordinateur" {
  try {
    return window.matchMedia("(min-width: 768px)").matches ? "ordinateur" : "mobile";
  } catch {
    return "mobile";
  }
}
