import {
  ReponseFinalite,
  ReponseFrequence,
  ReponseJauge,
  ReponseStructure,
} from "@/lib/questionnaire-logic";

export interface QuestionOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

export const QUESTION_FREQUENCE: {
  title: string;
  options: QuestionOption<ReponseFrequence>[];
} = {
  title: "À quelle fréquence organisez-vous des spectacles vivants ?",
  options: [
    {
      value: "occasionnel",
      label: "Occasionnellement",
      description: "Quelques fois par an, pour une occasion précise",
    },
    {
      value: "regulier",
      label: "Régulièrement",
      description: "C'est mon activité principale",
    },
  ],
};

export const QUESTION_FINALITE: {
  title: string;
  options: QuestionOption<ReponseFinalite>[];
} = {
  title: "Quel est le but principal de vos événements ?",
  options: [
    {
      value: "socio_educatif",
      label: "Socio-éducatif, sportif, philanthropique ou culturel",
      description:
        "Mariage, funérailles, fête de quartier, tournoi, festival régional, sensibilisation...",
    },
    {
      value: "commercial",
      label: "Activité commerciale de spectacle",
      description: "C'est ma source de revenu principale",
    },
  ],
};

export const QUESTION_STRUCTURE: {
  title: string;
  options: QuestionOption<ReponseStructure>[];
} = {
  title: "Comment organisez-vous vos événements ?",
  options: [
    {
      value: "individuel_association",
      label: "À titre individuel ou associatif",
      description: "Association ou collectif non enregistré comme entreprise de spectacle",
    },
    {
      value: "entreprise",
      label: "Via une entreprise enregistrée",
      description: "Structure dont l'activité principale est l'organisation de spectacles",
    },
  ],
};

export const QUESTION_JAUGE: {
  title: string;
  options: QuestionOption<ReponseJauge>[];
} = {
  title: "Quelle est la jauge estimée de votre événement ?",
  options: [
    { value: "moins_100", label: "Moins de 100 spectateurs" },
    { value: "100_500", label: "Entre 100 et 500 spectateurs" },
    { value: "500_2000", label: "Entre 500 et 2 000 spectateurs" },
    { value: "plus_2000", label: "Plus de 2 000 spectateurs" },
  ],
};

export const JAUGE_TO_ESTIMATE: Record<ReponseJauge, number> = {
  moins_100: 80,
  "100_500": 300,
  "500_2000": 1000,
  plus_2000: 2500,
};
