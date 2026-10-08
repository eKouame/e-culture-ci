import type { Metadata } from "next";
import Link from "next/link";
import { MentoratForm } from "./MentoratForm";
import { FilAriane } from "@/components/ui/FilAriane";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Mentorat & parrainage | e-Culture CI",
  description:
    "Débutant dans le spectacle vivant ? Trouvez un mentor licencié pour organiser votre parrainage (Licence B).",
  path: "/ressources/mentorat",
});

const ETAPES = [
  {
    titre: "Vous décrivez votre projet",
    texte: "Région, type de spectacle, expérience : deux minutes suffisent.",
  },
  {
    titre: "Nous cherchons un mentor proche",
    texte: "Un professionnel licencié, si possible dans votre région et votre discipline.",
  },
  {
    titre: "Vous organisez vos 5 spectacles accompagnés",
    texte: "Puis vous opérez en toute autonomie.",
  },
];

export default function MentoratPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-5 sm:px-6">
      <FilAriane
        maillons={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: "Mentorat" },
        ]}
      />

      <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Centre de ressources</p>
          <h1 className="mt-1 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
            Mentorat &amp; parrainage (Licence B)
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            Pour démarrer votre activité en toute autonomie, la réglementation
            exige de réaliser 5 spectacles sous la supervision d&apos;un
            professionnel déjà titulaire d&apos;une licence. Décrivez votre
            profil ci-dessous, nous vous mettrons en relation avec un mentor.
          </p>

          <h2 className="mt-8 text-xl font-extrabold tracking-tight text-foreground">Comment ça se passe</h2>
          <ol className="mt-4 flex flex-col gap-5 border-l-2 border-secondary pl-5">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span aria-hidden="true" className="text-xl font-extrabold text-secondary">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-foreground">{e.titre}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{e.texte}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/ressources/candidater-licences"
              className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-secondary"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-secondary">Ressource</span>
              <span className="font-bold leading-snug text-foreground">Candidater aux licences B et C</span>
              <span className="text-sm font-bold text-primary-dark">Lire →</span>
            </Link>
            <Link
              href="/ressources/faq"
              className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-secondary"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-secondary">FAQ</span>
              <span className="font-bold leading-snug text-foreground">Qu&apos;est-ce que le parrainage ?</span>
              <span className="text-sm font-bold text-primary-dark">Lire →</span>
            </Link>
          </div>
        </div>

        <div className="lg:pt-2">
          <MentoratForm />
        </div>
      </div>
    </div>
  );
}
