import type { Metadata } from "next";

const TITLE = "e-Culture CI pour les communes | e-Culture CI";
const DESCRIPTION =
  "Faites de votre commune un guichet culturel de proximité : e-Culture CI oriente vos organisateurs, allège votre guichet et valorise votre territoire.";

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

// Tant qu'aucune commune n'a signé, cette valeur reste `null` — ne jamais
// nommer une commune comme partenaire acquis (règle non négociable du
// cahier des charges). Le jour où une commune signe, renseigner son nom
// ici active automatiquement le bandeau de preuve sociale ci-dessous.
const COMMUNE_PILOTE: string | null = null;

const CONTACT_EMAIL = "servicemonde77@gmail.com";
const SUJET_RENCONTRE = "Partenariat e-Culture CI — commune de ";
const LIEN_EMAIL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUJET_RENCONTRE)}`;

const PROBLEMES = [
  "La réforme est mal comprise, et personne sur place ne l'explique clairement.",
  "L'activité culturelle reste informelle, donc fragile et peu valorisée.",
  "Vos administrés doivent souvent « monter à Abidjan » pour la moindre information.",
];

const VALEURS = [
  {
    titre: "Un guichet de proximité",
    texte:
      "Vos administrés trouvent près de chez eux une information fiable et un accompagnement, sans avoir à se déplacer à Abidjan.",
  },
  {
    titre: "De la visibilité territoriale",
    texte:
      "Votre commune se positionne comme moteur culturel et pilote de la structuration du secteur dans la région.",
  },
  {
    titre: "De la formalisation",
    texte:
      "Plus d'organisateurs en règle, une activité culturelle cadrée, un secteur qui se professionnalise sur votre territoire.",
  },
  {
    titre: "Aucun coût pour vos administrés",
    texte:
      "La plateforme, les ressources et l'orientation restent entièrement gratuites pour les acteurs de votre commune.",
  },
];

const OBJECTIONS = [
  {
    titre: "Un engagement lourd",
    texte:
      "Un cadre léger, sur une durée limitée et révisable. On commence petit, on ajuste ensemble.",
  },
  {
    titre: "Une substitution à la commune",
    texte:
      "Vous gardez toutes vos prérogatives. Nous vous outillons ; nous ne décidons rien à votre place.",
  },
  {
    titre: "Un dispositif officiel",
    texte:
      "e-Culture CI est indépendant, sans lien avec le ministère, et ne délivre aucun document officiel. C'est un service d'orientation.",
  },
];

const ETAPES = [
  {
    titre: "Une rencontre",
    texte: "Nous présentons l'outil et nous écoutons les besoins réels de votre commune.",
  },
  {
    titre: "Un cadre léger",
    texte: "Un accord simple précise le rôle de chacun, sans lourdeur administrative.",
  },
  {
    titre: "Le déploiement",
    texte: "Votre commune devient une commune pilote de la structuration culturelle en Côte d'Ivoire.",
  },
];

export default function CommunesPage() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="bg-deep-strong text-on-deep">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-on-deep">
              Aux communes de Côte d&apos;Ivoire
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Faites de votre commune un guichet culturel de proximité.
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-on-deep-muted">
              La réforme des licences de spectacle change la donne pour vos
              organisateurs. e-Culture CI vous aide à les accompagner, à
              formaliser l&apos;activité culturelle de votre territoire et à
              en faire un atout — simplement, sans lourdeur.
            </p>

            {COMMUNE_PILOTE && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                Déjà adopté par la commune de {COMMUNE_PILOTE}.
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={LIEN_EMAIL}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-[#241403] transition-colors hover:brightness-95"
              >
                Demander une rencontre
              </a>
              <a
                href="#valeur"
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-white/40 bg-white/5 px-6 py-3.5 text-base font-bold text-on-deep transition-colors hover:bg-white/10"
              >
                Ce que nous proposons
              </a>
            </div>
            <p className="mt-7 max-w-md border-l-2 border-primary py-1 pl-3.5 text-sm leading-relaxed text-on-deep-muted">
              Un service indépendant, sans lien officiel avec le ministère :
              nous outillons, nous n&apos;officialisons rien.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Le problème d'abord */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-secondary-dark sm:text-3xl">
              Ce que vivent vos organisateurs aujourd&apos;hui
            </h2>
            <p className="mt-2 text-muted">
              Sur votre territoire, la vie culturelle existe déjà. Mais la
              réforme la prend de court.
            </p>
          </div>
          <p className="mt-6 max-w-prose text-foreground">
            Entre la nouvelle licence d&apos;entrepreneur de spectacles, les
            cautions et les démarches, beaucoup d&apos;organisateurs de votre
            commune sont perdus. L&apos;information circule mal, surtout loin
            du Grand Abidjan. Résultat : une activité qui reste largement
            informelle, des acteurs qui renoncent, et une vie culturelle qui
            échappe en partie à votre territoire.
          </p>
          <ul className="mt-6 flex max-w-prose flex-col gap-3">
            {PROBLEMES.map((p) => (
              <li
                key={p}
                className="rounded-r-lg border border-border border-l-4 border-l-primary bg-background px-5 py-4 text-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. La valeur, côté commune */}
      <section id="valeur" className="scroll-mt-24 border-y border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-secondary-dark sm:text-3xl">
              Ce que le partenariat apporte à votre commune
            </h2>
            <p className="mt-2 text-muted">
              Un outil clé en main, gratuit pour vos administrés, au service
              de votre territoire.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALEURS.map((v, i) => (
              <div
                key={v.titre}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3.5 text-lg font-bold text-foreground">
                  {v.titre}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Levée d'objections */}
      <section className="bg-deep-strong text-on-deep">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ce que ce partenariat n&apos;est pas
            </h2>
            <p className="mt-2 text-on-deep-muted">
              Pour lever d&apos;emblée les questions légitimes que vous vous
              posez.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {OBJECTIONS.map((o) => (
              <div
                key={o.titre}
                className="rounded-xl border border-white/15 bg-white/5 p-6"
              >
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span aria-hidden="true" className="text-accent-on-deep">
                    ✕
                  </span>
                  {o.titre}
                </h3>
                <p className="mt-2 text-sm text-on-deep-muted">{o.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comment ça marche */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-secondary-dark sm:text-3xl">
              Comment ça marche
            </h2>
            <p className="mt-2 text-muted">Trois étapes simples, à votre rythme.</p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {ETAPES.map((e, i) => (
              <div
                key={e.titre}
                className="relative rounded-xl border border-border bg-background p-6 pt-8"
              >
                <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-[#241403]">
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-foreground">{e.titre}</h3>
                <p className="mt-1.5 text-sm text-muted">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA final */}
      <section className="-mb-12 bg-secondary text-on-deep">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Devenez une commune pilote.
            </h2>
            <p className="mt-4 max-w-prose text-on-deep-muted">
              Les premières communes qui s&apos;engagent donnent le ton de la
              structuration culturelle en Côte d&apos;Ivoire. Parlons-en
              autour d&apos;une rencontre — sans engagement.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={LIEN_EMAIL}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-[#241403] transition-colors hover:brightness-95"
              >
                Écrire à e-Culture CI
              </a>
              <span className="text-sm text-on-deep-muted">
                Aucun formulaire, aucune inscription.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
