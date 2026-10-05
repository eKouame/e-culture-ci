// Valeurs de la ressource « Candidater aux licences B et C ». Page datée : à relire
// à chaque évolution de l'appel et de la réglementation. Les montants sont donnés
// « selon les informations publiques, à confirmer sur pièce » ; `null` = à confirmer.

// Dernier jour pour candidater, inclus (fuseau d'Abidjan = UTC). Si le ministère
// prolonge l'appel, c'est la seule valeur à changer : l'étiquette et la bascule
// « appel clos » en découlent.
const DERNIER_JOUR = "2026-10-15";

function jourLisible(iso: string): string {
  const texte = new Date(`${iso}T00:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  // « 1 octobre » -> « 1er octobre »
  return texte.replace(/^1 /, "1er ");
}

export const CANDIDATER_LICENCES = {
  cloture: jourLisible(DERNIER_JOUR),
  nombreSpectacles: "cinq",
  dateVerification: "octobre 2026",
  montants: {
    A: { frais: 5000000, caution: 5000000 },
    B: { frais: 4500000, caution: 5000000 },
    C: null as { frais: number; caution: number } | null,
  },
};

// L'appel est clos dès le lendemain du dernier jour, à 00:00 UTC. La page se
// régénère toutes les heures (`revalidate`), donc le texte bascule tout seul.
export function appelClos(maintenant: Date = new Date()): boolean {
  return (
    maintenant.getTime() >= Date.parse(`${DERNIER_JOUR}T00:00:00Z`) + 86_400_000
  );
}

// « 4 500 000 FCFA » : espaces simples, comme dans le reste de la page.
export function fcfa(n: number): string {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;
}

// La rangée « Votre question ? » : six entrées vers les sections de la page.
export function questions(clos: boolean) {
  return [
    {
      id: "categorie",
      label: "Suis-je concerné, et dans quelle catégorie ?",
      ancre: "categorie",
    },
    {
      id: "appel",
      label: clos
        ? "Où en est l'appel ?"
        : "L'appel est-il ouvert ? Jusqu'à quand ?",
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
}
