import Link from "next/link";
import { ReactNode } from "react";

// Cartes de la colonne latérale des pages « liste » : une carte claire (titre, phrase,
// lien) et une carte foncée (point d'appel). Cibles de 44 px.
export function CarteLaterale({
  icone,
  titre,
  texte,
  lien,
}: {
  icone?: ReactNode;
  titre: string;
  texte: string;
  lien: { href: string; label: string };
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      {icone && <span className="text-secondary">{icone}</span>}
      <h2 className="mt-2 text-lg font-bold leading-snug text-foreground">{titre}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{texte}</p>
      <Link
        href={lien.href}
        className="mt-1 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark hover:underline"
      >
        {lien.label}
      </Link>
    </div>
  );
}

export function CarteSombre({
  surtitre,
  titre,
  texte,
  href,
}: {
  surtitre: string;
  titre: string;
  texte: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl bg-deep p-5 text-on-deep transition-colors hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-accent-on-deep">{surtitre}</span>
      <span className="mt-1.5 block text-lg font-bold leading-snug">{titre}&nbsp;→</span>
      <span className="mt-1.5 block text-sm leading-relaxed text-on-deep-muted">{texte}</span>
    </Link>
  );
}

export const IconeQuestion = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1 1-1.1 1.8M12 16.8h.01" />
  </svg>
);

export const IconePersonnes = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19c.5-3 2.6-4.6 5.5-4.6s5 1.6 5.5 4.6" />
    <circle cx="17" cy="9" r="2.2" />
    <path d="M16.5 14.3c2.4.1 3.7 1.4 4 3.7" />
  </svg>
);
