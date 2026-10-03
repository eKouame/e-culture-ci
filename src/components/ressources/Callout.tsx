import { ReactNode } from "react";

type Variant = "retenir" | "exception" | "jour";

const VARIANTS: Record<
  Variant,
  { box: string; label: string; defaultLabel: string; body: string }
> = {
  retenir: {
    box: "border-l-4 border-l-primary bg-primary-light/70",
    label: "text-primary-dark",
    defaultLabel: "À retenir",
    body: "text-base font-semibold text-foreground",
  },
  exception: {
    box: "border-l-4 border-l-secondary-dark bg-black/[0.03]",
    label: "text-secondary-dark",
    defaultLabel: "Exception",
    body: "text-sm text-foreground",
  },
  jour: {
    box: "rounded-r-lg border border-secondary/30 bg-secondary-light",
    label: "text-secondary-dark",
    defaultLabel: "À jour",
    body: "text-sm text-foreground",
  },
};

export function Callout({
  variant,
  label,
  children,
}: {
  variant: Variant;
  label?: string;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <div className={`rounded-r-lg p-4 ${v.box}`}>
      <p className={`text-xs font-bold uppercase tracking-wide ${v.label}`}>
        {label ?? v.defaultLabel}
      </p>
      <div className={`mt-1.5 max-w-prose ${v.body}`}>{children}</div>
    </div>
  );
}
