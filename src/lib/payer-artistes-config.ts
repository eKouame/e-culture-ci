// Source unique des valeurs de la ressource « Déclarer et payer vos artistes » :
// l'essentiel, les tableaux de règles et l'audio lisent tous cet objet.
// Revue annuelle (janvier, après l'annexe fiscale) : voir le cahier des charges §11.
// Le corps de texte contient encore ces valeurs en toutes lettres : à relire à la main.

export type AudioResume = {
  src: string;
  dureeLabel: string;
  // Durée réelle du fichier, pour afficher le total avant le chargement.
  dureeSecondes: number;
  poidsLabel: string;
  enregistre: string;
  // Valeurs prononcées dans l'enregistrement. Si l'une d'elles diverge de la
  // configuration courante, le lecteur est retiré automatiquement (voir `audioAJour`).
  valeursEnregistrees: {
    tauxResident: number;
    tauxNonResident: number;
    jourReversement: number;
    cnpsMinimumMensuel: number;
  };
};

export const PAYER_ARTISTES = {
  tauxResident: 7.5,
  tauxNonResident: 20,
  tauxConventionIndicatif: 10,
  jourReversement: 15,
  cnpsMinimumMensuel: 5400,
  revenuDeclareMin: 45000,
  anneeLoiFinances: 2026,
  dateVerification: "octobre 2026",
  // Enregistrement fourni (octobre 2026), à réenregistrer si une valeur ci-dessus change :
  // le lecteur est alors retiré automatiquement (voir `audioAJour`).
  audio: {
    src: "/audio/payer-artistes-resume-2026-10.mp3",
    dureeLabel: "Environ 2 min",
    dureeSecondes: 115,
    poidsLabel: "1,8 Mo",
    enregistre: "octobre 2026",
    valeursEnregistrees: {
      tauxResident: 7.5,
      tauxNonResident: 20,
      jourReversement: 15,
      cnpsMinimumMensuel: 5400,
    },
  } as AudioResume | null,
};

export function pct(n: number): string {
  return `${String(n).replace(".", ",")} %`;
}

// Un audio périmé est pire que pas d'audio : le lecteur n'est affiché que si
// toutes les valeurs enregistrées sont identiques à la configuration courante.
export function audioAJour(): AudioResume | null {
  const a = PAYER_ARTISTES.audio;
  if (!a) return null;
  const v = a.valeursEnregistrees;
  const ok =
    v.tauxResident === PAYER_ARTISTES.tauxResident &&
    v.tauxNonResident === PAYER_ARTISTES.tauxNonResident &&
    v.jourReversement === PAYER_ARTISTES.jourReversement &&
    v.cnpsMinimumMensuel === PAYER_ARTISTES.cnpsMinimumMensuel;
  return ok ? a : null;
}

// Les six questions de la rangée « Votre question ? ».
export const QUESTIONS = [
  { id: "retenue", label: "Combien dois-je retenir sur le cachet ?", ancre: "retenue" },
  {
    id: "non-resident",
    label: "Mon artiste vient de l'étranger : quel taux ?",
    ancre: "retenue-non-resident",
  },
  {
    id: "regime-reel",
    label: "Mon artiste est au régime réel : dois-je retenir ?",
    ancre: "retenue-regime-reel",
  },
  {
    id: "cnps",
    label: "Mon artiste doit-il être déclaré à la CNPS ?",
    ancre: "casquette-1",
  },
  { id: "guichets", label: "Quel guichet pour quoi ?", ancre: "trois-guichets" },
  { id: "salarie", label: "Je veux l'engager comme salarié", ancre: "salarie" },
] as const;
