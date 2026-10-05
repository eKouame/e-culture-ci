import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Calculateur } from "@/components/budget/Calculateur";
import { NextCards } from "@/components/ressources/NextCards";
import { BarreOutils } from "@/components/outils/BarreOutils";

export const metadata: Metadata = pageMetadata({
  title: "Calculateur de budget et point d'équilibre pour un spectacle | e-Culture CI",
  description:
    "Entrez vos dépenses, vos recettes et le prix du billet : obtenez le nombre d'entrées à vendre pour couvrir votre spectacle. Gratuit, sans inscription, indépendant.",
  path: "/outils/budget",
});

const FAQ = [
  {
    q: "Qu'est-ce que le point d'équilibre ?",
    a: "C'est le nombre d'entrées à vendre pour que la billetterie couvre ce qu'elle doit couvrir. On le calcule ainsi : vos dépenses totales, moins les recettes qui ne dépendent pas du public (subventions confirmées, sponsoring, coproduction, apports propres), le tout divisé par le prix du billet, arrondi à l'entier supérieur. L'outil le compare ensuite à la taille de votre salle.",
  },
  {
    q: "Pourquoi les imprévus à 10 % ?",
    a: "La ressource « Bâtir votre budget » les décrit comme une marge souvent autour de dix pour cent du total. L'outil les calcule donc à 10 % de vos dépenses, pour que vous n'ayez pas à les chiffrer vous-même. C'est un réglage de départ : vous pouvez saisir une autre valeur, et revenir à 10 % d'un clic.",
  },
  {
    q: "Mes chiffres sont-ils conservés ?",
    a: "Non. Tout se calcule dans votre navigateur : aucun montant n'est envoyé, enregistré ni stocké, ni sur un serveur, ni dans votre appareil. Si vous rechargez la page, les champs sont vides. Seuls trois événements anonymes, sans aucun montant, nous indiquent qu'un calcul a été fait, qu'un récapitulatif a été copié et que le bouton « Enregistrer ce budget » a été touché : l'enregistrement n'existe pas encore, nous mesurons seulement l'envie.",
  },
];

export default function CalculateurBudgetPage() {
  return (
    <div>
      <BarreOutils actif="budget" />
      <div className="no-print border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <Link href="/outils">Outils</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">
              Calculateur de budget
            </span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Calculez le point d&apos;équilibre de votre spectacle
          </h1>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
            Cet outil répond à une seule question : à partir de combien
            d&apos;entrées votre événement est-il couvert ? Vous indiquez votre
            salle et le prix du billet, vos dépenses par famille, puis les
            recettes qui ne dépendent pas du public (subventions confirmées,
            sponsoring, coproduction, apports propres). Il en déduit le point
            d&apos;équilibre, comparé à la taille de votre salle, avec la même
            méthode que la ressource « Bâtir votre budget ». Il ne prévoit pas
            votre fréquentation, ne remplace pas un professionnel du chiffre et
            ne garantit rien : le résultat dépend de vos estimations. Aucun
            compte n&apos;est nécessaire.
          </p>
          <Link
            href="/ressources/budget"
            className="mt-3 inline-block text-sm font-medium text-primary-dark underline"
          >
            ← Revoir la méthode
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Calculateur />

        <section className="no-print mt-12 max-w-3xl">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-secondary-dark">
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-3">
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
              </details>
            ))}
          </div>
        </section>

        <div className="no-print">
          <NextCards
            liens={[
              {
                href: "/ressources/budget",
                label: "Revoir la méthode",
                description: "Les postes de dépense et le principe du point d'équilibre.",
              },
              {
                href: "/ressources/payer-artistes",
                label: "Déclarer et payer vos artistes",
                description: "La retenue sur le cachet fait partie de votre budget.",
              },
              {
                href: "/ressources/candidater-licences",
                label: "Candidater aux licences B et C",
                description: "Frais et caution à prévoir si la licence vous concerne.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
