import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les fondamentaux du spectacle vivant | e-Culture CI",
  description:
    "Comprendre le spectacle vivant en Côte d'Ivoire : la chaîne de production, les métiers du secteur (producteur, tourneur, diffuseur, technique...) et comment ils s'articulent.",
};

const SOMMAIRE = [
  { id: "c-est-quoi", label: "C'est quoi, le spectacle vivant ?" },
  { id: "chaine", label: "La chaîne du spectacle" },
  { id: "metiers", label: "Les métiers, famille par famille" },
  { id: "synthese", label: "Comment un spectacle prend vie" },
];

const CHAINE = [
  {
    etape: "La création",
    texte: "on invente l'œuvre : la musique, le texte, la chorégraphie.",
  },
  {
    etape: "La production",
    texte:
      "on monte le projet : budget, artistes, technique, logistique. C'est ici qu'on prend le risque.",
  },
  {
    etape: "La diffusion",
    texte: "on fait circuler le spectacle et on l'accueille : tournées, salles, festivals.",
  },
  {
    etape: "La représentation",
    texte: "le jour J : le spectacle est joué devant le public.",
  },
];

const FAMILLES: {
  titre: string;
  metiers: { nom: string; definition: string; lien?: { label: string; href: string } }[];
}[] = [
  {
    titre: "La création — le contenu artistique",
    metiers: [
      {
        nom: "Auteur, compositeur, parolier",
        definition:
          "Il écrit l'œuvre : les paroles, la musique, le texte de théâtre. Sans lui, pas de matière à jouer. Ses droits sont gérés par le BURIDA.",
        lien: {
          label: "En savoir plus sur la propriété intellectuelle →",
          href: "/ressources/propriete-intellectuelle",
        },
      },
      {
        nom: "Artiste-interprète",
        definition:
          "Il donne vie à l'œuvre sur scène : chanteur, musicien, danseur, comédien, humoriste, slameur, conteur. Il a des droits sur sa propre prestation (les droits voisins).",
        lien: {
          label: "En savoir plus sur la propriété intellectuelle →",
          href: "/ressources/propriete-intellectuelle",
        },
      },
      {
        nom: "Metteur en scène / chorégraphe",
        definition:
          "Il conçoit la représentation : comment l'œuvre est jouée, dansée, occupée dans l'espace. Il dirige les interprètes.",
      },
      {
        nom: "Directeur artistique",
        definition:
          "Il définit la ligne et la cohérence d'un projet, d'un festival ou d'une salle : quels artistes, quel univers, quelle identité.",
      },
    ],
  },
  {
    titre: "La production et l'organisation — monter et porter le projet",
    metiers: [
      {
        nom: "Producteur (entrepreneur de spectacles)",
        definition:
          "Il monte le projet et porte le risque financier : il réunit le budget, engage les artistes, coordonne l'ensemble. En Côte d'Ivoire, c'est un « entrepreneur de spectacles » au sens de la loi — donc concerné par la licence.",
        lien: {
          label: "Suis-je concerné par la licence ? →",
          href: "/suis-je-concerne",
        },
      },
      {
        nom: "Tourneur",
        definition:
          "Il organise la circulation d'un spectacle de ville en ville : il démarche les dates, négocie avec les lieux, construit la tournée.",
      },
      {
        nom: "Diffuseur",
        definition:
          "Il accueille et présente au public un spectacle produit par un autre : une salle, un festival, un centre culturel.",
      },
      {
        nom: "Exploitant de salle",
        definition:
          "Il gère un lieu de spectacle : la programmation, l'accueil, la technique, la sécurité du public.",
      },
      {
        nom: "Administrateur / chargé de production",
        definition:
          "Il fait tourner la machine côté gestion : budgets, contrats, paie, logistique, autorisations. Le bras droit du producteur.",
      },
      {
        nom: "Régisseur général",
        definition:
          "Il coordonne le déroulé concret : le planning, les équipes, la logistique du jour J. Il fait le lien entre l'artistique et la technique.",
      },
    ],
  },
  {
    titre: "La technique — donner corps au spectacle",
    metiers: [
      {
        nom: "Régisseur (son, lumière ou plateau)",
        definition:
          "Il prépare et opère la technique pendant le spectacle, dans sa spécialité.",
      },
      {
        nom: "Ingénieur du son",
        definition: "Il gère le son : sonorisation de la salle, retours des artistes, équilibre général.",
      },
      {
        nom: "Créateur lumière",
        definition: "Il conçoit l'ambiance lumineuse : ce que le public voit, l'atmosphère, les effets.",
      },
      {
        nom: "Machiniste / technicien plateau",
        definition: "Il monte, démonte et manœuvre le décor et les équipements sur scène.",
      },
      {
        nom: "Backliner",
        definition: "Il s'occupe des instruments et du matériel des musiciens : installation, réglage, entretien.",
      },
    ],
  },
  {
    titre: "L'accompagnement et la diffusion — faire venir le public",
    metiers: [
      {
        nom: "Manager / agent d'artiste",
        definition: "Il accompagne la carrière d'un artiste : stratégie, contacts, négociation des engagements.",
      },
      {
        nom: "Attaché de presse / chargé de communication",
        definition: "Il fait connaître le spectacle : presse, réseaux, affiches, relations avec les médias.",
      },
      {
        nom: "Billetterie et accueil",
        definition: "Ils gèrent la vente des places, le contrôle d'accès et l'accueil du public le jour J.",
      },
      {
        nom: "Agent de sécurité",
        definition: "Il veille à la sécurité du public et des artistes : contrôle d'accès, gestion des flux, premiers secours.",
      },
    ],
  },
];

export default function FondamentauxPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">
        Centre de ressources
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Les fondamentaux du spectacle vivant
      </h1>

      <section id="c-est-quoi" className="mt-6 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          C&apos;est quoi, le spectacle vivant ?
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Le spectacle vivant, c&apos;est tout ce qui se joue{" "}
          <strong className="text-foreground">en direct, devant un public</strong>{" "}
          : un concert, une pièce de théâtre, un spectacle de danse, un
          one-man-show, un conte, un numéro de cirque, une cérémonie. Ce qui
          le définit, c&apos;est la présence — des artistes et des
          spectateurs, au même endroit, au même moment.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Ce n&apos;est pas un petit monde à part : c&apos;est un secteur
          entier, avec ses métiers, ses règles et son économie. En
          comprendre les bases, c&apos;est déjà mieux s&apos;y situer.
        </p>
      </section>

      <nav className="mt-8 rounded-xl border border-border bg-black/[0.02] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          Sommaire
        </p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm">
          {SOMMAIRE.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary-dark underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="chaine" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Comment ça marche : la chaîne du spectacle
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Un spectacle passe par quatre grandes étapes. Souvent, une même
          personne en cumule plusieurs — mais les comprendre séparément aide
          à savoir qui fait quoi.
        </p>
        <ol className="mt-4 flex flex-col gap-3">
          {CHAINE.map((c, i) => (
            <li key={c.etape} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary-dark">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm text-muted">
                <strong className="text-foreground">{c.etape}</strong> —{" "}
                {c.texte}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="metiers" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Les métiers, famille par famille
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          {FAMILLES.map((famille) => (
            <div key={famille.titre}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">
                {famille.titre}
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {famille.metiers.map((m) => (
                  <details
                    key={m.nom}
                    className="group rounded-xl border border-border bg-surface p-4 open:shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
                      <span className="flex items-center justify-between gap-3">
                        {m.nom}
                        <span className="shrink-0 text-primary-dark transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2.5 max-w-prose text-sm text-muted">
                      {m.definition}
                    </p>
                    {m.lien && (
                      <Link
                        href={m.lien.href}
                        className="mt-2 inline-block text-sm font-medium text-primary-dark underline"
                      >
                        {m.lien.label}
                      </Link>
                    )}
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="synthese" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Comment un spectacle prend vie
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Un spectacle naît d&apos;une œuvre — l&apos;auteur —, portée par
          des interprètes et façonnée par un metteur en scène. Un producteur
          le monte et prend le risque ; un tourneur le fait voyager ; un
          diffuseur l&apos;accueille dans son lieu. Le jour J, une équipe
          technique lui donne corps — son, lumière, plateau — pendant
          qu&apos;une autre gère la billetterie, la communication et la
          sécurité.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Chacun de ces métiers est un maillon. Enlevez-en un, et le
          spectacle boite. C&apos;est pour ça qu&apos;un secteur qui se
          structure, c&apos;est un secteur où chaque maillon est reconnu —
          et rémunéré.
        </p>
      </section>

      <div className="mt-10 rounded-xl border border-border bg-surface p-5 shadow-sm">
        <h2 className="text-base font-bold text-foreground">
          Pour aller plus loin
        </h2>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm">
          <li>
            <Link
              href="/suis-je-concerne"
              className="text-primary-dark underline"
            >
              Suis-je concerné par la licence ?
            </Link>{" "}
            <span className="text-muted">— pour les producteurs.</span>
          </li>
          <li>
            <Link
              href="/ressources/propriete-intellectuelle"
              className="text-primary-dark underline"
            >
              Propriété intellectuelle
            </Link>{" "}
            <span className="text-muted">
              — pour les droits sur les œuvres et les prestations.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
