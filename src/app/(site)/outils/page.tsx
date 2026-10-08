import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { FilAriane } from "@/components/ui/FilAriane";
import { BadgeEtat } from "@/components/ui/BadgeEtat";
import { LienOutil } from "@/components/outils/LienOutil";
import { Pictogramme } from "@/components/outils/Pictogramme";
import { MENTION_OUTILS, OUTILS, type EtatOutil } from "@/lib/outils-config";

export const metadata: Metadata = pageMetadata({
  title: "Les outils d'e-Culture CI | e-Culture CI",
  description:
    "Les outils d'e-Culture CI : savoir si la réforme des licences de spectacle vous concerne, calculer le point d'équilibre de votre spectacle. Gratuits et indépendants.",
  path: "/outils",
});

// Même gabarit pour toutes les cartes (rubrique, pictogramme, titre, phrase, action) ;
// seule la carte « Nouveau » est mise en avant ; « Bientôt » est visiblement inactive et
// n'est jamais cliquable (pas de lien mort).
const STYLE_CARTE: Record<EtatOutil, string> = {
  disponible: "border-border bg-surface hover:border-secondary",
  nouveau: "border-2 border-hero-accent bg-surface shadow-[0_18px_30px_-20px_rgba(176,78,12,0.45)]",
  bientot: "border-dashed border-border-strong bg-transparent",
};

const STYLE_TUILE: Record<EtatOutil, string> = {
  disponible: "bg-secondary-light text-secondary",
  nouveau: "bg-primary-light text-primary-dark",
  bientot: "bg-surface-2 text-muted",
};

export default function OutilsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-5 sm:px-6">
      <FilAriane maillons={[{ label: "Accueil", href: "/" }, { label: "Outils" }]} />
      <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
        Les outils d&apos;e-Culture CI
      </h1>
      <p className="mt-3 max-w-[620px] text-lg leading-relaxed text-muted">
        Les ressources se lisent, les outils s&apos;utilisent : ils vous aident à vous orienter et à préparer vos
        démarches.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {OUTILS.map((o) => {
          const classes = `flex h-full flex-col gap-3 rounded-2xl p-6 transition-colors ${STYLE_CARTE[o.etat]}`;
          const contenu = (
            <>
              <span className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{o.rubrique}</span>
                {o.etat !== "disponible" && <BadgeEtat etat={o.etat} />}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${STYLE_TUILE[o.etat]}`}
              >
                <Pictogramme outil={o.id} />
              </span>
              <span className={`text-2xl font-extrabold leading-tight tracking-tight ${o.etat === "bientot" ? "text-muted" : "text-foreground"}`}>
                {o.nom}
              </span>
              <span className="flex-1 text-base leading-relaxed text-muted">{o.description}</span>
              {o.href ? (
                <span
                  className={`mt-1 inline-flex min-h-[44px] items-center self-start rounded-lg px-4 text-sm font-bold ${
                    o.etat === "nouveau"
                      ? "bg-hero-accent text-white"
                      : "border-[1.5px] border-foreground text-foreground"
                  }`}
                >
                  Ouvrir l&apos;outil&nbsp;→
                </span>
              ) : (
                <span className="mt-1 text-sm font-bold text-muted">Bientôt disponible</span>
              )}
            </>
          );
          return (
            <li key={o.id}>
              {o.href ? (
                <LienOutil
                  href={o.href}
                  depuis="outils"
                  outil={o.id}
                  emplacement="page-outils"
                  className={`${classes} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                >
                  {contenu}
                </LienOutil>
              ) : (
                <div aria-disabled="true" className={classes}>
                  {contenu}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-2xl bg-surface-2 px-6 py-4">
        <p className="text-base text-foreground">
          Les résultats des outils sont <strong className="font-extrabold">indicatifs</strong>. Pour comprendre ce
          qu&apos;ils calculent, lisez la ressource liée.
        </p>
        <Link
          href="/ressources/budget"
          className="inline-flex min-h-[44px] items-center text-base font-bold text-foreground underline underline-offset-2 hover:text-hero-accent"
        >
          Bâtir votre budget&nbsp;→
        </Link>
      </div>

      <p className="mt-6 max-w-prose text-xs leading-relaxed text-muted">{MENTION_OUTILS}</p>
    </div>
  );
}
