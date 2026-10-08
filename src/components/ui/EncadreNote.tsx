import { ReactNode } from "react";

// Encadré note : bordure gauche orange, titre en capitales (cahier d'intégration). Sert
// aux précisions et aux mises en garde qui accompagnent un résultat ou une ressource.
export function EncadreNote({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <aside className="rounded-r-xl border border-border border-l-4 border-l-hero-accent bg-surface px-5 py-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-dark">{titre}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-foreground">{children}</div>
    </aside>
  );
}
