import type { Metadata } from "next";
import Link from "next/link";
import { EnteteListe } from "@/components/liste/EnteteListe";
import { IndexRessources } from "@/components/liste/IndexRessources";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Toutes les ressources — e-Culture CI",
  description:
    "L'index complet des ressources d'e-Culture CI : comprendre le secteur, monter votre projet, vos droits, la fiscalité et la réglementation.",
  path: "/ressources/toutes",
});

export default function ToutesLesRessourcesPage() {
  return (
    <div>
      <EnteteListe
        maillons={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Toutes les ressources" },
        ]}
        titre="Toutes les ressources"
        intro="L'index complet, pour tout retrouver au même endroit."
        encart={
          <Link
            href="/ressources"
            className="block rounded-xl bg-secondary-light px-5 py-4 text-secondary-dark transition-colors hover:brightness-95"
          >
            <span className="block text-sm">Vous débutez&nbsp;?</span>
            <span className="mt-0.5 block font-bold leading-snug">
              Le parcours guidé reste le meilleur point de départ&nbsp;→
            </span>
          </Link>
        }
      />
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-2 sm:px-6">
        <IndexRessources />
      </div>
    </div>
  );
}
