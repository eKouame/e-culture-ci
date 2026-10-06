import Link from "next/link";
import { LienMesure } from "@/components/parcours/LienMesure";
import { COMMENT_FAIRE, OUTILS_ACCUEIL, PARCOURS } from "@/lib/parcours-config";

const lienPrimaire =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const lienSecondaire =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-primary px-4 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

// Ordinateur (768 px et plus) : l'accueil actuel est inchangé ; on ajoute seulement ce
// bandeau, une ligne de promesse et deux boutons.
export function BandeauPortes() {
  return (
    <section className="no-print border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold text-foreground">
          Dites-nous où vous en êtes, vous repartez avec vos prochaines étapes.
        </p>
        <div className="flex flex-wrap gap-2">
          <LienMesure
            href="/parcours/idee"
            evenement="porte_cliquee"
            donnees={{ porte: "idee", depuis: "bandeau" }}
            className={lienSecondaire}
          >
            J&apos;ai une idée de spectacle
          </LienMesure>
          <LienMesure
            href="/parcours/evenement"
            evenement="porte_cliquee"
            donnees={{ porte: "evenement", depuis: "bandeau" }}
            className={lienPrimaire}
          >
            Je prépare un événement
          </LienMesure>
        </div>
      </div>
    </section>
  );
}

interface RessourceAccueil {
  numero: string;
  href: string;
  titre: string;
  description: string;
}

// Mobile (moins de 768 px) : le nouvel accueil. Mêmes liens internes que l'accueil
// ordinateur : les ressources et les outils restent accessibles, sans défiler plus de
// deux écrans pour atteindre « Toutes les ressources ».
export function AccueilMobile({
  ressources,
  facebookUrl,
}: {
  ressources: RessourceAccueil[];
  facebookUrl: string;
}) {
  const portes = [
    { id: "idee" as const, href: "/parcours/idee", cta: "Commencer →", principale: false },
    { id: "evenement" as const, href: "/parcours/evenement", cta: "Obtenir ma feuille de route →", principale: true },
  ];

  return (
    <div className="md:hidden">
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-8">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground">
          Organiser un spectacle en Côte d&apos;Ivoire&nbsp;: ce qu&apos;il faut savoir et faire
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Dites-nous où vous en êtes. Vous repartez avec les prochaines étapes, dans
          l&apos;ordre, avec la bonne personne à contacter.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {portes.map((p) => (
            <LienMesure
              key={p.id}
              href={p.href}
              evenement="porte_cliquee"
              donnees={{ porte: p.id, depuis: "accueil" }}
              className={`flex min-h-[44px] flex-col gap-2 rounded-2xl border-2 p-5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                p.principale
                  ? "border-secondary bg-secondary text-on-deep"
                  : "border-border bg-surface text-foreground hover:border-primary"
              }`}
            >
              <span
                className={`text-xs font-bold uppercase tracking-wide ${
                  p.principale ? "text-accent-on-deep" : "text-primary-dark"
                }`}
              >
                {PARCOURS[p.id].porte}
              </span>
              <span className="text-xl font-extrabold leading-tight">{PARCOURS[p.id].titre}</span>
              <span className={`text-sm ${p.principale ? "text-on-deep-muted" : "text-muted"}`}>
                {PARCOURS[p.id].question}
              </span>
              <span className="mt-1 text-sm font-bold">{p.cta}</span>
            </LienMesure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">Comment faire&nbsp;?</h2>
        <ul className="mt-3 border-b border-border">
          {COMMENT_FAIRE.map((q, i) => (
            <li key={q.question} className="border-t border-border">
              <LienMesure
                href={q.href}
                evenement="comment_faire_clique"
                donnees={{ question: i + 1 }}
                className="flex min-h-[44px] items-center justify-between gap-3 py-3.5 text-base font-semibold text-foreground"
              >
                <span>{q.question}</span>
                <span aria-hidden="true" className="text-primary-dark">
                  →
                </span>
              </LienMesure>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">Vos outils</h2>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {OUTILS_ACCUEIL.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              {o.label}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          Les outils servent aussi d&apos;étapes dans votre feuille de route.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          Des ressources claires, pour chaque étape
        </h2>
        <p className="mt-2 text-sm text-muted">
          Écrites pour être comprises, même quand on débute. À lire librement.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
          {ressources.map((r, i) => (
            <Link
              key={r.href}
              href={r.href}
              className={`flex min-h-[44px] items-center gap-3 px-4 py-3.5 ${
                i < ressources.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-extrabold text-primary-dark">
                {r.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-foreground">{r.titre}</span>
                <span className="mt-0.5 block text-sm text-muted">{r.description}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/ressources"
          className="mt-3 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark"
        >
          Voir toutes les ressources →
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4">
        <p className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-muted">
          e-Culture CI est un service d&apos;information indépendant, sans lien officiel avec le
          ministère de la Culture. Il informe, il ne remplace ni une démarche officielle ni un
          conseil juridique ou fiscal. Document non officiel.
        </p>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark"
        >
          Suivre la page Facebook →
        </a>
      </section>
    </div>
  );
}
