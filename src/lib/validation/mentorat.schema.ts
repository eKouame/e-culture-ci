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
  typeSpectacleInteret: z.enum(TYPE_SPECTACLE_VALUES),
  disponibilite: z.string().trim().optional().or(z.literal("")),
});

export type MentoratInput = z.infer<typeof mentoratSchema>;
