import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrintButton } from "@/components/ui/PrintButton";
import { LinkButton } from "@/components/ui/Button";
import { NextStepsNotice } from "@/components/ui/NextStepsNotice";
import { Stamp } from "@/components/ui/Stamp";
import { TYPE_ACTIVITE_LABELS } from "@/lib/labels";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Confirmation d'immatriculation | e-Culture CI",
  description:
    "Dossier de préparation e-Culture CI — document non officiel, prêt à être transmis aux autorités locales.",
  path: "/immatriculation/confirmation",
});

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
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Stamp>Enregistrée</Stamp>
        <PrintButton />
      </div>

      <div className="dog-ear ledger-lines rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Dossier de préparation
            </p>
            <p className="mt-1 text-sm font-medium text-primary-dark">
              Document non officiel, préparé avec e-Culture CI
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Référence de dossier</p>
            <p className="tabular-ref text-base font-bold text-foreground">
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

        <p className="mt-6 max-w-prose border-t border-border pt-4 text-xs text-muted">
          Ce dossier vous aide à préparer votre immatriculation ; il ne
          remplace aucun document officiel. Il est prêt à être transmis aux
          autorités locales (mairie, préfecture).
        </p>
      </div>

      <NextStepsNotice leadIn="Votre dossier est prêt." />

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
