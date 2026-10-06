import Link from "next/link";
import { LienMesure } from "@/components/parcours/LienMesure";
import { COMMENT_FAIRE, OUTILS_ACCUEIL } from "@/lib/parcours-config";

interface RessourceAccueil {
  numero: string;
  href: string;
  titre: string;
  description: string;
}

// Mobile (moins de 768 px) : la suite du nouvel accueil, sous le héro. Mêmes liens internes
// que l'accueil ordinateur : les ressources et les outils restent accessibles, sans défiler plus de
// deux écrans pour atteindre « Toutes les ressources ».
export function AccueilMobile({
  ressources,
  facebookUrl,
}: {
  ressources: RessourceAccueil[];
  facebookUrl: string;
}) {
  return (
    <div className="md:hidden">
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-8">
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
