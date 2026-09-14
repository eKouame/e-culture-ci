import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { DotPill } from "@/components/ui/DotPill";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "e-Culture CI — Comprendre et préparer vos démarches du spectacle vivant",
  description:
    "Service culturel de proximité, indépendant et gratuit, pour comprendre la réglementation du spectacle vivant et préparer vos démarches, partout en Côte d'Ivoire.",
  path: "/",
});

const PORTES = [
  {
    href: "/suis-je-concerne",
    titre: "Suis-je concerné ?",
    description:
      "Quelques questions pour savoir si votre événement relève d'une déclaration, et lesquelles vous concernent.",
    cta: "Faire le point",
    accent: true,
  },
  {
    href: "/ressources",
    titre: "Le centre de ressources",
    description:
      "Cinq ressources qui vont de la compréhension du secteur jusqu'à la mise en règle de votre projet.",
    cta: "Parcourir le parcours →",
    accent: false,
  },
  {
    href: "/communes",
    titre: "L'espace mairies",
    description:
      "Pour les communes : ce qui se passe côté mairie quand un événement est organisé sur votre territoire.",
    cta: "Voir l'espace communes →",
    accent: false,
  },
];

const RESSOURCES = [
  {
    numero: "01",
    href: "/ressources/fondamentaux",
    titre: "Les fondamentaux du spectacle vivant",
    description: "Le vocabulaire, les acteurs et les règles de base, sans jargon.",
  },
  {
    numero: "02",
    href: "/ressources/note-intention",
    titre: "De l'idée à la note d'intention",
    description: "Mettre votre projet par écrit, clairement, en une page.",
  },
  {
    numero: "03",
    href: "/ressources/budget",
    titre: "Bâtir votre budget",
    description: "Les postes de dépense à ne pas oublier et comment les chiffrer.",
  },
  {
    numero: "04",
    href: "/ressources/propriete-intellectuelle",
    titre: "Propriété intellectuelle",
    description: "Droits d'auteur et droits voisins : qui doit quoi, et quand.",
  },
  {
    numero: "05",
    href: "/ressources/payer-artistes",
    titre: "Déclarer et payer vos artistes",
    description: "Retenue à la source, cotisations et paiements : la marche à suivre.",
  },
];

const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61592840133412&sk=about";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-deep-strong text-on-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-e-mark.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden h-[85%] w-auto -translate-y-1/2 translate-x-1/4 opacity-10 md:block"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-on-deep">
              Service culturel de proximité
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Le spectacle vivant, expliqué simplement — partout en Côte
              d&apos;Ivoire.
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-on-deep-muted">
              Comprenez la réglementation et préparez vos démarches, où que
              vous soyez. Des informations fiables, des ressources claires,
              un accompagnement. Gratuit et indépendant.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/suis-je-concerne" size="lg">
                Suis-je concerné ?
              </LinkButton>
              <LinkButton href="/ressources" variant="outlineOnDeep" size="lg">
                Parcourir les ressources
              </LinkButton>
            </div>
            <p className="mt-7 max-w-md border-t border-white/15 pt-4 text-sm text-on-deep-muted">
              Service d&apos;information indépendant, sans lien officiel avec
              le ministère de la Culture.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-dark"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.5 2.5 4.5-5" />
              </svg>
            </span>
            <p className="pt-1 text-sm">
              <strong className="font-bold text-foreground">Gratuit</strong>{" "}
              <span className="text-muted">
                — aucun compte, aucun paiement.
              </span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-dark"
              >
                <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
              </svg>
            </span>
            <p className="pt-1 text-sm">
              <strong className="font-bold text-foreground">Indépendant</strong>{" "}
              <span className="text-muted">
                — nous expliquons, nous ne délivrons rien.
              </span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-dark"
              >
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                <path d="M11 18.5h2" />
              </svg>
            </span>
            <p className="pt-1 text-sm">
              <strong className="font-bold text-foreground">
                Conçu pour le mobile
              </strong>{" "}
              <span className="text-muted">
                — léger, jusque dans le pays profond.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Par où commencer ?
        </h2>
        <p className="mt-2 max-w-prose text-muted">
          Trois entrées, au choix. Prenez celle qui correspond à votre
          situation.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PORTES.map((p) => (
            <div
              key={p.href}
              className={
                p.accent
                  ? "flex flex-col gap-3 rounded-xl bg-deep-strong p-6 text-on-deep"
                  : "flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
              }
            >
              <h3
                className={
                  p.accent
                    ? "text-lg font-extrabold"
                    : "text-lg font-extrabold text-foreground"
                }
              >
                {p.titre}
              </h3>
              <p
                className={
                  p.accent
                    ? "flex-1 text-sm text-on-deep-muted"
                    : "flex-1 text-sm text-muted"
                }
              >
                {p.description}
              </p>
              {p.accent ? (
                <LinkButton href={p.href} className="self-start">
                  {p.cta}
                </LinkButton>
              ) : (
                <Link
                  href={p.href}
                  className="text-sm font-bold text-primary-dark"
                >
                  {p.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Des ressources claires, pour chaque étape
            </h2>
            <p className="mt-2 max-w-prose text-muted">
              Écrites pour être comprises, même quand on débute. À lire
              librement, autant de fois qu&apos;il faut.
            </p>
          </div>
          <Link
            href="/ressources"
            className="text-sm font-bold text-primary-dark"
          >
            Voir toutes les ressources →
          </Link>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
          {RESSOURCES.map((r, i) => (
            <Link
              key={r.href}
              href={r.href}
              className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-black/[0.03] ${
                i < RESSOURCES.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-extrabold text-primary-dark">
                {r.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-foreground">
                  {r.titre}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {r.description}
                </span>
              </span>
              <span className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-bold text-secondary">
                Lire →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 -mb-12 bg-secondary text-on-deep">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Vous nous avez découverts sur Facebook ?
            </h2>
            <p className="mt-3 max-w-md text-on-deep-muted">
              Bienvenue. Prenez le temps d&apos;explorer — tout est gratuit,
              et pensé pour vous être utile tout de suite.
            </p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-bold text-accent-on-deep hover:text-on-deep"
            >
              Suivre la page Facebook →
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/suis-je-concerne"
              className="rounded-lg border border-white/25 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
            >
              <span className="block text-xs font-semibold text-accent-on-deep">
                Pour savoir où vous en êtes
              </span>
              <span className="block text-base font-bold">
                Suis-je concerné par la licence ?
              </span>
            </Link>
            <Link
              href="/ressources/fondamentaux"
              className="rounded-lg border border-white/25 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
            >
              <span className="block text-xs font-semibold text-accent-on-deep">
                Pour comprendre le secteur
              </span>
              <span className="block text-base font-bold">
                Les fondamentaux du spectacle vivant
              </span>
            </Link>
            <Link
              href="/ressources/budget"
              className="rounded-lg border border-white/25 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
            >
              <span className="block text-xs font-semibold text-accent-on-deep">
                Pour monter un projet
              </span>
              <span className="block text-base font-bold">
                Bâtir votre budget
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
