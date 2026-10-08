import Link from "next/link";
import { IconeInstitution } from "@/components/ui/IconeInstitution";

// Bandeau « Espace communal » de l'accueil : l'entrée des mairies et autorités locales.
export function BandeauCommunal() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 md:pb-16">
      <div className="flex flex-col gap-6 rounded-[20px] bg-deep p-6 text-on-deep sm:p-8 md:flex-row md:items-center md:gap-8 md:p-10">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-accent-on-deep md:h-[88px] md:w-[88px]"
        >
          <IconeInstitution taille={36} />
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-on-deep-muted">
            Espace communal · Autorités locales
          </p>
          <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight md:text-3xl">Vous représentez une commune&nbsp;?</h2>
          <p className="mt-2 max-w-prose text-on-deep-muted">
            Ce qui se passe côté mairie quand un événement est organisé sur votre territoire&nbsp;: rôle,
            démarches, interlocuteurs.
          </p>
        </div>
        <Link
          href="/communes"
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-lg bg-background px-5 text-base font-bold text-foreground transition-colors hover:bg-white"
        >
          Accéder à l&apos;espace&nbsp;→
        </Link>
      </div>
    </section>
  );
}
