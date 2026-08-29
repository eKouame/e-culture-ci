import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";

const MODULE_LINKS = [
  { href: "/suis-je-concerne", label: "Suis-je concerné ?" },
  { href: "/declaration", label: "Ma déclaration" },
  { href: "/immatriculation", label: "Mon immatriculation" },
  { href: "/ressources", label: "Ressources" },
];

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
];

export function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-wordmark-dark.svg"
                alt="e-Culture CI"
                className="h-10 w-auto"
                width={288}
                height={100}
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              Comprendre et préparer vos démarches du spectacle vivant,
              partout en Côte d&apos;Ivoire.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61592840133412&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-foreground"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
              </svg>
              Suivez-nous sur Facebook
            </a>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Modules
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {MODULE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-foreground hover:text-primary-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Légal
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-foreground hover:text-primary-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Aide
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="/ressources/faq"
                  className="text-foreground hover:text-primary-dark"
                >
                  Centre de ressources
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              Les résultats du module &laquo;&nbsp;Suis-je
              concerné&nbsp;?&nbsp;&raquo; sont indicatifs et ne constituent
              pas une décision administrative.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-xs text-muted">
          ℹ️ {INDEPENDENCE_DISCLAIMER}
        </div>
      </div>
    </footer>
  );
}
