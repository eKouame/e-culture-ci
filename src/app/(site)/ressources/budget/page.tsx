import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Budget d'un spectacle en Côte d'Ivoire : comment le construire | e-Culture CI",
  description:
    "Estimer les dépenses, réunir les recettes, équilibrer et calculer votre point d'équilibre. Un guide clair pour chiffrer votre spectacle vivant. Outil d'orientation indépendant.",
  path: "/ressources/budget",
});

const SOMMAIRE = [
  { id: "pourquoi", label: "Pourquoi passer au budget" },
  { id: "principe", label: "Le principe : un budget s'équilibre" },
  { id: "depenses", label: "Vos dépenses" },
  { id: "recettes", label: "Vos recettes" },
  { id: "equilibre", label: "Le point d'équilibre" },
  { id: "modele", label: "Le modèle à remplir" },
  { id: "exemple", label: "L'exemple chiffré" },
  { id: "pieges", label: "Trois pièges à éviter" },
];

const DEPENSES = [
  {
    titre: "L'artistique",
    legende: "Le cœur de votre projet.",
    detail:
      "Cachets des artistes, des conteurs, des musiciens. Droits d'auteur si vous diffusez des œuvres qui ne sont pas les vôtres (en Côte d'Ivoire, la gestion du droit d'auteur relève du BURIDA). Répétitions.",
    lien: { label: "Voir la ressource propriété intellectuelle →", href: "/ressources/propriete-intellectuelle" },
  },
  {
    titre: "Le technique",
    legende: "Ce qui rend le spectacle possible sur le plateau.",
    detail: "Sonorisation, lumière, matériel, régie, location d'équipement, personnel technique.",
  },
  {
    titre: "Le lieu",
    legende: "Là où ça se passe.",
    detail:
      "Location de l'espace, aménagement, chaises, électricité, nettoyage. Même une cour prêtée a un coût — ne serait-ce que le branchement ou la remise en état.",
  },
  {
    titre: "La communication",
    legende: "Pour que les gens viennent.",
    detail:
      "Affiches, impression, animation des réseaux, relations avec la presse, éventuellement un visuel réalisé par un professionnel.",
  },
  {
    titre: "L'organisation",
    legende: "Tout ce qui fait tourner l'événement.",
    detail:
      "Frais de licence et démarches, s'ils vous concernent. Assurance. Transport, hébergement et restauration des équipes (les « défraiements »). Sécurité et accueil du public. Petit matériel.",
    lien: { label: "Suis-je concerné par la licence ? →", href: "/suis-je-concerne" },
  },
  {
    titre: "Une ligne à ne jamais oublier : les imprévus",
    legende: null,
    detail:
      "Prévoyez une marge — souvent autour de dix pour cent du total — pour ce que vous n'avez pas vu venir. Un budget sans marge d'imprévus se fait rattraper au premier grain de sable.",
  },
];

const RECETTES = [
  {
    titre: "La billetterie",
    detail:
      "Le nombre d'entrées que vous espérez vendre, multiplié par le prix. À estimer avec prudence : on ne remplit presque jamais une salle à cent pour cent pour un premier événement.",
  },
  {
    titre: "Les subventions et les appels à projets",
    detail:
      "Les guichets publics ou institutionnels. À traiter comme une recette espérée tant que la réponse n'est pas tombée — jamais comme un acquis.",
  },
  {
    titre: "Le sponsoring et le mécénat",
    detail:
      "Le soutien d'entreprises ou de partenaires, en argent ou en nature (un imprimeur qui offre les affiches, un traiteur qui fournit le buffet). Le soutien en nature compte : il réduit d'autant vos dépenses.",
  },
  {
    titre: "La coproduction",
    detail: "Un partenaire qui partage la charge et le risque avec vous.",
  },
  {
    titre: "Vos apports propres",
    detail: "Ce que vous mettez vous-même, ou ce que votre structure engage.",
  },
];

const PIEGES = [
  {
    titre: "Prendre l'espéré pour de l'acquis.",
    detail:
      "Une subvention demandée n'est pas une subvention reçue. Tant qu'une recette n'est pas confirmée par écrit, traitez-la comme incertaine et prévoyez un plan B. Un budget qui ne tient que si tout se passe bien ne tient pas.",
  },
  {
    titre: "Oublier ce qui ne se paie pas en argent.",
    detail:
      "Le temps que vous donnez, la cour qu'on vous prête, les affiches qu'on vous offre : cela a une valeur. Le faire apparaître (en dépense évitée ou en recette en nature) donne la vraie image de votre projet — et vous aide à remercier justement ceux qui vous soutiennent.",
  },
  {
    titre: "Boucler le budget une seule fois.",
    detail:
      "Un budget prévisionnel est vivant. Il change quand un partenaire se retire, quand un devis arrive, quand la jauge évolue. Rouvrez-le à chaque étape. Le jour du spectacle, comparez le prévu et le réel : c'est ainsi qu'on apprend, et que le budget suivant sera plus juste.",
  },
];

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">
        Centre de ressources
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        De la note d&apos;intention au budget
      </h1>

      <div className="mt-4 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-sm italic text-muted">
        Ressource e-Culture CI — outil d&apos;orientation. Cette page vous
        aide à comprendre et à préparer. Elle ne délivre aucun document
        officiel et ne se substitue ni au ministère, ni à votre mairie, ni
        à un professionnel du chiffre.
      </div>

      <nav className="mt-8 rounded-xl border border-border bg-black/[0.02] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          Sommaire
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
          {SOMMAIRE.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary-dark underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="pourquoi" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Pourquoi passer au budget
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Dans{" "}
          <Link
            href="/ressources/note-intention"
            className="font-medium text-primary-dark underline"
          >
            la ressource précédente
          </Link>
          , vous avez transformé une idée en note d&apos;intention : ce que
          vous voulez faire, pourquoi, pour qui, comment, et pourquoi ici et
          maintenant. Vous imaginiez « Cour commune » — une soirée de
          contes et de musique dans une cour de quartier, un dimanche en
          fin d&apos;après-midi.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          La note d&apos;intention dit ce que vous voulez faire. Le budget
          dit <strong className="text-foreground">si vous pouvez le faire</strong>.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          C&apos;est le moment où le projet touche le réel. Un budget
          n&apos;est pas une formalité qu&apos;on remplit à la fin : c&apos;est
          un outil de décision. Il vous dit combien coûte votre ambition,
          combien vous devez réunir, et à partir de quel moment votre
          spectacle tient debout financièrement. Beaucoup de beaux projets
          s&apos;arrêtent là — non parce qu&apos;ils étaient mauvais, mais
          parce que personne n&apos;avait posé les chiffres à temps.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Bonne nouvelle : un budget de spectacle repose sur une idée très
          simple.
        </p>
      </section>

      <section id="principe" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Le principe : un budget s&apos;équilibre
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Un budget prévisionnel a deux colonnes.{" "}
          <strong className="text-foreground">Les dépenses</strong>{" "}
          — tout ce que le spectacle vous coûte.{" "}
          <strong className="text-foreground">Les recettes</strong>{" "}
          — tout ce que vous réunissez pour le payer.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          La règle est unique :{" "}
          <strong className="text-foreground">
            les deux colonnes doivent être égales.
          </strong>{" "}
          Si vos dépenses s&apos;élèvent à un million, vous devez réunir un
          million. Un budget qui ne s&apos;équilibre pas n&apos;est pas un
          budget, c&apos;est une alerte.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          On parle de budget <em>prévisionnel</em>{" "}
          parce qu&apos;il se construit avant l&apos;événement, à partir
          d&apos;estimations.
          Vous ne connaissez pas encore le montant exact de chaque poste :
          vous le prévoyez, au plus juste, quitte à ajuster ensuite.
        </p>
      </section>

      <section id="depenses" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">Vos dépenses</h2>
        <p className="mt-3 max-w-prose text-muted">
          Listez tout, même ce qui vous paraît petit. Un budget honnête est
          un budget complet. On peut regrouper les dépenses d&apos;un
          spectacle en grandes familles.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {DEPENSES.map((d) => (
            <div
              key={d.titre}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="font-bold text-foreground">
                {d.titre}
                {d.legende && (
                  <span className="font-normal text-muted"> — {d.legende}</span>
                )}
              </p>
              <p className="mt-1.5 text-sm text-muted">{d.detail}</p>
              {d.lien && (
                <Link
                  href={d.lien.href}
                  className="mt-2 inline-block text-sm font-medium text-primary-dark underline"
                >
                  {d.lien.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="recettes" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">Vos recettes</h2>
        <p className="mt-3 max-w-prose text-muted">
          D&apos;où vient l&apos;argent. Un bon budget ne repose jamais sur
          une seule source.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {RECETTES.map((r) => (
            <div
              key={r.titre}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="font-bold text-foreground">{r.titre}</p>
              <p className="mt-1.5 text-sm text-muted">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="equilibre" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Le point d&apos;équilibre : combien d&apos;entrées pour tenir ?
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Une question revient toujours :{" "}
          <strong className="text-foreground">
            à partir de combien de spectateurs mon événement est-il couvert ?
          </strong>
        </p>
        <Card className="mt-4 border-primary/30 bg-primary-light">
          <p className="max-w-prose text-sm text-foreground">
            C&apos;est le point d&apos;équilibre. On le calcule simplement :
            prenez vos dépenses totales, retirez les recettes qui ne
            dépendent pas du public (subventions confirmées, sponsors,
            apports), et divisez ce qui reste par le prix d&apos;une
            entrée. Vous obtenez le nombre d&apos;entrées à vendre pour ne
            rien perdre.
          </p>
          <p className="mt-3 max-w-prose text-sm text-foreground">
            Ce chiffre est précieux. S&apos;il est plus grand que la
            capacité de votre lieu, votre modèle ne tient pas : il faut
            baisser les dépenses, augmenter le prix, ou trouver d&apos;autres
            recettes. Mieux vaut le découvrir sur le papier que le soir
            même.
          </p>
        </Card>
      </section>

      <section id="modele" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Le modèle à remplir
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Recopiez cette trame et remplacez chaque ligne par vos propres
          estimations.
        </p>

        <p className="mt-5 text-sm font-bold uppercase tracking-wide text-muted">
          Dépenses
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-black/[0.02] text-left">
                <th className="p-3 font-semibold text-foreground">Poste</th>
                <th className="p-3 font-semibold text-foreground">Détail</th>
                <th className="p-3 font-semibold text-foreground">
                  Montant estimé (FCFA)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Artistique", "Cachets, droits d'auteur, répétitions"],
                ["Technique", "Son, lumière, matériel, régie"],
                ["Lieu", "Location, aménagement, électricité"],
                ["Communication", "Affiches, impression, réseaux, presse"],
                ["Organisation", "Licence, assurance, défraiements, sécurité"],
                ["Imprévus", "Environ 10 % du total"],
              ].map(([poste, detail]) => (
                <tr key={poste} className="border-t border-border">
                  <td className="p-3 text-foreground">{poste}</td>
                  <td className="p-3 text-muted">{detail}</td>
                  <td className="p-3 text-muted">—</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-black/[0.02] font-bold">
                <td className="p-3 text-foreground" colSpan={2}>
                  TOTAL DÉPENSES
                </td>
                <td className="p-3 text-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-muted">
          Recettes
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-black/[0.02] text-left">
                <th className="p-3 font-semibold text-foreground">Poste</th>
                <th className="p-3 font-semibold text-foreground">Détail</th>
                <th className="p-3 font-semibold text-foreground">
                  Montant estimé (FCFA)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Billetterie", "Nombre d'entrées × prix"],
                ["Subventions", "Guichets, appels à projets (espérés)"],
                ["Sponsoring / mécénat", "En argent et en nature"],
                ["Coproduction", "Part d'un partenaire"],
                ["Apports propres", "Votre engagement"],
              ].map(([poste, detail]) => (
                <tr key={poste} className="border-t border-border">
                  <td className="p-3 text-foreground">{poste}</td>
                  <td className="p-3 text-muted">{detail}</td>
                  <td className="p-3 text-muted">—</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-black/[0.02] font-bold">
                <td className="p-3 text-foreground" colSpan={2}>
                  TOTAL RECETTES
                </td>
                <td className="p-3 text-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-prose text-sm font-medium text-foreground">
          Les deux totaux doivent être égaux. S&apos;ils ne le sont pas,
          votre budget vous dit qu&apos;il reste un travail à faire —
          c&apos;est exactement à ça qu&apos;il sert.
        </p>
      </section>

      <section id="exemple" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          « Cour commune » : l&apos;exemple chiffré
        </h2>
        <Card className="mt-4 border-secondary/30 bg-secondary-light">
          <p className="text-sm font-semibold text-secondary-dark">
            Exemple fictif — sert uniquement à illustrer la méthode.
          </p>
          <p className="mt-2 max-w-prose text-sm text-foreground">
            Reprenons la soirée de contes imaginée dans la ressource
            précédente. Tous les montants ci-dessous sont fictifs et
            servent seulement à illustrer la méthode — les vôtres
            dépendront de votre réalité.
          </p>
          <p className="mt-2 max-w-prose text-sm text-foreground">
            L&apos;équipe vise une cour de quartier, une centaine de
            places, un prix d&apos;entrée volontairement doux pour que le
            voisinage vienne.
          </p>

          <p className="mt-4 text-sm font-bold text-foreground">
            Dépenses estimées
          </p>
          <ul className="mt-1.5 flex flex-col gap-1 text-sm text-foreground">
            <li>Artistique (deux conteurs, un trio de musiciens, droits) : 400 000</li>
            <li>Technique (sono légère, quelques projecteurs, un régisseur) : 250 000</li>
            <li>Lieu (aménagement de la cour, chaises, électricité, nettoyage) : 120 000</li>
            <li>Communication (affiches, impression, réseaux) : 80 000</li>
            <li>Organisation (assurance, défraiements, accueil, sécurité) : 100 000</li>
            <li>Imprévus (10 %) : 95 000</li>
            <li className="font-bold">Total dépenses : 1 045 000 FCFA</li>
          </ul>

          <p className="mt-4 text-sm font-bold text-foreground">
            Recettes estimées
          </p>
          <ul className="mt-1.5 flex flex-col gap-1 text-sm text-foreground">
            <li>Billetterie (80 entrées vendues × 2 000) : 160 000</li>
            <li>Sponsoring en nature (un imprimeur offre les affiches, valorisé) : 80 000</li>
            <li>Soutien d&apos;un partenaire de quartier : 300 000</li>
            <li>Apport propre de l&apos;équipe : 200 000</li>
            <li className="font-bold">Total recettes : 740 000 FCFA</li>
          </ul>

          <p className="mt-4 max-w-prose text-sm text-foreground">
            <strong>Verdict.</strong>{" "}
            Les deux colonnes ne s&apos;équilibrent pas : il manque{" "}
            <strong>305 000 FCFA</strong>. Le budget a fait
            son travail — il a révélé le trou avant la soirée. L&apos;équipe
            a maintenant trois leviers : réduire une dépense (une sono plus
            modeste), augmenter une recette (un deuxième partenaire, un
            prix légèrement plus haut), ou chercher une petite subvention.
            Tant que l&apos;écart n&apos;est pas comblé, le spectacle
            n&apos;est pas prêt.
          </p>
          <p className="mt-3 max-w-prose text-sm text-foreground">
            <strong>Et le point d&apos;équilibre ?</strong>{" "}
            Si l&apos;on retire les recettes hors billetterie (580 000) des
            dépenses (1 045 000), il reste 465 000 à couvrir par les
            entrées. À 2 000 FCFA l&apos;entrée, cela fait{" "}
            <strong>233 entrées</strong>{" "}
            — bien plus que la centaine de places de la cour. Le signal est clair : « Cour commune » ne
            peut pas reposer sur la billetterie seule. Son équilibre
            viendra des partenaires. Voilà une décision stratégique que
            seul le budget pouvait faire apparaître.
          </p>
        </Card>
      </section>

      <section id="pieges" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Trois pièges à éviter
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {PIEGES.map((p) => (
            <div
              key={p.titre}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="font-bold text-foreground">{p.titre}</p>
              <p className="mt-1.5 max-w-prose text-sm text-muted">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-prose text-sm text-muted">
        Une fois votre budget équilibré, vous tenez un dossier solide —
        celui que vous pourrez présenter à un partenaire, à une mairie ou
        à un guichet de financement. C&apos;est la suite logique : faire
        de votre note d&apos;intention et de votre budget un dossier qui
        convainc.
      </p>
    </div>
  );
}
