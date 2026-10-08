import "server-only";
import { estVisible, type Statut } from "@/lib/publication";
import { validerCollection } from "./fichiers";
import type { Entree, NomCollection } from "./schema";

// Accès au contenu depuis les pages (côté serveur). Seuls les contenus « publié » sont
// visibles en production ; « à valider » et « brouillon » le sont en prévisualisation.
// Un contenu invalide fait échouer la compilation (voir scripts/valider-contenu.ts) : on ne
// le rencontre donc pas ici en production.

export function lireCollection<K extends NomCollection>(nom: K): Entree<K>[] {
  const { entrees, problemes } = validerCollection(nom);
  if (problemes.length > 0) {
    throw new Error(
      `Contenu invalide (${nom}) :\n` +
        problemes.map((p) => `- ${p.fichier} : ${p.message}`).join("\n"),
    );
  }
  return entrees
    .map((e) => e.valeur as Entree<K>)
    .filter((v) => estVisible((v as { statut: Statut }).statut));
}

export function lireEntree<K extends NomCollection>(nom: K, slug: string): Entree<K> | undefined {
  return lireCollection(nom).find((v) => (v as { slug?: string }).slug === slug);
}
