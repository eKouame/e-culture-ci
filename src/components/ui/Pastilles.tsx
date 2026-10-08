"use client";

export interface Pastille {
  id: string;
  label: string;
  compteur?: number;
}

// Filtres en pastilles avec compteurs (listes de ressources, FAQ, actualités). Un filtre
// à la fois ; `aria-pressed` indique l'état. Une pastille à zéro résultat reste lisible
// mais inactive.
export function Pastilles({
  pastilles,
  actif,
  onChoisir,
  libelle,
}: {
  pastilles: Pastille[];
  actif: string;
  onChoisir: (id: string) => void;
  libelle: string;
}) {
  return (
    <div role="group" aria-label={libelle} className="flex flex-wrap gap-2">
      {pastilles.map((p) => {
        const choisi = p.id === actif;
        const vide = p.compteur === 0;
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={choisi}
            disabled={vide && !choisi}
            onClick={() => onChoisir(p.id)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              choisi
                ? "border-secondary bg-secondary text-white"
                : "border-border-strong bg-surface text-foreground hover:border-secondary"
            }`}
          >
            {p.label}
            {p.compteur !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  choisi ? "bg-white/20 text-white" : "bg-surface-2 text-muted"
                }`}
              >
                {p.compteur}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
