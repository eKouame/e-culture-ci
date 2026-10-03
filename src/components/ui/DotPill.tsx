const DOT_COLORS = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  deep: "bg-deep-strong",
} as const;

export function DotPill({
  children,
  dot = "secondary",
}: {
  children: React.ReactNode;
  dot?: keyof typeof DOT_COLORS;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${DOT_COLORS[dot]}`}
      />
      {children}
    </span>
  );
}
