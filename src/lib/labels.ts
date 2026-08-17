export const TYPE_SPECTACLE_LABELS: Record<string, string> = {
  CONCERT: "Concert",
  THEATRE: "Théâtre",
  DANSE: "Danse",
  HUMOUR: "Humour",
  FESTIVAL: "Festival",
  CEREMONIE_TRADITIONNELLE: "Cérémonie traditionnelle",
  EVENEMENT_SPORTIF_CULTUREL: "Événement sportif-culturel",
  AUTRE: "Autre",
};

export const TYPE_ACTIVITE_LABELS: Record<string, string> = {
  OCCASIONNEL: "Occasionnelle",
  REGULIER: "Régulière",
};

export const STATUT_DOSSIER_LABELS: Record<string, string> = {
  RECU: "Reçu",
  EN_EXAMEN: "En examen",
  VALIDE: "Validé",
  REJETE: "Rejeté",
};

export const STATUT_MENTORAT_LABELS: Record<string, string> = {
  EN_ATTENTE: "En attente",
  JUMELE: "Jumelé",
  CLOTURE: "Clôturé",
};

export const STATUT_DEMANDE_COMMUNE_LABELS: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  CONTACTEE: "Contactée",
  EN_DISCUSSION: "En discussion",
  PILOTE: "Commune pilote",
  CLOTUREE: "Clôturée",
};

export const TYPE_DEMANDEUR_OPTIONS = [
  "Individuel",
  "Association",
  "Structure informelle",
] as const;

export const DOMAINES_ACTIVITE_OPTIONS = [
  "Musique / Concert",
  "Théâtre",
  "Danse",
  "Humour",
  "Festival",
  "Cérémonie traditionnelle",
  "Événement sportif-culturel",
  "Autre",
] as const;
