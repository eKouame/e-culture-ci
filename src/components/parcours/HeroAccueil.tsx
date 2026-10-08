import { LienMesure } from "@/components/parcours/LienMesure";

// Héro de l'accueil, « A — Portail d'orientation » : à gauche la promesse, à droite (en
// dessous sur mobile) la carte « Où en êtes-vous ? » avec les deux portes vers les
// parcours. Même contenu sur toutes les largeurs ; seule la mise en page change.

const PORTES = [
  {
    id: "idee",
    href: "/parcours/idee",
    titre: "J'ai une idée de spectacle",
    description: "Par où commencer.",
    principale: false,
  },
  {
    id: "evenement",
    href: "/parcours/evenement",
    titre: "Je prépare un événement",
    description: "Les étapes dans l'ordre, avec qui contacter.",
    principale: true,
  },
];

export function HeroAccueil() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col px-4 pb-8 pt-6 sm:px-6 md:py-14 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:py-20">
        <div className="flex flex-col gap-3.5 md:gap-7">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground md:text-5xl md:leading-[1.04] lg:text-[56px]">
            Le spectacle vivant, expliqué simplement.
          </h1>
          <p className="max-w-[540px] text-base leading-normal text-secondary md:text-xl md:leading-[1.55]">
            Réglementation, démarches, ressources&nbsp;: tout ce qu&apos;il faut pour organiser
            ou jouer, partout en Côte d&apos;Ivoire.
          </p>
          <ul className="hidden gap-7 pt-2 text-[15px] font-semibold text-foreground md:flex">
            <li>✓&nbsp; Gratuit</li>
            <li>✓&nbsp; Indépendant</li>
            <li>✓&nbsp; Pensé pour le mobile</li>
          </ul>
        </div>

        <div className="mt-2 flex flex-col gap-3 md:mt-8 md:max-w-xl lg:mt-0 lg:max-w-none rounded-[14px] border border-border bg-surface p-5 shadow-[0_16px_32px_-20px_rgba(11,42,32,0.2)] md:gap-5 md:rounded-2xl md:p-8 md:shadow-[0_24px_48px_-24px_rgba(11,42,32,0.18)]">
          <h2 className="text-lg font-bold text-foreground md:text-[22px]">Où en êtes-vous&nbsp;?</h2>
          <p className="hidden text-base leading-normal text-secondary md:block">
            Dites-le-nous, vous repartez avec vos prochaines étapes.
          </p>
          <div className="flex flex-col gap-3">
            {PORTES.map((p) => (
              <LienMesure
                key={p.id}
                href={p.href}
                evenement="porte_cliquee"
                donnees={{ porte: p.id, depuis: "hero" }}
                className={`flex min-h-[44px] flex-col gap-[3px] rounded-[10px] px-4 py-3.5 transition-colors md:gap-1 md:px-5 md:py-[18px] ${
                  p.principale
                    ? "bg-hero-accent text-white hover:brightness-95"
                    : "border border-[#d6d2c6] text-foreground hover:border-hero-accent"
                }`}
              >
                <span className="flex justify-between gap-3 text-base font-bold md:text-[17px]">
                  {p.titre}
                  <span aria-hidden="true" className={p.principale ? "" : "text-hero-accent"}>
                    →
                  </span>
                </span>
                <span
                  className={`text-[13px] md:text-sm ${
                    p.principale ? "text-[#fce9dc]" : "text-muted"
                  }`}
                >
                  {p.description}
                </span>
              </LienMesure>
            ))}
          </div>
          <p className="flex min-h-[44px] flex-wrap items-center justify-center gap-x-2 border-t border-border pt-3 text-sm text-muted md:justify-start md:text-[15px]">
            Pas sûr d&apos;être concerné&nbsp;?
            <LienMesure
              href="/suis-je-concerne"
              evenement="outil_clique"
              donnees={{ depuis: "hero", outil: "concerne", emplacement: "appel" }}
              className="inline-flex min-h-[44px] items-center font-bold text-foreground underline underline-offset-2 hover:text-hero-accent"
            >
              Faites le point
            </LienMesure>
          </p>
        </div>

        <ul className="mt-4 flex justify-between px-0.5 text-[13px] font-semibold text-foreground md:hidden">
          <li>✓ Gratuit</li>
          <li>✓ Indépendant</li>
          <li>✓ Mobile</li>
        </ul>
      </div>

    </section>
  );
}
