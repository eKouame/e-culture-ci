import { z } from "zod";

export const TYPE_SPECTACLE_VALUES = [
  "CONCERT",
  "THEATRE",
  "DANSE",
  "HUMOUR",
  "FESTIVAL",
  "CEREMONIE_TRADITIONNELLE",
  "EVENEMENT_SPORTIF_CULTUREL",
  "AUTRE",
] as const;

export const declarationSchema = z
  .object({
    organisateurNom: z.string().trim().min(2, "Le nom est requis"),
    organisateurPrenom: z.string().trim().optional().or(z.literal("")),
    organisateurTelephone: z
      .string()
      .trim()
      .min(8, "Numéro de téléphone invalide"),
    organisateurEmail: z
      .string()
      .trim()
      .email("Email invalide")
      .optional()
      .or(z.literal("")),
    organisateurStructure: z.string().trim().optional().or(z.literal("")),

    typeSpectacle: z.enum(TYPE_SPECTACLE_VALUES),
    typeSpectacleAutre: z.string().trim().optional().or(z.literal("")),
    titreEvenement: z.string().trim().optional().or(z.literal("")),
    dateEvenement: z.string().min(1, "La date est requise"),
    lieu: z.string().trim().min(2, "Le lieu est requis"),
    commune: z.string().trim().min(2, "La commune est requise"),
    region: z.string().trim().min(2, "La région est requise"),
    jaugeEstimee: z
      .number({ invalid_type_error: "Jauge invalide" })
      .int()
      .min(1, "Jauge invalide"),
    entreePayante: z.boolean().default(false),

    statutOrientation: z.enum(["EXEMPTE", "PROFESSIONNEL"]).optional(),
  })
  .refine(
    (data) => data.typeSpectacle !== "AUTRE" || !!data.typeSpectacleAutre,
    {
      message: "Veuillez préciser le type de spectacle",
      path: ["typeSpectacleAutre"],
    },
  );

export type DeclarationInput = z.infer<typeof declarationSchema>;
