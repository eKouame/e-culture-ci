import { LienMesure } from "@/components/parcours/LienMesure";
import type { Actualite } from "@/lib/actualites";

const ETIQUETTE = {
  EXTERNE: { texte: "Actu secteur", style: "bg-primary-light text-primary-dark" },
  INTERNE: { texte: "Sur le site", style: "bg-secondary-light text-secondary-dark" },
} as const;

// Bande « Actualités » de l'accueil : les flash infos actifs, sous le héro (maquette du
// 8 octobre). N'affiche rien s'il n'y en a pas. Le type (« Actu secteur » ou « Sur le site »)
// se lit d'un coup d'œil. Le lien « Toutes les actus » viendra avec la page Actualités,
// aujourd'hui mise de côté : pas de lien mort.
export function BlocActualites({ items }: { items: Actualite[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="actualites" className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-5xl md:grid-cols-[180px_1fr]">
        <h2
          id="actualites"
          className="px-4 pt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-foreground sm:px-6 md:flex md:items-center md:border-r md:border-border md:py-5 md:pl-6"
        >
          Actualités
        </h2>
        <ul className="divide-y divide-border">
          {items.map((a) => {
            const etiquette = ETIQUETTE[a.type];
            const externe = !!a.lien && a.lien.startsWith("http");
            const contenu = (
              <>
                <span
                  className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-extrabold uppercase leading-tight tracking-wide ${etiquette.style}`}
                >
                  {etiquette.texte}
                </span>
                <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-foreground">
                  {a.titre}
                  {a.lien && (
                    <span aria-hidden="true" className="ml-1.5 text-primary-dark">
                      {externe ? "↗" : "→"}
                    </span>
                  )}
                </span>
              </>
            );
            const classes =
              "flex min-h-[44px] flex-col items-start gap-1.5 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6";
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
      </div>
    </section>
  );
}
