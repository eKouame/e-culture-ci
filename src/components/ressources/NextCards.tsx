import Link from "next/link";
import { ressourceParHref } from "@/lib/ressources-config";

// « Et après ? » : trois cartes au plus, avec le numéro de la ressource et « Lire → ».
// La description de chaque page est conservée (texte inchangé), plus discrète.
export function NextCards({
  liens,
}: {
  liens: { href: string; label: string; description: string }[];
}) {
  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Et après&nbsp;?</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {liens.map((l) => {
          const numero = ressourceParHref(l.href)?.numero;
          return (
            <Link
              key={l.href}
              href={l.href}
              className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-secondary"
            >
              {numero && <span className="text-xs font-bold tabular-nums text-muted">{numero}</span>}
              <span className="font-bold leading-snug text-foreground">{l.label}</span>
              <span className="text-sm leading-snug text-muted">{l.description}</span>
              <span className="mt-1 text-sm font-bold text-primary-dark">Lire →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
