export interface FilterField {
  name: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function FilterBar({
  action,
  fields,
  defaultValues,
  exportHref,
}: {
  action: string;
  fields: FilterField[];
  defaultValues: Record<string, string | undefined>;
  exportHref: string;
}) {
  return (
    <form
      action={action}
      method="get"
      className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface p-4"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label htmlFor={field.name} className="text-xs font-medium text-muted">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              defaultValue={defaultValues[field.name] ?? ""}
              className="rounded-lg border border-border px-2.5 py-2 text-sm"
            >
              <option value="">Tous</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={defaultValues[field.name] ?? ""}
              className="rounded-lg border border-border px-2.5 py-2 text-sm"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Filtrer
      </button>
      <a
        href={action}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-black/5"
      >
        Réinitialiser
      </a>
      <a
        href={exportHref}
        className="ml-auto rounded-lg border border-secondary px-4 py-2 text-sm font-semibold text-secondary-dark hover:bg-secondary-light"
      >
        ⬇ Exporter en CSV
      </a>
    </form>
  );
}
