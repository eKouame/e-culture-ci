// Configuration du guichet communal : la seule source de vérité sur les communes.
// Aucun nom de commune n'est écrit dans une mise en page ; aucune commune n'est
// nommée comme partenaire sans convention signée et accord écrit sur le texte.
//
// Statuts (cahier des charges du guichet communal, §6.3) :
// - prospect     : jamais affichée publiquement ;
// - pilote_signe : convention signée, mise en place en cours ;
// - actif        : la transmission est ouverte.
//
// Phase 0 : la liste est vide. Rien n'est transmis, rien n'est conservé. L'état 1
// (transmission réelle) ne s'ouvre qu'en phase 1, après signature et vérification
// juridique : il suffira alors d'ajouter la commune ici.

export type StatutCommune = "prospect" | "pilote_signe" | "actif";

export interface CommuneGuichet {
  slug: string;
  nom: string;
  statut: StatutCommune;
}

export const COMMUNES_GUICHET: CommuneGuichet[] = [];

// Commune clairement fictive, utilisée seulement pour l'essai. Elle n'est
// jamais dans `COMMUNES_GUICHET` : elle ne peut donc pas passer pour un partenaire.
export const COMMUNE_ESSAI = "Commune d'essai";

function normaliser(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Vrai seulement pour une commune dont le guichet est actif.
export function estCommuneActive(nom: string): boolean {
  const cible = normaliser(nom);
  if (!cible) return false;
  return COMMUNES_GUICHET.some(
    (c) => c.statut === "actif" && normaliser(c.nom) === cible,
  );
}

// « de Bouaké », mais « d'Abengourou ».
export function deCommune(nom: string): string {
  const n = nom.trim();
  return /^[aeiouyàâäéèêëîïôöùûü]/i.test(n) ? `d'${n}` : `de ${n}`;
}
