import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | e-Culture CI",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">e-Culture CI</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Mentions légales
      </h1>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">
            Éditeur du site
          </h2>
          <p className="mt-2">
            Le site e-Culture CI (
            <a
              href="https://e-culture-ci.vercel.app"
              className="underline hover:text-primary"
            >
              https://e-culture-ci.vercel.app
            </a>
            ) est édité par Élie Kouamé, à titre d&apos;initiative personnelle
            et indépendante.
          </p>
          <p className="mt-2">
            Contact :{" "}
            <a
              href="mailto:servicemonde77@gmail.com"
              className="underline hover:text-primary"
            >
              servicemonde77@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Nature du service
          </h2>
          <p className="mt-2">
            e-Culture CI est un service d&apos;information indépendant. Il
            n&apos;a aucun lien officiel avec le ministère de la Culture et
            de la Francophonie de Côte d&apos;Ivoire, ni avec aucune
            administration. Il aide les organisateurs de spectacles vivants
            à comprendre la réglementation et à préparer leurs démarches. Il
            ne délivre aucun document officiel et ne procède à aucune
            déclaration ou immatriculation auprès des autorités.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Hébergement du site
          </h2>
          <p className="mt-2">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis —{" "}
            <a
              href="https://vercel.com"
              className="underline hover:text-primary"
            >
              vercel.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Propriété intellectuelle
          </h2>
          <p className="mt-2">
            Les contenus de ce site (textes, structure, éléments graphiques)
            sont la propriété de leur éditeur, sauf mention contraire. Toute
            reproduction sans autorisation est interdite. Les textes de loi
            et documents officiels référencés demeurent la propriété des
            autorités qui les émettent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Responsabilité
          </h2>
          <p className="mt-2">
            Les informations diffusées sur e-Culture CI sont fournies à
            titre indicatif et pour faciliter la compréhension de la
            réglementation. Elles ne constituent pas un conseil juridique et
            ne sauraient engager la responsabilité de l&apos;éditeur quant à
            l&apos;issue d&apos;une démarche officielle. L&apos;utilisateur
            reste seul responsable de l&apos;accomplissement effectif de ses
            obligations auprès des autorités compétentes.
          </p>
        </section>
      </div>
    </div>
  );
}
