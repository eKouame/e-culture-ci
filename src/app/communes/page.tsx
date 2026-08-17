import type { Metadata } from "next";
import { CommunesForm } from "./CommunesForm";

const TITLE = "e-Culture CI pour les communes | Service Monde";
const DESCRIPTION =
  "Service Monde installe e-Culture CI comme service culturel de proximité dans votre commune : guichet allégé, visibilité sur le territoire, formalisation progressive.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://e-culture-ci.vercel.app/communes",
    siteName: "e-Culture CI",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const BENEFICES = [
  {
    titre: "Un guichet allégé",
    texte: "Les organisateurs arrivent préparés.",
  },
  {
    titre: "De la visibilité accrue",
    texte: "Vous voyez les événements déclarés dans la commune.",
  },
  {
    titre: "Un pas vers la formalisation",
    texte: "L'informel revient vers vous, simplement.",
  },
  {
    titre: "Une image moderne",
    texte: "Un service concret, à l'écoute, sans lourdeur.",
  },
];

const ETAPES = [
  ["Comprendre", "vos règles locales (pièces, délais, redevances)."],
  ["Adapter", "l'outil : critères, formulaire, identité visuelle."],
  ["Former", "votre agent d'accueil — l'essentiel en une demi-heure."],
  ["Mettre en service", ": votre outil est en ligne, prêt pour vos administrés."],
] as const;

export default function CommunesPage() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="border-b border-[#1B5E4A]/15 bg-gradient-to-b from-[#1B5E4A]/[0.06] to-transparent">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-wide text-[#B5771F]">
            Service Monde — pour les communes
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1c1917] sm:text-4xl">
            Un service culturel de proximité pour votre commune
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#6b6b6b]">
            e-Culture CI : orienter, alléger votre guichet, mieux connaître
            votre territoire.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#formulaire"
              className="inline-flex items-center justify-center rounded-lg bg-[#1B5E4A] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#154639]"
            >
              Demander une démonstration
            </a>
            <a
              href="/pour-les-mairies-service-monde.pdf"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#1B5E4A] px-6 py-3.5 text-base font-semibold text-[#1B5E4A] hover:bg-[#1B5E4A]/5"
            >
              Télécharger le one-pager
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {/* 2. Le constat */}
        <section>
          <h2 className="text-2xl font-bold text-[#1c1917]">Le constat</h2>
          <p className="mt-3 leading-relaxed text-[#3f3f3f]">
            Depuis la réforme, vos administrés sont perdus : beaucoup pensent
            qu&apos;un concert de quartier exige une licence à plusieurs
            millions. Résultat — un guichet saturé, des événements informels,
            une perte de visibilité territoriale.
          </p>
        </section>

        {/* 3. La proposition */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Ce que Service Monde propose
          </h2>
          <p className="mt-1 font-medium text-[#B5771F]">
            e-Culture CI : orienter, alléger, formaliser.
          </p>
          <p className="mt-3 leading-relaxed text-[#3f3f3f]">
            Nous installons e-Culture CI comme service local de votre
            commune : un outil à vos couleurs, où l&apos;organisateur
            comprend s&apos;il est concerné, prépare son dossier, et sait
            quoi apporter à votre guichet.
          </p>
        </section>

        {/* 4. Ce que vous y gagnez */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Ce que vous y gagnez
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFICES.map((b) => (
              <div
                key={b.titre}
                className="rounded-xl border border-[#1B5E4A]/15 bg-white p-5"
              >
                <h3 className="font-bold text-[#1B5E4A]">{b.titre}</h3>
                <p className="mt-1.5 text-sm text-[#6b6b6b]">{b.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Ce que ce n'est pas */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Ce que ce n&apos;est pas
          </h2>
          <div className="mt-5 rounded-xl border-2 border-[#B5771F]/40 bg-[#B5771F]/[0.06] p-6">
            <p className="font-bold text-[#8a5a17]">
              e-Culture CI n&apos;officialise rien.
            </p>
            <p className="mt-2 leading-relaxed text-[#3f3f3f]">
              Il oriente et prépare. Votre mairie reste la seule autorité :
              c&apos;est elle qui reçoit, délivre et autorise. L&apos;outil
              l&apos;alimente, il ne la remplace pas.
            </p>
          </div>
        </section>

        {/* 6. Comment ça se met en place */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Comment ça se met en place
          </h2>
          <ol className="mt-5 flex flex-col gap-4">
            {ETAPES.map(([verbe, legende], i) => (
              <li key={verbe} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B5E4A] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-[#3f3f3f]">
                  <span className="font-bold text-[#1c1917]">{verbe}</span>{" "}
                  {legende}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. Qui est Service Monde */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Qui est Service Monde
          </h2>
          <p className="mt-3 leading-relaxed text-[#3f3f3f]">
            Un cabinet de design territorial : des services de proximité
            pour les collectivités, simples à adopter, utiles dès le premier
            jour. e-Culture CI est le premier de ces services.
          </p>
        </section>

        {/* 8. Devenez commune pilote */}
        <section className="mt-12 rounded-xl bg-[#1B5E4A] p-7 text-white sm:p-9">
          <h2 className="text-2xl font-bold">Devenez commune pilote</h2>
          <p className="mt-3 leading-relaxed text-white/90">
            e-Culture CI est en phase de test. Nous cherchons quelques
            communes volontaires pour le construire avec nous — engagement
            léger, gratuit, vous pouvez commencer petit. Soyez parmi les
            premières à en montrer l&apos;exemple.
          </p>
          <a
            href="#formulaire"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1B5E4A] hover:bg-white/90"
          >
            Demander une démonstration
          </a>
        </section>

        {/* 9. Formulaire */}
        <section id="formulaire" className="mt-12 scroll-mt-8">
          <h2 className="text-2xl font-bold text-[#1c1917]">
            Demandez une démonstration ou un rendez-vous
          </h2>
          <p className="mt-2 text-sm text-[#6b6b6b]">
            servicemonde77@gmail.com — nous revenons vers vous rapidement.
          </p>
          <div className="mt-5">
            <CommunesForm />
          </div>
        </section>
      </div>
    </div>
  );
}
