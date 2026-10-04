// Source unique des valeurs de la ressource « Déclarer et payer vos artistes » :
// l'essentiel, les tableaux de règles et l'audio lisent tous cet objet.
// Revue annuelle (janvier, après l'annexe fiscale) : voir le cahier des charges §11.
// Le corps de texte contient encore ces valeurs en toutes lettres : à relire à la main.

export type AudioResume = {
  src: string;
  dureeLabel: string;
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
  // Renseigner quand l'enregistrement existe, par exemple :
  // { src: "/audio/payer-artistes-resume-2026-10.mp3", dureeLabel: "Environ 2 min",
  //   poidsLabel: "1 Mo", enregistre: "octobre 2026",
  //   valeursEnregistrees: { tauxResident: 7.5, tauxNonResident: 20,
  //     jourReversement: 15, cnpsMinimumMensuel: 5400 } }
  audio: null as AudioResume | null,
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
  { id: "retenue", label: "Combien dois-je retenir sur le cachet ?", ancre: "retenue" },
  {
    id: "non-resident",
    label: "Mon artiste vient de l'étranger : quel taux ?",
    ancre: "retenue-non-resident",
  },
  {
    id: "regime-reel",
    label: "Mon artiste est au régime réel : dois-je retenir ?",
    ancre: "retenue-regime-reel",
  },
  {
    id: "cnps",
    label: "Mon artiste doit-il être déclaré à la CNPS ?",
    ancre: "casquette-1",
  },
  { id: "guichets", label: "Quel guichet pour quoi ?", ancre: "trois-guichets" },
  { id: "salarie", label: "Je veux l'engager comme salarié", ancre: "salarie" },
] as const;

// Script de la version à écouter (cahier des charges, annexe A). Les nombres sont
// écrits en toutes lettres, tels qu'ils sont dits. Sert de transcription.
export const AUDIO_SCRIPT = [
  "Ici e-Culture CI, un outil d'orientation indépendant. Ce qui suit est une information générale, pas un conseil fiscal ou juridique.",
  "Payer un artiste, ce sont en réalité deux sujets. Il faut les séparer.",
  "Premier sujet : l'artiste lui-même. En Côte d'Ivoire, un artiste qui travaille à son compte est un travailleur indépendant. Il dépend d'un régime de protection sociale obligatoire, géré par la CNPS. C'est lui qui se déclare et qui cotise, au minimum cinq mille quatre cents francs par mois. Ce n'est pas à vous de le faire à sa place. Mais vous pouvez l'y encourager.",
  "Deuxième sujet : vous, l'organisateur. Quand vous payez un cachet, la loi vous demande de retenir un impôt, puis de le reverser aux Impôts. Le taux dépend d'une seule question : l'artiste est-il résident en Côte d'Ivoire ?",
  "S'il est résident, vous retenez sept virgule cinq pour cent du cachet brut. Le cachet brut, c'est le montant avant retenue.",
  "S'il vient de l'étranger, vous retenez vingt pour cent. Ce taux peut être réduit si une convention fiscale existe avec son pays.",
  "Et s'il est au régime réel et vous remet une facture normalisée, vous ne retenez rien.",
  "Vous reversez la somme aux Impôts au plus tard le quinze du mois suivant. Et si vous oubliez, la faute est pour vous, pas pour l'artiste.",
  "Dernier réflexe : ne mélangez pas les trois guichets. Les Impôts, pour la retenue. La CNPS, pour la protection sociale de l'artiste. Le BURIDA, pour les droits d'auteur.",
  "Ces taux sont ceux en vigueur à la date de cet enregistrement. Pour les exceptions, le cas du salarié et le lexique, lisez la page. Et confirmez toujours votre cas auprès de la direction générale des Impôts.",
];
