import Link from "next/link";
import { ActifVisible } from "./ActifVisible";

export interface ElementBarre {
  cle: string;
  nom: string;
  href: string | null; // null = pas de lien (jamais de lien mort)
  etiquette?: string;
}

// Barre secondaire partagée (onglets Outils et Communes), sous le menu principal.
// L'élément actif est signalé par un soulignement ET par aria-current, jamais par la
// couleur seule. Un élément sans `href` n'est pas un lien. Défile à l'intérieur d'elle-même
// sur petit écran, jamais sur la page entière.
export function BarreSecondaire({
  titre,
  elements,
  actif,
}: {
  titre: string;
  elements: ElementBarre[];
  actif: string;
}) {
  return (
    <nav
      aria-label={titre}
      data-barre-secondaire=""
      className="no-print border-b border-white/10 bg-deep text-on-deep"
    >
      <ActifVisible />
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <p className="shrink-0 text-xs font-bold uppercase tracking-wide text-accent-on-deep">
          {titre}
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
