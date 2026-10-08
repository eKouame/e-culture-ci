"use client";

import { ReactNode, useId, useState } from "react";

export interface ElementAccordeon {
  id: string;
  titre: string;
  contenu: ReactNode;
}

// Accordéon (FAQ, sommaire mobile, menu mobile). `unSeulOuvert` : l'ouverture d'un élément
// referme les autres. Signe + / −, cible de 44 px, aria-expanded et aria-controls.
export function Accordeon({
  elements,
  unSeulOuvert = false,
  ouvertParDefaut,
}: {
  elements: ElementAccordeon[];
  unSeulOuvert?: boolean;
  ouvertParDefaut?: string;
}) {
  const base = useId();
  const [ouverts, setOuverts] = useState<string[]>(ouvertParDefaut ? [ouvertParDefaut] : []);

  function basculer(id: string) {
    setOuverts((courants) =>
      courants.includes(id)
        ? courants.filter((x) => x !== id)
        : unSeulOuvert
          ? [id]
          : [...courants, id],
    );
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {elements.map((el) => {
        const ouvert = ouverts.includes(el.id);
        const idPanneau = `${base}-${el.id}`;
        return (
          <div key={el.id}>
            <h3>
              <button
                type="button"
                aria-expanded={ouvert}
                aria-controls={idPanneau}
                onClick={() => basculer(el.id)}
                className="flex min-h-[44px] w-full items-center justify-between gap-3 py-3 text-left text-base font-bold text-foreground"
              >
                {el.titre}
                <span aria-hidden="true" className="text-xl font-medium text-hero-accent">
                  {ouvert ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={idPanneau} hidden={!ouvert} className="pb-4 text-sm leading-relaxed text-muted">
              {el.contenu}
            </div>
          </div>
        );
      })}
    </div>
  );
}
