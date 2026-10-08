import { ReactNode } from "react";

// Bandeau de résultat : ton vert (résultat qui concerne) ou ton foncé (hors champ, appel
// clos…). Contraste AA du texte clair sur ces deux fonds profonds.
export function BandeauResultat({
  ton = "vert",
  surtitre,
  titre,
  children,
}: {
  ton?: "vert" | "fonce";
  surtitre?: string;
  titre: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl p-6 text-on-deep sm:p-7 ${ton === "vert" ? "bg-secondary" : "bg-deep-strong"}`}
    >
      {surtitre && (
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-on-deep">{surtitre}</p>
      )}
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{titre}</h2>
      {children && <div className="mt-3 max-w-prose text-on-deep-muted">{children}</div>}
    </section>
  );
}
