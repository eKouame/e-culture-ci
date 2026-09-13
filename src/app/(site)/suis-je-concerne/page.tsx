import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { DotPill } from "@/components/ui/DotPill";
import { Questionnaire } from "./Questionnaire";
import { DATE_VERIFICATION } from "./config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Suis-je concerné par la licence de spectacle ? | e-Culture CI",
  description:
    "Répondez à trois questions et découvrez si la réforme des licences de spectacle vivant vous concerne, dans quelle catégorie, et ce que vous devez préparer. Gratuit, indépendant, rien n'est enregistré.",
  path: "/suis-je-concerne",
});

export default function SuisJeConcernePage() {
  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">
              Suis-je concerné ?
            </span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Suis-je concerné par la licence de spectacle ?
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Trois questions, une minute. Vous saurez si la réforme des
            licences vous concerne, dans quelle catégorie, et ce que vous
            pouvez préparer dès maintenant.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DotPill dot="secondary">Rien n&apos;est enregistré</DotPill>
            <DotPill dot="primary">Gratuit et sans compte</DotPill>
            <DotPill dot="deep">Orientation, pas décision officielle</DotPill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Questionnaire />
        <p className="mt-4 text-sm text-muted">
          Informations vérifiées le {DATE_VERIFICATION}. La réglementation
          évolue : vérifiez auprès du ministère avant tout engagement.
        </p>
      </section>

      <section className="bg-deep text-on-deep">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Un doute sur votre situation ?
            </h2>
            <p className="mt-3 max-w-md text-on-deep-muted">
              Les ressources reprennent tout depuis le début : le
              vocabulaire, les acteurs, les obligations et le budget.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <LinkButton href="/ressources" size="lg">
              Centre de ressources
            </LinkButton>
            <LinkButton href="/declaration" variant="outlineOnDeep" size="lg">
              Ma déclaration
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
