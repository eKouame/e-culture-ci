// Données INVENTÉES pour la version d'exemple publique de l'Espace communal. Rien ici ne
// vient d'une vraie déclaration ni d'une vraie commune. Aucun nom de personne, aucun
// numéro de téléphone : la vue montre seulement ce qu'une mairie verrait de l'activité.

export interface DeclarationExemple {
  reference: string;
  date: string; // AAAA-MM-JJ
  type: string;
  lieu: string;
  jauge: number;
  payante: boolean;
  transmisLe: string; // AAAA-MM-JJ
}

export const DECLARATIONS_EXEMPLE: DeclarationExemple[] = [
  { reference: "EX-0001", date: "2026-11-07", type: "Concert", lieu: "Place du marché", jauge: 300, payante: true, transmisLe: "2026-09-12" },
  { reference: "EX-0002", date: "2026-11-14", type: "Conte", lieu: "Cour de l'école", jauge: 80, payante: false, transmisLe: "2026-09-13" },
  { reference: "EX-0003", date: "2026-11-21", type: "Théâtre", lieu: "Salle polyvalente", jauge: 150, payante: true, transmisLe: "2026-09-15" },
  { reference: "EX-0004", date: "2026-11-28", type: "Danse", lieu: "Esplanade de la mairie", jauge: 250, payante: false, transmisLe: "2026-09-19" },
  { reference: "EX-0005", date: "2026-12-05", type: "Concert", lieu: "Terrain de quartier", jauge: 500, payante: true, transmisLe: "2026-09-22" },
  { reference: "EX-0006", date: "2026-12-12", type: "Humour", lieu: "Salle polyvalente", jauge: 120, payante: true, transmisLe: "2026-09-26" },
  { reference: "EX-0007", date: "2026-12-19", type: "Projection", lieu: "Cour de l'école", jauge: 100, payante: false, transmisLe: "2026-09-28" },
  { reference: "EX-0008", date: "2026-12-26", type: "Concert", lieu: "Place du marché", jauge: 400, payante: true, transmisLe: "2026-09-30" },
];
