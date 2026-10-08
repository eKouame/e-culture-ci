import Link from "next/link";

// Frise des six ressources, de l'idée à la mise en règle. Les titres sont ceux du site
// actuel : « Bâtir » / « Construire votre budget » et « Candidater aux licences B et C » /
// « Demander une licence B ou C » restent à trancher (décision 3 du cahier d'intégration).
// Quand une ressource change de titre, on le corrige ici, à un seul endroit.
const RESSOURCES = [
  {
    numero: "01",
    href: "/ressources/fondamentaux",
    titre: "Les fondamentaux du spectacle vivant",
    description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
  },
  {
    numero: "02",
    href: "/ressources/note-intention",
    titre: "De l'idée à la note d'intention",
    description: "Mettre votre projet par écrit, clairement, en une page.",
  },
  {
    numero: "03",
    href: "/ressources/budget",
    titre: "Bâtir votre budget",
    description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
  },
  {
    numero: "04",
    href: "/ressources/propriete-intellectuelle",
    titre: "Propriété intellectuelle",
    description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
  },
  {
    numero: "05",
    href: "/ressources/payer-artistes",
    titre: "Déclarer et payer vos artistes",
    description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
  },
  {
    numero: "06",
    href: "/ressources/candidater-licences",
    titre: "Candidater aux licences B et C",
    description: "Qui est concerné, calendrier de l'appel, conditions et coûts.",
  },
];

export function FriseRessources() {
  return (
    <section aria-labelledby="centre-ressources" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Centre de ressources</p>
          <h2
            id="centre-ressources"
            className="mt-2 max-w-[640px] text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl"
          >
            De l&apos;idée à la mise en règle, étape par étape.
          </h2>
        </div>
        <Link
          href="/ressources"
          className="inline-flex min-h-[44px] items-center rounded-lg border-[1.5px] border-secondary px-4 text-sm font-bold text-foreground transition-colors hover:bg-secondary hover:text-white"
        >
          Suivre le parcours complet&nbsp;→
        </Link>
      </div>

      <ol className="mt-8 grid grid-cols-1 border-t-2 border-secondary sm:grid-cols-2 lg:grid-cols-6">
        {RESSOURCES.map((r, i) => (
          <li key={r.href} className="border-b border-border lg:border-b-0 lg:border-l lg:first:border-l-0">
            <Link
              href={r.href}
              className="group flex h-full flex-col gap-2 px-0 py-5 transition-colors hover:bg-black/[0.02] lg:px-4 lg:first:pl-0 lg:last:pr-0"
            >
              <span
                aria-hidden="true"
                className={`text-3xl font-extrabold tabular-nums tracking-tight ${
                  i === 0 ? "text-hero-accent" : "text-border-strong"
                }`}
              >
                {r.numero}
              </span>
              <span className="text-base font-bold leading-snug text-foreground group-hover:text-primary-dark">
                {r.titre}
              </span>
              <span className="text-sm leading-relaxed text-muted">{r.description}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
