import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const MODULES = [
  {
    href: "/suis-je-concerne",
    emoji: "🧭",
    title: "Suis-je concerné ?",
    description:
      "Répondez à 4 questions simples pour savoir en 1 minute si vous devez payer une licence, ou si vous en êtes exempté.",
    cta: "Faire le test",
  },
  {
    href: "/declaration",
    emoji: "📝",
    title: "Préparer ma déclaration",
    description:
      "Renseignez les informations de votre événement en 3 minutes et obtenez un récapitulatif clair à conserver pour effectuer votre déclaration officielle.",
    cta: "Préparer ma déclaration",
  },
  {
    href: "/immatriculation",
    emoji: "📋",
    title: "Préparer mon immatriculation",
    description:
      "Rassemblez et organisez les pièces nécessaires pour vous enregistrer, seul ou en association, auprès du ministère de la Culture.",
    cta: "Préparer mon dossier",
  },
  {
    href: "/ressources",
    emoji: "📚",
    title: "Centre de Ressources",
    description:
      "Comprenez la réglementation en langage simple et trouvez un mentor pour démarrer votre activité.",
    cta: "Consulter les ressources",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-primary-light to-transparent">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="mx-auto mb-4 flex flex-col items-center gap-1">
            <p className="inline-block rounded-full bg-secondary-light px-4 py-1.5 text-sm font-semibold text-secondary-dark">
              70 à 90 % des organisateurs occasionnels sont exemptés de
              licence
            </p>
            <p className="text-xs text-muted">
              Selon le directeur juridique du ministère de la Culture, le 2
              août 2026.
            </p>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            e-Culture CI
          </h1>
          <p className="mx-auto mt-2 max-w-prose text-lg text-muted">
            L&apos;assistant qui vous aide à comprendre la réglementation du
            spectacle vivant et à préparer vos démarches, partout en Côte
            d&apos;Ivoire.
          </p>
          <p className="mx-auto mt-4 max-w-prose text-sm text-muted">
            Vous organisez un concert, une cérémonie, un festival ou un
            spectacle ? Découvrez en 1 minute si une licence vous concerne,
            préparez votre déclaration, et sachez où effectuer vos démarches
            officielles.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <LinkButton href="/suis-je-concerne" size="lg">
              Suis-je concerné ? →
            </LinkButton>
            <LinkButton href="/ressources/faq" variant="outline" size="lg">
              Comprendre la réglementation
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Card key={m.href} className="flex flex-col">
              <span className="text-3xl">{m.emoji}</span>
              <h2 className="mt-3 text-lg font-bold text-foreground">
                {m.title}
              </h2>
              <p className="mt-1.5 flex-1 text-sm text-muted">
                {m.description}
              </p>
              <LinkButton href={m.href} variant="outline" className="mt-4 self-start">
                {m.cta}
              </LinkButton>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
