import { ReactNode } from "react";

// « L'essentiel en 30 secondes » : un seul par page, sous l'en-tête.
// Chaque chiffre affiché ici doit exister, identique, dans le corps de la page.
// Carte du carnet (coin corné) ; les puces sont séparées par un filet fin pour que
// l'œil repère chaque idée d'un coup sur un petit écran.
export function EssentielBloc({
  items,
  verifie,
  suite = "Détails, exceptions et lexique ci-dessous.",
}: {
  items: ReactNode[];
  // Date de vérification, à n'afficher que si la page en porte une.
  verifie?: string;
  suite?: string;
}) {
  return (
    <section
      aria-labelledby="essentiel-titre"
      className="dog-ear rounded-xl border border-primary/30 bg-primary-light px-4 pb-3.5 pt-3.5 sm:p-6"
    >
      <h2
        id="essentiel-titre"
        className="pr-6 text-xs font-bold uppercase tracking-wide text-primary-dark"
      >
        L&apos;essentiel en 30 secondes
      </h2>
      <ul className="mt-2 text-base leading-snug text-foreground sm:mt-3 sm:leading-relaxed">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 border-t border-primary/20 py-2 first:border-t-0 first:pt-0.5 last:pb-0 sm:gap-3 sm:py-3.5 sm:first:pt-1"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-primary/20 pt-2.5 text-sm italic text-muted sm:mt-4 sm:pt-3">
        {verifie ? `Vérifié en ${verifie}. ` : ""}
        {suite}
      </p>
    </section>
  );
}
