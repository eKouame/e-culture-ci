import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/metadata";
import { FilAriane } from "@/components/ui/FilAriane";
import { IconeInstitution } from "@/components/ui/IconeInstitution";
import { LienOutil } from "@/components/outils/LienOutil";
import { LienRencontre } from "@/components/outils/LienRencontre";
import { COMMUNES_GUICHET } from "@/lib/communes-guichet-config";

const TITLE = "e-Culture CI pour les communes | e-Culture CI";
const DESCRIPTION =
  "Faites de votre commune un guichet culturel de proximité : e-Culture CI oriente vos organisateurs, allège votre guichet et valorise votre territoire.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/communes`,
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

// La preuve sociale se branche sur la configuration des communes (`communes-guichet-config`) :
// elle reste vide, donc masquée, tant qu'aucune commune n'est active. Ne jamais nommer une
// commune comme partenaire sans convention signée et accord écrit sur le texte.
const COMMUNE_PILOTE: string | null =
  COMMUNES_GUICHET.find((c) => c.statut === "actif")?.nom ?? null;

const CONTACT_EMAIL = "servicemonde77@gmail.com";
const SUJET_RENCONTRE = "Partenariat e-Culture CI — commune de ";
const LIEN_EMAIL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUJET_RENCONTRE)}`;

const PROBLEMES = [
  "La réforme est mal comprise, et personne sur place ne l'explique clairement.",
  "L'activité culturelle reste informelle, donc fragile et peu valorisée.",
  "Vos administrés doivent souvent « monter à Abidjan » pour la moindre information.",
];

// Pictogrammes des quatre bénéfices (tracé unique, trait de 2 px).
const ICONES = {
  proximite: (
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" />
  ),
  visibilite: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />,
  formalisation: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8.5 12.5 2.3 2.3 4.7-5" />
    </>
  ),
  gratuit: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </>
  ),
};

const VALEURS: { titre: string; texte: string; icone: keyof typeof ICONES }[] = [
  {
    titre: "Un guichet de proximité",
    texte:
      "Vos administrés trouvent près de chez eux une information fiable et un accompagnement, sans avoir à se déplacer à Abidjan.",
    icone: "proximite",
  },
  {
    titre: "De la visibilité territoriale",
    texte:
      "Votre commune se positionne comme moteur culturel et pilote de la structuration du secteur dans la région.",
    icone: "visibilite",
  },
  {
    titre: "De la formalisation",
    texte:
      "Plus d'organisateurs en règle, une activité culturelle cadrée, un secteur qui se professionnalise sur votre territoire.",
    icone: "formalisation",
  },
  {
    titre: "Aucun coût pour vos administrés",
    texte:
      "La plateforme, les ressources et l'orientation restent entièrement gratuites pour les acteurs de votre commune.",
    icone: "gratuit",
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
    titre: "La mise en service du guichet",
    texte:
      "Vous désignez une adresse de réception, nous faisons un test d'envoi, puis le guichet de déclaration ouvre à vos administrés.",
  },
  {
    titre: "Le déploiement",
    texte: "Votre commune devient une commune pilote de la structuration culturelle en Côte d'Ivoire.",
  },
];

const surtitre = "text-xs font-bold uppercase tracking-[0.12em] text-secondary";

export default function CommunesPage() {
  return (
    <div>
      {/* 1. Héro */}
      <section className="bg-deep text-on-deep">
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-5 sm:px-6">
          <div className="[&_a]:text-on-deep-muted [&_a:hover]:text-on-deep [&_li]:text-on-deep-muted [&_nav]:text-on-deep-muted [&_[aria-current]]:text-on-deep">
            <FilAriane maillons={[{ label: "Accueil", href: "/" }, { label: "Espace communal" }]} />
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-12">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-on-deep">
                <IconeInstitution taille={16} />
                Pour les autorités locales
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Faites de votre commune un guichet culturel de proximité.
              </h1>
              <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-on-deep-muted">
                La réforme des licences de spectacle change la donne pour vos organisateurs. e-Culture CI vous aide à
                les accompagner, à formaliser l&apos;activité culturelle de votre territoire et à en faire un atout —
                simplement, sans lourdeur.
              </p>

              {COMMUNE_PILOTE && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  Déjà adopté par la commune de {COMMUNE_PILOTE}.
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <LienRencontre
                  href={LIEN_EMAIL}
                  emplacement="haut"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-background px-6 text-base font-bold text-foreground transition-colors hover:bg-white"
                >
                  Demander une rencontre
                </LienRencontre>
                <LienOutil
                  href="/declaration/essai"
                  depuis="communes"
                  outil="essai"
                  emplacement="appel"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-white/45 px-6 text-base font-bold text-on-deep transition-colors hover:bg-white/10"
                >
                  Essayer le guichet&nbsp;→
                </LienOutil>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-6 text-foreground shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)]">
              <span className="inline-block rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-primary-dark">
                Nouveau · Bêta
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight">Ma déclaration</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                Un guichet de déclaration prêt à l&apos;emploi pour vos administrés.
              </p>
              <Link
                href="/declaration"
                className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-hero-accent px-4 text-sm font-bold text-white transition-colors hover:brightness-95"
              >
                Découvrir Ma déclaration&nbsp;→
              </Link>
              <p className="mt-3">
                <Link
                  href="/communes/espace-communal"
                  className="inline-flex min-h-[44px] items-center text-sm font-bold text-foreground underline underline-offset-2 hover:text-hero-accent"
                >
                  Voir un exemple de tableau de bord (données fictives)
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-10 border-t border-white/15 pt-4 text-sm leading-relaxed text-on-deep-muted">
            Un service indépendant, sans lien officiel avec le ministère : nous outillons, nous n&apos;officialisons
            rien.
          </p>
        </div>
      </section>

      {/* 2. Le constat */}
      <section>
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
          <div>
            <p className={surtitre}>Le constat</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              Ce que vivent vos organisateurs aujourd&apos;hui
            </h2>
            <p className="mt-3 text-muted">
              Sur votre territoire, la vie culturelle existe déjà. Mais la réforme la prend de court.
            </p>
          </div>
          <div>
            <ol className="border-t border-border-strong">
              {PROBLEMES.map((p, i) => (
                <li key={p} className="flex items-baseline gap-5 border-b border-border-strong py-4">
                  <span className="text-xs font-extrabold tabular-nums text-hero-accent">0{i + 1}</span>
                  <span className="text-lg font-bold leading-snug text-foreground">{p}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-prose text-foreground">
              Entre la nouvelle licence d&apos;entrepreneur de spectacles, les cautions et les démarches, beaucoup
              d&apos;organisateurs de votre commune sont perdus. L&apos;information circule mal, surtout loin du
              Grand Abidjan. Résultat : une activité qui reste largement informelle, des acteurs qui renoncent, et
              une vie culturelle qui échappe en partie à votre territoire.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Ce que la commune y gagne */}
      <section id="valeur" className="scroll-mt-24 border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <p className={surtitre}>Ce que la commune y gagne</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
            Ce que le partenariat apporte à votre commune
          </h2>
          <p className="mt-2 text-muted">Un outil clé en main, gratuit pour vos administrés, au service de votre territoire.</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map((v) => (
              <div key={v.titre} className="rounded-2xl bg-background p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONES[v.icone]}
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-foreground">{v.titre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.texte}</p>
              </div>
            ))}
          </div>

          <p className={`${surtitre} mt-10`}>Ce que ce partenariat n&apos;est pas</p>
          <p className="mt-1 text-sm text-muted">Pour lever d&apos;emblée les questions légitimes que vous vous posez.</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
            {OBJECTIONS.map((o) => (
              <li key={o.titre} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                <span aria-hidden="true" className="font-bold text-danger">
                  ✕
                </span>
                <span>
                  <strong className="font-bold">{o.titre}.</strong> {o.texte}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose rounded-xl border border-border-strong bg-background px-5 py-4 text-base font-semibold leading-relaxed text-foreground">
            Ce n&apos;est pas un enregistrement officiel : la mairie reçoit une information, elle reste l&apos;autorité.
          </p>
        </div>
      </section>

      {/* 4. Comment ça marche */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <p className={surtitre}>Comment ça marche</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
            Quatre étapes, de la rencontre au lancement
          </h2>
          <ol className="mt-8 grid grid-cols-1 border-t-2 border-secondary sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li
                key={e.titre}
                className="border-b border-border px-0 py-5 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
              >
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-secondary">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold leading-snug text-foreground">{e.titre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Devenir commune pilote */}
      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="flex flex-col gap-6 rounded-[20px] bg-deep p-8 text-on-deep sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Devenez une commune pilote.</h2>
            <p className="mt-3 text-on-deep-muted">
              Les premières communes qui s&apos;engagent donnent le ton de la structuration culturelle en Côte
              d&apos;Ivoire. Parlons-en autour d&apos;une rencontre — sans engagement.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <LienRencontre
              href={LIEN_EMAIL}
              emplacement="bas"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent-on-deep px-6 text-base font-bold text-[#241403] transition-colors hover:brightness-95"
            >
              Écrire à e-Culture CI&nbsp;→
            </LienRencontre>
            <span className="text-sm text-on-deep-muted">Aucun formulaire, aucune inscription.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
