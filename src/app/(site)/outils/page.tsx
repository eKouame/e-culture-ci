import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { BarreOutils } from "@/components/outils/BarreOutils";
import { LienOutil } from "@/components/outils/LienOutil";
import { Pictogramme } from "@/components/outils/Pictogramme";
import {
  ETIQUETTE_CARTE,
  MENTION_OUTILS,
  OUTILS,
  type EtatOutil,
} from "@/lib/outils-config";

export const metadata: Metadata = pageMetadata({
  title: "Les outils d'e-Culture CI | e-Culture CI",
  description:
    "Les outils d'e-Culture CI : savoir si la réforme des licences de spectacle vous concerne, calculer le point d'équilibre de votre spectacle. Gratuits et indépendants.",
  path: "/outils",
});

// Même gabarit pour toutes les cartes (état, titre, phrase, action) ; seule la carte
// « Nouveau » est mise en avant ; « Bientôt » est visiblement inactive.
const STYLE_CARTE: Record<EtatOutil, string> = {
  disponible: "border-border bg-surface hover:bg-black/[0.02]",
  nouveau: "border-secondary bg-secondary-light hover:bg-secondary-light/70",
  bientot: "border-dashed border-border bg-transparent opacity-70",
};

const STYLE_ETIQUETTE: Record<EtatOutil, string> = {
  disponible: "bg-black/5 text-foreground",
  nouveau: "bg-secondary text-white",
  bientot: "border border-border text-muted",
};

export default function OutilsPage() {
  return (
    <div>
      <BarreOutils actif="apercu" />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">Outils</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Les outils d&apos;e-Culture CI
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Les ressources se lisent, les outils s&apos;utilisent : ils vous
            aident à vous orienter et à préparer vos démarches.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTILS.map((o) => {
            const contenu = (
              <>
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STYLE_ETIQUETTE[o.etat]}`}
                  >
                    {ETIQUETTE_CARTE[o.etat]}
                  </span>
                  <span className={o.etat === "bientot" ? "text-muted" : "text-secondary"}>
                    <Pictogramme outil={o.id} />
                  </span>
                </span>
                <span className="mt-1 text-lg font-bold text-foreground">
                  {o.nom}
                </span>
                <span className="text-sm text-muted">{o.phrase}</span>
                <span
                  className={`mt-1.5 text-sm font-bold ${
                    o.href ? "text-secondary-dark" : "text-muted"
                  }`}
                >
                  {o.href ? "Ouvrir l'outil →" : "Bientôt disponible"}
                </span>
              </>
            );
            const classes = `flex h-full flex-col gap-1.5 rounded-xl border p-5 transition-colors ${STYLE_CARTE[o.etat]}`;
            return (
              <li key={o.id}>
                {o.href ? (
                  <LienOutil
                    href={o.href}
                    depuis="outils"
                    outil={o.id}
                    emplacement="page-outils"
                    className={classes}
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

        <p className="mt-10 max-w-prose text-xs leading-relaxed text-muted">
          {MENTION_OUTILS}
        </p>
      </section>
    </div>
  );
}
