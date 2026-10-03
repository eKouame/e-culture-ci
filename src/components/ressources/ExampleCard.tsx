import { ReactNode } from "react";

export function ExampleCard({
  label = "Exemple fictif",
  children,
  verdict,
}: {
  label?: string;
  children: ReactNode;
  verdict?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-secondary/30 bg-secondary-light p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-secondary-dark">
        {label}
      </p>
      <div className="mt-3 text-sm text-foreground">{children}</div>
      {verdict && (
        <div className="mt-4 rounded-r-lg border-l-4 border-l-secondary bg-surface p-4 text-sm font-semibold text-secondary-dark">
          {verdict}
        </div>
      )}
    </div>
  );
}
