import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Propriété intellectuelle | e-Culture CI",
  description:
    "Comprendre les bases de la propriété intellectuelle dans le spectacle vivant en Côte d'Ivoire : droit d'auteur, droits voisins, marques — et vers qui se tourner (BURIDA, OIPI).",
};

const LIENS = {
  burida: "https://www.buridaci.com",
  oipi: "https://oipi.ci",
  oapi: "https://oapi.int",
  wipolex: "https://www.wipo.int/wipolex/fr/",
};

const FAQ = [
  {
    q: "Je monte un concert avec des reprises. Dois-je payer des droits ?",
    a: "Oui. Dès que vous diffusez en public des œuvres que vous n'avez pas créées — reprises, playback, musique en fond de soirée — vous devez demander une autorisation et payer une redevance. En Côte d'Ivoire, le BURIDA est le seul habilité à la gérer. À anticiper avant l'événement, pas après.",
    lien: { label: "Pour la démarche → BURIDA", href: LIENS.burida },
  },
  {
    q: "J'ai créé un festival. Comment protéger son nom ?",
    a: "Le nom et le logo d'un festival se protègent en déposant une marque. Attention : un nom n'est pas protégé automatiquement. Vous déposez via l'OIPI, qui transmet à l'OAPI — et ce dépôt vous protège dans les 17 pays de l'espace OAPI. Pensez à faire vérifier d'abord que le nom est libre (une « recherche d'antériorité »).",
    lien: { label: "Pour la démarche → OIPI (oipi.ci)", href: LIENS.oipi },
  },
  {
    q: "Un autre organisateur a pris le même nom que mon événement. Qui a raison ?",
    a: "Pour une marque, la règle est simple : c'est le premier qui dépose qui l'emporte, pas le premier qui a eu l'idée. D'où l'importance de déposer tôt. Si vous avez déposé votre marque et qu'un autre l'utilise, vous pouvez faire valoir vos droits.",
    lien: { label: "Pour vérifier ou déposer → OIPI (oipi.ci)", href: LIENS.oipi },
  },
  {
    q: "Je suis danseur, musicien ou comédien. Ai-je des droits sur ma prestation ?",
    a: "Oui. Même si vous n'êtes pas l'auteur de l'œuvre, en tant qu'artiste-interprète vous avez ce qu'on appelle des droits voisins — des droits sur votre propre interprétation. Le BURIDA gère aussi ces droits, aux côtés de ceux des auteurs et des producteurs.",
    lien: { label: "Pour en savoir plus → BURIDA", href: LIENS.burida },
  },
  {
    q: "J'ai écrit une chanson ou créé une chorégraphie. Suis-je protégé(e) ?",
    a: "Votre création vous appartient dès que vous l'avez réalisée. Pour la faire gérer et percevoir des redevances quand elle est exploitée, vous pouvez adhérer au BURIDA. C'est aussi ce qui vous permet de réagir si quelqu'un l'utilise sans votre accord.",
    lien: { label: "Pour adhérer → BURIDA", href: LIENS.burida },
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

export default function ProprieteIntellectuellePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">
        Centre de ressources
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Propriété intellectuelle
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Quand vous montez un spectacle, vous manipulez des créations : une
        musique, un texte, une chorégraphie, un nom de festival, un logo.
        Tout cela peut être protégé — par vous, ou par quelqu&apos;un
        d&apos;autre. C&apos;est ça, la propriété intellectuelle.
      </p>
      <p className="mt-3 max-w-prose text-muted">
        Il y a deux grandes familles. Et dans un même événement, les deux
        peuvent vous concerner en même temps.
      </p>

      <div className="mt-4 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-sm text-muted">
        ℹ️{" "}
        <strong className="text-foreground">
          Info, pas conseil juridique.
        </strong>{" "}
        Cette page vous informe et vous sensibilise. Pour faire une
        démarche, adressez-vous directement au{" "}
        <strong className="text-foreground">BURIDA</strong>{" "}
        (droit d&apos;auteur) ou à l&apos;
        <strong className="text-foreground">OIPI</strong>{" "}
        (marques, noms, logos).
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-base font-bold text-secondary-dark">
            Le droit d&apos;auteur et les droits voisins
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Ça protège les œuvres et ceux qui les interprètent : la chanson,
            le texte, la danse — mais aussi le musicien, le comédien, le
            danseur qui les portent sur scène. En Côte d&apos;Ivoire,
            c&apos;est le <strong>BURIDA</strong> qui gère ces droits.
          </p>
        </Card>
        <Card>
          <h2 className="text-base font-bold text-primary-dark">
            La propriété industrielle
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Ça protège ce qui identifie votre activité : le nom de votre
            festival, votre logo, le nom de votre structure, un décor ou un
            costume original. Là, vous passez par l&apos;<strong>OIPI</strong>.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="text-base font-bold text-foreground">
          Deux réflexes simples
        </h2>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted">
          <li>
            Si vous{" "}
            <strong className="text-foreground">utilisez</strong>{" "}
            la création d&apos;un autre, vous devez demander
            l&apos;autorisation.
          </li>
          <li>
            Si vous <strong className="text-foreground">créez</strong>
            {", "}vous pouvez protéger ce que vous faites.
          </li>
        </ul>
      </Card>

      <h2 className="mt-10 text-xl font-bold text-foreground">
        Questions fréquentes
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
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
            <a
              href={item.lien.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-primary-dark underline"
            >
              {item.lien.label}
            </a>
          </details>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-foreground">
        Liens et contacts officiels
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACTS.map((c) => (
          <a
            key={c.nom}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary"
          >
            <p className="font-bold text-foreground">{c.nom} ↗</p>
            <p className="mt-1 text-sm text-muted">{c.role}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-black/[0.02] px-4 py-3 text-xs text-muted">
        ℹ️ Cette page est une information de sensibilisation, pas un conseil
        juridique. Pour toute démarche, adressez-vous au BURIDA ou à
        l&apos;OIPI.
      </div>
    </div>
  );
}
