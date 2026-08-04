import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | e-Culture CI",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">e-Culture CI</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Politique de confidentialité
      </h1>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="text-lg font-bold text-foreground">
            Responsable du traitement
          </h2>
          <p className="mt-2">
            Les données collectées sur e-Culture CI sont traitées par Élie
            Kouamé, éditeur du site.
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
            Quelles données et pourquoi
          </h2>
          <p className="mt-2">
            Lorsque vous utilisez e-Culture CI, vous pouvez être amené à
            saisir des informations concernant votre événement (type,
            intitulé, jauge, lieu, date) ainsi que, si vous le souhaitez, vos
            coordonnées (nom, adresse électronique, numéro de téléphone) pour
            obtenir un récapitulatif, être recontacté ou être mis en
            relation. Ces informations servent uniquement à ces finalités et
            à l&apos;amélioration du service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Conservation</h2>
          <p className="mt-2">
            Ces informations sont enregistrées dans une base de données et
            conservées pendant la durée nécessaire au traitement de votre
            demande, dans la limite de 12 mois à compter de votre dernière
            utilisation, puis supprimées.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Hébergement et localisation des données
          </h2>
          <p className="mt-2">
            Les données sont enregistrées dans une base de données fournie
            par Neon Inc., dont les serveurs utilisés pour ce service sont
            situés dans l&apos;Union européenne (Francfort, Allemagne) et
            relèvent à ce titre d&apos;un cadre de protection reconnu. Neon
            agit comme prestataire technique et n&apos;utilise pas ces
            données à d&apos;autres fins.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Aucune transmission à des tiers
          </h2>
          <p className="mt-2">
            Vos données ne sont ni vendues, ni cédées, ni communiquées à des
            tiers, y compris à des administrations. e-Culture CI ne réalise
            aucune démarche officielle en votre nom.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Sécurité</h2>
          <p className="mt-2">
            L&apos;éditeur met en œuvre des mesures raisonnables pour
            protéger vos données contre tout accès non autorisé. Aucune
            transmission sur Internet ne pouvant être garantie totalement
            sûre, une sécurité absolue ne peut néanmoins être assurée.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Vos droits</h2>
          <p className="mt-2">
            Conformément à la loi ivoirienne n°2013-450 du 19 juin 2013
            relative à la protection des données à caractère personnel, vous
            disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;opposition et de suppression des données vous concernant.
            Pour l&apos;exercer, écrivez à{" "}
            <a
              href="mailto:servicemonde77@gmail.com"
              className="underline hover:text-primary"
            >
              servicemonde77@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            Mise en conformité
          </h2>
          <p className="mt-2">
            e-Culture CI est une initiative récente, en cours de mise en
            conformité avec les formalités prévues par la loi n°2013-450
            auprès de l&apos;Autorité de protection (
            <a
              href="https://www.artci.ci"
              className="underline hover:text-primary"
            >
              ARTCI
            </a>
            ). Vous pouvez, à tout moment, demander la suppression de vos
            données à l&apos;adresse ci-dessus.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Cookies</h2>
          <p className="mt-2">
            Ce site utilise Vercel Analytics pour mesurer sa fréquentation de
            façon anonyme et agrégée. Cet outil ne dépose aucun cookie et ne
            suit pas les visiteurs individuellement d&apos;un site à
            l&apos;autre. e-Culture CI n&apos;utilise aucun cookie de suivi
            publicitaire ou de profilage.
          </p>
        </section>
      </div>
    </div>
  );
}
