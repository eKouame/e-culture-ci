import { z } from "zod";

// Modèle de contenu (cahier d'intégration, « Modèle de contenu »). Tout le contenu vit dans
// le dépôt, dans `content/<collection>/*.json`, et il est validé par ces schémas à la
// compilation : un champ manquant ou une date mal formée casse la compilation, pas la page
// en production. Fichier sans dépendance au framework, pour tourner aussi dans un script.

const dateIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format AAAA-MM-JJ")
  .refine((d) => !Number.isNaN(Date.parse(`${d}T00:00:00Z`)), "date inexistante");

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug en minuscules, chiffres et tirets");

const source = z.object({
  titre: z.string().min(1),
  url: z.string().url().optional(),
  consulteLe: dateIso.optional(),
});

const lien = z.object({
  titre: z.string().min(1),
  href: z.string().regex(/^(\/|https?:\/\/)/, "lien interne (/…) ou externe (https://…)"),
});

// Champs communs à toutes les collections.
const communs = {
  statut: z.enum(["brouillon", "a-valider", "publie"]),
  aValider: z.array(z.string().min(1)).default([]),
  verifieLe: dateIso.optional(),
  reluPar: z.string().min(1).optional(),
  sources: z.array(source).default([]),
};

type Commun = {
  statut: "brouillon" | "a-valider" | "publie";
  aValider: string[];
  verifieLe?: string;
  reluPar?: string;
  sources: { titre: string }[];
};

// Règle de publication : « publié » exige une date de vérification et au moins une source.
// Les fiches et les guides exigent en plus une signature (relu par).
function publication(exigerSignature: boolean) {
  return (v: Commun, ctx: z.RefinementCtx) => {
    if (v.statut !== "publie") return;
    if (!v.verifieLe)
      ctx.addIssue({ code: "custom", path: ["verifieLe"], message: "date de vérification obligatoire pour publier" });
    if (v.sources.length === 0)
      ctx.addIssue({ code: "custom", path: ["sources"], message: "au moins une source pour publier" });
    if (exigerSignature && !v.reluPar)
      ctx.addIssue({ code: "custom", path: ["reluPar"], message: "signature (relu par) obligatoire pour publier" });
    if (v.aValider.length > 0)
      ctx.addIssue({ code: "custom", path: ["aValider"], message: "des points restent à valider : statut « a-valider »" });
  };
}

const section = z.object({ id: slug, titre: z.string().min(1), corps: z.string().min(1) });

export const ressource = z
  .object({
    slug,
    titre: z.string().min(1),
    etape: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    resume: z.string().min(1),
    dureeLectureMin: z.number().int().positive(),
    niveau: z.string().min(1).optional(),
    audio: z.string().optional(),
    sections: z.array(section).min(1),
    etApres: z.array(lien).default([]),
    ...communs,
  })
  .superRefine(publication(false));

export const ficheMetier = z
  .object({
    slug,
    metier: z.string().min(1),
    famille: z.string().min(1),
    soumisALicence: z.boolean(),
    sections: z.array(section).min(1),
    metiersLies: z.array(slug).default([]),
    ...communs,
  })
  .superRefine(publication(true));

export const conseil = z
  .object({
    slug,
    titre: z.string().min(1),
    resume: z.string().min(1),
    accroche: z.string().min(1),
    etapes: z
      .array(
        z.object({
          titre: z.string().min(1),
          texte: z.string().min(1),
          numerotee: z.boolean().default(true),
        }),
      )
      .min(1),
    erreursFrequentes: z.array(z.string().min(1)).default([]),
    allerPlusLoin: z.array(lien).default([]),
    ...communs,
  })
  .superRefine(publication(true));

export const salaire = z
  .object({
    slug,
    metier: z.string().min(1),
    posteReference: z.string().min(1),
    montantJour: z.number().nonnegative().optional(),
    montantSemaine: z.number().nonnegative().optional(),
    correspondance: z.enum(["directe", "approximative", "faible", "aucune"]),
    note: z.string().optional(),
    ficheLiee: slug.optional(),
    ...communs,
  })
  .superRefine(publication(false))
  .superRefine((v, ctx) => {
    // « Aucun chiffre sans source » : un montant, même en brouillon, cite sa source.
    const aUnMontant = v.montantJour !== undefined || v.montantSemaine !== undefined;
    if (aUnMontant && v.sources.length === 0)
      ctx.addIssue({ code: "custom", path: ["sources"], message: "aucun montant sans source" });
  });

export const texteOfficiel = z
  .object({
    slug,
    type: z.enum(["decret", "arrete", "loi", "code", "accord"]),
    reference: z.string().min(1),
    titre: z.string().min(1),
    theme: z.string().min(1),
    resume: z.string().min(1),
    lienOfficiel: z.string().url().optional(),
    ressourcesLiees: z.array(slug).default([]),
    ...communs,
  })
  .superRefine(publication(false));

export const actualite = z
  .object({
    slug,
    type: z.enum(["secteur", "site"]),
    date: dateIso,
    titre: z.string().min(1),
    chapo: z.string().min(1),
    source: z.string().min(1).optional(),
    lienInterne: z.string().regex(/^\//).optional(),
    ...communs,
  })
  .superRefine(publication(false));

export const configAppel = z
  .object({
    ouvertureLe: dateIso,
    clotureLe: dateIso,
    instance: z.string().min(1),
    categories: z
      .array(
        z.object({
          code: z.enum(["A", "B", "C"]),
          nom: z.string().min(1),
          cout: z.number().nonnegative(),
          caution: z.number().nonnegative().optional(),
        }),
      )
      .min(1),
    conditionAcces: z.string().min(1),
    ...communs,
  })
  .superRefine(publication(false))
  .superRefine((v, ctx) => {
    if (v.clotureLe < v.ouvertureLe)
      ctx.addIssue({ code: "custom", path: ["clotureLe"], message: "la clôture précède l'ouverture" });
  });

export const COLLECTIONS = {
  ressources: ressource,
  "fiches-metiers": ficheMetier,
  conseils: conseil,
  salaires: salaire,
  "textes-officiels": texteOfficiel,
  actualites: actualite,
  appel: configAppel,
} as const;

export type NomCollection = keyof typeof COLLECTIONS;
export type Entree<K extends NomCollection> = z.infer<(typeof COLLECTIONS)[K]>;
