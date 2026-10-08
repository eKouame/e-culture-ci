import type { Metadata } from "next";
import { EnteteListe } from "@/components/liste/EnteteListe";
import { FaqListe } from "@/components/liste/FaqListe";
import { CarteLaterale, CarteSombre } from "@/components/liste/CartesLaterales";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "FAQ | e-Culture CI",
  description:
    "Toutes les réponses sur la licence, la déclaration et l'immatriculation pour le spectacle vivant en Côte d'Ivoire.",
  path: "/ressources/faq",
});

export default function FaqPage() {
  return (
    <div>
      <EnteteListe
        maillons={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Questions fréquentes" },
        ]}
        surtitre="Centre de ressources"
        titre="Questions fréquentes"
        intro="Licences, exemptions, déclaration, immatriculation : les réponses courtes aux questions qu'on nous pose le plus."
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-4 pb-12 pt-2 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div>
          <FaqListe />
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted">
            Réponses indicatives, établies à partir des textes en vigueur. Seule l&apos;administration peut
            rendre une décision officielle sur votre dossier.
          </p>
        </div>

        <aside className="flex flex-col gap-4 lg:pt-[3.75rem]">
          <CarteSombre
            surtitre="Pas sûr d'être concerné ?"
            titre="Faites le test « Suis-je concerné ? »"
            texte="Trois questions, une minute."
            href="/suis-je-concerne"
          />
          <CarteLaterale
            titre="Vous débutez sous licence B ou C ?"
            texte="Trouvez un professionnel licencié pour superviser vos 5 premiers spectacles."
            lien={{ href: "/ressources/mentorat", label: "Mentorat →" }}
          />
        </aside>
      </div>
    </div>
  );
}
