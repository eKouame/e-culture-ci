import Link from "next/link";
import { ETIQUETTE_BARRE, OUTILS, type OutilId } from "@/lib/outils-config";
import { ActifVisible } from "./ActifVisible";

export type ActifBarre = "apercu" | OutilId;

// Barre secondaire, sous le menu principal, sur toutes les pages d'outils.
// L'élément actif est signalé par un soulignement ET par aria-current, jamais par la
// couleur seule. « Bientôt » n'est pas un lien : pas de lien mort.
export function BarreOutils({ actif }: { actif: ActifBarre }) {
  const elements: {
    cle: ActifBarre;
    nom: string;
    href: string | null;
    etiquette?: string;
  }[] = [
    { cle: "apercu", nom: "Vue d'ensemble", href: "/outils" },
    ...OUTILS.map((o) => ({
      cle: o.id as ActifBarre,
      nom: o.nom,
      href: o.href,
      etiquette: ETIQUETTE_BARRE[o.etat],
    })),
  ];

  return (
    <nav aria-label="Outils" className="no-print bg-deep text-on-deep">
      <ActifVisible />
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <p className="shrink-0 text-xs font-bold uppercase tracking-wide text-accent-on-deep">
          Outils
        </p>
        <ul className="-mx-1 flex min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto px-1">
          {elements.map((e) => {
            const estActif = e.cle === actif;
            const contenu = (
              <>
                {e.nom}
                {e.etiquette && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold leading-none ${
                      e.href
                        ? "bg-accent-on-deep text-deep-strong"
                        : "border border-on-deep-muted/60 text-on-deep-muted"
                    }`}
                  >
                    {e.etiquette}
                  </span>
                )}
              </>
            );
            return (
              <li key={e.cle} className="shrink-0">
                {e.href ? (
                  <Link
                    href={e.href}
                    aria-current={estActif ? "page" : undefined}
                    className={`flex min-h-[44px] items-center gap-2 whitespace-nowrap border-b-2 px-3 text-sm font-semibold transition-colors ${
                      estActif
                        ? "border-accent-on-deep text-on-deep"
                        : "border-transparent text-on-deep-muted hover:text-on-deep"
                    }`}
                  >
                    {contenu}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex min-h-[44px] cursor-default items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-semibold text-on-deep-muted/80"
                  >
                    {contenu}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
