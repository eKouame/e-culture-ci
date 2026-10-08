// Étiquette d'état (cahier d'intégration, composant « Badge ») : « Nouveau », « Bientôt »,
// « Disponible », « Actu secteur », « Sur le site », et les quatre niveaux de
// correspondance des salaires. Le sens ne repose jamais sur la couleur seule : le texte est
// toujours écrit.
const ETATS = {
  nouveau: { texte: "Nouveau", style: "bg-hero-accent text-white" },
  bientot: { texte: "Bientôt", style: "border border-dashed border-border-strong bg-transparent text-muted" },
  disponible: { texte: "Disponible", style: "bg-secondary-light text-secondary-dark" },
  "actu-secteur": { texte: "Actu secteur", style: "bg-primary-light text-primary-dark" },
  "sur-le-site": { texte: "Sur le site", style: "bg-secondary-light text-secondary-dark" },
  directe: { texte: "Correspondance directe", style: "bg-secondary-light text-secondary-dark" },
  approximative: { texte: "Correspondance approximative", style: "bg-primary-light text-primary-dark" },
  faible: { texte: "Correspondance faible", style: "bg-surface-2 text-foreground" },
  aucune: { texte: "Pas de repère", style: "border border-border-strong bg-transparent text-muted" },
} as const;

export type EtatBadge = keyof typeof ETATS;

export function BadgeEtat({ etat, className = "" }: { etat: EtatBadge; className?: string }) {
  const e = ETATS[etat];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${e.style} ${className}`}
    >
      {e.texte}
    </span>
  );
}
