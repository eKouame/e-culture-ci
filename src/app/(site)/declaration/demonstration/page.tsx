import type { Metadata } from "next";
import Link from "next/link";
import { DotPill } from "@/components/ui/DotPill";
import { DeclarationForm } from "../DeclarationForm";
import { BarreCommunes } from "@/components/outils/BarreCommunes";

// Page de démonstration pour les mairies : hors sitemap et hors index, car elle
// présente une commune fictive.
export const metadata: Metadata = {
  title: "Démonstration du guichet de déclaration | e-Culture CI",
  description:
    "Essayez, avec une commune fictive, ce que voit un organisateur dont la mairie propose le guichet de déclaration. Aucune donnée n'est transmise.",
  robots: { index: false, follow: false },
};

export default function DemonstrationPage() {
  return (
    <div>
      <BarreCommunes actif="declarer" />
      <section className="no-print border-b border-border bg-surface">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <Link href="/communes">Communes</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">Démonstration</span>
          </nav>
          <p className="text-sm font-semibold text-primary-dark">
            Pour les mairies
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Essayez le guichet de déclaration
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Parcourez l&apos;outil comme un organisateur de votre commune, avec
            une commune fictive : vous voyez ce qu&apos;il propose, et ce que la
            mairie recevrait.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DotPill dot="deep">Commune fictive</DotPill>
            <DotPill dot="secondary">Aucune donnée transmise</DotPill>
            <DotPill dot="primary">Document non officiel</DotPill>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <DeclarationForm demo />
      </div>
    </div>
  );
}
