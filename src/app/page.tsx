import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const MODULES = [
  {
    href: "/suis-je-concerne",
    emoji: "🧭",
    title: "Suis-je concerné ?",
    description:
      "Réponds à quelques questions simples pour voir en 1 minute si la licence te concerne — ou si, sans doute, tu n'es pas concerné.",
    cta: "Faire le test",
  },
  {
    href: "/declaration",
    emoji: "📝",
    title: "Préparer ma déclaration",
    description:
      "Renseigne ton événement en quelques minutes et repars avec ta fiche récapitulative e-Culture CI : un document clair qui résume ta situation, à garder sous la main quand tu iras voir ta mairie.",
    cta: "Préparer ma déclaration",
  },
  {
    href: "/immatriculation",
    emoji: "📋",
    title: "Rejoindre l'annuaire des organisateurs",
    description:
      "Inscris-toi, seul ou en association, dans l'annuaire e-Culture CI des organisateurs. Tu te rends visible auprès de la communauté et tu te prépares aux démarches officielles à venir.",
    cta: "Rejoindre l'annuaire",
  },
  {
    href: "/ressources",
    emoji: "📚",
    title: "Centre de Ressources",
    description:
      "Comprends la réglementation en langage simple, et trouve un mentor pour bien démarrer.",
    cta: "Consulter les ressources",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-primary-light to-transparent">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="mx-auto mb-4 inline-block rounded-full bg-secondary-light px-4 py-1.5 text-sm font-semibold text-secondary-dark">
            Beaucoup d&apos;organisateurs occasionnels ne sont pas concernés
            par la licence. Vérifie ton cas en 1 minute.
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            e-Culture CI
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-muted">
            Comprendre les règles du spectacle vivant et préparer tes
            démarches — partout en Côte d&apos;Ivoire.
          </p>

          <p className="mx-auto mt-5 max-w-2xl rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm text-muted sm:text-center">
            e-Culture CI est un outil indépendant d&apos;orientation, encore
            en test. Il t&apos;aide à comprendre la réglementation et à
            préparer tes démarches. Il ne délivre aucun document officiel et
            ne remplace ni ta mairie ni le ministère de la Culture.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted">
            Tu organises un concert, une cérémonie, un festival ou un
            spectacle occasionnel ? En 1 minute, vois si la licence te
            concerne, prépare ta déclaration, et trouve les bonnes infos pour
            démarrer sans te tromper.
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
