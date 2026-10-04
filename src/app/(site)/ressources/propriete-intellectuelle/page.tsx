import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PROPRIETE_INTELLECTUELLE } from "@/lib/propriete-intellectuelle-config";
import { TableauRegles } from "@/components/ressources/TableauRegles";
import { LexiqueLien } from "@/components/ressources/LexiqueLien";
import { AudioResume } from "@/components/ressources/AudioResume";
import { ComportementAncres } from "@/components/ressources/ComportementAncres";
import { pageMetadata } from "@/lib/metadata";
import { RessourceArticle } from "@/components/ressources/RessourceArticle";
import { Callout } from "@/components/ressources/Callout";
import { NextCards } from "@/components/ressources/NextCards";
import { EssentielBloc } from "@/components/ressources/EssentielBloc";

export const metadata: Metadata = pageMetadata({
  title: "Propriété intellectuelle | e-Culture CI",
  description:
    "Comprendre les bases de la propriété intellectuelle dans le spectacle vivant en Côte d'Ivoire : droit d'auteur, droits voisins, droit à l'image, marques — et vers qui se tourner (BURIDA, OIPI).",
  path: "/ressources/propriete-intellectuelle",
});

const SOMMAIRE = [
  { id: "familles", label: "Deux grandes familles" },
  { id: "faq", label: "Questions fréquentes" },
  { id: "contacts", label: "Liens et contacts officiels" },
  { id: "lexique", label: "Lexique" },
];

const LIENS = {
  burida: "https://www.buridaci.com",
  oipi: "https://oipi.ci",
  oapi: "https://oapi.int",
  wipolex: "https://www.wipo.int/wipolex/fr/",
};

type FaqItem = {
  q: string;
  a: ReactNode;
  lien?: { label: string; href: string };
  exception?: string;
};

const FAQ: FaqItem[] = [
  {
    q: "Je monte un concert avec des reprises. Dois-je payer des droits ?",
    a: "Oui. Dès que vous diffusez en public des œuvres que vous n'avez pas créées — reprises, playback, musique en fond de soirée — vous devez demander une autorisation et payer une redevance. En Côte d'Ivoire, le BURIDA est le seul habilité à la gérer. À anticiper avant l'événement, pas après.",
    lien: { label: "Pour la démarche → BURIDA", href: LIENS.burida },
  },
  {
    q: "J'ai créé un festival. Comment protéger son nom ?",
    a: (
      <>
        Le nom et le logo d&apos;un festival se protègent en déposant une
        marque. Attention : un nom n&apos;est pas protégé automatiquement. Vous
        déposez via l&apos;OIPI, qui transmet à l&apos;OAPI — et ce dépôt vous
        protège dans les 17 pays de l&apos;espace OAPI. Pensez à faire vérifier
        d&apos;abord que le nom est libre (une «{" "}
        <LexiqueLien terme="anteriorite">
          recherche d&apos;antériorité
        </LexiqueLien>{" "}
        »).
      </>
    ),
    lien: { label: "Pour la démarche → OIPI (oipi.ci)", href: LIENS.oipi },
  },
  {
    q: "Un autre organisateur a pris le même nom que mon événement. Qui a raison ?",
    a: "Pour une marque, la règle est simple : c'est le premier qui dépose qui l'emporte, pas le premier qui a eu l'idée. D'où l'importance de déposer tôt. Si vous avez déposé votre marque et qu'un autre l'utilise, vous pouvez faire valoir vos droits.",
    lien: { label: "Pour vérifier ou déposer → OIPI (oipi.ci)", href: LIENS.oipi },
  },
  {
    q: "Je suis danseur, musicien ou comédien. Ai-je des droits sur ma prestation ?",
    a: (
      <>
        Oui. Même si vous n&apos;êtes pas l&apos;auteur de l&apos;œuvre, en tant
        qu&apos;
        <LexiqueLien terme="artiste-interprete">artiste-interprète</LexiqueLien>{" "}
        vous avez ce qu&apos;on appelle des droits voisins — des droits sur
        votre propre interprétation. Le BURIDA gère aussi ces droits, aux côtés
        de ceux des auteurs et des producteurs.
      </>
    ),
    lien: { label: "Pour en savoir plus → BURIDA", href: LIENS.burida },
  },
  {
    q: "Je filme mon spectacle pour les réseaux. Ai-je le droit ?",
    a: "Deux autorisations différentes se superposent, et on n'en voit souvent qu'une. La première concerne les œuvres jouées : reprises, musique, texte — c'est le droit d'auteur, géré par le BURIDA. La seconde concerne les personnes filmées : chaque artiste sur scène, et parfois un spectateur reconnaissable au premier plan, a un droit sur son image. Ce droit-là ne dépend ni du BURIDA ni de l'OIPI : c'est un accord à demander aux personnes concernées. Le bon réflexe : prévoir cet accord en amont, idéalement dans le contrat que vous signez avec vos artistes, plutôt que de courir après une signature une fois la vidéo en ligne.",
    exception:
      "Contrairement aux autres questions de cette page, celle-ci ne renvoie à aucun guichet officiel : le droit à l'image relève du droit civil général, ni du BURIDA ni de l'OIPI.",
  },
  {
    q: "J'ai écrit une chanson ou créé une chorégraphie. Suis-je protégé(e) ?",
    a: "Votre création vous appartient dès que vous l'avez réalisée. Pour la faire gérer et percevoir des redevances quand elle est exploitée, vous pouvez adhérer au BURIDA. C'est aussi ce qui vous permet de réagir si quelqu'un l'utilise sans votre accord.",
    lien: { label: "Pour adhérer → BURIDA", href: LIENS.burida },
  },
  {
    q: "J'ai signé un contrat pour mon œuvre. Est-ce que je l'ai « vendue » pour toujours ?",
    a: "Presque jamais. Signer un contrat ne veut pas dire tout abandonner : le plus souvent, vous autorisez une exploitation précise — un usage, une durée, un territoire — sans cesser d'être l'auteur. Il faut donc lire ce que le contrat transfère exactement : quels usages, pour combien de temps, où. Et une chose ne se cède pas : votre droit moral. Même après avoir cédé l'exploitation de votre œuvre, vous gardez le droit d'être crédité comme auteur et de vous opposer à ce qu'on la dénature. Avant de signer, vérifiez ce que vous donnez et ce que vous gardez — dans le doute, faites relire.",
  },
  {
    q: "Combien ça coûte, et combien de temps ça prend ?",
    a: "Les démarches ont un coût (par exemple pour déposer une marque) et des délais — mais ces montants changent régulièrement. Pour avoir les chiffres exacts et à jour, consultez directement l'OIPI pour la propriété industrielle, ou rapprochez-vous du BURIDA pour les droits d'auteur.",
    lien: { label: "oipi.ci · buridaci.com", href: LIENS.oipi },
  },
];

const CONTACTS = [
  {
    nom: "BURIDA",
    role: "Droit d'auteur et droits voisins : autorisations, redevances, adhésion.",
    href: LIENS.burida,
  },
  {
    nom: "OIPI",
    role: "oipi.ci — marques, noms commerciaux, dessins et modèles.",
    href: LIENS.oipi,
  },
  {
    nom: "OAPI",
    role: "Cadre régional (17 pays, Accord de Bangui), siège à Yaoundé.",
    href: LIENS.oapi,
  },
  {
    nom: "OMPI / WIPO Lex",
    role: "Pour lire les textes de loi.",
    href: LIENS.wipolex,
  },
];

// Termes liés depuis le corps (premier emploi) : leur entrée propose « Revenir au texte ».
const TERMES_LIES = new Set([
  "droits-voisins",
  "artiste-interprete",
  "redevance",
  "droit-moral",
  "marque",
  "anteriorite",
]);

// Définitions limitées à ce que la page et ses sources établissent.
const LEXIQUE = [
  {
    slug: "oeuvre",
    mot: "Œuvre de l'esprit",
    def: "Une création originale : musique, paroles, texte de spectacle, chorégraphie, mise en scène.",
  },
  {
    slug: "droit-auteur",
    mot: "Droit d'auteur",
    def: "Le droit qui protège les œuvres de l'esprit et leur auteur.",
  },
  {
    slug: "droits-voisins",
    mot: "Droits voisins",
    def: "Les droits de l'artiste-interprète sur son interprétation, et ceux du producteur.",
  },
  {
    slug: "artiste-interprete",
    mot: "Artiste-interprète",
    def: "Le musicien, le danseur ou le comédien qui porte une œuvre sur scène.",
  },
  {
    slug: "redevance",
    mot: "Redevance",
    def: "La somme à payer pour avoir le droit de diffuser une œuvre en public.",
  },
  {
    slug: "gestion-collective",
    mot: "Gestion collective",
    def: "La gestion des droits de nombreux auteurs par un organisme unique, qui collecte et reverse. En Côte d'Ivoire, c'est le BURIDA.",
  },
  {
    slug: "droit-moral",
    mot: "Droit moral",
    def: "Le droit d'être crédité comme auteur et de s'opposer à ce qu'on dénature son œuvre. Il ne se cède pas.",
  },
  {
    slug: "cession",
    mot: "Cession",
    def: "Le contrat par lequel un auteur autorise l'exploitation de son œuvre : pour quels usages, combien de temps, où. Il ne transfère pas forcément tout.",
  },
  {
    slug: "marque",
    mot: "Marque",
    def: "Un nom ou un logo protégé par un dépôt. Le premier déposant l'emporte.",
  },
  {
    slug: "nom-commercial",
    mot: "Nom commercial",
    def: "Le nom d'une structure, protégé par un dépôt.",
  },
  {
    slug: "dessin-modele",
    mot: "Dessin ou modèle",
    def: "La protection d'un élément original, par exemple un décor ou un costume.",
  },
  {
    slug: "anteriorite",
    mot: "Recherche d'antériorité",
    def: "La vérification, avant un dépôt, qu'un nom n'est pas déjà pris.",
  },
  {
    slug: "burida",
    mot: "BURIDA",
    def: "Le bureau qui gère en Côte d'Ivoire le droit d'auteur et les droits voisins : autorisations, redevances, adhésion.",
  },
  {
    slug: "oipi",
    mot: "OIPI",
    def: "Le guichet des marques, noms commerciaux, dessins et modèles (oipi.ci). Il transmet les dépôts à l'OAPI.",
  },
  {
    slug: "oapi",
    mot: "OAPI",
    def: "Le cadre régional de 17 pays (Accord de Bangui), siège à Yaoundé. Un dépôt de marque via l'OIPI vous protège dans ces 17 pays.",
  },
  {
    slug: "ompi",
    mot: "OMPI",
    def: "L'organisation dont le site WIPO Lex permet de lire les textes de loi.",
  },
];

export default function ProprieteIntellectuellePage() {
  const audio = PROPRIETE_INTELLECTUELLE.audio;

  return (
    <RessourceArticle
      kicker="Ressource · Être en règle"
      titre="Propriété intellectuelle"
      dek="Droit d'auteur, droits voisins, droit à l'image, marques : comprenez vos droits et vers qui vous tourner."
      meta={{ lecture: "5 min", niveau: "Intermédiaire" }}
      sommaire={SOMMAIRE}
      avantCorps={
        <div
          className={
            audio
              ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-start"
              : undefined
          }
        >
          <EssentielBloc
            suite="Détails et questions fréquentes ci-dessous."
            items={[
              <>
                La propriété intellectuelle a deux familles, et un même spectacle
                peut vous concerner par les deux : le{" "}
                <strong>droit d&apos;auteur et les droits voisins</strong>{" "}
                (BURIDA), et la <strong>propriété industrielle</strong>,
                c&apos;est-à-dire les marques, noms et logos (OIPI).
              </>,
              <>
                Vous diffusez en public l&apos;œuvre de quelqu&apos;un d&apos;autre :{" "}
                <strong>autorisation préalable et redevance au BURIDA</strong>, à
                prévoir avant l&apos;événement.
              </>,
              <>
                Vous créez : votre œuvre vous appartient dès qu&apos;elle est
                réalisée. Un <strong>nom ou un logo</strong>, lui, n&apos;est pas
                protégé automatiquement : il faut le déposer, et c&apos;est le{" "}
                <strong>premier déposant</strong>{" "}
                qui l&apos;emporte.
              </>,
              <>
                Vous filmez : les personnes filmées ont un{" "}
                <strong>droit sur leur image</strong>, indépendamment du BURIDA.
                Prévoyez leur accord en amont.
              </>,
            ]}
          />
          {audio && (
            <AudioResume
              ressource="propriete-intellectuelle"
              src={audio.src}
              accroche="L'essentiel en une minute, à écouter."
              dureeLabel={audio.dureeLabel}
              dureeSecondes={audio.dureeSecondes}
              poidsLabel={audio.poidsLabel}
              enregistre={audio.enregistre}
            />
          )}
        </div>
      }
    >
      <ComportementAncres ressource="propriete-intellectuelle" />

      <p className="mb-4 max-w-prose text-muted">
        Quand vous montez un spectacle, vous manipulez des créations : une
        musique, un texte, une chorégraphie, un nom de festival, un logo.
        Tout cela peut être protégé — par vous, ou par quelqu&apos;un
        d&apos;autre. C&apos;est ça, la propriété intellectuelle.
      </p>
      <p className="mb-6 max-w-prose text-muted">
        Il y a deux grandes familles. Et dans un même événement, les deux
        peuvent vous concerner en même temps.
      </p>

      <div className="mb-8">
        <Callout variant="retenir" label="Info, pas conseil juridique">
          Cette page vous informe et vous sensibilise. Pour faire une
          démarche, adressez-vous directement au BURIDA (droit
          d&apos;auteur) ou à l&apos;OIPI (marques, noms, logos).
        </Callout>
      </div>

      <section id="familles" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Deux grandes familles
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold text-secondary-dark">
              Le droit d&apos;auteur et les droits voisins
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              Ça protège les œuvres et ceux qui les interprètent : la
              chanson, le texte, la danse — mais aussi le musicien, le
              comédien, le danseur qui les portent sur scène. En Côte
              d&apos;Ivoire, c&apos;est le <strong>BURIDA</strong> qui gère
              ces droits.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-primary-dark">
              La propriété industrielle
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              Ça protège ce qui identifie votre activité : le nom de votre
              festival, votre logo, le nom de votre structure, un décor ou
              un costume original. Là, vous passez par l&apos;
              <strong>OIPI</strong>.
            </p>
          </Card>
        </div>

        <Card className="mt-4">
          <h3 className="text-base font-bold text-foreground">
            Deux réflexes simples
          </h3>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted">
            <li>
              Si vous <strong className="text-foreground">utilisez</strong>{" "}
              la création d&apos;un autre, vous devez demander
              l&apos;autorisation.
            </li>
            <li>
              Si vous <strong className="text-foreground">créez</strong>
              {", "}vous pouvez protéger ce que vous faites.
            </li>
          </ul>
        </Card>

        <TableauRegles
          id="situations"
          titre="Quelle situation, quel interlocuteur ?"
          colonnes={["Votre situation", "Ce qui s'applique", "Vers qui"]}
          teteMobile={0}
          lignes={[
            {
              cellules: [
                <strong key="s1">
                  Vous diffusez en public des œuvres que vous n&apos;avez pas
                  créées (reprises, playback, musique de fond)
                </strong>,
                <>
                  Autorisation préalable et{" "}
                  <LexiqueLien terme="redevance">redevance</LexiqueLien>, à
                  prévoir avant l&apos;événement
                </>,
                "BURIDA",
              ],
            },
            {
              cellules: [
                <strong key="s2">
                  Vous avez écrit une chanson ou créé une chorégraphie
                </strong>,
                "Votre création vous appartient dès qu'elle est réalisée ; vous pouvez adhérer pour la faire gérer et percevoir des redevances",
                "BURIDA",
              ],
            },
            {
              cellules: [
                <strong key="s3">
                  Vous êtes danseur, musicien ou comédien
                </strong>,
                <>
                  <LexiqueLien terme="droits-voisins">Droits voisins</LexiqueLien>{" "}
                  sur votre interprétation
                </>,
                "BURIDA",
              ],
            },
            {
              cellules: [
                <strong key="s4">
                  Vous voulez protéger le nom ou le logo d&apos;un festival ou
                  d&apos;une structure
                </strong>,
                <>
                  Dépôt d&apos;une{" "}
                  <LexiqueLien terme="marque">marque</LexiqueLien>{" "}
                  ; pas de protection automatique ; le premier déposant
                  l&apos;emporte ; vérifiez d&apos;abord que le nom est libre
                </>,
                "OIPI, relais de l'OAPI (17 pays)",
              ],
            },
            {
              cellules: [
                <strong key="s5">Vous filmez votre spectacle</strong>,
                <>
                  Droit d&apos;auteur sur les œuvres jouées,{" "}
                  <strong>et</strong>{" "}
                  accord des personnes filmées
                </>,
                <>
                  BURIDA pour les œuvres ;{" "}
                  <strong>aucun guichet pour l&apos;image</strong>{" "}
                  : accord à demander directement
                </>,
              ],
            },
            {
              cellules: [
                <strong key="s6">
                  Vous signez un contrat pour votre œuvre
                </strong>,
                <>
                  Lisez ce que vous cédez : usages, durée, territoire ; vous
                  gardez votre{" "}
                  <LexiqueLien terme="droit-moral">droit moral</LexiqueLien>
                </>,
                "Faites relire",
              ],
            },
          ]}
        />

        <p className="mt-4 max-w-prose text-sm text-muted">
          Attention à ne pas confondre : les droits d&apos;auteur (BURIDA)
          et la fiscalité de votre événement sont deux sujets distincts.
          Pour savoir comment déclarer et payer vos artistes (retenue à la
          source, CNPS), consultez la ressource{" "}
          <Link
            href="/ressources/payer-artistes"
            className="font-medium text-primary-dark underline"
          >
            Déclarer et payer vos artistes
          </Link>
          .
        </p>
      </section>

      <section id="faq" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Questions fréquentes
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              data-faq={`q${i + 1}`}
              className="group rounded-xl border border-border bg-surface p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="shrink-0 text-primary-dark transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2.5 max-w-prose text-sm text-muted">{item.a}</p>
              {item.lien && (
                <a
                  href={item.lien.href}
                  data-lien-officiel={new URL(item.lien.href).hostname}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-primary-dark underline"
                >
                  {item.lien.label}
                </a>
              )}
              {item.exception && (
                <div className="mt-3">
                  <Callout variant="exception">{item.exception}</Callout>
                </div>
              )}
            </details>
          ))}
        </div>
      </section>

      <section id="contacts" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Liens et contacts officiels
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <a
              key={c.nom}
              href={c.href}
              data-lien-officiel={new URL(c.href).hostname}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary"
            >
              <p className="font-bold text-foreground">{c.nom} ↗</p>
              <p className="mt-1 text-sm text-muted">{c.role}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="lexique" className="scroll-mt-24">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
          Lexique
        </h2>
        <div className="flex flex-col gap-2.5">
          {LEXIQUE.map((t) => (
            <details
              key={t.slug}
              id={`lx-${t.slug}`}
              className="group scroll-mt-24 rounded-xl border border-border bg-surface p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {t.mot}
                  <span className="shrink-0 text-primary-dark transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2.5 max-w-prose text-sm text-muted">{t.def}</p>
              {TERMES_LIES.has(t.slug) && (
                <a
                  href={`#lx-ref-${t.slug}`}
                  className="mt-2 inline-block text-xs font-semibold text-primary-dark underline"
                >
                  ↑ Revenir au texte
                </a>
              )}
            </details>
          ))}
        </div>
      </section>

      <p className="mt-2 max-w-prose text-xs text-muted">
        Cette page est une information de sensibilisation, pas un conseil
        juridique. Pour toute démarche, adressez-vous au BURIDA ou à
        l&apos;OIPI.
      </p>

      <p className="mt-3 max-w-prose text-xs text-muted">
        Informations vérifiées en {PROPRIETE_INTELLECTUELLE.dateVerification}.
        Les liens officiels et le cadre légal peuvent évoluer : confirmez
        toujours auprès du BURIDA ou de l&apos;OIPI.
      </p>

      <NextCards
        liens={[
          {
            href: "/ressources/payer-artistes",
            label: "Déclarer et payer vos artistes",
            description: "Cachet, retenue à la source, CNPS.",
          },
          {
            href: "/ressources/budget",
            label: "Bâtir votre budget",
            description: "Intégrer droits d'auteur et cachets dans vos comptes.",
          },
          {
            href: "/ressources/candidater-licences",
            label: "Candidater aux licences B et C",
            description: "Qui est concerné, calendrier de l'appel, conditions et coûts.",
          },
        ]}
      />
    </RessourceArticle>
  );
}
