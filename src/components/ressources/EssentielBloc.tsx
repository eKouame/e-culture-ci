import { ReactNode } from "react";

// « L'essentiel en 30 secondes » : un seul par page, sous l'en-tête. Fond vert profond,
// éventuellement avec les chiffres clés en tuiles. Chaque chiffre affiché ici doit exister,
// identique, dans le corps de la page : à alimenter depuis la même configuration.
export function EssentielBloc({
  items,
  chiffres,
  verifie,
  suite = "Détails, exceptions et lexique ci-dessous.",
}: {
  items: ReactNode[];
  // Chiffres clés en tuiles (3 au plus), facultatifs.
  chiffres?: { valeur: string; legende: string }[];
  // Date de vérification, à n'afficher que si la page en porte une.
  verifie?: string;
  suite?: string;
}) {
  return (
    <section
      aria-labelledby="essentiel-titre"
      className="essentiel-sombre rounded-2xl bg-deep p-5 text-on-deep sm:p-7"
    >
      <h2
        id="essentiel-titre"
        className="text-xs font-bold uppercase tracking-[0.12em] text-accent-on-deep"
      >
        L&apos;essentiel en 30 secondes
      </h2>

      {chiffres && chiffres.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {chiffres.slice(0, 3).map((c) => (
            <div key={c.legende} className="rounded-xl bg-secondary px-3 py-3 sm:px-4 sm:py-3.5">
              <dt className="text-xl font-extrabold leading-none tracking-tight text-white tabular-nums sm:text-3xl">
                {c.valeur}
              </dt>
              <dd className="mt-1.5 text-xs leading-snug text-on-deep-muted sm:text-sm">{c.legende}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-4 text-base leading-snug text-on-deep sm:leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 py-1.5 sm:py-2">
            <span
              aria-hidden="true"
              className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-on-deep"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-white/15 pt-3 text-sm italic text-on-deep-muted">
        {verifie ? `Vérifié en ${verifie}. ` : ""}
        {suite}
      </p>
    </section>
  );
}
