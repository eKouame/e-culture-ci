// Questions fréquentes : source unique de la page FAQ. Les réponses sont celles de la page
// actuelle, mot pour mot ; on y ajoute une catégorie (pour les filtres) et, quand la
// réponse renvoie à un outil ou à une ressource, le lien correspondant.

export type CategorieFaq = "licence" | "declaration" | "immatriculation" | "outils";

export const CATEGORIES_FAQ: { id: CategorieFaq; label: string }[] = [
  { id: "licence", label: "Licence" },
  { id: "declaration", label: "Déclaration" },
  { id: "immatriculation", label: "Immatriculation" },
  { id: "outils", label: "Outils" },
];

export interface QuestionFaq {
  id: string;
  categorie: CategorieFaq;
  q: string;
  a: string;
  lien?: { href: string; label: string };
}

export const FAQ: QuestionFaq[] = [
  {
    id: "exemption",
    categorie: "licence",
    q: "Qui est exempté de licence et de caution bancaire ?",
    a: "D'après l'article 10 du décret de 2021, les organisateurs occasionnels dont l'événement a un but socio-éducatif, sportif, philanthropique ou de promotion de la culture locale (mariage, funérailles, fête de quartier, tournoi, festival régional, sensibilisation, etc.) sont exemptés de licence et de caution bancaire. C'est le cas de la majorité des promoteurs du pays profond.",
    lien: { href: "/suis-je-concerne", label: "Faire le test « Suis-je concerné ? »" },
  },
  {
    id: "exempte-declaration",
    categorie: "declaration",
    q: "Si je suis exempté, dois-je quand même faire quelque chose ?",
    a: "Oui : une déclaration gratuite et rapide (3 minutes) via le module « Préparer ma déclaration ». Elle permet à l'État de disposer de statistiques fiables sur le secteur informel, et vous obtenez un récapitulatif clair à conserver pour effectuer votre déclaration officielle.",
    lien: { href: "/declaration", label: "Préparer ma déclaration" },
  },
  {
    id: "cout",
    categorie: "licence",
    q: "Combien coûte la licence pour les professionnels ?",
    a: "5 000 000 FCFA pour la licence, plus 5 000 000 FCFA de caution bancaire de garantie, soit 10 000 000 FCFA au total. La caution est versée à un établissement bancaire, pas directement au ministère — c'est une garantie, pas une taxe.",
  },
  {
    id: "dix-millions",
    categorie: "licence",
    q: "Est-ce vrai que tout le monde doit payer jusqu'à 10 millions de FCFA ?",
    a: "Non, c'est une rumeur infondée. Ce montant ne concerne que les 10 à 30 % d'acteurs dont le spectacle est l'activité professionnelle principale. Les organisateurs occasionnels à but socio-éducatif ou culturel en sont exemptés.",
  },
  {
    id: "licence-immatriculation",
    categorie: "immatriculation",
    q: "Licence et immatriculation, est-ce la même chose ?",
    a: "Non, ce sont deux choses différentes. La licence d'entrepreneur de spectacles est une autorisation d'exercer comme professionnel (voir la ressource « Candidater aux licences B et C »). L'immatriculation au registre national des artistes relève du statut de l'artiste et se met encore en place séparément.",
    lien: { href: "/ressources/candidater-licences", label: "Lire « Candidater aux licences B et C »" },
  },
  {
    id: "parrainage",
    categorie: "licence",
    q: "Qu'est-ce que le parrainage (Licence B) ?",
    a: "Un promoteur qui débute doit réaliser 5 spectacles sous la supervision d'un professionnel déjà titulaire d'une licence, avant de pouvoir opérer en toute autonomie. Le module Mentorat vous met en relation avec un professionnel licencié pour vous accompagner.",
    lien: { href: "/ressources/mentorat", label: "Voir le mentorat" },
  },
  {
    id: "resultats-officiels",
    categorie: "outils",
    q: "Les résultats du test « Suis-je concerné ? » sont-ils officiels ?",
    a: "Non, ils sont indicatifs. Ils vous donnent une orientation rapide basée sur vos réponses, mais seule l'administration peut rendre une décision officielle sur votre dossier.",
  },
];
