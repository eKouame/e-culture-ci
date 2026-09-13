import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Centre de ressources — e-Culture CI",
  description:
    "Comprendre le spectacle vivant, monter votre projet et être en règle : le parcours complet des ressources d'e-Culture CI, gratuit et indépendant.",
  path: "/ressources",
});

const ETAPES = [
  {
    numero: 1,
    titre: "Comprendre le secteur",
    description: "De quoi on parle exactement, et qui fait quoi dans le spectacle vivant.",
    ressources: [
      {
        href: "/ressources/fondamentaux",
        label: "Ressource 01",
        titre: "Les fondamentaux du spectacle vivant",
        description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
      },
    ],
  },
  {
    numero: 2,
    titre: "Monter votre projet",
    description: "Passer de l'idée à un projet écrit, chiffré, présentable à un partenaire.",
    ressources: [
      {
        href: "/ressources/note-intention",
        label: "Ressource 02",
        titre: "De l'idée à la note d'intention",
        description: "Mettre votre projet par écrit, clairement, en une page.",
      },
      {
        href: "/ressources/budget",
        label: "Ressource 03",
        titre: "Bâtir votre budget",
        description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
      },
    ],
  },
  {
    numero: 3,
    titre: "Être en règle",
    description: "Les obligations à connaître avant, pendant et après votre événement.",
    ressources: [
      {
        href: "/ressources/propriete-intellectuelle",
        label: "Ressource 04",
        titre: "Propriété intellectuelle",
        description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
      },
      {
        href: "/ressources/payer-artistes",
        label: "Ressource 05",
        titre: "Déclarer et payer vos artistes",
        description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
      },
      {
        href: "/ressources/faq",
        label: "Questions fréquentes",
        titre: "FAQ",
        description: "Toutes les réponses sur les licences, la déclaration et l'immatriculation.",
      },
      {
        href: "/ressources/mentorat",
        label: "Mentorat",
        titre: "Mentorat & parrainage (Licence B)",
        description: "Vous débutez ? Trouvez un professionnel licencié pour vous superviser.",
      },
    ],
  },
];

export default function RessourcesPage() {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">Ressources</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Centre de ressources
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Cinq ressources qui se lisent dans l&apos;ordre ou séparément :
            comprendre le secteur, monter votre projet, être en règle.
            Gratuit, sans compte.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border border-l-4 border-l-primary bg-surface p-5">
          <div className="max-w-prose">
            <h2 className="text-lg font-extrabold text-foreground">
              Vous débutez ?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Commencez par les fondamentaux : le vocabulaire, les acteurs et
              les règles de base, expliqués sans jargon.
            </p>
          </div>
          <LinkButton href="/ressources/fondamentaux">
            Commencer ici
          </LinkButton>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {ETAPES.map((etape, i) => (
          <div key={etape.numero} className="flex gap-4">
            <div className="flex flex-none flex-col items-center self-stretch">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-extrabold text-white">
                {etape.numero}
              </span>
              {i < ETAPES.length - 1 && (
                <span className="my-2 w-0.5 flex-1 bg-border" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-9">
              <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">
                {etape.titre}
              </h2>
              <p className="mt-1.5 max-w-prose text-muted">
                {etape.description}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {etape.ressources.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="flex flex-col gap-1.5 rounded-xl border border-border border-l-4 border-l-primary bg-surface p-5 transition-colors hover:bg-black/[0.02]"
                  >
                    <span className="text-xs font-bold uppercase tracking-wide text-primary-dark">
                      {r.label}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {r.titre}
                    </span>
                    <span className="text-sm text-muted">{r.description}</span>
                    <span className="mt-1.5 text-sm font-bold text-secondary">
                      Lire la ressource →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-deep text-on-deep">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Prêt à passer à l&apos;action ?
            </h2>
            <p className="mt-3 max-w-md text-on-deep-muted">
              Les ressources expliquent ; les modules vous font avancer,
              étape par étape, à votre rythme.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <LinkButton href="/suis-je-concerne" size="lg">
              Suis-je concerné ?
            </LinkButton>
            <LinkButton href="/declaration" variant="outlineOnDeep" size="lg">
              Ma déclaration
            </LinkButton>
            <LinkButton href="/immatriculation" variant="outlineOnDeep" size="lg">
              Mon immatriculation
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
