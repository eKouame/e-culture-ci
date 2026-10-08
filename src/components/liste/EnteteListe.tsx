import { ReactNode } from "react";
import { FilAriane, type MaillonAriane } from "@/components/ui/FilAriane";

// En-tête du gabarit « liste » (centre de ressources, toutes les ressources, FAQ) : fil
// d'Ariane, sur-titre facultatif, grand titre, phrase d'introduction, et un encart à
// droite (facultatif) pour le point de départ conseillé.
export function EnteteListe({
  maillons,
  surtitre,
  titre,
  intro,
  encart,
}: {
  maillons: MaillonAriane[];
  surtitre?: string;
  titre: string;
  intro: ReactNode;
  encart?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-6 pt-5 sm:px-6">
      <FilAriane maillons={maillons} />
      <div className="mt-3 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
        <div>
          {surtitre && (
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{surtitre}</p>
          )}
          <h1 className="mt-1 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
            {titre}
          </h1>
          <div className="mt-3 max-w-[620px] text-lg leading-relaxed text-muted">{intro}</div>
        </div>
        {encart && <div className="md:w-[380px]">{encart}</div>}
      </div>
    </div>
  );
}
