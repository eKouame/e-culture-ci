import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "De l'idée à la note d'intention | e-Culture CI",
  description:
    "Un framework simple en 5 questions pour transformer votre idée de spectacle en une note d'intention claire, prête à montrer à un partenaire.",
  path: "/ressources/note-intention",
});

const SOMMAIRE = [
  { id: "a-quoi-ca-sert", label: "C'est quoi, et à quoi ça sert ?" },
  { id: "framework", label: "Le framework en 5 questions" },
  { id: "modele", label: "Assemblez votre note d'intention" },
  { id: "exemple", label: "Un exemple pour voir" },
  { id: "pieges", label: "3 pièges à éviter" },
  { id: "et-apres", label: "Et après ?" },
];

const FRAMEWORK = [
  {
    question: "C'est quoi ? — votre idée en une phrase",
    consigne:
      "Résumez votre spectacle en une seule phrase, claire, comprise par quelqu'un qui n'y connaît rien. Si vous n'y arrivez pas encore, c'est que l'idée a besoin de mûrir — et c'est normal.",
    repere: {
      tone: "bon-signe" as const,
      texte:
        "Une personne comprend votre projet en une phrase, et peut le répéter à quelqu'un d'autre.",
    },
  },
  {
    question: "Pourquoi ? — votre intention",
    consigne:
      "C'est le cœur. Qu'est-ce que vous voulez dire, montrer, faire ressentir ? Qu'est-ce qui vous tient à cœur là-dedans ? C'est cette réponse qui transforme un simple événement en un projet qui a du sens.",
    repere: {
      tone: "piege" as const,
      texte:
        "Répondre « pour faire un bon spectacle ». Allez plus loin — pour raconter quoi, toucher qui, changer quoi ?",
    },
  },
  {
    question: "Pour qui ? — votre public",
    consigne:
      "À qui vous adressez-vous vraiment ? Les jeunes de votre quartier ? Les amateurs de slam ? Les familles ? Un public précis est plus facile à toucher — et plus convaincant pour un partenaire — qu'un « tout le monde » flou.",
  },
  {
    question: "Comment ? — la forme",
    consigne:
      "Sous quelle forme votre intention prend vie ? Concert, théâtre, danse, un mélange ? Quel ton (grave, festif, intime), quelle ambiance, quelle durée à peu près ? Décrivez ce que le spectateur va voir et vivre.",
  },
  {
    question: "Pourquoi ici, maintenant ? — votre singularité",
    consigne:
      "Qu'est-ce qui rend votre spectacle unique, et pourquoi il a sa place ici et maintenant ? Votre lien à votre territoire, à votre époque, à votre communauté. C'est souvent ça qui fait la différence aux yeux d'un financeur.",
  },
];

export default function NoteIntentionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">
        Centre de ressources
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        De l&apos;idée à la note d&apos;intention
      </h1>

      <nav className="mt-6 rounded-xl border border-border bg-black/[0.02] p-4">
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

      <section id="a-quoi-ca-sert" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          C&apos;est quoi une note d&apos;intention, et à quoi ça sert ?
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Avant le budget, avant la salle, avant les artistes, il y a une
          chose à poser : votre{" "}
          <strong className="text-foreground">note d&apos;intention</strong>.{" "}
          C&apos;est le tout premier document d&apos;un projet de spectacle.
          En une page, elle dit ce que vous voulez créer et pourquoi.
          C&apos;est ce que vous montrerez à un partenaire, une salle ou un
          financeur pour leur donner envie de vous suivre.
        </p>
        <p className="mt-3 max-w-prose text-muted">
          Ce n&apos;est pas un budget, ni un programme, ni une affiche.
          C&apos;est le cœur du projet, mis en mots. Et bonne nouvelle :
          pour l&apos;écrire, vous n&apos;avez pas besoin d&apos;être un
          pro. Il vous suffit de répondre honnêtement à{" "}
          <strong className="text-foreground">5 questions</strong>.
        </p>
      </section>

      <section id="framework" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Le framework : 5 questions pour passer de l&apos;idée à la note
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {FRAMEWORK.map((f, i) => (
            <div
              key={f.question}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary-dark">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-foreground">{f.question}</p>
                  <p className="mt-1.5 text-sm text-muted">{f.consigne}</p>
                  {f.repere && (
                    <p
                      className={`mt-2 text-sm font-medium ${
                        f.repere.tone === "bon-signe"
                          ? "text-secondary-dark"
                          : "text-primary-dark"
                      }`}
                    >
                      {f.repere.tone === "bon-signe"
                        ? "✅ Le bon signe : "
                        : "⚠️ Le piège : "}
                      <span className="font-normal">{f.repere.texte}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="modele" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Assemblez votre note d&apos;intention
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Reprenez vos réponses dans cet ordre.{" "}
          <strong className="text-foreground">Une page suffit.</strong>
        </p>
        <Card className="mt-4">
          <p className="text-sm font-bold uppercase tracking-wide text-muted">
            [Titre provisoire du spectacle]
          </p>
          <dl className="mt-4 flex flex-col gap-4 text-sm">
            <div>
              <dt className="font-bold text-foreground">
                Le projet en une phrase
              </dt>
              <dd className="mt-1 text-muted">→ votre réponse à la question 1</dd>
            </div>
            <div>
              <dt className="font-bold text-foreground">L&apos;intention</dt>
              <dd className="mt-1 text-muted">
                → votre réponse à la question 2 : pourquoi ce spectacle, ce
                que vous voulez dire
              </dd>
            </div>
            <div>
              <dt className="font-bold text-foreground">Le public visé</dt>
              <dd className="mt-1 text-muted">→ votre réponse à la question 3</dd>
            </div>
            <div>
              <dt className="font-bold text-foreground">La forme</dt>
              <dd className="mt-1 text-muted">
                → votre réponse à la question 4 : discipline, ton, ambiance,
                durée
              </dd>
            </div>
            <div>
              <dt className="font-bold text-foreground">
                Ce qui le rend singulier
              </dt>
              <dd className="mt-1 text-muted">
                → votre réponse à la question 5 : unicité, ancrage, pourquoi
                maintenant
              </dd>
            </div>
            <div>
              <dt className="font-bold text-foreground">
                L&apos;équipe pressentie{" "}
                <span className="font-normal text-muted">(optionnel)</span>
              </dt>
              <dd className="mt-1 text-muted">
                → les personnes ou les talents que vous imaginez réunir
              </dd>
            </div>
          </dl>
        </Card>
      </section>

      <section id="exemple" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          Un exemple pour voir
        </h2>
        <Card className="mt-4 border-secondary/30 bg-secondary-light">
          <p className="text-sm font-semibold text-secondary-dark">
            Exemple fictif, juste pour illustrer.
          </p>
          <p className="mt-3 text-sm text-foreground">
            <strong>Titre : « Cour commune »</strong>
          </p>
          <dl className="mt-3 flex flex-col gap-3 text-sm text-foreground">
            <div>
              <dt className="font-bold">Le projet en une phrase :</dt>
              <dd className="mt-0.5">
                un spectacle musical et théâtral qui fait revivre les
                histoires d&apos;une cour commune abidjanaise, un soir de
                coupure d&apos;électricité.
              </dd>
            </div>
            <div>
              <dt className="font-bold">L&apos;intention :</dt>
              <dd className="mt-0.5">
                montrer que c&apos;est dans les petites galères partagées
                que naît la solidarité de quartier — et la célébrer.
              </dd>
            </div>
            <div>
              <dt className="font-bold">Le public :</dt>
              <dd className="mt-0.5">
                les habitants des quartiers populaires, toutes générations,
                et ceux qui y ont grandi.
              </dd>
            </div>
            <div>
              <dt className="font-bold">La forme :</dt>
              <dd className="mt-0.5">
                un spectacle d&apos;une heure, mêlant musique live, saynètes
                et conte, dans une ambiance chaleureuse et drôle.
              </dd>
            </div>
            <div>
              <dt className="font-bold">Ce qui le rend singulier :</dt>
              <dd className="mt-0.5">
                il se joue en plein air, dans de vraies cours, au plus près
                des gens dont il parle.
              </dd>
            </div>
          </dl>
          <p className="mt-4 max-w-prose text-sm text-foreground">
            En cinq lignes, on comprend le projet, on sent l&apos;intention,
            et on a envie d&apos;en savoir plus. C&apos;est tout ce
            qu&apos;une note d&apos;intention doit faire.
          </p>
        </Card>
      </section>

      <section id="pieges" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">
          3 pièges à éviter
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-bold text-foreground">Vouloir tout dire.</p>
            <p className="mt-1.5 text-sm text-muted">
              Une note, c&apos;est une intention claire, pas le catalogue de
              tout ce que vous savez faire.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-bold text-foreground">
              Rester vague sur le public.
            </p>
            <p className="mt-1.5 text-sm text-muted">
              « Pour tout le monde » ne convainc personne.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-bold text-foreground">
              Confondre note et budget.
            </p>
            <p className="mt-1.5 text-sm text-muted">
              La note dit le quoi et le pourquoi. Le combien vient après.
            </p>
          </div>
        </div>
      </section>

      <section id="et-apres" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-foreground">Et après ?</h2>
        <p className="mt-3 max-w-prose text-muted">
          Une fois votre note claire, vous tenez la colonne vertébrale de
          votre projet. Tout le reste —{" "}
          <Link
            href="/ressources/budget"
            className="font-medium text-primary-dark underline"
          >
            budget
          </Link>
          , équipe, lieu, autorisations — découlera de là.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          <li>
            <Link
              href="/suis-je-concerne"
              className="font-medium text-primary-dark underline"
            >
              Suis-je concerné par la licence ?
            </Link>{" "}
            <span className="text-muted">
              — pour savoir si votre projet est concerné.
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
              — pour comprendre les métiers à réunir autour de vous.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
