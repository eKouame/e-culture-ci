import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title:
    "Payer un artiste en Côte d'Ivoire : retenue à la source, CNPS, cachet | e-Culture CI",
  description:
    "Comment déclarer et payer un artiste sans se tromper : retenue à la source (7,5 % ou 20 %), cotisations CNPS, statut de l'artiste. Guide clair et à jour 2026. Outil d'orientation indépendant.",
  path: "/ressources/payer-artistes",
});

const SOMMAIRE = [
  { id: "pourquoi", label: "Pourquoi cette question est mal comprise" },
  { id: "casquette-1", label: "L'artiste, travailleur indépendant" },
  { id: "casquette-2", label: "Ce que ça change pour vous" },
  { id: "statut", label: "Le statut de l'artiste" },
  { id: "reflexes", label: "Les bons réflexes" },
  { id: "lexique", label: "Lexique" },
  { id: "et-apres", label: "Et après ?" },
];

const TAUX = [
  {
    taux: "7,5 %",
    label: "Artiste résident",
    detail: "Retenue BNC sur le montant brut du cachet.",
  },
  {
    taux: "20 %",
    label: "Artiste non-résident",
    detail: "Sur le montant brut, réductible par convention fiscale.",
  },
  {
    taux: "0 %",
    label: "Régime réel + facture normalisée",
    detail: "L'artiste règle lui-même ses impôts.",
  },
];

const TROIS_GUICHETS = [
  {
    nom: "DGI",
    role: "La fiscalité — la retenue à la source sur le cachet.",
  },
  {
    nom: "CNPS",
    role: "Le social — la protection de l'artiste (RSTI).",
  },
  {
    nom: "BURIDA",
    role: "Le droit d'auteur — quand vous diffusez des œuvres.",
  },
];

const LEXIQUE = [
  {
    titre: "Les mots des impôts",
    termes: [
      {
        mot: "Cachet",
        def: "La somme que touche un artiste pour une prestation (un concert, une représentation).",
      },
      {
        mot: "Prestation de service",
        def: "Un travail rendu à quelqu'un (jouer, animer, conseiller), par opposition à la vente d'un objet.",
      },
      {
        mot: "Débiteur",
        def: "Celui qui doit payer. Ici, l'organisateur qui doit le cachet à l'artiste.",
      },
      {
        mot: "Montant brut",
        def: "La somme totale avant tout prélèvement. Le « net » est ce qui reste une fois les prélèvements retirés.",
      },
      {
        mot: "Retenue à la source",
        def: "Un impôt que celui qui paie prélève directement au moment du paiement, et reverse à l'État à la place du bénéficiaire. L'artiste reçoit donc son cachet déjà amputé de cette part.",
      },
      {
        mot: "Code Général des Impôts (CGI)",
        def: "Le recueil officiel de toutes les règles d'impôts du pays. C'est le « livre de référence » de la fiscalité ; ses articles (par exemple l'article 92) fixent chaque règle.",
      },
      {
        mot: "Loi de finances / annexe fiscale",
        def: "Le texte voté chaque année qui met à jour les impôts. L'annexe fiscale en est la partie qui modifie le CGI ; c'est là qu'apparaissent les nouveautés, comme celles de 2026.",
      },
      {
        mot: "Bénéfices non commerciaux (BNC)",
        def: "La catégorie fiscale des revenus tirés d'un savoir-faire, d'un art ou d'une profession intellectuelle plutôt que du commerce. En Côte d'Ivoire, les artistes y sont rattachés.",
      },
      {
        mot: "Bénéfices industriels et commerciaux (BIC)",
        def: "La catégorie fiscale des revenus tirés du commerce, de l'industrie ou de l'artisanat : acheter, produire, revendre.",
      },
      {
        mot: "Régime réel d'imposition",
        def: "Le régime des entreprises qui tiennent une vraie comptabilité et sont imposées sur leur bénéfice réel. Il s'oppose aux régimes simplifiés ou forfaitaires réservés aux plus petites activités. Un artiste « au régime réel » déclare et paie ses impôts lui-même.",
      },
      {
        mot: "Facture normalisée",
        def: "Une facture conforme au modèle officiel de la DGI. La présenter prouve qu'on est enregistré et en règle.",
      },
      {
        mot: "Numéro de compte contribuable",
        def: "L'identifiant fiscal attribué par la DGI à une personne ou une structure enregistrée.",
      },
      {
        mot: "Convention fiscale",
        def: "Un accord entre deux pays pour éviter qu'un même revenu soit imposé deux fois, et pour fixer qui impose quoi — parfois à un taux réduit. C'est ce qui peut abaisser la retenue sur un artiste étranger.",
      },
      {
        mot: "Résident / non-résident (au sens fiscal)",
        def: "Résident : installé professionnellement en Côte d'Ivoire. Non-résident : sans installation professionnelle dans le pays, comme un artiste étranger de passage.",
      },
      {
        mot: "IGR (impôt général sur le revenu)",
        def: "L'impôt qui porte sur l'ensemble des revenus d'une personne. L'artiste y déduit les retenues déjà prélevées sur ses cachets.",
      },
      {
        mot: "ITS (impôt sur les traitements et salaires)",
        def: "L'impôt prélevé sur le salaire d'un employé. Il concerne le cas où l'artiste est engagé comme salarié.",
      },
      {
        mot: "Redressement fiscal",
        def: "La correction imposée par l'administration quand un impôt n'a pas été correctement payé, souvent assortie de pénalités.",
      },
    ],
  },
  {
    titre: "Les mots de la protection sociale",
    termes: [
      {
        mot: "Travailleur indépendant",
        def: "Quelqu'un qui travaille à son propre compte, sans employeur. La plupart des artistes le sont.",
      },
      {
        mot: "Cotisation",
        def: "La somme versée régulièrement (ici à la CNPS) pour ouvrir droit à une protection : maladie, retraite, etc.",
      },
      {
        mot: "RSTI (Régime Social des Travailleurs Indépendants)",
        def: "Le régime de protection sociale obligatoire des travailleurs indépendants, géré par la CNPS.",
      },
      {
        mot: "Indemnités journalières",
        def: "Un revenu de remplacement versé quand on ne peut pas travailler (maladie, accident, maternité).",
      },
      {
        mot: "Retraite complémentaire",
        def: "Une couche de retraite qui s'ajoute à la retraite de base pour ceux qui cotisent davantage.",
      },
      {
        mot: "CMU (Couverture Maladie Universelle)",
        def: "L'assurance maladie obligatoire pour tout résident, gérée par la CNAM.",
      },
    ],
  },
  {
    titre: "Les sigles et institutions",
    termes: [
      {
        mot: "DGI",
        def: "Direction Générale des Impôts : l'administration fiscale.",
      },
      {
        mot: "CNPS",
        def: "Caisse Nationale de Prévoyance Sociale : gère la protection sociale (retraite, RSTI…).",
      },
      {
        mot: "CNAM",
        def: "Caisse Nationale d'Assurance Maladie : gère la CMU.",
      },
      {
        mot: "BURIDA",
        def: "Bureau Ivoirien du Droit d'Auteur : collecte et reverse les droits d'auteur.",
      },
    ],
  },
];

export default function PayerArtistesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">
        Centre de ressources
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Déclarer et payer vos artistes correctement
      </h1>

      <div className="mt-4 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-sm italic text-muted">
        Ressource e-Culture CI — outil d&apos;orientation. Cette page vous
        aide à comprendre le cadre. Elle donne une information générale, pas
        un conseil juridique ou fiscal personnalisé, et ne remplace ni la
        CNPS, ni la DGI, ni le Ministère.
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
          Pourquoi cette question est mal comprise
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Payer un artiste, ce n&apos;est pas seulement lui remettre son
          cachet. Derrière ce geste se cachent deux questions qu&apos;on
          mélange presque toujours — et c&apos;est ce mélange qui crée les
          erreurs.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          La première :{" "}
          <strong className="text-foreground">vous, organisateur</strong>,
          comment engagez-vous et payez-vous quelqu&apos;un sans vous mettre
          en faute ? La seconde :{" "}
          <strong className="text-foreground">l&apos;artiste</strong>,
          comment est-il protégé socialement — maladie, retraite — quand il
          vit de son art ?
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Ce sont deux sujets différents, deux démarches différentes, deux
          interlocuteurs différents. On commence par les séparer. Tout
          devient clair ensuite.
        </p>
        <p className="mt-3 max-w-prose text-sm text-muted">
          Un mot vous échappe en cours de lecture ? Le{" "}
          <a href="#lexique" className="font-medium text-primary-dark underline">
            lexique
          </a>{" "}
          en fin de page explique simplement chaque terme technique.
        </p>
      </section>

      <section id="casquette-1" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Casquette 1 — L&apos;artiste est un travailleur indépendant
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          C&apos;est le point de départ, et il est officiel. En Côte
          d&apos;Ivoire, l&apos;artiste qui travaille à son compte est un{" "}
          <strong className="text-foreground">
            travailleur indépendant
          </strong>
          , au même titre qu&apos;un artisan ou un commerçant. À ce titre,
          il relève d&apos;un régime de protection sociale obligatoire : le{" "}
          <strong className="text-foreground">
            Régime Social des Travailleurs Indépendants (RSTI)
          </strong>
          , géré par la <strong className="text-foreground">CNPS</strong>{" "}
          (Caisse Nationale de Prévoyance Sociale).
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Ce n&apos;est pas optionnel. Le RSTI est la couverture sociale
          obligatoire de tous les travailleurs indépendants, et les
          artistes — précisément la catégorie « Artistes et professionnels
          des médias et de l&apos;événementiel » — y sont expressément
          inscrits.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          <strong className="text-foreground">
            Ce que le RSTI protège
          </strong>
          , selon la CNPS : la maladie, l&apos;accident, la maternité et la
          vieillesse.
        </p>

        <p className="mt-5 font-bold text-foreground">
          Comment l&apos;artiste s&apos;y met (les 3 étapes CNPS)
        </p>
        <ol className="mt-2 flex flex-col gap-2 text-sm text-muted">
          <li>
            <strong className="text-foreground">1. Se déclarer à la CNPS</strong>
            , en précisant son métier et le montant de cotisation qu&apos;il
            s&apos;engage à payer chaque mois.
          </li>
          <li>
            <strong className="text-foreground">2. Choisir sa cotisation.</strong>{" "}
            Elle est fixée librement, sans plafond, mais pas en dessous du
            minimum de sa catégorie. Pour un artiste, la CNPS fixe ce
            minimum à <strong className="text-foreground">5 400 FCFA par mois</strong>{" "}
            (au taux de 12 %), ce qui correspond à un revenu mensuel déclaré
            de 45 000 FCFA. Plus l&apos;artiste déclare un revenu élevé,
            plus sa couverture est forte.
          </li>
          <li>
            <strong className="text-foreground">3. Payer régulièrement</strong>{" "}
            ses cotisations.
          </li>
        </ol>

        <p className="mt-5 font-bold text-foreground">
          Ce que ça lui rapporte concrètement, toujours selon la CNPS
        </p>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-muted">
          <li>
            Des <strong className="text-foreground">indemnités journalières</strong>{" "}
            en cas de maladie ou d&apos;accident entraînant un arrêt de plus
            de 14 jours : 50 % du revenu déclaré, dans la limite de 90 000
            FCFA par mois.
          </li>
          <li>
            Des <strong className="text-foreground">indemnités de maternité</strong>{" "}
            pour la femme artiste qui s&apos;arrête 3 mois : 100 % du revenu
            déclaré, dans la limite de 180 000 FCFA par mois.
          </li>
          <li>
            Une <strong className="text-foreground">pension de retraite</strong>{" "}
            versée à vie — et <strong className="text-foreground">doublée</strong>{" "}
            si l&apos;artiste a aussi cotisé à la retraite complémentaire
            (déclenchée automatiquement au-delà de 21 600 FCFA de
            cotisation mensuelle, au taux de 9 % sur la différence).
          </li>
        </ul>

        <p className="mt-4 max-w-prose text-sm text-muted">
          Pour se déclarer ou se renseigner, l&apos;artiste s&apos;adresse
          directement à la CNPS (20 25 21 00 / info@cnps.ci).
        </p>

        <p className="mt-4 max-w-prose text-xs italic text-muted">
          Source : document officiel de la CNPS sur le RSTI. À noter : la
          couverture maladie passe aussi par la Couverture Maladie
          Universelle (CMU), obligatoire pour tout résident et gérée par la
          CNAM — c&apos;est un second guichet à connaître.
        </p>
      </section>

      <section id="casquette-2" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Casquette 2 — Vous engagez un artiste : ce que ça change pour vous
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Une fois qu&apos;on sait que l&apos;artiste porte lui-même sa
          protection sociale, votre situation d&apos;organisateur devient
          plus lisible — mais elle vient avec une responsabilité qu&apos;on
          sous-estime souvent.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          <strong className="text-foreground">
            Le cas le plus courant : vous engagez un artiste indépendant
            pour une prestation.
          </strong>{" "}
          Vous lui versez son cachet selon ce que vous avez convenu.
          C&apos;est lui, en tant qu&apos;indépendant déclaré à la CNPS, qui
          assure sa propre couverture sociale — vous n&apos;avez pas à gérer
          sa retraite ou sa maladie à sa place. Deux réflexes s&apos;imposent :
        </p>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-muted">
          <li>
            <strong className="text-foreground">Mettez tout par écrit.</strong>{" "}
            Un contrat clair — qui fait quoi, pour combien, quand, avec
            quels droits — vous protège tous les deux. (Une ressource
            dédiée aux contrats est prévue ; elle détaillera ce point.)
          </li>
          <li>
            <strong className="text-foreground">
              Encouragez votre artiste à être déclaré à la CNPS
            </strong>{" "}
            s&apos;il ne l&apos;est pas. Ce n&apos;est pas votre obligation,
            mais c&apos;est sa protection.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-bold text-foreground">
          La fiscalité du cachet : vous êtes collecteur d&apos;impôt
        </h3>
        <p className="mt-3 max-w-prose text-muted">
          Voici ce que peu d&apos;organisateurs savent : quand vous payez un
          artiste, la loi fait de vous le{" "}
          <strong className="text-foreground">
            collecteur d&apos;un impôt pour le compte de l&apos;État
          </strong>
          . Vous prélevez une part du cachet et vous la reversez aux
          Impôts. Le taux dépend d&apos;une seule question : votre artiste
          est-il résident en Côte d&apos;Ivoire, ou vient-il de
          l&apos;étranger ?
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TAUX.map((t) => (
            <div
              key={t.label}
              className="rounded-xl border border-border bg-surface p-4 text-center"
            >
              <p className="text-3xl font-extrabold text-primary-dark">
                {t.taux}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                {t.label}
              </p>
              <p className="mt-1 text-xs text-muted">{t.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-prose text-muted">
          <strong className="text-foreground">
            Artiste résident — une retenue de 7,5 %.
          </strong>{" "}
          Les sommes versées aux artistes, musiciens, sportifs et
          organisateurs de spectacles font l&apos;objet d&apos;une retenue
          à la source au titre des bénéfices non commerciaux (BNC), au
          taux de <strong className="text-foreground">7,5 % sur le montant brut</strong>.
          Concrètement : vous prélevez ces 7,5 % sur le cachet, vous les
          reversez à la recette des Impôts dont vous dépendez (au plus tard
          le 15 du mois suivant), et vous remettez à l&apos;artiste une
          attestation qu&apos;il pourra déduire de son propre impôt.
        </p>

        <Card className="mt-4 border-secondary/30 bg-secondary-light">
          <p className="text-xs font-bold uppercase tracking-wide text-secondary-dark">
            À jour 2026
          </p>
          <p className="mt-1.5 max-w-prose text-sm text-foreground">
            La loi de finances 2026 a élargi cette retenue de 7,5 % à de
            nouveaux intervenants non-salariés du secteur du spectacle et
            des productions audiovisuelles, pour que plus personne
            n&apos;y échappe.
          </p>
        </Card>

        <p className="mt-4 max-w-prose text-sm text-muted">
          <em>Exception :</em> si votre artiste est établi au{" "}
          <strong className="text-foreground">régime réel d&apos;imposition</strong>{" "}
          et vous remet une <strong className="text-foreground">facture normalisée</strong>{" "}
          avec son numéro de compte contribuable, vous ne retenez rien. Il
          encaisse l&apos;intégralité de son cachet et règle ses impôts
          lui-même.
        </p>

        <p className="mt-4 max-w-prose text-muted">
          <strong className="text-foreground">
            Artiste non-résident — une retenue de 20 %.
          </strong>{" "}
          Si vous faites venir un artiste étranger sans installation
          professionnelle en Côte d&apos;Ivoire, l&apos;article 92 du Code
          Général des Impôts prévoit une retenue de{" "}
          <strong className="text-foreground">20 % sur le montant brut</strong>{" "}
          du cachet. Ce taux peut être réduit lorsqu&apos;une convention
          fiscale lie la Côte d&apos;Ivoire au pays de l&apos;artiste
          (souvent autour de 10 % pour ce type de rémunération). Là encore,
          c&apos;est à vous de prélever et de reverser.
        </p>

        <p className="mt-4 max-w-prose text-sm text-muted">
          <strong className="text-foreground">
            En cas d&apos;oubli, la faute est pour vous.
          </strong>{" "}
          La responsabilité de la retenue pèse sur l&apos;organisateur, pas
          sur l&apos;artiste : ne pas la pratiquer vous expose à des
          redressements et à des pénalités. C&apos;est une raison de plus
          pour intégrer ce prélèvement à votre budget dès le premier
          chiffrage.
        </p>

        <h3 className="mt-6 text-lg font-bold text-foreground">
          À ne pas confondre avec le reste
        </h3>
        <p className="mt-3 max-w-prose text-muted">
          Cette retenue fiscale est <strong className="text-foreground">distincte</strong>{" "}
          de deux autres obligations qui touchent aussi vos événements : les
          redevances au BURIDA (droit d&apos;auteur, quand vous diffusez
          des œuvres) et les cotisations sociales à la CNPS (la protection
          de l&apos;artiste, qui le concerne lui). Trois guichets, trois
          logiques — ne les mélangez pas.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TROIS_GUICHETS.map((g) => (
            <div
              key={g.nom}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="font-bold text-foreground">{g.nom}</p>
              <p className="mt-1 text-sm text-muted">{g.role}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-lg font-bold text-foreground">
          Et si vous engagez l&apos;artiste comme salarié ?
        </h3>
        <p className="mt-3 max-w-prose text-muted">
          Un autre cas existe : vous l&apos;engagez sous{" "}
          <strong className="text-foreground">contrat de travail</strong>.
          Là, ce sont les obligations classiques d&apos;un employeur qui
          s&apos;appliquent — impôt sur les traitements et salaires (ITS)
          retenu à la source, contributions employeur, cotisations CNPS.
          C&apos;est un régime différent, plus lourd, plus rare pour un
          spectacle ponctuel. Si c&apos;est votre situation,
          rapprochez-vous de la DGI et de la CNPS.
        </p>
      </section>

      <section id="statut" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Le statut de l&apos;artiste : le cadre qui structure tout ça
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Tout ceci s&apos;inscrit dans un mouvement plus large. La Côte
          d&apos;Ivoire s&apos;est dotée d&apos;un{" "}
          <strong className="text-foreground">statut de l&apos;artiste</strong>{" "}
          par décret en octobre 2021, destiné à ouvrir aux artistes de
          toutes disciplines des droits sociaux et économiques et une
          rémunération équitable. Sa mécanique concrète — notamment
          l&apos;immatriculation à un registre national des artistes —
          continue de se déployer. Le terrain bouge : il vaut la peine de
          vérifier régulièrement l&apos;état d&apos;avancement auprès du
          Ministère de la Culture.
        </p>
      </section>

      <section id="reflexes" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Les bons réflexes, en résumé
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
          <li>
            <strong className="text-foreground">
              Ne confondez pas les deux casquettes.
            </strong>{" "}
            La protection de l&apos;artiste (RSTI/CNPS) et votre façon de le
            payer sont deux choses distinctes.
          </li>
          <li>
            <strong className="text-foreground">Un contrat écrit, toujours.</strong>{" "}
            Même pour une prestation d&apos;un soir.
          </li>
          <li>
            <strong className="text-foreground">
              La bonne retenue selon l&apos;artiste :
            </strong>{" "}
            7,5 % pour un résident, 20 % pour un étranger, 0 % s&apos;il est
            au régime réel avec facture normalisée. En cas de doute, un
            appel à la DGI tranche.
          </li>
          <li>
            <strong className="text-foreground">
              Trois guichets à ne pas mélanger :
            </strong>{" "}
            DGI (fiscalité), CNPS (social), BURIDA (droits d&apos;auteur).
          </li>
        </ul>
      </section>

      <section id="lexique" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Lexique — les mots techniques expliqués simplement
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          {LEXIQUE.map((bloc) => (
            <div key={bloc.titre}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">
                {bloc.titre}
              </h3>
              <dl className="mt-3 flex flex-col gap-3">
                {bloc.termes.map((t) => (
                  <div key={t.mot}>
                    <dt className="font-bold text-foreground">{t.mot}</dt>
                    <dd className="mt-0.5 text-sm text-muted">{t.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section id="et-apres" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">Et après ?</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>
            <Link
              href="/ressources/budget"
              className="font-medium text-primary-dark underline"
            >
              Bâtir votre budget
            </Link>{" "}
            <span className="text-muted">
              — pour intégrer les cachets, la retenue et les charges dès le
              départ.
            </span>
          </li>
          <li>
            <Link
              href="/ressources/propriete-intellectuelle"
              className="font-medium text-primary-dark underline"
            >
              Propriété intellectuelle
            </Link>{" "}
            <span className="text-muted">
              — parce que payer un artiste et respecter les droits
              d&apos;auteur sont deux obligations parallèles.
            </span>
          </li>
          <li>
            <Link
              href="/ressources/fondamentaux"
              className="font-medium text-primary-dark underline"
            >
              Les fondamentaux du spectacle vivant
            </Link>{" "}
            <span className="text-muted">
              — pour situer chaque métier dans la chaîne.
            </span>
          </li>
        </ul>
      </section>

      <p className="mt-10 max-w-prose text-xs italic text-muted">
        Les taux et régimes cités proviennent de sources officielles (CNPS,
        Code Général des Impôts, loi de finances 2026) à leur date de
        publication. La fiscalité évoluant chaque année avec les annexes
        fiscales, confirmez toujours votre cas précis auprès de la DGI
        (ligne verte 800 88 888, www.dgi.gouv.ci).
      </p>

      <p className="mt-3 text-xs text-muted">
        Informations vérifiées en septembre 2026.
      </p>
    </div>
  );
}
