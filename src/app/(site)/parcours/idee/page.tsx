import type { Metadata } from "next";
import Link from "next/link";
import { Parcours } from "@/components/parcours/Parcours";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "J'ai une idée de spectacle : par où commencer | e-Culture CI",
  description:
    "Trois questions pour savoir par où commencer un projet de spectacle en Côte d'Ivoire et ce qui vous attend. Rien n'est enregistré.",
  path: "/parcours/idee",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
        <Link href="/">Accueil</Link>
        <span>›</span>
        <span className="font-semibold text-foreground">J&apos;ai une idée</span>
      </nav>
      <p className="text-sm font-semibold text-primary-dark">Je démarre</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        J&apos;ai une idée de spectacle
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Trois questions, une minute. Vous repartez avec trois choses à fixer d&apos;abord et ce qui vous attend. Rien n&apos;est enregistré.
      </p>
      <div className="mt-6">
        <Parcours parcours="idee" />
      </div>
    </div>
  );
}
