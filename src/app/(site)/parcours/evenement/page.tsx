import type { Metadata } from "next";
import Link from "next/link";
import { Parcours } from "@/components/parcours/Parcours";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Je prépare un événement : ma feuille de route | e-Culture CI",
  description:
    "Quatre questions pour obtenir votre feuille de route : démarches, interlocuteurs et outils pour un événement de spectacle en Côte d'Ivoire. Rien n'est enregistré.",
  path: "/parcours/evenement",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
        <Link href="/">Accueil</Link>
        <span>›</span>
        <span className="font-semibold text-foreground">Je prépare un événement</span>
      </nav>
      <p className="text-sm font-semibold text-primary-dark">Je suis lancé</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Je prépare un événement
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Quatre questions, deux minutes. Vous repartez avec vos étapes dans l&apos;ordre, la bonne personne à contacter et l&apos;outil qui va avec. Rien n&apos;est enregistré.
      </p>
      <div className="mt-6">
        <Parcours parcours="evenement" />
      </div>
    </div>
  );
}
