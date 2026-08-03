export function OptionCard({
  label,
  description,
  onClick,
}: {
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-start gap-1 rounded-xl border-2 border-border bg-surface p-4 text-left transition-colors hover:border-primary hover:bg-primary-light active:bg-primary-light"
    >
      <span className="text-base font-semibold text-foreground">{label}</span>
      {description && <span className="text-sm text-muted">{description}</span>}
    </button>
  );
}
