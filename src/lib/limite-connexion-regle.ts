// La règle de limitation, sans accès à la base : testable seule.
//
// Fenêtre glissante de 15 minutes sur les échecs. Au-delà de 5 échecs pour un même
// e-mail, ou de 20 pour une même adresse IP, la connexion est refusée jusqu'à ce que les
// plus anciens échecs sortent de la fenêtre.

export const FENETRE_MS = 15 * 60 * 1000;
export const CONSERVATION_MS = 24 * 60 * 60 * 1000;
export const MAX_ECHECS_EMAIL = 5;
export const MAX_ECHECS_IP = 20;

export function estBloque(echecsEmail: number, echecsIp: number): boolean {
  return echecsEmail >= MAX_ECHECS_EMAIL || echecsIp >= MAX_ECHECS_IP;
}
