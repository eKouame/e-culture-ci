import { z } from "zod";

export const communeSchema = z.object({
  nom: z.string().trim().min(2, "Le nom est requis"),
  fonction: z.string().trim().min(2, "La fonction est requise"),
  commune: z.string().trim().min(2, "Le nom de la commune est requis"),
  email: z.string().trim().email("Email invalide"),
  telephone: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  consentement: z
    .boolean()
    .refine((v) => v === true, { message: "Le consentement est requis" }),
  // Honeypot anti-spam : doit rester vide, un formulaire rempli par un bot le remplira.
  website: z.string().optional().or(z.literal("")),
});

export type CommuneInput = z.infer<typeof communeSchema>;
