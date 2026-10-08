// Contenu du méga-menu « Ressources », du panneau « Outils » et du menu mobile : une seule
// source, pour que l'ordinateur et le mobile aient les mêmes libellés et les mêmes liens
// (cahier de navigation, §5 et vérifications).
//
// Règles de publication (cahier de navigation §5 et §6) :
// - pas de lien mort : un élément sans `href`, ou marqué « bientôt », est affiché inerte ;
// - une colonne sans aucun élément cliquable n'est jamais affichée ;
// - un texte officiel n'a un lien que si ce lien est vérifié ; sinon la ligne reste sans lien.
// Quand une page est publiée, on renseigne son `href` ici, et la colonne apparaît seule.

export type EtatNav = "nouveau" | "bientot" | "disponible";

export interface ElementNav {
  label: string;
  description?: string;
  href?: string;
  externe?: boolean;
  etat?: EtatNav;
}

export interface ColonneNav {
  id: string;
  titre: string;
  elements: ElementNav[];
  // Lien de bas de colonne (« Tous… → ») : affiché seulement s'il a une destination.
  tous?: { label: string; href?: string };
  // « À la une » : des cartes plutôt que de simples liens.
  cartes?: boolean;
}

export function estActif(e: ElementNav): boolean {
  return !!e.href && e.etat !== "bientot";
}

export function colonneAffichable(c: ColonneNav): boolean {
  return c.elements.some(estActif);
}

export const COLONNES_RESSOURCES: ColonneNav[] = [
  {
    id: "reglementation",
    titre: "Réglementation",
    elements: [
      {
        label: "Décret n°2021-622 du 20 octobre 2021",
        description: "Organisation des spectacles vivants",
        href: "https://civlii.laws.africa/en/akn/ci/act/decree/2021/622/fra@2023-06-30/publication",
        externe: true,
      },
      {
        // Aucun lien officiel vérifié pour l'arrêté : la ligne reste sans lien, comme le
        // prévoit le cahier de navigation (« aucun texte n'est ajouté sans lien vérifié »).
        label: "Arrêté n°0750/MCF/CAB du 14 octobre 2025",
        description: "Régime des entrepreneurs de spectacles vivants",
      },
    ],
    // La page « Textes officiels » est mise de côté : pas de lien.
    tous: { label: "Tous les textes officiels →" },
  },
  {
    id: "conseils",
    titre: "Conseils carrière",
    elements: [
      { label: "Guide gestion de projet culturel", etat: "bientot" },
      { label: "Recruter artistes et interprètes", etat: "bientot" },
      { label: "Carrière dans la culture", etat: "bientot" },
      { label: "Cartographie de compétences", etat: "bientot" },
    ],
    tous: { label: "Tous les conseils →" },
  },
  {
    id: "salaires",
    titre: "Salaires",
    elements: [
      { label: "Directeur artistique", etat: "bientot" },
      { label: "Metteur en scène", etat: "bientot" },
      { label: "Régisseur", etat: "bientot" },
      { label: "Ingénieur son", etat: "bientot" },
    ],
    tous: { label: "Tous les salaires →" },
  },
  {
    id: "fiches",
    titre: "Fiches métiers",
    elements: [
      { label: "Auteur, compositeur, parolier", etat: "bientot" },
      { label: "Producteur", etat: "bientot" },
      { label: "Backliner", etat: "bientot" },
      { label: "Régisseur", etat: "bientot" },
      { label: "Créateur lumière", etat: "bientot" },
    ],
    tous: { label: "Toutes les fiches →" },
  },
  {
    id: "une",
    titre: "À la une",
    cartes: true,
    elements: [
      {
        label: "Déclarer et payer vos artistes correctement",
        description: "Retenue à la source, cotisations, statut de l'artiste.",
        href: "/ressources/payer-artistes",
        etat: "disponible",
      },
      {
        label: "Les fondamentaux du spectacle vivant",
        description: "Licences, métiers et démarches : le point de départ.",
        href: "/ressources/fondamentaux",
        etat: "disponible",
      },
    ],
    tous: { label: "Toutes les ressources →", href: "/ressources" },
  },
];

export const COLONNES_OUTILS: ColonneNav[] = [
  {
    id: "orienter",
    titre: "Je m'oriente",
    elements: [
      {
        label: "Suis-je concerné ?",
        description: "Trois questions, une réponse claire.",
        href: "/suis-je-concerne",
      },
    ],
  },
  {
    id: "chiffrer",
    titre: "Je chiffre",
    elements: [
      {
        label: "Calculateur de budget",
        description: "Point d'équilibre de votre spectacle.",
        href: "/outils/budget",
        etat: "nouveau",
      },
    ],
  },
  {
    id: "garder",
    titre: "Je garde",
    // Inerte tant que l'espace organisateur n'est pas ouvert.
    elements: [{ label: "Mes budgets", etat: "bientot" }],
  },
];

// Colonne « Populaire » : un seul outil clé, choisi à la main (cahier de navigation §3).
export const OUTIL_POPULAIRE: ElementNav = {
  label: "Calculez le point d'équilibre de votre spectacle",
  description:
    "Saisissez vos dépenses et vos recettes, voyez combien de places vendre pour couvrir vos frais.",
  href: "/outils/budget",
  etat: "nouveau",
};

export const TOUS_LES_OUTILS = { label: "Tous les outils", href: "/outils" };

export const ESPACE_COMMUNAL = {
  href: "/communes",
  label: "Espace communal",
  sousTitre: "Pour les autorités locales",
  actifs: ["/communes", "/declaration"],
};

// Chemins qui relèvent de chaque entrée du menu (rubrique active).
export const RUBRIQUES = {
  ressources: ["/ressources"],
  outils: ["/outils", "/suis-je-concerne"],
  communal: ESPACE_COMMUNAL.actifs,
};
