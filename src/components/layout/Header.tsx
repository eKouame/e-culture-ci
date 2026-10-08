"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ESPACE_COMMUNAL, RUBRIQUES } from "@/lib/navigation-config";
import { IconeInstitution } from "@/components/ui/IconeInstitution";
import { MenuMobile, PanneauOutils, PanneauRessources } from "./MegaMenu";

// En-tête : trois entrées (cahier de navigation). Ressources (méga-menu) et Outils (panneau)
// sont des boutons ; « Espace communal » est un bouton-lien séparé par un trait. Le logo
// ramène à l'accueil. Aucun lien d'administration dans la navigation publique.
//
// Ordinateur (960 px et plus) : le panneau s'ouvre au clic et au survol (intention ~90 ms),
// se ferme en quittant l'en-tête (~180 ms), avec Échap (le focus revient au bouton), en
// cliquant le fond assombri, ou quand le focus sort de l'en-tête. Un seul panneau à la fois.
// Mobile et tablette étroite : menu plein écran avec accordéons.

type Panneau = "ressources" | "outils";

const DELAI_OUVERTURE = 90;
const DELAI_FERMETURE = 180;

function Chevron({ ouvert }: { ouvert: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform ${ouvert ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  // L'état d'ouverture est lié au chemin où il a été ouvert : dès qu'on navigue, tout est
  // refermé, sans effet de bord.
  const [etat, setEtat] = useState<{ panneau: Panneau | null; mobile: boolean; chemin: string | null }>({
    panneau: null,
    mobile: false,
    chemin: null,
  });
  const valide = etat.chemin === pathname;
  const ouvert = valide ? etat.panneau : null;
  const menuMobile = valide ? etat.mobile : false;
  const setOuvert = useCallback(
    (panneau: Panneau | null) => setEtat((c) => ({ panneau, mobile: false, chemin: panneau ? pathname : c.chemin })),
    [pathname],
  );
  const setMenuMobile = useCallback(
    (mobile: boolean) => setEtat({ panneau: null, mobile, chemin: pathname }),
    [pathname],
  );
  const refEntete = useRef<HTMLElement>(null);
  const boutons = useRef<Record<Panneau, HTMLButtonElement | null>>({ ressources: null, outils: null });
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ouvertParSurvol = useRef(0);

  const rubriqueActive = (chemins: string[]) =>
    chemins.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  const annuler = useCallback(() => {
    if (minuterie.current) clearTimeout(minuterie.current);
    minuterie.current = null;
  }, []);

  const fermer = useCallback(() => {
    annuler();
    setOuvert(null);
  }, [annuler, setOuvert]);

  const fermerTout = useCallback(() => {
    annuler();
    setEtat({ panneau: null, mobile: false, chemin: null });
  }, [annuler]);

  useEffect(() => () => annuler(), [annuler]);

  // Menu plein écran : défilement de la page bloqué, Échap pour fermer, et fermeture si
  // l'écran devient assez large pour le menu de bureau.
  useEffect(() => {
    if (!menuMobile) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuMobile(false);
    };
    const large = window.matchMedia("(min-width: 960px)");
    const onLarge = () => {
      if (large.matches) setMenuMobile(false);
    };
    window.addEventListener("keydown", onKey);
    large.addEventListener("change", onLarge);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      large.removeEventListener("change", onLarge);
    };
  }, [menuMobile, setMenuMobile]);

  function surveillerOuverture(p: Panneau) {
    annuler();
    if (ouvert === p) return;
    minuterie.current = setTimeout(() => {
      ouvertParSurvol.current = performance.now();
      setOuvert(p);
    }, DELAI_OUVERTURE);
  }

  function surveillerFermeture() {
    annuler();
    if (!ouvert) return;
    minuterie.current = setTimeout(() => setOuvert(null), DELAI_FERMETURE);
  }

  function auClic(p: Panneau, e: React.MouseEvent) {
    annuler();
    // Un clic juste après une ouverture au survol ne referme pas le panneau.
    if (ouvert === p && e.timeStamp - ouvertParSurvol.current > 500) setOuvert(null);
    else setOuvert(p);
  }

  function auClavier(e: React.KeyboardEvent) {
    if (e.key === "Escape" && ouvert) {
      const p = ouvert;
      fermer();
      boutons.current[p]?.focus();
    }
  }

  function quandFocusSort(e: React.FocusEvent) {
    if (!ouvert) return;
    const cible = e.relatedTarget as Node | null;
    if (cible && refEntete.current?.contains(cible)) return;
    fermer();
  }

  const communalActif = rubriqueActive(RUBRIQUES.communal);

  function declencheur(id: Panneau, label: string, chemins: string[]) {
    const actif = rubriqueActive(chemins);
    return (
      <button
        type="button"
        ref={(el) => {
          boutons.current[id] = el;
        }}
        aria-expanded={ouvert === id}
        aria-controls={`panneau-${id}`}
        onClick={(e) => auClic(id, e)}
        onMouseEnter={() => surveillerOuverture(id)}
        className={`relative inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 text-[15px] font-semibold transition-colors ${
          ouvert === id ? "bg-surface-2 text-foreground" : "text-foreground hover:bg-surface-2"
        } ${actif ? "after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-hero-accent" : ""}`}
      >
        {label}
        <Chevron ouvert={ouvert === id} />
      </button>
    );
  }

  return (
    <>
      <header
        ref={refEntete}
        onMouseLeave={surveillerFermeture}
        onMouseEnter={annuler}
        onKeyDown={auClavier}
        onBlur={quandFocusSort}
        className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-4 sm:px-6 min-[960px]:h-[76px]">
          <Link href="/" className="flex items-center gap-2" onClick={fermerTout}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-wordmark-dark.svg"
              alt="e-Culture CI"
              className="h-9 w-auto min-[960px]:h-12"
              width={346}
              height={120}
            />
          </Link>

          {/* Ordinateur */}
          <nav aria-label="Menu principal" className="hidden items-center gap-1.5 min-[960px]:flex">
            {declencheur("ressources", "Ressources", RUBRIQUES.ressources)}
            {declencheur("outils", "Outils", RUBRIQUES.outils)}
            <span aria-hidden="true" className="mx-2 h-6 w-px bg-border" />
            <Link
              href={ESPACE_COMMUNAL.href}
              aria-current={communalActif ? "true" : undefined}
              onMouseEnter={fermer}
              className={`inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border-[1.5px] px-3.5 text-[15px] font-bold transition-colors hover:border-hero-accent hover:text-hero-accent ${
                communalActif
                  ? "border-secondary bg-secondary text-white hover:border-secondary-dark hover:bg-secondary-dark hover:text-white"
                  : "border-secondary text-foreground"
              }`}
            >
              <IconeInstitution taille={18} />
              {ESPACE_COMMUNAL.label}
            </Link>
          </nav>

          {/* Mobile : l'espace communal reste à portée, le reste est dans le menu. */}
          <div className="flex items-center gap-1 min-[960px]:hidden">
            {!menuMobile && (
              <Link
                href={ESPACE_COMMUNAL.href}
                aria-current={communalActif ? "true" : undefined}
                className="inline-flex min-h-[44px] items-center text-[13px] font-bold text-foreground"
              >
                <span
                  className={`inline-flex h-[34px] items-center gap-1.5 rounded-lg border-[1.5px] px-2.5 ${
                    communalActif ? "border-secondary bg-secondary text-white" : "border-secondary"
                  }`}
                >
                  <IconeInstitution taille={16} />
                  {ESPACE_COMMUNAL.label}
                </span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMenuMobile(!menuMobile)}
              className="flex h-11 w-11 items-center justify-center text-foreground"
              aria-label={menuMobile ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuMobile}
              aria-controls="menu-mobile"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuMobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {ouvert === "ressources" && <PanneauRessources id="panneau-ressources" onNavigate={fermer} />}
        {ouvert === "outils" && <PanneauOutils id="panneau-outils" onNavigate={fermer} />}
      </header>

      {/* Fond assombri derrière un panneau (ordinateur). Cliquer dessus referme. */}
      {ouvert && (
        <div
          aria-hidden="true"
          onClick={fermer}
          className="fixed inset-x-0 bottom-0 top-[76px] z-30 hidden bg-foreground/30 min-[960px]:block"
        />
      )}

      {/* Menu mobile plein écran. Hors de l'en-tête : le flou de l'en-tête casserait le
          positionnement fixe. */}
      {menuMobile && (
        <div
          id="menu-mobile"
          className="no-print fixed inset-x-0 bottom-0 top-[60px] z-30 flex flex-col overflow-y-auto bg-background min-[960px]:hidden"
        >
          <MenuMobile onNavigate={fermerTout} />
        </div>
      )}
    </>
  );
}
