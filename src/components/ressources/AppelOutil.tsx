import { LienOutil } from "@/components/outils/LienOutil";

// Appel dans le texte vers un outil interactif, là où l'outil répond à la question que
// la page vient de poser. Jamais plus de deux appels par page.
export function AppelOutil({
  href,
  depuis,
  outil,
  titre,
  description,
  bouton,
}: {
  href: string;
  depuis: string;
  outil: string;
  titre: string;
  description: string;
  bouton: string;
}) {
  return (
    <aside className="no-print my-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-secondary/30 bg-secondary-light p-5">
      <div className="max-w-prose">
        <p className="text-lg font-extrabold text-secondary-dark">{titre}</p>
        <p className="mt-1 text-sm text-foreground">{description}</p>
      </div>
      <LienOutil
        href={href}
        depuis={depuis}
        outil={outil}
        emplacement="appel"
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {bouton}
      </LienOutil>
    </aside>
  );
}
