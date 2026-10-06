"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LienMesure } from "@/components/parcours/LienMesure";

// Menu principal : Ressources, Outils, et l'« Espace communal » mis en avant par un
// bouton. Le libellé vit ici, pas dans les routes. `actifs` : les chemins qui relèvent de
// l'entrée (« Suis-je concerné ? » vit sous Outils, « Ma déclaration » sous l'espace
// communal ; leurs routes ne changent pas). Aucun lien d'administration dans la
// navigation publique (l'administration s'ouvre par son adresse, derrière une connexion).
const NAV_ITEMS = [
  { href: "/ressources", label: "Ressources", actifs: ["/ressources"] },
  { href: "/outils", label: "Outils", actifs: ["/outils", "/suis-je-concerne"] },
];
const ESPACE_COMMUNAL = {
  href: "/communes",
  label: "Espace communal",
  sousTitre: "Pour les autorités locales",
  actifs: ["/communes", "/declaration"],
};

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

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const estActif = (actifs: string[]) =>
    actifs.some((p) => pathname === p || pathname?.startsWith(`${p}/`));
  const communalActif = estActif(ESPACE_COMMUNAL.actifs);

  // Menu plein écran : défilement de la page bloqué, Échap pour fermer, et fermeture si
  // l'écran devient assez large pour le menu de bureau.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const large = window.matchMedia("(min-width: 768px)");
    const onLarge = () => {
      if (large.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    large.addEventListener("change", onLarge);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      large.removeEventListener("change", onLarge);
    };
  }, [open]);

  const fermer = () => setOpen(false);

  return (
    <>
      <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1264px] items-center justify-between px-5 md:h-[76px] md:px-8">
          <Link href="/" className="flex items-center gap-2" onClick={fermer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-wordmark-dark.svg"
              alt="e-Culture CI"
              className="h-9 w-auto md:h-12"
              width={346}
              height={120}
            />
          </Link>

          {/* Ordinateur */}
          <nav aria-label="Menu principal" className="hidden items-center gap-9 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={estActif(item.actifs) ? "true" : undefined}
                className={`whitespace-nowrap text-[15px] font-medium transition-colors hover:text-hero-accent ${
                  estActif(item.actifs) ? "text-hero-accent" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <span aria-hidden="true" className="-mx-3 h-6 w-px bg-border" />
            <Link
              href={ESPACE_COMMUNAL.href}
              aria-current={communalActif ? "true" : undefined}
              className={`inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-lg border-[1.5px] px-3.5 text-[15px] font-bold transition-colors hover:border-hero-accent hover:text-hero-accent ${
                communalActif
                  ? "border-hero-accent text-hero-accent"
                  : "border-foreground text-foreground"
              }`}
            >
              <IconeInstitution taille={18} />
              {ESPACE_COMMUNAL.label}
            </Link>
          </nav>

          {/* Mobile : l'espace communal reste à portée, le reste est dans le menu. */}
          <div className="flex items-center gap-1 md:hidden">
            {!open && (
              <Link
                href={ESPACE_COMMUNAL.href}
                aria-current={communalActif ? "true" : undefined}
                className="inline-flex min-h-[44px] items-center text-[13px] font-bold text-foreground"
              >
                <span
                  className={`inline-flex h-[34px] items-center gap-1.5 rounded-lg border-[1.5px] px-2.5 ${
                    communalActif ? "border-hero-accent text-hero-accent" : "border-foreground"
                  }`}
                >
                  <IconeInstitution taille={16} />
                  {ESPACE_COMMUNAL.label}
                </span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center text-foreground"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
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
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran. Hors de l'en-tête : le flou de l'en-tête casserait le
          positionnement fixe. */}
      {open && (
        <div
          id="menu-mobile"
          className="no-print fixed inset-x-0 bottom-0 top-[60px] z-30 flex flex-col overflow-y-auto bg-background md:hidden"
        >
          <nav aria-label="Menu principal" className="flex flex-col px-5 py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={fermer}
                aria-current={estActif(item.actifs) ? "true" : undefined}
                className={`flex min-h-[64px] items-center justify-between border-b border-border text-2xl font-bold tracking-tight ${
                  estActif(item.actifs) ? "text-hero-accent" : "text-foreground"
                }`}
              >
                {item.label}
                <span aria-hidden="true" className="text-lg text-muted">
                  →
                </span>
              </Link>
            ))}
            <Link
              href={ESPACE_COMMUNAL.href}
              onClick={fermer}
              aria-current={communalActif ? "true" : undefined}
              className={`mt-5 flex min-h-[72px] items-center gap-3.5 rounded-xl border-[1.5px] px-4 ${
                communalActif ? "border-hero-accent text-hero-accent" : "border-foreground text-foreground"
              }`}
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

          <div className="flex flex-col gap-2.5 p-5">
            <p className="pb-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
              Où en êtes-vous ?
            </p>
            <LienMesure
              href="/parcours/idee"
              evenement="porte_cliquee"
              donnees={{ porte: "idee", depuis: "menu" }}
              onClick={fermer}
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
              onClick={fermer}
              className="flex min-h-[52px] items-center justify-between rounded-[10px] bg-hero-accent px-4 text-base font-bold text-white"
            >
              Je prépare un événement
              <span aria-hidden="true">→</span>
            </LienMesure>
          </div>

          <p className="border-t border-border px-5 pb-5 pt-3.5 text-xs leading-snug text-muted">
            {SERVICE_INDEPENDANT}
          </p>
        </div>
      )}
    </>
  );
}
