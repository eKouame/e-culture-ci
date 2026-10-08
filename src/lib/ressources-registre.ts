// Registre central des ressources, avec leurs étiquettes thématiques.
// Source unique réutilisée par /ressources/toutes (et par toute future
// page qui aurait besoin de lister/filtrer les ressources).

export type EtiquetteRessource =
  | "comprendre"
  | "projet"
  | "droits"
  | "fiscalite"
  | "reglementation";

export const ETIQUETTES: Record<EtiquetteRessource, string> = {
  comprendre: "Comprendre le secteur",
  projet: "Monter un projet",
  droits: "Droits et propriété intellectuelle",
  fiscalite: "Fiscalité et paiement",
  reglementation: "Réglementation et licences",
};

// Nature du contenu, affichée en pastille sur la carte (cahier d'intégration : index).
export type TypeContenu = "ressource" | "outil" | "faq" | "service";

export const TYPES: Record<TypeContenu, { libelle: string; action: string }> = {
  ressource: { libelle: "Ressource", action: "Lire" },
  outil: { libelle: "Outil", action: "Ouvrir" },
  faq: { libelle: "FAQ", action: "Lire" },
  service: { libelle: "Service", action: "Lire" },
};

export interface RessourceRegistre {
  type: TypeContenu;
  href: string;
  titre: string;
  description: string;
  etiquettes: EtiquetteRessource[];
  // Mots que la recherche reconnaît sans qu'ils soient affichés sur la carte.
  motsCles?: string[];
}

export const RESSOURCES: RessourceRegistre[] = [
  {
    type: "ressource",
    href: "/ressources/fondamentaux",
    titre: "Les fondamentaux du spectacle vivant",
    description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
    etiquettes: ["comprendre"],
    motsCles: ["métiers", "acteurs", "vocabulaire", "spectacle vivant", "débuter"],
  },
  {
    type: "ressource",
    href: "/ressources/note-intention",
    titre: "De l'idée à la note d'intention",
    description: "Mettre votre projet par écrit, clairement, en une page.",
    etiquettes: ["projet"],
    motsCles: ["projet", "idée", "dossier", "partenaire", "écrire"],
  },
  {
    type: "ressource",
    href: "/ressources/budget",
    titre: "Bâtir votre budget",
    description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
    etiquettes: ["projet"],
    motsCles: ["dépenses", "recettes", "point d'équilibre", "coûts", "billetterie", "marge"],
  },
  {
    type: "outil",
    href: "/outils/budget",
    titre: "Calculateur de budget",
    description: "Votre point d'équilibre en une minute. Gratuit, sans compte.",
    etiquettes: ["projet"],
    motsCles: ["calcul", "point d'équilibre", "dépenses", "recettes", "places à vendre"],
  },
  {
    type: "ressource",
    href: "/ressources/propriete-intellectuelle",
    titre: "Propriété intellectuelle",
    description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
    etiquettes: ["droits"],
    motsCles: ["droit d'auteur", "BURIDA", "OIPI", "droit à l'image", "marque", "droits voisins"],
  },
  {
    type: "ressource",
    href: "/ressources/payer-artistes",
    titre: "Déclarer et payer vos artistes",
    description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
    etiquettes: ["fiscalite"],
    motsCles: ["cachet", "retenue à la source", "CNPS", "DGI", "BURIDA", "impôt", "statut de l'artiste", "salaire"],
  },
  {
    type: "ressource",
    href: "/ressources/candidater-licences",
    titre: "Candidater aux licences B et C",
    description: "Qui est concerné, calendrier de l'appel, conditions et coûts.",
    etiquettes: ["reglementation"],
    motsCles: ["licence", "appel à candidatures", "caution", "frais", "conditions", "producteur", "diffuseur", "exploitant"],
  },
  {
    type: "faq",
    href: "/ressources/faq",
    titre: "Questions fréquentes",
    description: "Toutes les réponses sur les licences, la déclaration et l'immatriculation.",
    etiquettes: ["reglementation"],
    motsCles: ["exemption", "exempté", "licence", "déclaration", "immatriculation", "parrainage", "coût"],
  },
  {
    type: "service",
    href: "/ressources/mentorat",
    titre: "Mentorat et parrainage (Licence B)",
    description: "Vous débutez ? Trouvez un professionnel licencié pour vous superviser.",
    etiquettes: ["reglementation"],
    motsCles: ["parrainage", "licence B", "mentor", "superviser", "débutant"],
  },
];
