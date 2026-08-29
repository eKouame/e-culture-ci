import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stamp } from "@/components/ui/Stamp";

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
      "6 guides pratiques pour comprendre le secteur, lancer votre projet, chiffrer votre budget et connaître vos droits.",
    cta: "Consulter les ressources",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-primary-light to-transparent">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="mx-auto mb-5 flex flex-col items-center gap-2">
            <Stamp className="!px-5 !py-2.5 text-base">70–90 %</Stamp>
            <p className="max-w-xs text-sm font-semibold text-secondary-dark">
              des organisateurs occasionnels sont exemptés de licence
            </p>
            <p className="text-xs text-muted">
              Selon le directeur juridique du ministère de la Culture, le 2
              août 2026.
            </p>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            e-Culture CI
          </h1>
          <p className="mx-auto mt-3 max-w-prose text-xl font-medium text-foreground">
            Comprenez la réglementation du spectacle vivant et préparez vos
            démarches, partout en Côte d&apos;Ivoire.
          </p>
          <p className="mx-auto mt-2.5 max-w-prose text-sm text-muted">
            Concert, cérémonie, festival, spectacle : découvrez en 1 minute
            si une licence vous concerne.
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
            <Card key={m.href} dogEar className="ledger-lines flex flex-col">
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
