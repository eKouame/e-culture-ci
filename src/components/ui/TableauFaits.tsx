// Tableau de faits (résultat de « Suis-je concerné ? », salaires) : une ligne par fait,
// libellé à gauche et valeur à droite, et une note de bas de tableau.
export function TableauFaits({
  titre,
  lignes,
  note,
}: {
  titre?: string;
  lignes: { label: string; valeur: string }[];
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {titre && (
        <p className="border-b border-border bg-surface-2 px-5 py-3 text-sm font-extrabold text-foreground">
          {titre}
        </p>
      )}
      <dl>
        {lignes.map((l) => (
          <div
            key={l.label}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-3 last:border-b-0"
          >
            <dt className="text-sm text-muted">{l.label}</dt>
            <dd className="text-sm font-bold tabular-nums text-foreground">{l.valeur}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="border-t border-border bg-background px-5 py-3 text-sm text-muted">{note}</p>}
    </div>
  );
}
