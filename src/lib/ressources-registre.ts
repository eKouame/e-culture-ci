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
  droits: "Droits & propriété intellectuelle",
  fiscalite: "Fiscalité & paiement",
  reglementation: "Réglementation & licences",
};

export interface RessourceRegistre {
  href: string;
  titre: string;
  description: string;
  etiquettes: EtiquetteRessource[];
}

export const RESSOURCES: RessourceRegistre[] = [
  {
    href: "/ressources/fondamentaux",
    titre: "Les fondamentaux du spectacle vivant",
    description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
    etiquettes: ["comprendre"],
  },
  {
    href: "/ressources/note-intention",
    titre: "De l'idée à la note d'intention",
    description: "Mettre votre projet par écrit, clairement, en une page.",
    etiquettes: ["projet"],
  },
  {
    href: "/ressources/budget",
    titre: "Bâtir votre budget",
    description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
    etiquettes: ["projet"],
  },
  {
    href: "/ressources/propriete-intellectuelle",
    titre: "Propriété intellectuelle",
    description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
    etiquettes: ["droits"],
  },
  {
    href: "/ressources/payer-artistes",
    titre: "Déclarer et payer vos artistes",
    description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
    etiquettes: ["fiscalite"],
  },
  {
    href: "/ressources/faq",
    titre: "FAQ",
    description: "Toutes les réponses sur les licences, la déclaration et l'immatriculation.",
    etiquettes: ["reglementation"],
  },
  {
    href: "/ressources/mentorat",
    titre: "Mentorat & parrainage (Licence B)",
    description: "Vous débutez ? Trouvez un professionnel licencié pour vous superviser.",
    etiquettes: ["reglementation"],
  },
];
