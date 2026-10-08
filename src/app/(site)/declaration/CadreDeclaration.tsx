import Link from "next/link";
import { ReactNode } from "react";
import { FilAriane, type MaillonAriane } from "@/components/ui/FilAriane";

// Cadre commun de « Ma déclaration » et de son essai : en-tête (fil d'Ariane, titre avec
// l'étiquette Bêta, introduction, pastilles), le formulaire à gauche et, à droite, les
// deux rappels (strict nécessaire, vos données restent chez vous) et le lien vers
// « Suis-je concerné ? ». Rien n'est envoyé : ces rappels sont des textes, pas des champs.
export function CadreDeclaration({
  maillons,
  titre,
  intro,
  pastilles,
  children,
}: {
  maillons: MaillonAriane[];
  titre: string;
  intro: string;
  pastilles: { texte: string; ton: "vert" | "neutre" }[];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-5 sm:px-6">
      <FilAriane maillons={maillons} />

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">{titre}</h1>
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-primary-dark">
          Bêta
        </span>
      </div>
      <p className="mt-3 max-w-[640px] text-lg leading-relaxed text-muted">{intro}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {pastilles.map((p) => (
          <li
            key={p.texte}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              p.ton === "vert" ? "bg-secondary-light text-secondary-dark" : "bg-surface-2 text-muted"
            }`}
          >
            {p.texte}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start print:block">
        <div className="min-w-0">{children}</div>

        <aside className="no-print flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-foreground">Le strict nécessaire</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Seuls le nom, le téléphone, la date et la commune sont nécessaires. Le reste est facultatif : nous ne
              demandons rien dont vous n&apos;avez pas besoin.
            </p>
          </div>
          <div className="rounded-xl bg-deep p-5 text-on-deep">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-accent-on-deep"
              >
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              Vos données restent chez vous
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-on-deep-muted">
              Aucune donnée n&apos;est envoyée ni conservée : le récapitulatif et sa référence sont produits dans votre
              navigateur. Si vous quittez la page sans imprimer, tout est perdu.
            </p>
          </div>
          <Link
            href="/suis-je-concerne"
            className="inline-flex min-h-[44px] items-center text-sm font-bold text-foreground underline underline-offset-2 hover:text-hero-accent"
          >
            Pas sûr d&apos;être concerné ? Faites le point →
          </Link>
        </aside>
      </div>
    </div>
  );
}
