import Link from "next/link";

export interface MaillonAriane {
  label: string;
  href?: string;
}

// Fil d'Ariane. Ordinateur : le chemin complet. Mobile : un seul retour vers la page
// parente (« ← Parent »). Le dernier maillon est la page courante (aria-current="page").
export function FilAriane({ maillons }: { maillons: MaillonAriane[] }) {
  const parent = [...maillons].reverse().find((m) => m.href);
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
      {parent?.href && (
        <Link
          href={parent.href}
          className="inline-flex min-h-[44px] items-center font-semibold text-foreground md:hidden"
        >
          <span aria-hidden="true" className="mr-1.5">
            ←
          </span>
          {parent.label}
        </Link>
      )}
      <ol className="hidden flex-wrap items-center gap-x-2 md:flex">
        {maillons.map((m, i) => {
          const dernier = i === maillons.length - 1;
          return (
            <li key={`${m.label}-${i}`} className="flex items-center gap-2">
              {m.href && !dernier ? (
                <Link href={m.href} className="inline-flex min-h-[44px] items-center hover:text-foreground hover:underline">
                  {m.label}
                </Link>
              ) : (
                <span aria-current={dernier ? "page" : undefined} className={dernier ? "font-semibold text-foreground" : ""}>
                  {m.label}
                </span>
              )}
              {!dernier && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
