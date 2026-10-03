import type { Metadata } from "next";
import Link from "next/link";
import { DotPill } from "@/components/ui/DotPill";
import { DeclarationForm } from "./DeclarationForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Préparer ma déclaration | e-Culture CI",
  description:
    "Renseignez les informations de votre événement en 3 minutes et obtenez un récapitulatif clair à conserver pour votre déclaration officielle.",
  path: "/declaration",
});

export default function DeclarationPage() {
  return (
    <div>
      <section className="no-print border-b border-border bg-surface">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">
              Ma déclaration
            </span>
          </nav>
          <p className="text-sm font-semibold text-primary-dark">
            Préparer votre démarche
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Ma déclaration
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Trois étapes pour préparer un récapitulatif de votre événement, à
            conserver et à présenter lors de vos échanges avec la mairie ou
            la préfecture.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DotPill dot="secondary">Rien n&apos;est enregistré</DotPill>
            <DotPill dot="primary">Gratuit, sans compte</DotPill>
            <DotPill dot="deep">Document non officiel</DotPill>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <DeclarationForm />
      </div>
    </div>
  );
}
