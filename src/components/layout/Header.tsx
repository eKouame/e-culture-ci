"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Menu principal : trois entrées, dans cet ordre. Aucun lien d'administration dans la
// navigation publique (l'administration s'ouvre par son adresse, derrière une connexion). Le libellé vit ici, pas dans les
// routes. `actifs` : les chemins qui relèvent de l'onglet (« Suis-je concerné ? » vit
// sous Outils, « Ma déclaration » sous Communes ; leurs routes ne changent pas).
const NAV_ITEMS = [
  { href: "/ressources", label: "Ressources", actifs: ["/ressources"] },
  { href: "/outils", label: "Outils", actifs: ["/outils", "/suis-je-concerne"] },
  { href: "/communes", label: "Communes", actifs: ["/communes", "/declaration"] },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const estActif = (actifs: string[]) =>
    actifs.some((p) => pathname === p || pathname?.startsWith(`${p}/`));

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-wordmark-dark.svg"
            alt="e-Culture CI"
            className="h-12 w-auto"
            width={346}
            height={120}
          />
        </Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={estActif(item.actifs) ? "true" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 ${
                estActif(item.actifs) ? "text-primary-dark" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Menu principal"
          className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={estActif(item.actifs) ? "true" : undefined}
              className={`min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-medium ${
                estActif(item.actifs)
                  ? "bg-primary-light text-primary-dark"
                  : "text-foreground hover:bg-black/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
