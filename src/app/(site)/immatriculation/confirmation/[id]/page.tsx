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

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
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

        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <div className="border-b border-border bg-background px-5 py-3 text-sm font-extrabold text-foreground">
            Dossier
          </div>
          <Ligne label="Type de demandeur">{immatriculation.typeDemandeur}</Ligne>
          <Ligne label="Nom complet">{immatriculation.nomComplet}</Ligne>
          {immatriculation.raisonSociale && (
            <Ligne label="Structure / association">
              {immatriculation.raisonSociale}
            </Ligne>
          )}
          <Ligne label="Téléphone">{immatriculation.telephone}</Ligne>
          <Ligne label="Adresse">{immatriculation.adresse}</Ligne>
          <Ligne label="Commune / Région">
            {immatriculation.commune}, {immatriculation.region}
          </Ligne>
          <Ligne label="Fréquence d'activité">
            {TYPE_ACTIVITE_LABELS[immatriculation.typeActivite]}
          </Ligne>
          <Ligne label="Domaines d'activité">
            {immatriculation.domainesActivite}
          </Ligne>
          <Ligne label="Date de soumission">
            {dateFormat.format(immatriculation.createdAt)}
          </Ligne>
        </div>

        <p className="mt-5 rounded-r-lg border border-border border-l-4 border-l-secondary bg-background px-4 py-3.5 text-sm leading-relaxed text-foreground">
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

function Ligne({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-3 last:border-b-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-bold text-foreground">{children}</span>
    </div>
  );
}
