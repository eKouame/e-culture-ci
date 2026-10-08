// Les six ressources, dans l'ordre du parcours : source unique pour la frise de l'accueil,
// le gabarit de lecture (pastille « Ressource 05 », rubrique du fil d'Ariane, cartes
// « Et après ? ») et, plus tard, le centre de ressources. Un titre qui change se corrige ici.
//
// Les titres sont ceux du site actuel. « Bâtir » ou « Construire votre budget », et
// « Candidater aux licences B et C » ou « Demander une licence B ou C », restent à trancher
// (décision 3 du cahier d'intégration).

export type SlugRessource =
  | "fondamentaux"
  | "note-intention"
  | "budget"
  | "propriete-intellectuelle"
  | "payer-artistes"
  | "candidater-licences";

export type GroupeRessource = "Comprendre le secteur" | "Monter votre projet" | "Être en règle";

export interface RessourceInfo {
  slug: SlugRessource;
  numero: string;
  groupe: GroupeRessource;
  etape: 1 | 2 | 3;
  titre: string;
  description: string;
}

export const RESSOURCES: RessourceInfo[] = [
  {
    slug: "fondamentaux",
    numero: "01",
    groupe: "Comprendre le secteur",
    etape: 1,
    titre: "Les fondamentaux du spectacle vivant",
    description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
  },
  {
    slug: "note-intention",
    numero: "02",
    groupe: "Monter votre projet",
    etape: 2,
    titre: "De l'idée à la note d'intention",
    description: "Mettre votre projet par écrit, clairement, en une page.",
  },
  {
    slug: "budget",
    numero: "03",
    groupe: "Monter votre projet",
    etape: 2,
    titre: "Bâtir votre budget",
    description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
  },
  {
    slug: "propriete-intellectuelle",
    numero: "04",
    groupe: "Être en règle",
    etape: 3,
    titre: "Propriété intellectuelle",
    description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
  },
  {
    slug: "payer-artistes",
    numero: "05",
    groupe: "Être en règle",
    etape: 3,
    titre: "Déclarer et payer vos artistes",
    description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
  },
  {
    slug: "candidater-licences",
    numero: "06",
    groupe: "Être en règle",
    etape: 3,
    titre: "Candidater aux licences B et C",
    description: "Qui est concerné, calendrier de l'appel, conditions et coûts.",
  },
];

export const hrefRessource = (slug: SlugRessource) => `/ressources/${slug}`;

export function ressourcePar(slug: string): RessourceInfo | undefined {
  return RESSOURCES.find((r) => r.slug === slug);
}

export function ressourceParHref(href: string): RessourceInfo | undefined {
  return RESSOURCES.find((r) => hrefRessource(r.slug) === href);
}
