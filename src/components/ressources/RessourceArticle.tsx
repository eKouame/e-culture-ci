import Link from "next/link";
import { ReactNode } from "react";
import { LienOutil } from "@/components/outils/LienOutil";
import { outil, type OutilId } from "@/lib/outils-config";
import { ressourcePar, type SlugRessource } from "@/lib/ressources-config";
import { ReadingProgress } from "./ReadingProgress";
import { TableOfContents } from "./TableOfContents";

// Gabarit « Ressource » (cahier d'intégration) : en-tête (fil d'Ariane avec la rubrique,
// pastille « Ressource 05 », durée, niveau, date de vérification), sommaire latéral collant
// avec « Outil lié », puis le corps. Le texte et les liens de chaque ressource ne changent
// pas : seule l'interface est refaite.
export function RessourceArticle({
  slug,
  titre,
  dek,
  meta,
  verifie,
  outilLie,
  sommaire,
  avantCorps,
  children,
}: {
  slug: SlugRessource;
  titre: string;
  dek: string;
  meta: { lecture: string; niveau: string };
  // Date de vérification (« octobre 2026 »), à n'afficher que si la page en porte une.
  verifie?: string;
  // L'outil que la ressource prolonge, en carte dans le sommaire latéral.
  outilLie?: { id: Exclude<OutilId, "mes-budgets">; phrase?: string };
  sommaire: { id: string; label: string }[];
  // Bloc optionnel sous l'en-tête, avant le corps (essentiel, audio, questions).
  avantCorps?: ReactNode;
  children: ReactNode;
}) {
  const info = ressourcePar(slug);
  const o = outilLie ? outil(outilLie.id) : null;

  return (
    <div>
      <ReadingProgress />

      <div className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-6 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link href="/" className="underline underline-offset-2 hover:text-foreground">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/ressources" className="underline underline-offset-2 hover:text-foreground">
                  Ressources
                </Link>
              </li>
              {info && (
                <>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page">{info.groupe}</li>
                </>
              )}
            </ol>
          </nav>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted">
            {info && (
              <span className="rounded-full bg-secondary-light px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-dark">
                Ressource {info.numero}
              </span>
            )}
            <span>{meta.lecture} de lecture</span>
            <span aria-hidden="true">·</span>
            <span>Niveau {meta.niveau.toLowerCase()}</span>
            <span aria-hidden="true">·</span>
            <span>Gratuit</span>
            {verifie && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-secondary">Vérifié en {verifie}</span>
              </>
            )}
          </div>

          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {titre}
          </h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{dek}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="md:sticky md:top-24 md:self-start">
          <TableOfContents items={sommaire} />
          {o && (
            <LienOutil
              href={o.href ?? "/outils"}
              depuis={slug}
              outil={o.id}
              emplacement="lateral"
              className="no-print mt-6 hidden rounded-xl bg-primary-light p-4 transition-colors hover:brightness-95 md:block"
            >
              <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-dark">
                Outil lié
              </span>
              <span className="mt-1 block text-[15px] font-bold leading-snug text-foreground">
                {outilLie?.phrase ?? o.nom}&nbsp;→
              </span>
            </LienOutil>
          )}
        </aside>

        <div className="min-w-0">
          {avantCorps && <div className="mb-8 flex flex-col gap-5">{avantCorps}</div>}
          <article className="max-w-[720px] text-[1.08rem] leading-[1.72] text-foreground">{children}</article>
        </div>
      </div>
    </div>
  );
}
