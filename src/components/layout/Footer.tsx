import Link from "next/link";
import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";

// Pied de page complet (cahier d'intégration) : la marque, quatre colonnes de liens, et la
// mention d'indépendance. Aucun lien vers une page qui n'est pas publiée.
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61592840133412&sk=about";

const COLONNES = [
  {
    titre: "Commencer",
    liens: [
      { href: "/suis-je-concerne", label: "Suis-je concerné ?" },
      { href: "/ressources", label: "Centre de ressources" },
      { href: "/ressources/faq", label: "Questions fréquentes" },
    ],
  },
  {
    titre: "Espace communal",
    liens: [
      { href: "/declaration", label: "Ma déclaration" },
      { href: "/communes", label: "Pour les autorités locales" },
    ],
  },
  {
    titre: "Informations",
    liens: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
    ],
  },
];

const lienStyle =
  "inline-flex min-h-[44px] items-center text-sm text-muted transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-border bg-surface text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr]">
          <div className="col-span-2 md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-wordmark-dark.svg" alt="e-Culture CI" className="h-10 w-auto" width={346} height={120} />
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-muted">
              Le spectacle vivant, expliqué simplement — partout en Côte d&apos;Ivoire.
            </p>
          </div>

          {COLONNES.map((c) => (
            <nav key={c.titre} aria-label={c.titre}>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">{c.titre}</p>
              <ul className="mt-2 flex flex-col">
                {c.liens.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={lienStyle}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">Suivre</p>
            <ul className="mt-2 flex flex-col">
              <li>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={lienStyle}>
                  Facebook
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted">
          <p>{INDEPENDENCE_DISCLAIMER}</p>
          <p className="mt-2">
            Les résultats de « Suis-je concerné&nbsp;? » sont indicatifs et ne constituent pas une
            décision administrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
