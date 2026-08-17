import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutDemandeCommune } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/FilterBar";
import { Pagination } from "@/components/admin/Pagination";
import { Badge } from "@/components/ui/Badge";
import { STATUT_DEMANDE_COMMUNE_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Communes — Espace admin | e-Culture CI",
};

const PAGE_SIZE = 25;

type DemandeRow = Awaited<
  ReturnType<typeof prisma.demandeCommune.findMany>
>[number];

function statutTone(statut: string) {
  if (statut === "PILOTE") return "success" as const;
  if (statut === "CLOTUREE") return "neutral" as const;
  if (statut === "NOUVELLE") return "warning" as const;
  return "neutral" as const;
}

export default async function AdminCommunesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.DemandeCommuneWhereInput = {};
  if (params.statut) {
    where.statut = params.statut as StatutDemandeCommune;
  }
  if (params.q) {
    where.OR = [
      { nom: { contains: params.q } },
      { email: { contains: params.q } },
      { commune: { contains: params.q } },
      { numero: { contains: params.q } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.demandeCommune.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.demandeCommune.count({ where }),
  ]);

  const columns: Column<DemandeRow>[] = [
    { key: "numero", label: "Numéro", render: (r) => r.numero },
    { key: "nom", label: "Nom", render: (r) => r.nom },
    { key: "fonction", label: "Fonction", render: (r) => r.fonction },
    { key: "commune", label: "Commune", render: (r) => r.commune },
    { key: "email", label: "Email", render: (r) => r.email },
    { key: "telephone", label: "Téléphone", render: (r) => r.telephone ?? "—" },
    {
      key: "statut",
      label: "Statut",
      render: (r) => (
        <Badge tone={statutTone(r.statut)}>
          {STATUT_DEMANDE_COMMUNE_LABELS[r.statut]}
        </Badge>
      ),
    },
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
        Demandes de communes ({total})
      </h1>

      <div className="mt-6">
        <FilterBar
          action="/admin/communes"
          defaultValues={params}
          exportHref={`/api/communes/export?${exportParams.toString()}`}
          fields={[
            {
              name: "q",
              label: "Recherche",
              type: "text",
              placeholder: "Nom, email, commune, numéro",
            },
            {
              name: "statut",
              label: "Statut",
              type: "select",
              options: Object.entries(STATUT_DEMANDE_COMMUNE_LABELS).map(
                ([value, label]) => ({ value, label }),
              ),
            },
          ]}
        />

        <DataTable columns={columns} rows={rows} />

        <Pagination
          basePath="/admin/communes"
          currentParams={params}
          page={page}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        />
      </div>
    </div>
  );
}
