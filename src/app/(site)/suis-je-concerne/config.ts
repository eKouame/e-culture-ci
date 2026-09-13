// Toutes les valeurs réglementaires de l'outil sont centralisées ici pour
// pouvoir être mises à jour à un seul endroit (dates de l'appel, coûts,
// condition d'accès) sans toucher à la logique d'affichage.

export type ReponseFrequence = "occasionnelle" | "reguliere";
export type ReponseRole = "produire" | "diffuser" | "exploiter" | "plusieurs";
export type ReponseForme = "morale" | "physique";

export interface Reponses {
  frequence: ReponseFrequence;
  role: ReponseRole;
  forme: ReponseForme;
}

export const DATE_VERIFICATION = "18 septembre 2026";

export const LICENCE_CONFIG = {
  appel: { debut: "15 septembre 2026", fin: "15 octobre 2026", instance: "CODELES" },
  condition: "Justifier de 5 spectacles déjà organisés sous l'autorité d'un licencié",
  categories: {
    A: { code: "A", nom: "Producteurs", cout: "5 000 000 FCFA", caution: "5 000 000 FCFA" },
    B: { code: "B", nom: "Diffuseurs", cout: "4 500 000 FCFA", caution: "5 000 000 FCFA" },
    C: { code: "C", nom: "Exploitants de lieux", cout: "À confirmer", caution: "À confirmer" },
  },
};

export interface QuestionOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

export const QUESTIONS: [
  { cle: "frequence"; titre: string; aide: string; options: QuestionOption<ReponseFrequence>[] },
  { cle: "role"; titre: string; aide: string; options: QuestionOption<ReponseRole>[] },
  { cle: "forme"; titre: string; aide: string; options: QuestionOption<ReponseForme>[] },
] = [
  {
    cle: "frequence",
    titre: "À quelle fréquence organisez-vous des spectacles ?",
    aide: "La licence vise l'activité régulière. C'est le premier tri.",
    options: [
      { value: "occasionnelle", label: "Occasionnellement", description: "Quelques événements par an, sans régularité." },
      { value: "reguliere", label: "Régulièrement", description: "C'est une activité continue, plusieurs fois dans l'année." },
    ],
  },
  {
    cle: "role",
    titre: "Quel est votre rôle principal ?",
    aide: "Il détermine la catégorie de licence qui vous correspond.",
    options: [
      { value: "produire", label: "Je produis", description: "Je porte le projet artistique, j'engage et je rémunère les artistes." },
      { value: "diffuser", label: "Je diffuse", description: "J'achète ou j'accueille des spectacles pour les présenter au public." },
      { value: "exploiter", label: "J'exploite un lieu", description: "Je gère une salle ou un espace accueillant des spectacles." },
      { value: "plusieurs", label: "Plusieurs de ces rôles", description: "Je cumule production et diffusion ou exploitation." },
    ],
  },
  {
    cle: "forme",
    titre: "Sous quelle forme exercez-vous ?",
    aide: "L'appel en cours vise les personnes morales.",
    options: [
      { value: "morale", label: "Personne morale", description: "Association, entreprise, coopérative, structure immatriculée." },
      { value: "physique", label: "Personne physique", description: "J'exerce en mon nom propre, sans structure." },
    ],
  },
];

export interface Fait {
  label: string;
  valeur: string;
}

export interface Lien {
  href: string;
  label: string;
  aide: string;
}

export interface Note {
  titre: string;
  texte: string;
}

export interface Resultat {
  ton: "vert" | "orange";
  surtitre: string;
  titre: string;
  chapeau: string;
  aCategorie: boolean;
  categorieTitre: string;
  faits: Fait[];
  preparerTitre: string;
  preparer: string[];
  notes: Note[];
  liens: Lien[];
}

const LIENS_BASE: Record<string, Lien> = {
  fondamentaux: {
    href: "/ressources/fondamentaux",
    label: "Les fondamentaux",
    aide: "Le vocabulaire et les acteurs, sans jargon.",
  },
  budget: {
    href: "/ressources/budget",
    label: "Bâtir votre budget",
    aide: "Les postes de dépense à ne pas oublier.",
  },
  payerArtistes: {
    href: "/ressources/payer-artistes",
    label: "Déclarer et payer vos artistes",
    aide: "Retenue à la source, cotisations et paiements.",
  },
  proprieteIntellectuelle: {
    href: "/ressources/propriete-intellectuelle",
    label: "Propriété intellectuelle",
    aide: "Droits d'auteur et droits voisins : qui doit quoi.",
  },
  declaration: {
    href: "/declaration",
    label: "Ma déclaration",
    aide: "Préparer la déclaration de votre événement.",
  },
};

function ligneCategorie(code: "A" | "B" | "C"): Fait[] {
  const c = LICENCE_CONFIG.categories[code];
  return [
    { label: `Catégorie ${c.code} — ${c.nom}`, valeur: c.cout },
    { label: "Caution", valeur: c.caution },
  ];
}

export function getResultat(reponses: Reponses): Resultat {
  const L = LIENS_BASE;
  const cond: Fait = { label: "Condition d'accès", valeur: LICENCE_CONFIG.condition };
  const calendrier: Fait = {
    label: "Appel en cours (B et C)",
    valeur: `Du ${LICENCE_CONFIG.appel.debut} au ${LICENCE_CONFIG.appel.fin}`,
  };
  const examen: Fait = { label: "Examen des dossiers", valeur: `Commission ${LICENCE_CONFIG.appel.instance}` };

  if (reponses.frequence === "occasionnelle") {
    return {
      ton: "vert",
      surtitre: "Votre situation",
      titre: "Vous êtes probablement hors du champ de la licence",
      chapeau:
        "La licence vise l'activité régulière d'organisation de spectacles. Une pratique occasionnelle n'entre a priori pas dans ce cadre — mais d'autres obligations, elles, s'appliquent dès le premier événement.",
      aCategorie: false,
      categorieTitre: "",
      faits: [],
      preparerTitre: "Ce qui vous concerne quand même",
      preparer: [
        "Les droits d'auteur et droits voisins : une déclaration au BURIDA est due pour toute diffusion d'œuvres.",
        "La rémunération des artistes et techniciens : contrat écrit, cachet, cotisations.",
        "Le budget de l'événement : billetterie, location, technique, sécurité, taxes locales.",
        "La déclaration de l'événement auprès de votre mairie ou de la préfecture.",
      ],
      notes: [
        {
          titre: "Attention à la bascule",
          texte:
            "« Occasionnel » n'est pas un statut permanent. Si vos événements se répètent et s'installent dans l'année, votre activité peut être regardée comme régulière — et la licence redevient une question. Refaites le test si votre rythme change.",
        },
      ],
      liens: [L.fondamentaux, L.payerArtistes, L.budget, L.declaration],
    };
  }

  if (reponses.role === "produire") {
    return {
      ton: "orange",
      surtitre: "Votre situation",
      titre: "Catégorie A — Producteurs, dans une phase ultérieure",
      chapeau:
        "Une activité régulière de production relève de la licence Producteurs (catégorie A). L'appel actuellement ouvert ne concerne que les catégories B et C : le volet Producteurs viendra dans un second temps.",
      aCategorie: true,
      categorieTitre: "Catégorie A — Producteurs (selon les informations publiques)",
      faits: [...ligneCategorie("A"), cond, { label: "Calendrier de l'appel A", valeur: "Non ouvert à ce jour" }],
      preparerTitre: "Ce que vous pouvez préparer dès maintenant",
      preparer: [
        "Réunir les justificatifs des 5 spectacles déjà organisés sous l'autorité d'un licencié.",
        "Vérifier que votre structure est bien immatriculée et à jour.",
        "Rassembler vos contrats d'artistes, feuilles de paie et attestations de cotisations.",
        "Mettre à plat un budget type de production, avec les postes récurrents.",
        "Suivre l'ouverture de l'appel A : les modalités seront publiées par le ministère.",
      ],
      notes: [
        {
          titre: "Si vous diffusez aussi",
          texte:
            "Si, en plus de produire, vous achetez des spectacles ou exploitez un lieu, l'appel en cours (B et C) peut vous concerner dès aujourd'hui. Refaites le test en choisissant « plusieurs rôles ».",
        },
      ],
      liens: [L.fondamentaux, L.payerArtistes, L.budget, L.proprieteIntellectuelle],
    };
  }

  const estC = reponses.role === "exploiter";
  const codeCat = estC ? "C" : "B";
  const nomCat = `Catégorie ${codeCat} — ${LICENCE_CONFIG.categories[codeCat].nom}`;
  const nomCatPhrase = `catégorie ${codeCat} — ${LICENCE_CONFIG.categories[codeCat].nom.toLowerCase()}`;

  if (reponses.role === "plusieurs") {
    const morale = reponses.forme === "morale";
    return {
      ton: "orange",
      surtitre: "Votre situation",
      titre: morale
        ? "Deux volets vous concernent : B/C maintenant, A plus tard"
        : "Deux volets vous concernent, mais l'appel vise les personnes morales",
      chapeau: morale
        ? "Vous cumulez la production et la diffusion ou l'exploitation d'un lieu. Le volet Diffuseurs / Exploitants est ouvert dès maintenant ; le volet Producteurs viendra dans une phase ultérieure."
        : "Vous cumulez plusieurs rôles, mais vous exercez en nom propre. L'appel en cours s'adresse aux personnes morales : il faudra probablement passer par une structure pour y répondre.",
      aCategorie: true,
      categorieTitre: "Catégories concernées (selon les informations publiques)",
      faits: [
        ...ligneCategorie("B"),
        { label: "Catégorie C — Exploitants de lieux", valeur: LICENCE_CONFIG.categories.C.cout },
        ligneCategorie("A")[0],
        cond,
        calendrier,
        examen,
      ],
      preparerTitre: "Ce que vous pouvez préparer",
      preparer: [
        "Clarifier lequel de vos rôles est dominant : il oriente la catégorie à demander en premier.",
        morale
          ? "Vérifier l'immatriculation et les statuts à jour de votre structure."
          : "Vous renseigner sur la création d'une structure (association ou entreprise) adaptée à votre activité.",
        "Réunir les justificatifs des 5 spectacles organisés sous l'autorité d'un licencié.",
        "Rassembler contrats d'artistes, preuves de paiement et déclarations BURIDA.",
        "Préparer un budget consolidé de votre activité annuelle.",
      ],
      notes: [
        {
          titre: "Composition du dossier",
          texte:
            "Le détail des pièces à fournir n'est pas publié ici. Adressez-vous à la Direction des affaires juridiques du ministère pour obtenir la liste officielle.",
        },
      ],
      liens: [L.fondamentaux, L.budget, L.payerArtistes, L.proprieteIntellectuelle, L.declaration],
    };
  }

  if (reponses.forme === "physique") {
    return {
      ton: "orange",
      surtitre: "Votre situation",
      titre: "Vous êtes concerné, mais l'appel vise les personnes morales",
      chapeau: `Votre activité régulière relève de la ${nomCatPhrase}. L'appel en cours s'adresse toutefois aux personnes morales : exercer en nom propre ne permet probablement pas d'y répondre en l'état.`,
      aCategorie: true,
      categorieTitre: `${nomCat} (selon les informations publiques)`,
      faits: [...ligneCategorie(codeCat), cond, calendrier, examen],
      preparerTitre: "Ce que vous pouvez préparer",
      preparer: [
        "Vous renseigner sur la forme juridique la plus adaptée : association, entreprise individuelle immatriculée, société.",
        "Réunir les justificatifs des 5 spectacles déjà organisés sous l'autorité d'un licencié.",
        "Rassembler vos contrats d'artistes, preuves de paiement et déclarations BURIDA.",
        "Chiffrer le coût de la licence et de la caution dans votre budget prévisionnel.",
        "Interroger la Direction des affaires juridiques du ministère sur votre cas précis.",
      ],
      notes: [
        {
          titre: "Rien n'est tranché",
          texte:
            "Nous ne pouvons pas affirmer qu'une personne physique est exclue : nous constatons seulement que l'appel publié vise les personnes morales. Faites confirmer votre situation par le ministère.",
        },
      ],
      liens: [L.fondamentaux, L.budget, L.payerArtistes, L.declaration],
    };
  }

  return {
    ton: "orange",
    surtitre: "Votre situation",
    titre: "Vous êtes probablement concerné par l'appel en cours",
    chapeau: `Une activité régulière ${estC ? "d'exploitation de lieu" : "de diffusion"}, exercée par une personne morale, relève de la ${nomCatPhrase}. L'appel est ouvert : c'est le moment de préparer votre dossier.`,
    aCategorie: true,
    categorieTitre: `${nomCat} (selon les informations publiques)`,
    faits: [...ligneCategorie(codeCat), cond, calendrier, examen],
    preparerTitre: "Ce que vous pouvez préparer",
    preparer: [
      "Réunir les justificatifs des 5 spectacles déjà organisés sous l'autorité d'un licencié.",
      "Vérifier que votre structure est immatriculée, ses statuts et sa gouvernance à jour.",
      "Rassembler contrats d'artistes, preuves de paiement et déclarations BURIDA.",
      "Inscrire le coût de la licence et la caution dans votre budget.",
      "Demander la liste officielle des pièces à la Direction des affaires juridiques du ministère.",
      estC
        ? "Réunir les documents relatifs à votre lieu : bail ou titre, sécurité, capacité d'accueil."
        : "Lister les spectacles diffusés sur les douze derniers mois.",
    ],
    notes: [
      {
        titre: "Montant à confirmer",
        texte: estC
          ? "Le montant de la catégorie C n'est pas publié à ce jour. Ne budgétez pas au hasard : faites-le confirmer auprès du ministère."
          : "Les montants indiqués proviennent des informations publiques disponibles et doivent être confirmés auprès du ministère avant tout engagement.",
      },
    ],
    liens: [L.fondamentaux, L.budget, L.payerArtistes, L.proprieteIntellectuelle, L.declaration],
  };
}
