import { ReactNode } from "react";

type Ligne = { id?: string; cellules: ReactNode[] };

// Tableau de règles : un repère, jamais un remplaçant du paragraphe qui le suit.
// Ordinateur : vrai tableau. Mobile en portrait : chaque ligne devient une carte
// empilée (pas de défilement horizontal), avec la cellule `teteMobile` en gros
// caractères en tête de carte. Les colonnes « Source » ne sont jamais supprimées.
export function TableauRegles({
  id,
  titre,
  colonnes,
  lignes,
  teteMobile,
}: {
  id?: string;
  titre: string;
  colonnes: string[];
  lignes: Ligne[];
  teteMobile: number;
}) {
  return (
    <div id={id} data-surligner="" className="my-5 scroll-mt-24">
      <table className="w-full border-collapse text-sm max-md:block">
        <caption className="mb-2 text-left text-sm font-bold text-secondary-dark max-md:block">
          {titre}
        </caption>
        <thead className="max-md:sr-only">
          <tr>
            {colonnes.map((c) => (
              <th
                key={c}
                scope="col"
                className="border-b border-border bg-surface-2 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-muted"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:flex max-md:flex-col max-md:gap-3">
          {lignes.map((ligne, r) => (
            <tr
              key={r}
              id={ligne.id}
              data-surligner={ligne.id ? "" : undefined}
              className="scroll-mt-24 border-b border-border align-top max-md:flex max-md:flex-col max-md:rounded-xl max-md:border max-md:bg-surface max-md:p-4"
            >
              {ligne.cellules.map((cellule, i) => (
                <td
                  key={i}
                  data-label={colonnes[i]}
                  className={`px-3 py-3 text-foreground max-md:px-0 max-md:py-1.5 ${
                    i === teteMobile
                      ? "max-md:order-first max-md:pb-2"
                      : "max-md:before:block max-md:before:text-xs max-md:before:font-bold max-md:before:uppercase max-md:before:tracking-wide max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  }`}
                >
                  {cellule}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
