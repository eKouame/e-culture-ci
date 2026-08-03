import { z } from "zod";

export const immatriculationSchema = z
  .object({
    typeDemandeur: z.enum(["Individuel", "Association", "Structure informelle"]),
    nomComplet: z.string().trim().min(2, "Le nom complet est requis"),
    raisonSociale: z.string().trim().optional().or(z.literal("")),
    numeroCNI: z.string().trim().optional().or(z.literal("")),
    dateNaissance: z.string().optional().or(z.literal("")),

    telephone: z.string().trim().min(8, "Numéro de téléphone invalide"),
    email: z.string().trim().email("Email invalide").optional().or(z.literal("")),
    adresse: z.string().trim().min(2, "L'adresse est requise"),
    commune: z.string().trim().min(2, "La commune est requise"),
    region: z.string().trim().min(2, "La région est requise"),

    typeActivite: z.enum(["OCCASIONNEL", "REGULIER"]),
    domainesActivite: z
      .array(z.string())
      .min(1, "Sélectionnez au moins un domaine d'activité"),
    anneeDebutActivite: z.number().int().optional(),
    descriptionActivite: z.string().trim().optional().or(z.literal("")),
    piecesFournies: z.string().trim().optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      data.typeDemandeur === "Individuel" || !!data.raisonSociale,
    {
      message: "Le nom de la structure/association est requis",
      path: ["raisonSociale"],
    },
  );

export type ImmatriculationInput = z.infer<typeof immatriculationSchema>;
