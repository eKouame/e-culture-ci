import { INDEPENDENCE_DISCLAIMER } from "@/lib/disclaimer";

export function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-medium text-foreground">
          e-Culture CI — Guichet Unique de Déclaration et d&apos;Orientation
        </p>
        <p className="mt-2 rounded-lg border border-border bg-black/[0.02] px-3 py-2 text-xs">
          ℹ️ {INDEPENDENCE_DISCLAIMER}
        </p>
        <p className="mt-3">
          Plateforme d&apos;accompagnement des acteurs du spectacle vivant, en
          application du décret de 2021 relatif au spectacle vivant en Côte
          d&apos;Ivoire.
        </p>
        <p className="mt-3 text-xs">
          Les résultats du module &laquo;&nbsp;Suis-je concerné&nbsp;?&nbsp;&raquo;
          sont indicatifs et ne constituent pas une décision administrative.
          Pour toute question, consultez le{" "}
          <a href="/ressources/faq" className="underline hover:text-primary">
            centre de ressources
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
