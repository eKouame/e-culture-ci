// Valeurs de la ressource « Candidater aux licences B et C ». Page datée : à relire
// à chaque évolution de l'appel (clôture le 15 octobre 2026, volet A à venir) et de la
// réglementation. Les montants sont donnés « selon les informations publiques, à
// confirmer sur pièce » ; `null` = à confirmer.
export const CANDIDATER_LICENCES = {
  cloture: "15 octobre 2026",
  nombreSpectacles: "cinq",
  dateVerification: "octobre 2026",
  montants: {
    A: { frais: 5000000, caution: 5000000 },
    B: { frais: 4500000, caution: 5000000 },
    C: null as { frais: number; caution: number } | null,
  },
};

// « 4 500 000 FCFA » : espaces simples, comme dans le reste de la page.
export function fcfa(n: number): string {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;
}

// La rangée « Votre question ? » : six entrées vers les sections de la page.
export const QUESTIONS = [
  {
    id: "categorie",
    label: "Suis-je concerné, et dans quelle catégorie ?",
    ancre: "categorie",
  },
  {
    id: "appel",
    label: "L'appel est-il ouvert ? Jusqu'à quand ?",
    ancre: "appel",
  },
  {
    id: "profils",
    label: "Producteur ou personne physique : puis-je candidater ?",
    ancre: "profils",
  },
  {
    id: "cinq-spectacles",
    label: "Les cinq spectacles : qu'est-ce que c'est ?",
    ancre: "cinq-spectacles",
  },
  { id: "couts", label: "Quel coût et quelle caution ?", ancre: "couts" },
  {
    id: "dossier",
    label: "Quelles pièces dois-je fournir ?",
    ancre: "dossier",
  },
] as const;
