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
                src="/avatar.svg"
                alt=""
                className="h-8 w-8 rounded-lg"
                width={32}
                height={32}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-wordmark-color.svg"
                alt="e-Culture CI"
                className="h-5 w-auto"
                width={144}
                height={50}
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              Comprendre et préparer vos démarches du spectacle vivant,
              partout en Côte d&apos;Ivoire.
            </p>
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
