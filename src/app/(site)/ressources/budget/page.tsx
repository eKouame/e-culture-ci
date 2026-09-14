import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { RessourceArticle } from "@/components/ressources/RessourceArticle";
import { Callout } from "@/components/ressources/Callout";
import { ExampleCard } from "@/components/ressources/ExampleCard";
import { NextCards } from "@/components/ressources/NextCards";

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

type DepenseItem = {
  titre: string;
  legende: string | null;
  detail: string;
  liens?: { label: string; href: string }[];
};

const DEPENSES: DepenseItem[] = [
  {
    titre: "L'artistique",
    legende: "Le cœur de votre projet.",
    detail:
      "Cachets des artistes, des conteurs, des musiciens. Droits d'auteur si vous diffusez des œuvres qui ne sont pas les vôtres (en Côte d'Ivoire, la gestion du droit d'auteur relève du BURIDA). Répétitions.",
    liens: [
      { label: "Voir la ressource propriété intellectuelle →", href: "/ressources/propriete-intellectuelle" },
      { label: "Déclarer et payer vos artistes →", href: "/ressources/payer-artistes" },
    ],
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
    liens: [{ label: "Suis-je concerné par la licence ? →", href: "/suis-je-concerne" }],
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
    <RessourceArticle
      kicker="Ressource · Monter votre projet"
      titre="Bâtir votre budget"
      dek="Chiffrer votre spectacle, l'équilibrer, et savoir s'il tient debout — avant le soir J, pas après."
      meta={{ lecture: "6 min", niveau: "Débutant" }}
      sommaire={SOMMAIRE}
    >
      <div className="mb-8 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-sm italic text-muted">
        Ressource e-Culture CI — outil d&apos;orientation. Cette page vous
        aide à comprendre et à préparer. Elle ne délivre aucun document
        officiel et ne se substitue ni au ministère, ni à votre mairie, ni
        à un professionnel du chiffre.
      </div>

      <section id="pourquoi" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Pourquoi passer au budget
        </h2>
        <p className="mb-4 max-w-prose text-muted">
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
        <p className="mb-4 max-w-prose text-muted">
          La note d&apos;intention dit ce que vous voulez faire. Le budget
          dit <strong className="text-foreground">si vous pouvez le faire</strong>.
        </p>
        <p className="mb-4 max-w-prose text-muted">
          C&apos;est le moment où le projet touche le réel. Un budget
          n&apos;est pas une formalité qu&apos;on remplit à la fin : c&apos;est
          un outil de décision. Il vous dit combien coûte votre ambition,
          combien vous devez réunir, et à partir de quel moment votre
          spectacle tient debout financièrement. Beaucoup de beaux projets
          s&apos;arrêtent là — non parce qu&apos;ils étaient mauvais, mais
          parce que personne n&apos;avait posé les chiffres à temps.
        </p>
        <p className="mb-4 max-w-prose text-muted">
          Bonne nouvelle : un budget de spectacle repose sur une idée très
          simple.
        </p>
      </section>

      <section id="principe" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Le principe : un budget s&apos;équilibre
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Un budget prévisionnel a deux colonnes.{" "}
          <strong className="text-foreground">Les dépenses</strong>{" "}
          — tout ce que le spectacle vous coûte.{" "}
          <strong className="text-foreground">Les recettes</strong>{" "}
          — tout ce que vous réunissez pour le payer.
        </p>
        <div className="mb-4">
          <Callout variant="retenir">
            Les deux colonnes doivent être égales. Un budget qui ne
            s&apos;équilibre pas n&apos;est pas un budget : c&apos;est une
            alerte.
          </Callout>
        </div>
        <p className="mb-4 max-w-prose text-muted">
          On parle de budget <em>prévisionnel</em>{" "}
          parce qu&apos;il se construit avant l&apos;événement, à partir
          d&apos;estimations.
          Vous ne connaissez pas encore le montant exact de chaque poste :
          vous le prévoyez, au plus juste, quitte à ajuster ensuite.
        </p>
      </section>

      <section id="depenses" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Vos dépenses
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Listez tout, même ce qui vous paraît petit. Un budget honnête est
          un budget complet. On peut regrouper les dépenses d&apos;un
          spectacle en grandes familles.
        </p>
        <div className="flex flex-col gap-3">
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
              {d.liens && (
                <div className="mt-2 flex flex-col gap-1">
                  {d.liens.map((lien) => (
                    <Link
                      key={lien.href}
                      href={lien.href}
                      className="inline-block text-sm font-medium text-primary-dark underline"
                    >
                      {lien.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="recettes" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Vos recettes
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          D&apos;où vient l&apos;argent. Un bon budget ne repose jamais sur
          une seule source.
        </p>
        <div className="flex flex-col gap-3">
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

      <section id="equilibre" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Le point d&apos;équilibre : combien d&apos;entrées pour tenir ?
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Une question revient toujours :{" "}
          <strong className="text-foreground">
            à partir de combien de spectateurs mon événement est-il couvert ?
          </strong>
        </p>
        <div className="mb-4 rounded-xl bg-secondary p-5 text-white">
          <h3 className="text-base font-bold">Le calcul, en une ligne</h3>
          <p className="mt-2 max-w-prose text-sm text-white/90">
            Prenez vos dépenses totales, retirez les recettes qui ne
            dépendent pas du public (subventions confirmées, sponsors,
            apports), et divisez ce qui reste par le prix d&apos;une
            entrée. Vous obtenez le nombre d&apos;entrées à vendre pour ne
            rien perdre.
          </p>
        </div>
        <p className="mb-4 max-w-prose text-muted">
          Ce chiffre est précieux. S&apos;il est plus grand que la
          capacité de votre lieu, votre modèle ne tient pas : il faut
          baisser les dépenses, augmenter le prix, ou trouver d&apos;autres
          recettes. Mieux vaut le découvrir sur le papier que le soir
          même.
        </p>
      </section>

      <section id="modele" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Le modèle à remplir
        </h2>
        <p className="mb-4 max-w-prose text-muted">
          Recopiez cette trame et remplacez chaque ligne par vos propres
          estimations.
        </p>

        <p className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-muted">
          Dépenses
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-secondary text-left text-white">
                <th className="p-3 font-semibold">Poste</th>
                <th className="p-3 font-semibold">Détail</th>
                <th className="p-3 font-semibold">Montant estimé (FCFA)</th>
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
              <tr className="border-t-2 border-border bg-black/[0.02] font-bold">
                <td className="p-3 text-secondary-dark" colSpan={2}>
                  TOTAL DÉPENSES
                </td>
                <td className="p-3 text-secondary-dark">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-muted">
          Recettes
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-secondary text-left text-white">
                <th className="p-3 font-semibold">Poste</th>
                <th className="p-3 font-semibold">Détail</th>
                <th className="p-3 font-semibold">Montant estimé (FCFA)</th>
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
              <tr className="border-t-2 border-border bg-black/[0.02] font-bold">
                <td className="p-3 text-secondary-dark" colSpan={2}>
                  TOTAL RECETTES
                </td>
                <td className="p-3 text-secondary-dark">—</td>
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

      <section id="exemple" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          « Cour commune » : l&apos;exemple chiffré
        </h2>
        <ExampleCard
          label="Exemple fictif — sert uniquement à illustrer la méthode"
          verdict={
            <div className="flex flex-col gap-3">
              <p>
                <strong>Verdict.</strong>{" "}
                Les deux colonnes ne s&apos;équilibrent pas : il manque{" "}
                <strong>305 000 FCFA</strong>. Le budget a fait son travail
                — il a révélé le trou avant la soirée. L&apos;équipe a
                maintenant trois leviers : réduire une dépense (une sono
                plus modeste), augmenter une recette (un deuxième
                partenaire, un prix légèrement plus haut), ou chercher une
                petite subvention. Tant que l&apos;écart n&apos;est pas
                comblé, le spectacle n&apos;est pas prêt.
              </p>
              <p>
                <strong>Et le point d&apos;équilibre ?</strong>{" "}
                Si l&apos;on retire les recettes hors billetterie (580 000)
                des dépenses (1 045 000), il reste 465 000 à couvrir par
                les entrées. À 2 000 FCFA l&apos;entrée, cela fait{" "}
                <strong>233 entrées</strong> — bien plus que la centaine de
                places de la cour. Le signal est clair : « Cour commune »
                ne peut pas reposer sur la billetterie seule. Son équilibre
                viendra des partenaires. Voilà une décision stratégique que
                seul le budget pouvait faire apparaître.
              </p>
            </div>
          }
        >
          <p className="mb-2">
            Reprenons la soirée de contes imaginée dans la ressource
            précédente. Tous les montants ci-dessous sont fictifs et
            servent seulement à illustrer la méthode — les vôtres
            dépendront de votre réalité.
          </p>
          <p>
            L&apos;équipe vise une cour de quartier, une centaine de
            places, un prix d&apos;entrée volontairement doux pour que le
            voisinage vienne.
          </p>

          <p className="mb-1.5 mt-4 font-bold">Dépenses estimées</p>
          <ul className="flex flex-col gap-1">
            <li>Artistique (deux conteurs, un trio de musiciens, droits) : 400 000</li>
            <li>Technique (sono légère, quelques projecteurs, un régisseur) : 250 000</li>
            <li>Lieu (aménagement de la cour, chaises, électricité, nettoyage) : 120 000</li>
            <li>Communication (affiches, impression, réseaux) : 80 000</li>
            <li>Organisation (assurance, défraiements, accueil, sécurité) : 100 000</li>
            <li>Imprévus (10 %) : 95 000</li>
            <li className="font-bold">Total dépenses : 1 045 000 FCFA</li>
          </ul>

          <p className="mb-1.5 mt-4 font-bold">Recettes estimées</p>
          <ul className="flex flex-col gap-1">
            <li>Billetterie (80 entrées vendues × 2 000) : 160 000</li>
            <li>Sponsoring en nature (un imprimeur offre les affiches, valorisé) : 80 000</li>
            <li>Soutien d&apos;un partenaire de quartier : 300 000</li>
            <li>Apport propre de l&apos;équipe : 200 000</li>
            <li className="font-bold">Total recettes : 740 000 FCFA</li>
          </ul>
        </ExampleCard>
      </section>

      <section id="pieges" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Trois pièges à éviter
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PIEGES.map((p, i) => (
            <div
              key={p.titre}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-sm font-extrabold text-primary-dark">
                {i + 1}
              </span>
              <p className="font-bold text-foreground">{p.titre}</p>
              <p className="mt-1.5 text-sm text-muted">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-2 max-w-prose text-sm text-muted">
        Une fois votre budget équilibré, vous tenez un dossier solide —
        celui que vous pourrez présenter à un partenaire, à une mairie ou
        à un guichet de financement. C&apos;est la suite logique : faire
        de votre note d&apos;intention et de votre budget un dossier qui
        convainc.
      </p>

      <NextCards
        liens={[
          {
            href: "/ressources/payer-artistes",
            label: "Déclarer et payer vos artistes",
            description: "Cachet, retenue à la source, CNPS.",
          },
          {
            href: "/ressources/propriete-intellectuelle",
            label: "Propriété intellectuelle",
            description: "Protéger vos œuvres, respecter celles des autres.",
          },
        ]}
      />
    </RessourceArticle>
  );
}
