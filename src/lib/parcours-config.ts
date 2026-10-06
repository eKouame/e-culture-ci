// Source unique du contenu des deux parcours de l'accueil (« J'ai une idée » et « Je
// prépare un événement ») et de la liste « Comment faire ? ». Une règle ou une
// formulation se corrige ici, à un seul endroit.
//
// Les textes viennent de la maquette et restent des exemples à valider avant d'être
// tenus pour acquis (cahier des charges, §8). Aucune obligation juridique n'est affirmée
// sans source : tant qu'une règle n'est pas confirmée, l'étape garde l'étiquette
// « À vérifier » et un texte prudent. Rien n'est enregistré : tout reste à l'écran.

import { deCommune, estCommuneActive } from "@/lib/communes-guichet-config";

export type ParcoursId = "idee" | "evenement";

export interface Choix {
  label: string;
  description?: string;
}

export interface Question {
  cle: string;
  titre: string;
  choix: Choix[];
}

export const PARCOURS: Record<
  ParcoursId,
  { titre: string; porte: string; question: string; questions: Question[] }
> = {
  idee: {
    titre: "J'ai une idée de spectacle",
    porte: "Je démarre",
    question: "Trois questions pour savoir par où commencer et ce qui vous attend.",
    questions: [
      {
        cle: "type",
        titre: "Quel type de spectacle imaginez-vous ?",
        choix: [
          { label: "Concert ou showcase", description: "Musique en direct" },
          { label: "Théâtre, humour, conte", description: "Texte et scène" },
          { label: "Danse ou performance", description: "Corps et mouvement" },
          { label: "Festival ou plusieurs dates", description: "Plusieurs artistes ou plusieurs soirs" },
          { label: "Je ne sais pas encore", description: "Ce n'est pas un problème" },
        ],
      },
      {
        cle: "role",
        titre: "Quel est votre rôle dans ce projet ?",
        choix: [
          { label: "Je suis artiste", description: "Je me produis moi-même" },
          { label: "Je produis pour d'autres artistes", description: "Je cherche une équipe et un lieu" },
          { label: "Je gère un lieu", description: "Je veux accueillir des spectacles" },
          { label: "Je lance un premier projet", description: "Je découvre ce métier" },
        ],
      },
      {
        cle: "budget",
        titre: "Quel ordre de grandeur pour le budget ?",
        choix: [
          { label: "Moins de 500 000 FCFA" },
          { label: "500 000 à 2 millions FCFA" },
          { label: "Plus de 2 millions FCFA" },
          { label: "Aucune idée", description: "Le calculateur vous aidera" },
        ],
      },
    ],
  },
  evenement: {
    titre: "Je prépare un événement",
    porte: "Je suis lancé",
    question: "Quatre questions pour obtenir votre feuille de route : démarches, contacts, budget.",
    questions: [
      {
        cle: "type",
        titre: "Quel type d'événement préparez-vous ?",
        choix: [
          { label: "Concert ou showcase" },
          { label: "Théâtre, humour, conte" },
          { label: "Danse ou performance" },
          { label: "Festival ou plusieurs dates" },
        ],
      },
      {
        cle: "lieu",
        titre: "Où aura-t-il lieu ?",
        choix: [
          { label: "Dans une salle ou un lieu privé", description: "Salle, bar, maquis, hôtel" },
          { label: "En plein air ou dans l'espace public", description: "Place, rue, stade, esplanade" },
          { label: "Je n'ai pas encore le lieu" },
        ],
      },
      {
        cle: "public",
        titre: "Combien de personnes attendez-vous ?",
        choix: [
          { label: "Moins de 100 personnes" },
          { label: "100 à 500 personnes" },
          { label: "Plus de 500 personnes" },
          { label: "Je ne sais pas" },
        ],
      },
      {
        cle: "commune",
        titre: "Dans quelle commune ?",
        choix: [
          { label: "Abidjan (une des 10 communes)" },
          { label: "Bouaké" },
          { label: "Yamoussoukro" },
          { label: "Une autre commune" },
        ],
      },
    ],
  },
};

export type Reponses = Record<string, string>;

// ---------------------------------------------------------------------------
// Orientation (« J'ai une idée »)

export interface Orientation {
  afixer: string[];
  attend: string;
  note: string;
}

export function orientation(r: Reponses): Orientation {
  const petit = !!r.budget && r.budget.startsWith("Moins");
  return {
    afixer: [
      "Le lieu et la date : tout le reste en dépend, y compris les démarches.",
      "Le nombre de personnes que vous visez : il change les démarches et les coûts.",
      "Qui fait quoi : artistes, technique, billetterie, sécurité.",
    ],
    attend: petit
      ? "Avec un petit budget, les postes qui pèsent le plus sont souvent le lieu, la technique et les droits. Le calculateur montre où ça bascule."
      : "Avec ce budget, comptez surtout avec la salle, la technique, la communication et les droits. Le calculateur vous donne un ordre de grandeur et le nombre de places à vendre pour couvrir vos frais.",
    note: "Information indicative, à confirmer pour votre cas.",
  };
}

// ---------------------------------------------------------------------------
// Feuille de route (« Je prépare un événement »)

export type Etiquette =
  | "D'abord"
  | "À vérifier"
  | "Si musique"
  | "Outil"
  | "Selon votre rôle";

export interface Lien {
  href: string;
  label: string;
  outil: string;
}

export interface Etape {
  id: string;
  titre: string;
  texte: string;
  interlocuteur: string;
  etiquette: Etiquette;
  lien?: Lien;
}

function mairiePour(commune: string | undefined): string {
  if (commune?.startsWith("Abidjan")) return "Contacter la mairie de la commune d'Abidjan concernée";
  if (commune === "Bouaké" || commune === "Yamoussoukro") {
    return `Contacter la mairie ${deCommune(commune)}`;
  }
  return "Contacter la mairie de votre commune";
}

export function feuilleDeRoute(r: Reponses): Etape[] {
  const lieuPublic = !!r.lieu && r.lieu.startsWith("En plein air");
  const lieuInconnu = !!r.lieu && r.lieu.startsWith("Je n'ai pas");
  const grand = !!r.public && r.public.startsWith("Plus");

  // Le lien vers « Déclarer à ma mairie » n'apparaît que si la commune choisie a un
  // guichet actif ; sinon l'étape reste informative (guichet communal, §10).
  const guichetActif = !!r.commune && estCommuneActive(r.commune);

  return [
    {
      id: "lieu",
      titre: "Confirmer le lieu et la date",
      texte: lieuPublic
        ? "En plein air ou dans l'espace public, le lieu dépend en général de la commune : demandez-lui si son accord est nécessaire avant de communiquer."
        : lieuInconnu
          ? "Le lieu et la date conditionnent le reste : fixez-les avant de lancer les démarches."
          : "Obtenez l'accord écrit du propriétaire ou du gérant du lieu, avec la capacité d'accueil.",
      interlocuteur: "Lieu",
      etiquette: "D'abord",
    },
    {
      id: "mairie",
      titre: mairiePour(r.commune),
      texte:
        lieuPublic || grand
          ? "Votre cas peut demander une autorisation. Prenez rendez-vous tôt pour le savoir."
          : "Renseignez-vous sur ce que la commune demande pour votre type d'événement.",
      interlocuteur: "Mairie",
      etiquette: "À vérifier",
      lien: guichetActif
        ? { href: "/declaration", label: "Déclarer à ma mairie (bêta)", outil: "declaration" }
        : undefined,
    },
    {
      id: "licence",
      titre: "Vérifier si une licence s'applique",
      texte:
        "Selon la nature et la taille de l'événement, une licence peut être nécessaire. Faites le point sur votre catégorie.",
      interlocuteur: "Ministère de la Culture",
      etiquette: "À vérifier",
      lien: { href: "/suis-je-concerne", label: "Suis-je concerné ?", outil: "concerne" },
    },
    {
      id: "droits",
      titre: "Prévoir les droits d'auteur",
      texte:
        "Si de la musique est jouée ou diffusée, des droits d'auteur sont en principe dus. Anticipez le contact avec l'organisme de gestion.",
      interlocuteur: "BURIDA",
      etiquette: "Si musique",
      lien: {
        href: "/ressources/propriete-intellectuelle",
        label: "Lire la ressource sur les droits",
        outil: "propriete-intellectuelle",
      },
    },
    {
      id: "budget",
      titre: "Établir votre budget et votre point d'équilibre",
      texte:
        "Calculez ce que l'événement coûte et le nombre de places à vendre pour couvrir vos frais.",
      interlocuteur: "Vous",
      etiquette: "Outil",
      lien: { href: "/outils/budget", label: "Calculateur de budget", outil: "budget" },
    },
    {
      id: "producteur",
      titre: "Vous produisez pour d'autres ? Vérifiez l'immatriculation de producteur",
      texte:
        "La Direction de la Promotion des Arts et de la Culture (DPAC) est l'interlocuteur à confirmer. Les pièces à fournir se vérifient auprès d'elle : la fiche officielle consultable en ligne n'est pas à jour.",
      interlocuteur: "DPAC",
      etiquette: "Selon votre rôle",
    },
  ];
}

// Texte brut à copier : une ligne par étape, avec la case et l'interlocuteur.
export function texteCopie(etapes: Etape[], faites: Record<string, boolean>): string {
  return (
    "Ma feuille de route e-Culture CI\n" +
    etapes
      .map((e) => `${faites[e.id] ? "[x]" : "[ ]"} ${e.titre} (${e.interlocuteur})`)
      .join("\n")
  );
}

// ---------------------------------------------------------------------------
// « Comment faire ? » : liste de départ, à remplacer par les vraies questions du groupe
// et des appels reçus (cahier des charges, §6 et décision 7).

export const COMMENT_FAIRE: { question: string; href: string }[] = [
  { question: "Ai-je besoin d'une licence pour mon spectacle ?", href: "/ressources/candidater-licences" },
  { question: "Combien coûte un spectacle, en gros ?", href: "/ressources/budget" },
  { question: "À qui m'adresser dans ma commune ?", href: "/declaration" },
  { question: "Que dois-je payer pour la musique jouée ?", href: "/ressources/propriete-intellectuelle" },
  { question: "Comment m'immatriculer comme producteur ?", href: "/ressources/faq" },
  { question: "Quelle différence entre licence B et C ?", href: "/ressources/candidater-licences" },
];

export const OUTILS_ACCUEIL: { label: string; href: string }[] = [
  { label: "Suis-je concerné ?", href: "/suis-je-concerne" },
  { label: "Calculateur de budget", href: "/outils/budget" },
  { label: "Toutes les ressources", href: "/ressources" },
  { label: "Pour les mairies", href: "/communes" },
];
