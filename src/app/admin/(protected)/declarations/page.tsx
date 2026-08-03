import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutDossier } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/FilterBar";
import { Pagination } from "@/components/admin/Pagination";
import { Badge, statutDossierTone } from "@/components/ui/Badge";
import { REGIONS_CI } from "@/lib/regions";
import { STATUT_DOSSIER_LABELS, TYPE_SPECTACLE_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Déclarations — Espace admin | e-Culture CI",
};

const PAGE_SIZE = 25;

type DeclarationRow = Awaited<
  ReturnType<typeof prisma.declaration.findMany>
>[number];

export default async function AdminDeclarationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.DeclarationWhereInput = {};
  if (params.region) where.region = params.region;
  if (params.statutDossier) {
    where.statutDossier = params.statutDossier as StatutDossier;
  }
  if (params.q) {
    where.OR = [
      { organisateurNom: { contains: params.q } },
      { organisateurTelephone: { contains: params.q } },
      { numero: { contains: params.q } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.declaration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.declaration.count({ where }),
  ]);

  const columns: Column<DeclarationRow>[] = [
    { key: "numero", label: "Numéro", render: (r) => r.numero },
    {
      key: "organisateur",
      label: "Organisateur",
      render: (r) => `${r.organisateurNom} ${r.organisateurPrenom ?? ""}`,
    },
    { key: "telephone", label: "Téléphone", render: (r) => r.organisateurTelephone },
    {
      key: "typeSpectacle",
      label: "Type",
      render: (r) => TYPE_SPECTACLE_LABELS[r.typeSpectacle],
    },
    {
      key: "dateEvenement",
      label: "Date événement",
      render: (r) => new Date(r.dateEvenement).toLocaleDateString("fr-FR"),
    },
    { key: "region", label: "Région", render: (r) => r.region },
    { key: "jauge", label: "Jauge", render: (r) => r.jaugeEstimee },
    {
      key: "statut",
      label: "Statut",
      render: (r) => (
        <Badge tone={statutDossierTone(r.statutDossier)}>
          {STATUT_DOSSIER_LABELS[r.statutDossier]}
        </Badge>
      ),
    },
  ];

  const exportParams = new URLSearchParams(
    Object.entries(params).filter(([k, v]) => !!v && k !== "page") as [
      string,
      string,
    ][],
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-foreground">
        Déclarations ({total})
      </h1>

      <div className="mt-6">
        <FilterBar
          action="/admin/declarations"
          defaultValues={params}
          exportHref={`/api/declarations/export?${exportParams.toString()}`}
          fields={[
            { name: "q", label: "Recherche", type: "text", placeholder: "Nom, téléphone, numéro" },
            {
              name: "region",
              label: "Région",
              type: "select",
              options: REGIONS_CI.map((r) => ({ value: r, label: r })),
            },
            {
              name: "statutDossier",
              label: "Statut",
              type: "select",
              options: Object.entries(STATUT_DOSSIER_LABELS).map(([value, label]) => ({
                value,
                label,
              })),
            },
          ]}
        />

        <DataTable columns={columns} rows={rows} />

        <Pagination
          basePath="/admin/declarations"
          currentParams={params}
          page={page}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        />
      </div>
    </div>
  );
}
