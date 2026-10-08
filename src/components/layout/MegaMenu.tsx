"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { BadgeEtat } from "@/components/ui/BadgeEtat";
import { LienMesure } from "@/components/parcours/LienMesure";
import {
  COLONNES_OUTILS,
  COLONNES_RESSOURCES,
  ESPACE_COMMUNAL,
  OUTIL_POPULAIRE,
  TOUS_LES_OUTILS,
  colonneAffichable,
  estActif,
  type ColonneNav,
  type ElementNav,
} from "@/lib/navigation-config";

// Panneaux du méga-menu (ordinateur, 960 px et plus) et contenu du menu mobile. Les deux
// lisent `navigation-config` : mêmes libellés et mêmes liens partout.

const SERVICE_INDEPENDANT =
  "Service d'information indépendant, sans lien officiel avec le ministère de la Culture.";

function IconeInstitution({ taille }: { taille: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3L3 8h18z" />
      <path d="M6 11v7M10 11v7M14 11v7M18 11v7" />
      <path d="M3 21h18" />
    </svg>
  );
}
export { IconeInstitution };

function LienElement({
  e,
  onNavigate,
  className,
  children,
}: {
  e: ElementNav;
  onNavigate: () => void;
  className: string;
  children: React.ReactNode;
}) {
  if (!e.href) return <span className={className}>{children}</span>;
  return (
    <Link
      href={e.href}
      onClick={onNavigate}
      {...(e.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
}

// ---------------------------------------------------------------- ordinateur

function Colonne({ c, onNavigate }: { c: ColonneNav; onNavigate: () => void }) {
  return (
    <div className="flex min-h-[320px] flex-col px-6 first:pl-0 last:pr-0">
      <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{c.titre}</h2>
      <ul className="mt-5 flex flex-1 flex-col gap-4">
        {c.elements.map((e) => {
          const actif = estActif(e);
          if (c.cartes) {
            return (
              <li key={e.label}>
                <LienElement
                  e={e}
                  onNavigate={onNavigate}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-background p-4 transition-colors hover:border-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {e.etat && <BadgeEtat etat={e.etat} className="self-start" />}
                  <span className="text-[15px] font-bold leading-snug text-foreground">{e.label}</span>
                  {e.description && <span className="text-[13px] leading-snug text-muted">{e.description}</span>}
                  {actif && <span className="text-[13px] font-bold text-primary-dark">Découvrir →</span>}
                </LienElement>
              </li>
            );
          }
          return (
            <li key={e.label}>
              <LienElement
                e={e}
                onNavigate={onNavigate}
                className={`flex min-h-[44px] flex-col justify-center gap-0.5 rounded-md ${
                  actif ? "text-foreground hover:text-primary-dark" : "text-muted"
                }`}
              >
                <span className="text-[15px] font-bold leading-snug">
                  {e.label}
                  {e.externe && <span aria-hidden="true"> ↗</span>}
                  {e.externe && <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>}
                </span>
                {e.description && <span className="text-[13px] font-normal leading-snug text-muted">{e.description}</span>}
                {!actif && e.etat === "bientot" && <BadgeEtat etat="bientot" className="mt-1 self-start" />}
              </LienElement>
            </li>
          );
        })}
      </ul>
      {c.tous?.href && (
        <Link
          href={c.tous.href}
          onClick={onNavigate}
          className="mt-4 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark hover:underline"
        >
          {c.tous.label}
        </Link>
      )}
    </div>
  );
}

export function PanneauRessources({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const colonnes = COLONNES_RESSOURCES.filter(colonneAffichable);
  return (
    <div id={id} className="absolute inset-x-0 top-full border-b border-border bg-surface shadow-[0_24px_40px_-24px_rgba(11,42,32,0.35)]">
      <div
        className="mx-auto grid max-w-5xl divide-x divide-border px-4 py-7 sm:px-6"
        style={{ gridTemplateColumns: `repeat(${colonnes.length}, minmax(0, 1fr))` }}
      >
        {colonnes.map((c) => (
          <Colonne key={c.id} c={c} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

export function PanneauOutils({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const populaire = OUTIL_POPULAIRE;
  return (
    <div id={id} className="absolute inset-x-0 top-full border-b border-border bg-surface shadow-[0_24px_40px_-24px_rgba(11,42,32,0.35)]">
      <div
        className="mx-auto grid max-w-5xl divide-x divide-border px-4 py-7 sm:px-6"
        style={{ gridTemplateColumns: `repeat(${COLONNES_OUTILS.length + 1}, minmax(0, 1fr))` }}
      >
        {COLONNES_OUTILS.map((c) => (
          <div key={c.id} className="flex min-h-[200px] flex-col px-6 first:pl-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{c.titre}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {c.elements.map((e) => (
                <li key={e.label}>
                  <LienElement
                    e={e}
                    onNavigate={onNavigate}
                    className={`flex min-h-[44px] flex-col justify-center gap-1 ${
                      estActif(e) ? "text-foreground hover:text-primary-dark" : "text-muted"
                    }`}
                  >
                    <span className="flex flex-wrap items-center gap-2 text-[15px] font-bold leading-snug">
                      {e.label}
                      {e.etat === "nouveau" && <BadgeEtat etat="nouveau" />}
                    </span>
                    {e.description && <span className="text-[13px] font-normal leading-snug text-muted">{e.description}</span>}
                    {e.etat === "bientot" && <BadgeEtat etat="bientot" className="self-start" />}
                  </LienElement>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col px-6 last:pr-0">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Populaire</h2>
          <Link
            href={populaire.href!}
            onClick={onNavigate}
            className="mt-5 flex flex-col gap-1.5 rounded-xl border border-border bg-background p-4 transition-colors hover:border-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {populaire.etat && <BadgeEtat etat={populaire.etat} className="self-start" />}
            <span className="text-[15px] font-bold leading-snug text-foreground">{populaire.label}</span>
            <span className="text-[13px] leading-snug text-muted">{populaire.description}</span>
            <span className="text-[13px] font-bold text-primary-dark">Essayer →</span>
          </Link>
          <Link
            href={TOUS_LES_OUTILS.href}
            onClick={onNavigate}
            className="mt-3 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark hover:underline"
          >
            {TOUS_LES_OUTILS.label} →
          </Link>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------- mobile

function Volet({
  id,
  titre,
  ouvert,
  onBasculer,
  children,
}: {
  id: string;
  titre: string;
  ouvert: boolean;
  onBasculer: () => void;
  children: React.ReactNode;
}) {
  const panneau = useId();
  return (
    <div className="border-b border-border">
      <h2>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls={`${panneau}-${id}`}
          onClick={onBasculer}
          className="flex min-h-[64px] w-full items-center justify-between text-left text-2xl font-bold tracking-tight text-foreground"
        >
          {titre}
          <span aria-hidden="true" className="text-2xl font-medium text-hero-accent">
            {ouvert ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div id={`${panneau}-${id}`} hidden={!ouvert} className="pb-5">
        {children}
      </div>
    </div>
  );
}

function SousTitre({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-[0.12em] text-secondary first:mt-0">{children}</p>;
}

function LigneMobile({ e, onNavigate }: { e: ElementNav; onNavigate: () => void }) {
  const actif = estActif(e);
  return (
    <LienElement
      e={e}
      onNavigate={onNavigate}
      className={`flex min-h-[44px] items-center justify-between gap-3 text-base font-semibold ${
        actif ? "text-foreground" : "text-muted"
      }`}
    >
      <span>
        {e.label}
        {e.externe && <span aria-hidden="true"> ↗</span>}
        {e.externe && <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>}
      </span>
      {e.etat === "nouveau" && <BadgeEtat etat="nouveau" />}
      {e.etat === "bientot" && <BadgeEtat etat="bientot" />}
    </LienElement>
  );
}

export function MenuMobile({ onNavigate }: { onNavigate: () => void }) {
  const [volet, setVolet] = useState<"ressources" | "outils" | null>(null);
  const bascule = (v: "ressources" | "outils") => setVolet((c) => (c === v ? null : v));

  const ressources = COLONNES_RESSOURCES.filter(colonneAffichable);
  const une = ressources.find((c) => c.id === "une");
  const autres = ressources.filter((c) => c.id !== "une");

  return (
    <>
      <nav aria-label="Menu principal" className="flex flex-col px-4 py-2 sm:px-6">
        <Volet id="ressources" titre="Ressources" ouvert={volet === "ressources"} onBasculer={() => bascule("ressources")}>
          {une && (
            <>
              <SousTitre>{une.titre}</SousTitre>
              {une.elements.map((e) => (
                <LigneMobile key={e.label} e={e} onNavigate={onNavigate} />
              ))}
              {une.tous?.href && (
                <Link href={une.tous.href} onClick={onNavigate} className="inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark">
                  {une.tous.label}
                </Link>
              )}
            </>
          )}
          {autres.map((c) => (
            <div key={c.id}>
              <SousTitre>{c.titre}</SousTitre>
              {c.elements.map((e) => (
                <LigneMobile key={e.label} e={e} onNavigate={onNavigate} />
              ))}
              {c.tous?.href && (
                <Link href={c.tous.href} onClick={onNavigate} className="inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark">
                  {c.tous.label}
                </Link>
              )}
            </div>
          ))}
        </Volet>

        <Volet id="outils" titre="Outils" ouvert={volet === "outils"} onBasculer={() => bascule("outils")}>
          <SousTitre>Populaire</SousTitre>
          <Link
            href={OUTIL_POPULAIRE.href!}
            onClick={onNavigate}
            className="flex min-h-[44px] items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 text-base font-bold text-foreground"
          >
            {OUTIL_POPULAIRE.label}
            <BadgeEtat etat="nouveau" />
          </Link>
          <SousTitre>{TOUS_LES_OUTILS.label}</SousTitre>
          {COLONNES_OUTILS.flatMap((c) => c.elements).map((e) => (
            <LigneMobile key={e.label} e={e} onNavigate={onNavigate} />
          ))}
        </Volet>

        <Link
          href={ESPACE_COMMUNAL.href}
          onClick={onNavigate}
          className="mt-5 flex min-h-[72px] items-center gap-3.5 rounded-xl border-[1.5px] border-foreground px-4 text-foreground"
        >
          <IconeInstitution taille={26} />
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-xl font-bold tracking-tight">{ESPACE_COMMUNAL.label}</span>
            <span className="text-[13px] text-muted">{ESPACE_COMMUNAL.sousTitre}</span>
          </span>
          <span aria-hidden="true" className="text-lg">
            →
          </span>
        </Link>
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-2.5 p-4 sm:px-6">
        <p className="pb-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary">Où en êtes-vous ?</p>
        <LienMesure
          href="/parcours/idee"
          evenement="porte_cliquee"
          donnees={{ porte: "idee", depuis: "menu" }}
          onClick={onNavigate}
          className="flex min-h-[52px] items-center justify-between rounded-[10px] border border-border bg-surface px-4 text-base font-bold text-foreground"
        >
          J&apos;ai une idée de spectacle
          <span aria-hidden="true" className="text-hero-accent">
            →
          </span>
        </LienMesure>
        <LienMesure
          href="/parcours/evenement"
          evenement="porte_cliquee"
          donnees={{ porte: "evenement", depuis: "menu" }}
          onClick={onNavigate}
          className="flex min-h-[52px] items-center justify-between rounded-[10px] bg-hero-accent px-4 text-base font-bold text-white"
        >
          Je prépare un événement
          <span aria-hidden="true">→</span>
        </LienMesure>
      </div>

      <p className="border-t border-border px-4 pb-5 pt-3.5 text-xs leading-snug text-muted sm:px-6">{SERVICE_INDEPENDANT}</p>
    </>
  );
}
