import { LienOutil } from "@/components/outils/LienOutil";
import { Pictogramme } from "@/components/outils/Pictogramme";
import { outil, type OutilId } from "@/lib/outils-config";

// Bloc « Outils liés » en fin de ressource, avant « Et après ? » : une ou deux cartes
// au maximum, avec le pictogramme et une phrase. Les ressources sont le cœur des
// visites : c'est d'ici que les outils se découvrent.
export function OutilsLies({
  depuis,
  outils,
}: {
  depuis: string;
  outils: { id: Exclude<OutilId, "mes-budgets">; phrase?: string }[];
}) {
  return (
    <section aria-labelledby="outils-lies-titre" className="no-print mt-12 border-t border-border pt-8">
      <h2 id="outils-lies-titre" className="text-lg font-bold text-secondary-dark">
        Outils liés
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {outils.slice(0, 2).map(({ id, phrase }) => {
          const o = outil(id);
          return (
            <LienOutil
              key={id}
              href={o.href ?? "/outils"}
              depuis={depuis}
              outil={id}
              emplacement="outils-lies"
              className="flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary-light p-4 transition-colors hover:bg-secondary-light/70"
            >
              <span className="mt-0.5 shrink-0 text-secondary">
                <Pictogramme outil={id} />
              </span>
              <span>
                <span className="block font-bold text-foreground">{o.nom}</span>
                <span className="mt-1 block text-sm text-foreground">
                  {phrase ?? o.phrase}
                </span>
                <span className="mt-1.5 block text-sm font-bold text-secondary-dark">
                  Ouvrir l&apos;outil →
                </span>
              </span>
            </LienOutil>
          );
        })}
      </div>
    </section>
  );
}
