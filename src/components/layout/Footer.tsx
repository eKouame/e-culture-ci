export function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-medium text-foreground">
          e-Culture CI — outil indépendant d&apos;orientation des
          organisateurs de spectacles.
        </p>
        <p className="mt-1">
          Pour t&apos;aider à comprendre le décret de 2021 et l&apos;arrêté
          n°750 du 14 octobre 2025 sur le spectacle vivant en Côte
          d&apos;Ivoire, et à préparer tes démarches.
        </p>
        <p className="mt-3 text-xs">
          e-Culture CI n&apos;est pas un service officiel. Les informations
          et documents fournis sont indicatifs et ne constituent pas une
          décision administrative. Pour toute démarche officielle,
          rapproche-toi de ta mairie ou du ministère de la Culture.
        </p>
        <p className="mt-2 text-xs">
          Plus de détails dans le{" "}
          <a href="/ressources/faq" className="underline hover:text-primary">
            centre de ressources
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
