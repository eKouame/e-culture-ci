import type { Metadata } from "next";
import type { Prisma } from "@/generated/prisma/client";
import type { StatutMentorat } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { FilterBar } from "@/components/admin/FilterBar";
import { Pagination } from "@/components/admin/Pagination";
import { Badge } from "@/components/ui/Badge";
import { REGIONS_CI } from "@/lib/regions";
import { STATUT_MENTORAT_LABELS, TYPE_SPECTACLE_LABELS } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Mentorat — Espace admin | e-Culture CI",
};

const PAGE_SIZE = 25;

type MentoratRow = Awaited<
  ReturnType<typeof prisma.mentoratDemande.findMany>
>[number];

function mentoratTone(statut: string) {
  if (statut === "JUMELE") return "success" as const;
  if (statut === "CLOTURE") return "neutral" as const;
  return "warning" as const;
}

export default async function AdminMentoratPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.MentoratDemandeWhereInput = {};
  if (params.region) where.region = params.region;
  if (params.statutDemande) {
    where.statutDemande = params.statutDemande as StatutMentorat;
  }
  if (params.q) {
    where.OR = [
      { nomComplet: { contains: params.q } },
      { telephone: { contains: params.q } },
      { numero: { contains: params.q } },
    ];
  }

  const [rows, total] = await Promise.all([
    prisma.mentoratDemande.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.mentoratDemande.count({ where }),
  ]);

  const columns: Column<MentoratRow>[] = [
    { key: "numero", label: "Numéro", render: (r) => r.numero },
    { key: "nom", label: "Nom", render: (r) => r.nomComplet },
    { key: "telephone", label: "Téléphone", render: (r) => r.telephone },
    { key: "region", label: "Région", render: (r) => r.region },
    {
      key: "interet",
      label: "Intérêt",
      render: (r) => TYPE_SPECTACLE_LABELS[r.typeSpectacleInteret],
    },
    {
      key: "statut",
      label: "Statut",
      render: (r) => (
        <Badge tone={mentoratTone(r.statutDemande)}>
          {STATUT_MENTORAT_LABELS[r.statutDemande]}
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
        Demandes de mentorat ({total})
      </h1>

      <div className="mt-6">
        <FilterBar
          action="/admin/mentorat"
          defaultValues={params}
          exportHref={`/api/mentorat/export?${exportParams.toString()}`}
          fields={[
            { name: "q", label: "Recherche", type: "text", placeholder: "Nom, téléphone, numéro" },
            {
              name: "region",
              label: "Région",
              type: "select",
              options: REGIONS_CI.map((r) => ({ value: r, label: r })),
            },
            {
              name: "statutDemande",
              label: "Statut",
              type: "select",
              options: Object.entries(STATUT_MENTORAT_LABELS).map(([value, label]) => ({
                value,
                label,
              })),
            },
          ]}
        />

        <DataTable columns={columns} rows={rows} />

        <Pagination
          basePath="/admin/mentorat"
          currentParams={params}
          page={page}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
        />
      </div>
    </div>
  );
}
