import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | e-Culture CI",
};

export default function ConditionsUtilisationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">e-Culture CI</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Conditions d&apos;utilisation
      </h1>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">
            Objet du service
          </h2>
          <p className="mt-2">
            e-Culture CI est un outil gratuit d&apos;information et
            d&apos;aide à la préparation des démarches liées à
            l&apos;organisation de spectacles vivants en Côte d&apos;Ivoire.
            En utilisant ce site, vous acceptez les présentes conditions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Ce que le service fait
          </h2>
          <p className="mt-2">
            e-Culture CI vous aide à déterminer si une licence vous concerne,
            à préparer votre déclaration ou votre dossier
            d&apos;immatriculation, et à comprendre la réglementation en
            langage simple. Il produit des récapitulatifs à titre
            préparatoire et vous oriente vers les guichets officiels
            compétents.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Ce que le service ne fait pas
          </h2>
          <p className="mt-2">
            e-Culture CI ne déclare pas votre événement, ne vous immatricule
            pas, ne délivre aucun récépissé ni document officiel, et
            n&apos;effectue aucune démarche en votre nom auprès des
            autorités. Les récapitulatifs générés sont des documents
            d&apos;aide, sans valeur juridique, qui ne remplacent pas les
            démarches officielles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Responsabilité de l&apos;utilisateur
          </h2>
          <p className="mt-2">
            Les informations fournies le sont à titre indicatif. La
            réglementation peut évoluer ; il vous appartient de vérifier les
            obligations en vigueur auprès des autorités compétentes et
            d&apos;accomplir effectivement vos démarches. L&apos;éditeur ne
            saurait être tenu responsable d&apos;un événement organisé sans
            les autorisations requises, ni des conséquences d&apos;une
            démarche non effectuée ou mal effectuée.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Exactitude des informations
          </h2>
          <p className="mt-2">
            L&apos;éditeur s&apos;efforce de tenir les informations exactes
            et à jour, sans garantir leur exhaustivité ni leur parfaite
            conformité à tout moment avec les textes en vigueur. En cas de
            doute, les textes officiels et les autorités compétentes font
            foi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Évolution du service
          </h2>
          <p className="mt-2">
            L&apos;éditeur peut modifier, suspendre ou faire évoluer le
            service et les présentes conditions à tout moment. La version en
            vigueur est celle publiée sur le site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2">
            Pour toute question :{" "}
            <a
              href="mailto:servicemonde77@gmail.com"
              className="underline hover:text-primary-dark"
            >
              servicemonde77@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
