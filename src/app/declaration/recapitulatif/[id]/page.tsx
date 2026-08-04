import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrintButton } from "@/components/ui/PrintButton";
import { LinkButton } from "@/components/ui/Button";
import { NextStepsNotice } from "@/components/ui/NextStepsNotice";
import { TYPE_SPECTACLE_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Récapitulatif de déclaration | e-Culture CI",
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function RecapitulatifPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const declaration = await prisma.declaration.findUnique({ where: { id } });

  if (!declaration) {
    notFound();
  }

  const typeSpectacleLabel =
    declaration.typeSpectacle === "AUTRE"
      ? declaration.typeSpectacleAutre || "Autre"
      : TYPE_SPECTACLE_LABELS[declaration.typeSpectacle];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="no-print mb-6 flex items-center justify-between">
        <span className="rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary-dark">
          ✅ Déclaration enregistrée
        </span>
        <PrintButton />
      </div>

      <div className="rounded-xl border-2 border-border bg-surface p-6 sm:p-8">
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Récapitulatif de déclaration
            </p>
            <p className="text-lg font-bold text-foreground">e-Culture CI</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Référence</p>
            <p className="text-lg font-extrabold text-primary">
              {declaration.numero}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Field label="Organisateur">
            {declaration.organisateurNom} {declaration.organisateurPrenom ?? ""}
          </Field>
          <Field label="Téléphone">{declaration.organisateurTelephone}</Field>
          {declaration.organisateurStructure && (
            <Field label="Structure / association">
              {declaration.organisateurStructure}
            </Field>
          )}
          {declaration.titreEvenement && (
            <Field label="Titre de l'événement">
              {declaration.titreEvenement}
            </Field>
          )}
          <Field label="Type de spectacle">{typeSpectacleLabel}</Field>
          <Field label="Date de l'événement">
            {dateFormat.format(declaration.dateEvenement)}
          </Field>
          <Field label="Lieu">{declaration.lieu}</Field>
          <Field label="Commune / Région">
            {declaration.commune}, {declaration.region}
          </Field>
          <Field label="Jauge estimée">
            {declaration.jaugeEstimee} spectateurs
          </Field>
          <Field label="Entrée">
            {declaration.entreePayante ? "Payante" : "Gratuite"}
          </Field>
          <Field label="Date de soumission">
            {dateFormat.format(declaration.createdAt)}
          </Field>
        </dl>

        <p className="mt-6 border-t border-border pt-4 text-xs text-muted">
          Ce récapitulatif atteste qu&apos;une déclaration a été enregistrée
          auprès de e-Culture CI, conformément à l&apos;article 10 du décret
          de 2021 relatif au spectacle vivant. Conservez-le pour vos
          démarches auprès des autorités locales (mairie, préfecture).
        </p>
      </div>

      <NextStepsNotice />

      <div className="no-print mt-6 flex flex-col gap-2 sm:flex-row">
        <LinkButton href="/" variant="outline">
          Retour à l&apos;accueil
        </LinkButton>
        <LinkButton href="/declaration" variant="ghost">
          Déclarer un autre événement
        </LinkButton>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{children}</dd>
    </div>
  );
}
