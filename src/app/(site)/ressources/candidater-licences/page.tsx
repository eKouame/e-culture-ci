import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { RessourceArticle } from "@/components/ressources/RessourceArticle";
import { Callout } from "@/components/ressources/Callout";
import { NextCards } from "@/components/ressources/NextCards";

export const metadata: Metadata = pageMetadata({
  title: "Candidater aux licences de spectacle (B et C) en Côte d'Ivoire | e-Culture CI",
  description:
    "Qui est concerné, calendrier de l'appel, conditions des licences B et C, condition des 5 spectacles, coûts et caution. Guide d'orientation clair et indépendant.",
  path: "/ressources/candidater-licences",
});

const SOMMAIRE = [
  { id: "de-quoi", label: "De quoi parle-t-on exactement ?" },
  { id: "categorie", label: "Votre catégorie : A, B ou C" },
  { id: "appel", label: "L'appel à candidatures en cours" },
  { id: "conditions", label: "Les conditions d'accès" },
  { id: "preparer", label: "Ce que vous pouvez préparer dès maintenant" },
  { id: "dossier", label: "La composition du dossier" },
  { id: "et-apres", label: "Et après ?" },
];

const CATEGORIES = [
  {
    code: "A",
    nom: "Producteurs",
    description: "Vous portez le projet et assumez le risque financier du spectacle.",
  },
  {
    code: "B",
    nom: "Diffuseurs",
    description: "Vous achetez des spectacles déjà produits et vous les programmez ou présentez.",
  },
  {
    code: "C",
    nom: "Exploitants de lieux",
    description: "Vous gérez une salle ou un espace qui accueille des spectacles.",
  },
];

const MONTANTS = [
  { code: "A — Producteurs", frais: "5 000 000 FCFA", caution: "5 000 000 FCFA" },
  { code: "B — Diffuseurs", frais: "4 500 000 FCFA", caution: "5 000 000 FCFA" },
  { code: "C — Exploitants de lieux", frais: "À confirmer", caution: "À confirmer" },
];

export default function CandidaterLicencesPage() {
  return (
    <RessourceArticle
      kicker="Ressource · Être en règle"
      titre="Candidater aux licences B et C"
      dek="Qui est concerné, calendrier de l'appel, conditions d'accès, coûts et caution — pour préparer votre candidature sans vous tromper de guichet."
      meta={{ lecture: "6 min", niveau: "Intermédiaire" }}
      sommaire={SOMMAIRE}
    >
      <div className="mb-8 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-sm italic text-muted">
        Ressource e-Culture CI — outil d&apos;orientation. Cette page vous
        aide à comprendre et à préparer votre candidature. Elle ne la dépose
        pas, ne délivre aucune licence, et n&apos;a aucun lien officiel avec
        le ministère. Pour la procédure et les pièces exactes, seul le
        ministère de la Culture fait foi.
      </div>

      <section id="de-quoi" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          De quoi parle-t-on exactement ?
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Si le spectacle est votre métier, la réforme vous demande
          d&apos;obtenir une{" "}
          <strong className="text-foreground">
            licence d&apos;entrepreneur de spectacles
          </strong>
          . C&apos;est une autorisation d&apos;exercer, encadrée par
          l&apos;arrêté n°750/MCF/CAB du 14 octobre 2025, pris en
          application du décret n°2021-622 du 20 octobre 2021.
        </p>
        <p className="max-w-prose text-muted">
          Une précision utile, car les mots se mélangent souvent : la{" "}
          <strong className="text-foreground">licence</strong> (autorisation
          d&apos;exercer comme professionnel du spectacle) n&apos;est pas la
          même chose que l&apos;
          <strong className="text-foreground">
            immatriculation au registre national des artistes
          </strong>
          , qui relève du statut de l&apos;artiste et se met encore en
          place. Cette page traite de la licence. Si vous êtes artiste et
          cherchez votre protection sociale ou votre statut, voyez plutôt la
          ressource « Déclarer et payer vos artistes ».
        </p>
      </section>

      <section id="categorie" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Votre catégorie : A, B ou C
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          La licence se décline en trois catégories, selon ce que vous
          faites. Vous pouvez en cumuler plusieurs si vous exercez plusieurs
          métiers.
        </p>
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.code}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="text-3xl font-extrabold text-primary-dark">
                {c.code}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                {c.nom}
              </p>
              <p className="mt-1 text-xs text-muted">{c.description}</p>
            </div>
          ))}
        </div>
        <p className="max-w-prose text-sm text-muted">
          Pour savoir si vous êtes concerné et dans quelle catégorie, le
          module{" "}
          <a
            href="/suis-je-concerne"
            className="font-medium text-primary-dark underline"
          >
            « Suis-je concerné ? »
          </a>{" "}
          fait le tri en quelques questions.
        </p>
      </section>

      <section id="appel" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          L&apos;appel à candidatures en cours
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          C&apos;est le point d&apos;actualité, et il est daté. Un appel à
          candidatures est{" "}
          <strong className="text-foreground">
            ouvert jusqu&apos;au 15 octobre 2026
          </strong>
          , et il concerne uniquement :
        </p>
        <ul className="mb-4 flex flex-col gap-2 text-sm text-muted">
          <li>
            les licences <strong className="text-foreground">B (diffuseurs)</strong>{" "}
            et <strong className="text-foreground">C (exploitants de lieux)</strong> ;
          </li>
          <li>
            les <strong className="text-foreground">personnes morales</strong>{" "}
            (association, entreprise, structure enregistrée) — pas les
            personnes physiques à titre individuel.
          </li>
        </ul>
        <p className="mb-4 max-w-prose text-muted">
          Les dossiers sont examinés par la{" "}
          <strong className="text-foreground">CODELES</strong> (la
          commission dédiée). La licence{" "}
          <strong className="text-foreground">A (producteurs)</strong>, elle,
          n&apos;entre pas dans cet appel : elle interviendra dans une phase
          ultérieure.
        </p>

        <div className="mb-4 flex flex-col gap-3">
          <Callout variant="retenir" label="À retenir si vous êtes producteur">
            Inutile de vous précipiter sur cet appel, il ne vous concerne pas
            encore. Surveillez l&apos;ouverture du volet A.
          </Callout>
          <Callout
            variant="retenir"
            label="À retenir si vous êtes une personne physique"
          >
            L&apos;appel vise les personnes morales. Pour candidater en B ou
            C, il faudra probablement passer par une structure.
            Renseignez-vous sur ce point avant la clôture.
          </Callout>
        </div>

        <p className="max-w-prose border-t border-border pt-4 text-xs italic text-muted">
          Source : annonce de la ministre de la Culture (séance de travail
          avec l&apos;APROS-CI, 27 juillet 2026), rapportée par RTI Info et
          par le fact-checking de l&apos;AIP du 5 août 2026.
        </p>
      </section>

      <section id="conditions" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Les conditions d&apos;accès
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Au-delà du calendrier, trois conditions décident de votre
          éligibilité.
        </p>
        <p className="mb-4 max-w-prose text-muted">
          <strong className="text-foreground">Être une personne morale.</strong>{" "}
          C&apos;est la porte d&apos;entrée de l&apos;appel en cours.
        </p>
        <p className="mb-4 max-w-prose text-muted">
          <strong className="text-foreground">
            Justifier de cinq spectacles déjà organisés sous l&apos;autorité
            d&apos;un licencié.
          </strong>{" "}
          C&apos;est la condition la plus sous-médiatisée, et celle qui
          bloque le plus de débutants. Vous devez pouvoir prouver une
          expérience réelle, acquise aux côtés d&apos;un professionnel déjà
          licencié, avant d&apos;opérer en autonomie. (Fond : analyse
          juridique de Me Calo Trebissou, Village-Justice.)
        </p>
        <p className="mb-3 max-w-prose text-muted">
          <strong className="text-foreground">
            Réunir les frais et la caution.
          </strong>{" "}
          Selon les informations publiques disponibles :
        </p>
        <div className="mb-4 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-background px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-muted">
            <span>Catégorie</span>
            <span>Frais</span>
            <span>Caution</span>
          </div>
          {MONTANTS.map((m) => (
            <div
              key={m.code}
              className="grid grid-cols-3 items-center border-b border-border px-4 py-3 text-sm last:border-b-0"
            >
              <span className="font-bold text-foreground">{m.code}</span>
              <span className="text-foreground">{m.frais}</span>
              <span className="text-foreground">{m.caution}</span>
            </div>
          ))}
        </div>
        <p className="max-w-prose text-sm text-muted">
          La caution se constitue à{" "}
          <strong className="text-foreground">la banque de votre choix</strong>{" "}
          ; le ministère ne vérifie que le reçu. Ces montants circulent par
          voie de presse — confirmez-les sur pièce avant de vous engager.
        </p>
      </section>

      <section id="preparer" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Ce que vous pouvez préparer dès maintenant
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Sans attendre d&apos;avoir toutes les réponses officielles,
          plusieurs choses se préparent en amont :
        </p>
        <ul className="flex flex-col gap-2 text-sm text-muted">
          <li>
            <strong className="text-foreground">Votre structure juridique</strong>
            , si vous candidatez en personne morale et n&apos;en avez pas
            encore.
          </li>
          <li>
            <strong className="text-foreground">
              Les justificatifs de vos cinq spectacles
            </strong>{" "}
            sous l&apos;autorité d&apos;un licencié : rassemblez-les, datés
            et vérifiables.
          </li>
          <li>
            <strong className="text-foreground">La caution bancaire</strong> :
            rapprochez-vous de votre banque pour en connaître les modalités
            et les délais.
          </li>
          <li>
            <strong className="text-foreground">Votre budget</strong>, pour
            intégrer frais et caution dans un plan réaliste — la ressource «
            Bâtir votre budget » vous y aide.
          </li>
        </ul>
      </section>

      <section id="dossier" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          La composition du dossier
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          C&apos;est là qu&apos;il faut être honnête :{" "}
          <strong className="text-foreground">
            la liste exacte des pièces du dossier de candidature
            n&apos;est pas détaillée ici
          </strong>
          , parce qu&apos;elle doit venir de la source officielle et non
          d&apos;une supposition. Ne vous fiez pas à des listes trouvées
          ailleurs, notamment aux procédures d&apos;autres pays, qui ne
          s&apos;appliquent pas au contexte ivoirien.
        </p>
        <p className="max-w-prose text-muted">
          Pour la composition officielle du dossier et la procédure de
          dépôt, adressez-vous directement à la{" "}
          <strong className="text-foreground">
            Direction des affaires juridiques du ministère de la Culture
          </strong>
          . C&apos;est le seul interlocuteur qui fait foi.
        </p>
      </section>

      <p className="mt-8 max-w-prose border-t border-border pt-4 text-xs italic text-muted">
        Informations vérifiées en octobre 2026. L&apos;appel à candidatures,
        les catégories ouvertes et les montants évoluent avec la réforme :
        confirmez toujours l&apos;état en vigueur et votre cas précis auprès
        du ministère de la Culture.
      </p>

      <div id="et-apres" className="scroll-mt-24">
        <NextCards
          liens={[
            {
              href: "/ressources/budget",
              label: "Bâtir votre budget",
              description:
                "Intégrer frais, caution et coûts d'exploitation.",
            },
            {
              href: "/ressources/payer-artistes",
              label: "Déclarer et payer vos artistes",
              description: "Vos obligations une fois en activité.",
            },
            {
              href: "/suis-je-concerne",
              label: "Suis-je concerné ?",
              description: "Pour vérifier votre catégorie en quelques questions.",
            },
          ]}
        />
      </div>
    </RessourceArticle>
  );
}
