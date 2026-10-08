import { LienMesure } from "@/components/parcours/LienMesure";
import type { Actualite } from "@/lib/actualites";

const ETIQUETTE = {
  EXTERNE: { texte: "Actu secteur", style: "bg-primary-light text-primary-dark" },
  INTERNE: { texte: "Sur le site", style: "bg-secondary-light text-secondary-dark" },
} as const;

// Bloc « Actualités » de l'accueil : les flash infos actifs, sous le héro. N'affiche rien
// s'il n'y en a pas. Le type (« Actu secteur » ou « Sur le site ») se lit d'un coup d'œil.
export function BlocActualites({ items }: { items: Actualite[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="actualites" className="mx-auto max-w-5xl px-4 pt-10 sm:px-6">
      <h2
        id="actualites"
        className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
      >
        Actualités
      </h2>
      <p className="mt-1 text-sm text-muted">Les dernières nouvelles du site et du secteur.</p>
      <ul className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
        {items.map((a, i) => {
          const etiquette = ETIQUETTE[a.type];
          const externe = !!a.lien && a.lien.startsWith("http");
          const contenu = (
            <>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${etiquette.style}`}
              >
                {etiquette.texte}
              </span>
              <span className="min-w-0 flex-1 text-base font-semibold text-foreground">
                {a.titre}
                {a.lien && (
                  <span aria-hidden="true" className="ml-1.5 text-primary-dark">
                    {externe ? "↗" : "→"}
                  </span>
                )}
              </span>
            </>
          );
          const classes = `flex min-h-[44px] flex-col items-start gap-1.5 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-3 sm:px-5 ${
            i < items.length - 1 ? "border-b border-border" : ""
          }`;
          return (
            <li key={a.id}>
              {a.lien ? (
                <LienMesure
                  href={a.lien}
                  evenement="actualite_cliquee"
                  donnees={{ type: a.type === "EXTERNE" ? "secteur" : "site" }}
                  externe={externe}
                  className={`${classes} transition-colors hover:bg-black/[0.03]`}
                >
                  {contenu}
                  {externe && <span className="sr-only">(s&apos;ouvre dans un nouvel onglet)</span>}
                </LienMesure>
              ) : (
                <div className={classes}>{contenu}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
