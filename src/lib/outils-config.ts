// Liste des outils d'e-Culture CI : source unique pour la page d'ensemble, la barre
// secondaire et les blocs « Outils liés ». Un nouvel outil s'ajoute ici.
// Les étiquettes (« Nouveau », « Bientôt ») viennent d'ici, pas de la mise en page.

export type EtatOutil = "disponible" | "nouveau" | "bientot";
export type OutilId = "concerne" | "budget" | "mes-budgets";

export interface Outil {
  id: OutilId;
  nom: string;
  phrase: string; // reprise des pages et textes existants, sans promesse nouvelle
  // Rubrique de la page d'ensemble (« Je m'oriente », « Je chiffre », « Je garde ») et phrase
  // plus complète pour la carte de cette page ; les blocs « Outils liés » gardent `phrase`.
  rubrique: string;
  description: string;
  etat: EtatOutil;
  href: string | null; // null = pas de lien (jamais de lien mort)
}

export const OUTILS: Outil[] = [
  {
    id: "concerne",
    nom: "Suis-je concerné ?",
    rubrique: "Je m'oriente",
    description:
      "Quelques questions pour savoir si votre événement relève d'une déclaration, et lesquelles vous concernent.",
    phrase:
      "Quelques questions pour savoir si votre événement relève d'une déclaration, et lesquelles vous concernent.",
    etat: "disponible",
    href: "/suis-je-concerne",
  },
  {
    id: "budget",
    nom: "Calculateur de budget",
    rubrique: "Je chiffre",
    description:
      "Votre point d'équilibre en une minute : combien de places vendre pour couvrir vos frais. Gratuit, sans compte.",
    phrase: "Votre point d'équilibre en une minute. Gratuit, sans compte.",
    etat: "nouveau",
    href: "/outils/budget",
  },
  {
    id: "mes-budgets",
    nom: "Mes budgets",
    rubrique: "Je garde",
    description: "Retrouver vos budgets enregistrés.",
    phrase: "Retrouver vos budgets enregistrés.",
    etat: "bientot",
    href: null, // tant que les comptes n'existent pas
  },
];

// Étiquette affichée sur les cartes de la page d'ensemble.
export const ETIQUETTE_CARTE: Record<EtatOutil, string> = {
  disponible: "Disponible",
  nouveau: "Nouveau",
  bientot: "Bientôt · bêta",
};

// Étiquette courte de la barre secondaire (aucune pour un outil simplement disponible).
export const ETIQUETTE_BARRE: Partial<Record<EtatOutil, string>> = {
  nouveau: "Nouveau",
  bientot: "Bientôt",
};

export function outil(id: OutilId): Outil {
  const o = OUTILS.find((x) => x.id === id);
  if (!o) throw new Error(`Outil inconnu : ${id}`);
  return o;
}

export const MENTION_OUTILS =
  "Service d'information indépendant, sans lien officiel avec le ministère de la Culture. Ces outils orientent et préparent : ils ne remplacent pas un professionnel ni une démarche officielle.";
