import { ReactNode } from "react";

// « L'essentiel en 30 secondes » : un seul par page, sous l'en-tête.
// Chaque chiffre affiché ici doit exister, identique, dans le corps de la page.
export function EssentielBloc({
  items,
  verifie,
}: {
  items: ReactNode[];
  verifie: string;
}) {
  return (
    <section
      aria-labelledby="essentiel-titre"
      className="rounded-xl border border-primary/40 bg-primary-light p-4 sm:p-6"
    >
      <h2
        id="essentiel-titre"
        className="text-xs font-bold uppercase tracking-wide text-primary-dark"
      >
        L&apos;essentiel en 30 secondes
      </h2>
      <ul className="mt-2.5 flex flex-col gap-2 text-base leading-snug text-foreground sm:mt-3 sm:gap-2.5 sm:leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm italic text-muted sm:mt-4">
        Vérifié en {verifie}. Détails, exceptions et lexique ci-dessous.
      </p>
    </section>
  );
}
