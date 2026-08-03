export type ReponseFrequence = "occasionnel" | "regulier";
export type ReponseFinalite = "socio_educatif" | "commercial";
export type ReponseStructure = "individuel_association" | "entreprise";
export type ReponseJauge = "moins_100" | "100_500" | "500_2000" | "plus_2000";

export interface ReponsesQuestionnaire {
  frequence: ReponseFrequence;
  finalite: ReponseFinalite;
  structure: ReponseStructure;
  jauge: ReponseJauge;
}

export type StatutOrientation = "EXEMPTE" | "PROFESSIONNEL";

/**
 * Un acteur est exempté de licence et de caution bancaire (article 10 du
 * décret de 2021) uniquement si les 3 critères pointent vers une activité
 * occasionnelle, non commerciale et non structurée en entreprise de
 * spectacle. Dès qu'un seul critère penche du côté professionnel, on
 * oriente vers le régime professionnel par prudence.
 * La jauge est capturée à titre statistique / pré-remplissage de la
 * déclaration, elle n'intervient pas dans cette logique d'orientation.
 */
export function getOrientation(
  reponses: Pick<ReponsesQuestionnaire, "frequence" | "finalite" | "structure">,
): StatutOrientation {
  const estExempte =
    reponses.frequence === "occasionnel" &&
    reponses.finalite === "socio_educatif" &&
    reponses.structure === "individuel_association";

  return estExempte ? "EXEMPTE" : "PROFESSIONNEL";
}
