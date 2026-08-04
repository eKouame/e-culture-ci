import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrintButton } from "@/components/ui/PrintButton";
import { LinkButton } from "@/components/ui/Button";
import { TYPE_ACTIVITE_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Confirmation d'immatriculation | e-Culture CI",
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function ConfirmationImmatriculationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const immatriculation = await prisma.immatriculation.findUnique({
    where: { id },
  });

  if (!immatriculation) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="no-print mb-6 flex items-center justify-between">
        <span className="rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary-dark">
          ✅ Immatriculation enregistrée
        </span>
        <PrintButton />
      </div>

      <div className="rounded-xl border-2 border-border bg-surface p-6 sm:p-8">
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Confirmation d&apos;immatriculation
            </p>
            <p className="text-lg font-bold text-foreground">e-Culture CI</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Numéro d&apos;immatriculation</p>
            <p className="text-lg font-extrabold text-primary">
              {immatriculation.numero}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Field label="Type de demandeur">{immatriculation.typeDemandeur}</Field>
          <Field label="Nom complet">{immatriculation.nomComplet}</Field>
          {immatriculation.raisonSociale && (
            <Field label="Structure / association">
              {immatriculation.raisonSociale}
            </Field>
          )}
          <Field label="Téléphone">{immatriculation.telephone}</Field>
          <Field label="Adresse">{immatriculation.adresse}</Field>
          <Field label="Commune / Région">
            {immatriculation.commune}, {immatriculation.region}
          </Field>
          <Field label="Fréquence d'activité">
            {TYPE_ACTIVITE_LABELS[immatriculation.typeActivite]}
          </Field>
          <Field label="Domaines d'activité">
            {immatriculation.domainesActivite}
          </Field>
          <Field label="Date de soumission">
            {dateFormat.format(immatriculation.createdAt)}
          </Field>
        </dl>

        <p className="mt-6 border-t border-border pt-4 text-xs text-muted">
          Cette confirmation atteste que votre demande d&apos;immatriculation
          a été enregistrée auprès du Guichet Unique e-Culture CI. Votre
          dossier sera examiné et transmis aux services compétents.
        </p>
      </div>

      <div className="no-print mt-6 flex flex-col gap-2 sm:flex-row">
        <LinkButton href="/" variant="outline">
          Retour à l&apos;accueil
        </LinkButton>
        <LinkButton href="/ressources/mentorat" variant="ghost">
          Trouver un mentor
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
