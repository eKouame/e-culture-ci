import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";

export function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-medium text-foreground">
          e-Culture CI — Comprendre et préparer vos démarches du spectacle vivant
        </p>
        <p className="mt-2 rounded-lg border border-border bg-black/[0.02] px-3 py-2 text-xs">
          ℹ️ {INDEPENDENCE_DISCLAIMER}
        </p>
        <p className="mt-3">
          Plateforme d&apos;accompagnement des acteurs du spectacle vivant,
          pour vous aider à comprendre le décret de 2021 relatif au
          spectacle vivant en Côte d&apos;Ivoire.
        </p>
        <p className="mt-3 text-xs">
          Les résultats du module &laquo;&nbsp;Suis-je concerné&nbsp;?&nbsp;&raquo;
          sont indicatifs et ne constituent pas une décision administrative.
          Pour toute question, consultez le{" "}
          <a href="/ressources/faq" className="underline hover:text-primary-dark">
            centre de ressources
          </a>
          .
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 text-xs">
          <a href="/mentions-legales" className="underline hover:text-primary-dark">
            Mentions légales
          </a>
          <a href="/confidentialite" className="underline hover:text-primary-dark">
            Politique de confidentialité
          </a>
          <a
            href="/conditions-utilisation"
            className="underline hover:text-primary-dark"
          >
            Conditions d&apos;utilisation
          </a>
        </nav>
      </div>
    </footer>
  );
}
