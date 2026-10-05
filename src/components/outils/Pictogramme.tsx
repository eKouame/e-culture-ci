import type { OutilId } from "@/lib/outils-config";

// Pictogrammes des outils : tracé unique (trait de 2 px, bouts arrondis), pas d'emoji.
export function Pictogramme({
  outil,
  taille = 24,
}: {
  outil: OutilId;
  taille?: number;
}) {
  const commun = {
    width: taille,
    height: taille,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (outil === "budget") {
    // calculatrice
    return (
      <svg {...commun}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8.5 7.5h7" />
        <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
      </svg>
    );
  }
  if (outil === "mes-budgets") {
    // carnet
    return (
      <svg {...commun}>
        <path d="M6 3.5h11a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H6z" />
        <path d="M6 3.5v17M10 8h5M10 12h5" />
      </svg>
    );
  }
  // « Suis-je concerné ? » : boussole
  return (
    <svg {...commun}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  );
}
