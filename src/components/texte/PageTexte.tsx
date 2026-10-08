import Link from "next/link";
import { ReactNode } from "react";
import { FilAriane } from "@/components/ui/FilAriane";

// Gabarit « page de texte » (mentions légales, confidentialité, conditions d'utilisation) :
// un menu « Informations » à gauche (onglets défilants sur mobile), le fil d'Ariane, le
// titre, une phrase « En bref » facultative, puis le texte. Le texte de chaque page ne
// change pas : seule la mise en page est refaite. La date de dernière mise à jour ne
// s'affiche que si elle est fournie (elle n'est jamais inventée).
const PAGES = [
  { id: "mentions", href: "/mentions-legales", label: "Mentions légales" },
  { id: "confidentialite", href: "/confidentialite", label: "Confidentialité" },
  { id: "conditions", href: "/conditions-utilisation", label: "Conditions d'utilisation" },
] as const;

export type PageTexteId = (typeof PAGES)[number]["id"];

export function PageTexte({
  actif,
  titre,
  misAJour,
  enBref,
  children,
}: {
  actif: PageTexteId;
  titre: string;
  misAJour?: string;
  enBref?: string;
  children: ReactNode;
}) {
  const courant = PAGES.find((p) => p.id === actif);

  return (
    <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-4 px-4 py-8 sm:px-6 md:grid-cols-[200px_minmax(0,1fr)] md:py-10">
      <nav aria-label="Informations" className="md:pt-1">
        <p className="mb-3 hidden text-xs font-bold uppercase tracking-[0.12em] text-muted md:block">Informations</p>
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:border-l-2 md:border-border md:px-0 md:pb-0">
          {PAGES.map((p) => {
            const estActif = p.id === actif;
            return (
              <li key={p.id} className="shrink-0">
                <Link
                  href={p.href}
                  aria-current={estActif ? "page" : undefined}
                  className={`flex min-h-[44px] items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors md:-ml-0.5 md:rounded-none md:border-0 md:border-l-2 md:px-4 ${
                    estActif
                      ? "border-secondary bg-secondary text-white md:border-hero-accent md:bg-transparent md:font-bold md:text-foreground"
                      : "border-border-strong bg-surface text-foreground hover:border-secondary md:border-transparent md:bg-transparent md:text-muted md:hover:text-foreground"
                  }`}
                >
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0">
        <FilAriane maillons={[{ label: "Accueil", href: "/" }, { label: courant?.label ?? titre }]} />
        <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
          {titre}
        </h1>
        {misAJour && <p className="mt-3 text-sm text-muted">Dernière mise à jour&nbsp;: {misAJour}</p>}

        {enBref && (
          <p className="mt-6 rounded-2xl bg-deep px-5 py-4 text-base leading-relaxed text-on-deep">
            <strong className="font-extrabold text-accent-on-deep">En bref.</strong> {enBref}
          </p>
        )}

        <div className="mt-8 flex max-w-[760px] flex-col gap-9 text-base leading-[1.75] text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_li]:leading-[1.7]">
          {children}
        </div>
      </div>
    </div>
  );
}
