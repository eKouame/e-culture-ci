import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/FilterBar";
import { Pagination } from "@/components/admin/Pagination";
import { REGIONS_CI } from "@/lib/regions";
import { TYPE_DEMANDEUR_OPTIONS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Immatriculations — Espace admin | e-Culture CI",
};

const PAGE_SIZE = 25;

type ImmatriculationRow = Awaited<
  ReturnType<typeof prisma.immatriculation.findMany>
>[number];

export default async function AdminImmatriculationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.ImmatriculationWhereInput = {};
  if (params.region) where.region = params.region;
  if (params.typeDemandeur) where.typeDemandeur = params.typeDemandeur;
  if (params.q) {
    where.OR = [
      { nomComplet: { contains: params.q } },
      { telephone: { contains: params.q } },
      { numero: { contains: params.q } },
      { raisonSociale: { contains: params.q } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.immatriculation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.immatriculation.count({ where }),
  ]);

  const columns: Column<ImmatriculationRow>[] = [
    { key: "numero", label: "Numéro", render: (r) => r.numero },
    { key: "type", label: "Type", render: (r) => r.typeDemandeur },
    { key: "nom", label: "Nom", render: (r) => r.nomComplet },
    { key: "structure", label: "Structure", render: (r) => r.raisonSociale ?? "—" },
    { key: "telephone", label: "Téléphone", render: (r) => r.telephone },
    { key: "region", label: "Région", render: (r) => r.region },
    { key: "domaines", label: "Domaines", render: (r) => r.domainesActivite },
    {
      key: "createdAt",
      label: "Date",
      render: (r) => new Date(r.createdAt).toLocaleDateString("fr-FR"),
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
        Immatriculations ({total})
      </h1>

      <div className="mt-6">
        <FilterBar
          action="/admin/immatriculations"
          defaultValues={params}
          exportHref={`/api/immatriculations/export?${exportParams.toString()}`}
          fields={[
            { name: "q", label: "Recherche", type: "text", placeholder: "Nom, téléphone, numéro" },
            {
              name: "region",
              label: "Région",
              type: "select",
              options: REGIONS_CI.map((r) => ({ value: r, label: r })),
            },
            {
              name: "typeDemandeur",
              label: "Type de demandeur",
              type: "select",
              options: TYPE_DEMANDEUR_OPTIONS.map((v) => ({ value: v, label: v })),
            },
          ]}
        />

        <DataTable columns={columns} rows={rows} />

        <Pagination
          basePath="/admin/immatriculations"
          currentParams={params}
          page={page}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        />
      </div>
    </div>
  );
}
