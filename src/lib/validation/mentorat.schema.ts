import { z } from "zod";
import { TYPE_SPECTACLE_VALUES } from "./declaration.schema";

export const mentoratSchema = z.object({
  nomComplet: z.string().trim().min(2, "Le nom complet est requis"),
  telephone: z.string().trim().min(8, "Numéro de téléphone invalide"),
  email: z.string().trim().email("Email invalide").optional().or(z.literal("")),
  commune: z.string().trim().min(2, "La commune est requise"),
  region: z.string().trim().min(2, "La région est requise"),

  profilActuel: z
    .string()
    .trim()
    .min(10, "Décrivez brièvement votre expérience actuelle"),
  // Message en français quand aucun type n'est choisi (sinon l'erreur de zod s'affiche en anglais).
  typeSpectacleInteret: z.enum(TYPE_SPECTACLE_VALUES, {
    errorMap: () => ({ message: "Choisissez un type de spectacle" }),
  }),
  disponibilite: z.string().trim().optional().or(z.literal("")),
});

export type MentoratInput = z.infer<typeof mentoratSchema>;
