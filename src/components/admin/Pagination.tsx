function buildHref(basePath: string, params: URLSearchParams, page: number) {
  const next = new URLSearchParams(params);
  next.set("page", String(page));
  return `${basePath}?${next.toString()}`;
}

export function Pagination({
  basePath,
  currentParams,
  page,
  totalPages,
}: {
  basePath: string;
  currentParams: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const params = new URLSearchParams(
    Object.entries(currentParams).filter(([, v]) => !!v) as [string, string][],
  );

  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <a
        href={page > 1 ? buildHref(basePath, params, page - 1) : undefined}
        aria-disabled={page <= 1}
        className={`rounded-lg border border-border px-3 py-1.5 ${
          page <= 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-black/5"
        }`}
      >
        ← Précédent
      </a>
      <span className="text-muted">
        Page {page} / {totalPages}
      </span>
      <a
        href={page < totalPages ? buildHref(basePath, params, page + 1) : undefined}
        aria-disabled={page >= totalPages}
        className={`rounded-lg border border-border px-3 py-1.5 ${
          page >= totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-black/5"
        }`}
      >
        Suivant →
      </a>
    </div>
  );
}
