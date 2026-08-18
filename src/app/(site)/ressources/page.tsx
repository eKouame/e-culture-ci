import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Centre de Ressources | e-Culture CI",
};

export default function RessourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">Centre de ressources</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        La réglementation expliquée simplement
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Le décret de 2021 sur le spectacle vivant a été mal communiqué au
        départ, ce qui a créé beaucoup de confusion et de peur sur le
        terrain. Voici, en langage simple, ce que dit réellement le texte.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <span className="text-2xl">✅</span>
          <h2 className="mt-2 text-base font-bold text-secondary-dark">
            Si vous organisez occasionnellement
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Mariages, funérailles, fêtes de quartier, tournois, festivals
            communautaires, sensibilisation... vous êtes très probablement
            exempté(e) de licence et de caution bancaire. Une simple
            déclaration gratuite suffit.
          </p>
        </Card>
        <Card>
          <span className="text-2xl">🎫</span>
          <h2 className="mt-2 text-base font-bold text-primary-dark">
            Si le spectacle est votre métier
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Si l&apos;organisation de spectacles est votre activité
            professionnelle principale, vous devez obtenir une licence
            (5 000 000 FCFA) et constituer une caution bancaire de garantie
            (5 000 000 FCFA) — au total 10 000 000 FCFA, versés à un
            établissement bancaire, pas directement au ministère.
          </p>
        </Card>
      </div>

      <Card className="mt-6 border-danger/30 bg-red-50">
        <h2 className="text-base font-bold text-danger">
          ⚠️ La rumeur à ne pas croire
        </h2>
        <p className="mt-1.5 max-w-prose text-sm text-foreground">
          Une rumeur affirme que <strong>tout le monde</strong> devrait payer
          jusqu&apos;à <strong>10 000 000 FCFA</strong> pour organiser un
          événement. C&apos;est faux pour la grande majorité des acteurs : ce
          montant ne concerne que les professionnels dont le spectacle est
          l&apos;activité principale — pas les organisateurs occasionnels à
          but socio-éducatif, sportif, philanthropique ou de promotion de la
          culture locale.
        </p>
        <LinkButton href="/suis-je-concerne" size="md" className="mt-4">
          Vérifier ma situation
        </LinkButton>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-base font-bold text-foreground">
            Questions fréquentes
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Toutes les réponses détaillées sur les licences, la déclaration
            et l&apos;immatriculation.
          </p>
          <LinkButton href="/ressources/faq" variant="outline" className="mt-4">
            Voir la FAQ
          </LinkButton>
        </Card>
        <Card>
          <h2 className="text-base font-bold text-foreground">
            Mentorat &amp; parrainage (Licence B)
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Vous débutez ? La réglementation exige de réaliser 5 spectacles
            sous la supervision d&apos;un professionnel licencié avant
            d&apos;opérer en autonomie. Trouvez un mentor.
          </p>
          <LinkButton href="/ressources/mentorat" variant="outline" className="mt-4">
            Trouver un mentor
          </LinkButton>
        </Card>
      </div>
    </div>
  );
}
