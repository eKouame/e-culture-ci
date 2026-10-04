import type { AudioResume } from "./payer-artistes-config";

// Valeurs de la ressource « Propriété intellectuelle » (revue annuelle en janvier :
// date de vérification, texte de la loi citée, quatre liens officiels).
export const PROPRIETE_INTELLECTUELLE = {
  dateVerification: "octobre 2026",
  // Enregistrement fourni (octobre 2026). La page ne porte aucun chiffre périssable :
  // pas de contrôle de valeurs. À réenregistrer si l'essentiel de la page change.
  audio: {
    src: "/audio/propriete-intellectuelle-resume-2026-10.mp3",
    dureeLabel: "Environ 1 min",
    dureeSecondes: 54,
    poidsLabel: "0,8 Mo",
    enregistre: "octobre 2026",
  } as Omit<AudioResume, "valeursEnregistrees"> | null,
};
