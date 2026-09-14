import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { RESSOURCES, ETIQUETTES } from "@/lib/ressources-registre";

export const metadata: Metadata = pageMetadata({
  title: "Toutes les ressources — e-Culture CI",
  description:
    "L'index complet des ressources d'e-Culture CI : comprendre le secteur, monter votre projet, vos droits, la fiscalité et la réglementation.",
  path: "/ressources/toutes",
});

export default function ToutesLesRessourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/">Accueil</Link>
        <span>›</span>
        <Link href="/ressources">Ressources</Link>
        <span>›</span>
        <span className="font-semibold text-foreground">
          Toutes les ressources
        </span>
      </nav>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Toutes les ressources
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        L&apos;index complet, pour tout retrouver au même endroit. Vous
        débutez ?{" "}
        <Link href="/ressources" className="font-medium text-primary-dark underline">
          Le parcours guidé
        </Link>{" "}
        reste le meilleur point de départ.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {RESSOURCES.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <div className="flex flex-wrap gap-1.5">
              {r.etiquettes.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark"
                >
                  {ETIQUETTES[e]}
                </span>
              ))}
            </div>
            <p className="text-lg font-bold text-foreground">{r.titre}</p>
            <p className="text-sm text-muted">{r.description}</p>
            <span className="mt-1 text-sm font-bold text-secondary">Lire →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
