import type { Metadata } from "next";
import Link from "next/link";
import { LienOutil } from "@/components/outils/LienOutil";
import { EnteteListe } from "@/components/liste/EnteteListe";
import {
  CarteLaterale,
  CarteSombre,
  IconePersonnes,
  IconeQuestion,
} from "@/components/liste/CartesLaterales";
import { pageMetadata } from "@/lib/metadata";
import { appelClos } from "@/lib/candidater-licences-config";
import { RESSOURCES, hrefRessource, type GroupeRessource } from "@/lib/ressources-config";

export const metadata: Metadata = pageMetadata({
  title: "Centre de ressources — e-Culture CI",
  description:
    "Comprendre le spectacle vivant, monter votre projet et être en règle : le parcours complet des ressources d'e-Culture CI, gratuit et indépendant.",
  path: "/ressources",
});

// La pastille « Appel en cours » disparaît seule à la clôture de l'appel : la page est
// régénérée toutes les heures, comme les autres bascules de date du site.
export const revalidate = 3600;

const ETAPES: { numero: number; groupe: GroupeRessource }[] = [
  { numero: 1, groupe: "Comprendre le secteur" },
  { numero: 2, groupe: "Monter votre projet" },
  { numero: 3, groupe: "Être en règle" },
];

function IconeCalculette() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </svg>
  );
}

export default function RessourcesPage() {
  const clos = appelClos();

  return (
    <div>
      <EnteteListe
        maillons={[{ label: "Accueil", href: "/" }, { label: "Ressources" }]}
        titre="Centre de ressources"
        intro="Comprendre le secteur, monter votre projet, être en règle. Six ressources à lire dans l'ordre ou séparément. Gratuit, sans compte."
        encart={
          <CarteSombre
            surtitre="Vous débutez ?"
            titre="Commencez par les fondamentaux du spectacle vivant"
            texte="Le vocabulaire, les acteurs et les règles de base, sans jargon."
            href={hrefRessource("fondamentaux")}
          />
        }
      />

      <div className="border-t border-border" />

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="flex flex-col gap-10">
          {ETAPES.map(({ numero, groupe }) => (
            <section key={numero} className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Étape {numero}</p>
                <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-foreground">{groupe}</h2>
              </div>
              <ol className="border-t-2 border-secondary">
                {RESSOURCES.filter((r) => r.groupe === groupe).map((r) => {
                  const appel = r.slug === "candidater-licences" && !clos;
                  return (
                    <li key={r.slug} className="border-b border-border">
                      <Link
                        href={hrefRessource(r.slug)}
                        className="group flex items-start gap-4 py-4 transition-colors hover:bg-black/[0.02]"
                      >
                        <span
                          aria-hidden="true"
                          className={`w-9 shrink-0 text-2xl font-extrabold tabular-nums tracking-tight ${
                            r.numero === "01" ? "text-hero-accent" : "text-border-strong"
                          }`}
                        >
                          {r.numero}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-lg font-bold leading-snug text-foreground group-hover:text-primary-dark">
                              {r.titre}
                            </span>
                            {appel && (
                              <span className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-primary-dark">
                                Appel en cours
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-muted">{r.description}</span>
                        </span>
                        <span aria-hidden="true" className="pt-1 text-lg text-hero-accent">
                          →
                        </span>
                      </Link>
                      {r.slug === "budget" && (
                        <div className="pb-4 pl-[3.25rem]">
                          <LienOutil
                            href="/outils/budget"
                            depuis="ressources"
                            outil="budget"
                            emplacement="outils-lies"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary-light px-3.5 text-sm font-bold text-primary-dark transition-colors hover:brightness-95"
                          >
                            <IconeCalculette />
                            Outil lié&nbsp;: calculez votre point d&apos;équilibre&nbsp;→
                          </LienOutil>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        <aside className="flex flex-col gap-4 lg:pt-1">
          <CarteLaterale
            icone={IconeQuestion}
            titre="Questions fréquentes"
            texte="Toutes les réponses sur les licences, la déclaration et l'immatriculation."
            lien={{ href: "/ressources/faq", label: "Voir la FAQ →" }}
          />
          <CarteLaterale
            icone={IconePersonnes}
            titre="Mentorat"
            texte="Vous débutez ? Trouvez un professionnel licencié pour vous superviser."
            lien={{ href: "/ressources/mentorat", label: "Trouver un mentor →" }}
          />
          <Link
            href="/ressources/toutes"
            className="inline-flex min-h-[44px] items-center px-1 text-sm font-bold text-primary-dark hover:underline"
          >
            Voir toutes les ressources en un coup d&apos;œil →
          </Link>
          <p className="px-1 text-xs leading-relaxed text-muted">
            e-Culture CI explique et oriente, mais ne délivre aucun document officiel.
          </p>
        </aside>
      </div>
    </div>
  );
}
