import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
  // Code de double vérification, seulement quand le compte l'a activée.
  code: z.string().trim().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
